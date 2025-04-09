## How to Run the Project

### 1. Clone the Repository

```shell
git clone https://github.com/LeopoldXing/skip-clone.git
cd skip-clone
```

### 2. Create Cloud Resources

Before proceeding, ensure you have an AWS account and an IAM user with necessary permissions.

Additionally, you'll need:
- A [Route 53 Hosted Zone](https://console.aws.amazon.com/route53)
- Two subdomains (one for frontend, one for backend)
- SSL/TLS certificates for these domains managed by [AWS Certificate Manager (ACM)](https://console.aws.amazon.com/acm)

Use the provided CloudFormation template located in the **cloud-resources** folder. It creates all required resources.

The template parameters are:

| Parameter Name             | Description                                                            | Example                            |
|----------------------------|------------------------------------------------------------------------|------------------------------------|
| **FrontendDomainName**     | Domain name pointing to the CloudFront distribution                    | skip-clone.example.com             |
| **FrontendCertificateARN** | ARN of the ACM certificate (must be in **us-east-1** region)           |                                    |
| **BackendCertificateARN**  | ARN of the ACM certificate (can be in any region)                      |                                    |
| **DBUsername**             | Master username for DocumentDB                                         | leopold                            |
| **DBPassword**             | Master password for DocumentDB                                         |                                    |
| **S3BucketName**           | Globally unique name for S3 bucket                                     | skip-clone-frontend-hosting-123    |

After submitting the template via [AWS CloudFormation](https://console.aws.amazon.com/cloudformation) or AWS CLI, resource creation may take up to 15 minutes.

### 3. Third-party Integrations

#### 3.1 Auth0

This project uses Auth0 for authentication:

1. Create an account at [Auth0](https://auth0.com/).
2. After logging in, create a new application with type **Single Page Web Application**.
3. Set the frontend domain name to Auth0 application settings for:
   - Allowed Callback URLs (`https://` prefix)
   - Allowed Logout URLs (`https://` prefix)
   - Allowed Web Origins (`https://` prefix)

4. Create a new API in the Auth0 dashboard.

#### 3.2 Stripe

Stripe handles payments:

1. Log into [Stripe](https://stripe.com/) and create an account.
2. Set up a webhook with path `/api/order/checkout/webhook`.

#### 3.3 Cloudinary

Create a [Cloudinary](https://cloudinary.com/) account for image hosting.

### 4. Deployment

#### 4.1 Backend

Navigate to the `backend` directory:

1. Edit environment variables in `backend/.ebextensions/02-env-variables.config`:

   | Variable Name                  | Description                                 | Example                            |
   | ------------------------------ | ------------------------------------------- | ---------------------------------- |
   | **AUTH0_AUDIENCE**             | API identifier from Auth0                   | skip-clone-api                     |
   | **AUTH0_ISSUER_BASE_URL**      | Auth0 domain URL                            | `https://dev-******.auth0.com`     |
   | **CLOUDINARY_API_KEY**         | From Cloudinary settings                    |                                    |
   | **CLOUDINARY_API_SECRET**      | From Cloudinary settings                    |                                    |
   | **CLOUDINARY_CLOUD_NAME**      | Cloudinary dashboard                        |                                    |
   | **FRONTEND_URL**               | Frontend domain URL                         | `https://skip-clone.example.com`   |
   | **MONGODB_CONNECT_STRING**     | DocumentDB connection string                |                                    |
   | **DB_CONNECTION_TLS_ENABLED**  | `true` to enable TLS                        |                                    |
   | **DB_CONNECTION_CA_FILE_PATH** | CA file path if TLS enabled                 | `/etc/ssl/certs/global-bundle.pem` |
   | **STRIPE_SECRET_KEY**          | From Stripe developer dashboard (test mode) |                                    |
   | **STRIPE_WEBHOOK_SECRET**      | From Stripe webhook settings                |                                    |

2. Update the domain name in `backend/.platform/nginx/conf.d/skip-clone.conf`.

3. Build the backend:

   ```shell
   npm install
   npm run build
   ```

4. Compress backend files (ensure no nested folders):

   ```shell
   zip -r application.zip . -x "*.git*" "node_modules/*" "test/*" "__MACOSX/*"
   ```

5. Deploy to AWS Elastic Beanstalk:
   
   Go to [Elastic Beanstalk](https://console.aws.amazon.com/elasticbeanstalk), select the **skip-clone-backend** application, **skip-clone-backend-prod** environment, and use "Upload and deploy".
   
6. Update DNS:
   - Copy the Elastic Load Balancer DNS name from [AWS EC2 Console](https://console.aws.amazon.com/ec2).
   - Update backend subdomain in Route 53 with a CNAME pointing to the Elastic Beanstalk environment URL.

#### 4.2 Frontend

Navigate to the `frontend` directory:

1. Configure environment variables:

   ```shell
   cp .env.example .env
   ```

   Edit `.env` file with:

   | Variable Name                | Description                                         | Example                                     |
      |------------------------------|-----------------------------------------------------|---------------------------------------------|
   | **VITE_AUTH0_DOMAIN**        | Auth0 domain                                        | `dev-******.auth0.com`                      |
   | **VITE_AUTH0_CLIENT_ID**     | Auth0 client ID                                     |                                             |
   | **VITE_AUTH0_CALLBACK_URL**  | Same URL as Auth0 callback setting                  | `https://skip-clone.example.com`            |
   | **VITE_AUTH0_AUDIENCE**      | API identifier from Auth0                           | skip-clone-api                              |
   | **VITE_API_BASE_URL**        | Backend endpoint URL                                | `https://skip-clone-backend.example.com`    |

2. Build frontend:

   ```shell
   npm install
   npm run build
   ```

3. Upload contents of `dist` to the frontend S3 bucket via [AWS S3 Console](https://console.aws.amazon.com/s3) or AWS CLI.

4. Update Route 53 DNS:
   
   Set frontend subdomain to the CloudFront distribution URL.

### 5. Clean Up

1. Delete the CloudFormation stack via [AWS CloudFormation](https://console.aws.amazon.com/cloudformation).
2. Empty and delete the S3 bucket manually via [AWS S3 Console](https://console.aws.amazon.com/s3).