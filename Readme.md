## How to Run the Project

### 1. Clone the Repository

```shell
git clone https://github.com/LeopoldXing/skip-clone.git
cd skip-clone
```

### 2. Provision Cloud Resources

Before proceeding, ensure you have an AWS account and an IAM user with the required permissions.

You will also need:

- A [Route 53 Hosted Zone](https://console.aws.amazon.com/route53)
- A subdomain for this project
- SSL/TLS certificates for the domain issued by [AWS Certificate Manager (ACM)](https://console.aws.amazon.com/acm) in the **us-east-1** region

 In the **cloudformation-template** folder, you'll find two CloudFormation templates:

1. `01-waf.yml` (must be deployed in **us-east-1**) – creates an [AWS WAF Web ACL](https://us-east-1.console.aws.amazon.com/wafv2/homev2/home?region=us-east-1#/).
2. `02-application.yml` (can be deployed to any region) – provisions all application-related resources.

[Learn more about these templates.](https://blogs.leopoldhsing.com/skip-clone/#Infrastructure-as-Code)

Parameters for `02-application.yml`:

| Parameter Name     | Description                                           | Example                         |
| ------------------ | ----------------------------------------------------- | ------------------------------- |
| **DomainName**     | Domain name pointing to the CloudFront distribution   | skip-clone.example.com          |
| **CertificateARN** | ARN of the ACM certificate (must be in **us-east-1**) |                                 |
| **DBUsername**     | Master username for Amazon DocumentDB                 | leopold                         |
| **DBPassword**     | Master password for Amazon DocumentDB                 |                                 |
| **S3BucketName**   | Globally unique name for the S3 bucket                | skip-clone-frontend-hosting-123 |
| **WAFArn**         | ARN of the WAF Web ACL (must be in **us-east-1**)     |                                 |

Deploy these templates via [AWS CloudFormation](https://console.aws.amazon.com/cloudformation) or AWS CLI may take up to 15 minutes.

### 3. Set Up Third-party Services

#### 3.1 Auth0 (Authentication)

This project uses Auth0 for authentication:

1. Sign up at [Auth0](https://auth0.com/).

2. Create a new **Single Page Web Application**.

3. In the application settings, configure:
   - **Allowed Callback URLs**
   - **Allowed Logout URLs**
   - **Allowed Web Origins**

   Use `https://` prefixes with your frontend domain.

4. Create a new API in the Auth0 dashboard with a unique identifier.

#### 3.2 Stripe (Payments)

1. Sign up at [Stripe](https://stripe.com/).
2. Configure a webhook endpoint: `/api/order/checkout/webhook`.

#### 3.3 Cloudinary (Image Hosting)

Create a [Cloudinary](https://cloudinary.com/) account for media hosting.

### 4. Deploy the Application

#### 4.1 Backend Deployment

Navigate to the `backend` directory.

1. Edit environment variables in `backend/.ebextensions/02-env-variables.config`:

   | Variable Name                  | Description                         | Example                            |
   | ------------------------------ | ----------------------------------- | ---------------------------------- |
   | **AUTH0_AUDIENCE**             | Auth0 API identifier                | skip-clone-api                     |
   | **AUTH0_ISSUER_BASE_URL**      | Auth0 domain URL                    | `https://dev-******.auth0.com`     |
   | **CLOUDINARY_API_KEY**         | From Cloudinary settings            |                                    |
   | **CLOUDINARY_API_SECRET**      | From Cloudinary settings            |                                    |
   | **CLOUDINARY_CLOUD_NAME**      | Cloudinary dashboard                |                                    |
   | **FRONTEND_URL**               | URL for the website                 | `https://skip-clone.example.com`   |
   | **MONGODB_CONNECT_STRING**     | Amazon DocumentDB connection string |                                    |
   | **DB_CONNECTION_TLS_ENABLED**  | Set to `true` to enable TLS         |                                    |
   | **DB_CONNECTION_CA_FILE_PATH** | CA file path for TLS connection     | `/etc/ssl/certs/global-bundle.pem` |
   | **STRIPE_SECRET_KEY**          | Stripe secret key (test mode)       |                                    |
   | **STRIPE_WEBHOOK_SECRET**      | Stripe webhook secret               |                                    |

2. Update the domain name in `backend/.platform/nginx/conf.d/skip-clone.conf`.

3. Build the backend:

   ```shell
   npm install
   npm run build
   ```

4. Package the application (avoid nested directories):

   ```shell
   zip -r application.zip . -x "*.git*" "node_modules/*" "test/*" "__MACOSX/*"
   ```

5. Deploy to AWS Elastic Beanstalk:
   
   - Open the [Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk)
   - Navigate to the **skip-clone-backend** application and **skip-clone-backend-prod** environment
   - Use **Upload and deploy** to upload your zip file

#### 4.2 Frontend Deployment

Navigate to the `frontend` directory.

1. Set up environment variables:

   ```shell
   cp .env.example .env
   ```

   Edit `.env` file with:

   | Variable Name               | Description                       | Example                          |
   | --------------------------- | --------------------------------- | -------------------------------- |
   | **VITE_AUTH0_DOMAIN**       | Auth0 domain                      | `dev-******.auth0.com`           |
   | **VITE_AUTH0_CLIENT_ID**    | Auth0 client ID                   |                                  |
   | **VITE_AUTH0_CALLBACK_URL** | Must match Auth0 callback setting | `https://skip-clone.example.com` |
   | **VITE_AUTH0_AUDIENCE**     | Auth0 API identifier              | skip-clone-api                   |
   | **VITE_API_BASE_URL**       | URL for the website               | `https://skip-clone.example.com` |

2. Build frontend:

   ```shell
   npm install
   npm run build
   ```

3. Upload the contents of the `dist` folder to the configured S3 bucket via the [S3 Console](https://console.aws.amazon.com/s3) or AWS CLI.

4. Update Route 53:

   Point your frontend subdomain to the CloudFront distribution URL

### 5. Clean Up

1. Delete the CloudFormation stacks via the [CloudFormation Console](https://console.aws.amazon.com/cloudformation).
2. Manually empty and delete the S3 bucket via the [S3 Console](https://console.aws.amazon.com/s3).