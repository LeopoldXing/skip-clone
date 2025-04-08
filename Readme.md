## How to run this project

### 1. Clone the Project Repo

```cmd
git clone https://github.com/LeopoldXing/skip-clone.git
cd skip-clone
```



### 2. Create Cloud Resources

Before continue to this step, you need an AWS account and an IAM user to create all the resources.

Additionally, a [Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=ca-central-1#) Hosted Zone, and one subdomain name for frontend, one subdomain name for backend endpoints, with corresponding SSL/TLS certificates managed by [AWS Certificate Manager](https://ca-central-1.console.aws.amazon.com/acm/home?region=ca-central-1#/welcome) (ACM) is needed to enable HTTPS trafficing.

A cloudformation template can be found under **cloud-resources** folder, this template will create all the could resources needed:

The template requires a few parameters:

| Name                       | Description                                                  | Example                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------- |
| **FrontendDomainName**     | Custom Domain name that will later point to Cloudfront distribution endpoint | skip-clone.example.com          |
| **FrontendCertificateARN** | ARN for a SSL/TLS certificate of frontend domain name, managed by ACM |                                 |
| **BackendCertificateARN**  | ARN for a SSL/TLS certificate of backend domain name, managed by ACM |                                 |
| **DBUsername**             | The username for the DocumentDB cluster master user.         | leopold                         |
| **DBPassword**             | The password for the DocumentDB cluster master user.         |                                 |
| **S3BucketName**           | The name for S3 bucket, it must be globally unique           | skip-clone-frontend-hosting-123 |

After submitting the template via [AWS Cloudformation](https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks?filteringText=&filteringStatus=active&viewNested=true) console or AWS CLI, the creation process might take up to 15 min to complete.



### 3. Create 3rd-party Integration Accounts

#### 3.1 Auth0

This project integrates Auth0 as an identity provider.

1. Go to [Auth0](https://auth0.com/) website and create an account.

2. After login, create a new application, select "Single Page Web Applications".

3. In [AWS Cloudfront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=us-east-1#/distributions) console, select the newly created distribution via Cloudformation template and copy "Distribution domain name", then paste it in following fields in Application settings of Auth0 with "http://" at the front:

   - "Allowed Callback URLs"
   - "Allowed Logout URLs"
   - "Allowed Web Origins"

   Then save changes

4. On the left side, under "Applications" menu, create a new API

#### 3.2 Stripe

This project integrates Stripe to handle payments

1. Go to [Stripe](https://stripe.com/en-ca) website and login
2. Create an account in Test mode (without verifying the business)

#### 3.3 Cloudinary

This project uses [Cloudinary](https://cloudinary.com/) to host images



### 4. Deployment

#### 4.1 Backend deployment

Under the project folder "backend":

1. Find the config file "**env-variables.config**" under **`.ebextensions`** folder.

2. Set environment variables:

   | Name                       | Description                                                  | Example                                                      |
   | -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
   | **AUTH0_AUDIENCE**         | The `identifier` of your API in Auth0, it can be found under the API Settings. | skip-clone-api                                               |
   | **AUTH0_ISSUER_BASE_URL**  | The URL for the Auth0 Application domain, it can be found under the Auth0 application settings / quickstart | `https://dev-**********.auth0.com`                           |
   | **CLOUDINARY_API_KEY**     | Cloudinary api key, it can be found in Cloudinary settings   |                                                              |
   | **CLOUDINARY_API_SECRET**  | Cloudinary api secret, it can be found in Cloudinary settings |                                                              |
   | **CLOUDINARY_CLOUD_NAME**  | Cloudinary cloud name, it can be found in Cloudinary dashboard | dggh4k2aa                                                    |
   | **FRONTEND_URL**           | The URL for the website                                      | `https://skip-clone.example.com`                             |
   | **MONGODB_CONNECT_STRING** | The connection string for the database, it can be found in [Amazon Document DB](https://ca-central-1.console.aws.amazon.com/docdb/home?region=ca-central-1#clusters) console. | `mongodb+srv://leopod:**********@skip-clone.********/?retryWrites=true&w=majority&appName=skip-clone` |
   | **STRIPE_SECRET_KEY**      | Stripe secret key, it can be found in the developers section of the Test account |                                                              |

3. zip the backend files, please make sure the files under backend folder are directly compressed, so when they decompressed, they won't be included in a folder.

4. Go to [AWS ElasticBeanstalk](https://ca-central-1.console.aws.amazon.com/elasticbeanstalk/home?region=ca-central-1#/applications) console, go into **`skip-clone-backend`** application, **`skip-clone-backend-prod`** environment, then upload the compressed code by clicking "Upload and deploy" button on the top right.

5. In [AWS ElasticBeanstalk](https://ca-central-1.console.aws.amazon.com/elasticbeanstalk/home?region=ca-central-1#/applications) console, copy the environment endpoint. In [Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/home?region=ca-central-1#Dashboard) console, set the backend domain name to `CNAME`, and set the value to the ElasticBeanstalk environment endpoint.

#### 4.2 Frontend deployment

Under the project folder "frontend":

1. Copy the `.env.example` file and rename it to `.env`

   ```shell
   cp .env.example .env
   ```

2. Set the environment variables:

   | Name                        | Description                                                  | Example                                       |
   | --------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
   | **VITE_AUTH0_DOMAIN**       | Auth0 Application domain, it can be found under the Auth0 application settings / quickstart | `dev-**********.auth0.com`                    |
   | **VITE_AUTH0_CLIENT_ID**    | The client id of Auth0 application, it can be found in application settings |                                               |
   | **VITE_AUTH0_CALLBACK_URL** | The website URL, must be the same as the URL set in "Allowed Callback URLs" | `https://skip-clone.leopoldhsing.com`         |
   | **VITE_AUTH0_AUDIENCE**     | The `identifier` of your API in Auth0, it can be found under the API Settings. | skip-clone-api                                |
   | **VITE_API_BASE_URL**       | The backend endpoint                                         | `https://skip-clone-backend.leopoldhsing.com` |

3. Build the project

   ```shell
   npm install
   npm run build
   ```

4. Upload to S3

   Upload everything under `dist` folder to the frontend bucket via [AWS S3](https://ca-central-1.console.aws.amazon.com/s3/home?region=ca-central-1#) console or AWS CLI.



### 5. Clean Up

1. Go to [AWS Cloudformation](https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks?filteringText=&filteringStatus=active&viewNested=true) console, select the stack for this project, and click "delete".
2. Go to [AWS S3](https://ca-central-1.console.aws.amazon.com/s3/home?region=ca-central-1) console, select the S3 bucket created by the template, empty the bucket, then manually delete the bucket.
