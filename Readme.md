## How to run this project

### 1. Clone the Project Repo

```cmd
git clone https://github.com/LeopoldXing/skip-clone.git

cd skip-clone
```



### 2. Create Cloud Resources

Before continue to this step, you need an AWS account and an IAM user to create all the resources.

Additionally, a [Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=ca-central-1#) Hosted Zone, and one subdomain name for frontend, one subdomain name for backend endpoints, with corresponding SSL/TLS certificates managed by AWS Certificate Manager (ACM) is needed to enable HTTPS trafficing.

A cloudformation template can be found under **cloud-resources** folder, this template will create all the could resources needed:

The template requires a few parameters:

| Param                      | Description                                                  | Example                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------- |
| **FrontendDomainName**     | Custom Domain name that will later point to Cloudfront distribution endpoint | skip-clone.example.com          |
| **FrontendCertificateARN** | ARN for a SSL/TLS certificate of frontend domain name, managed by ACM |                                 |
| **BackendCertificateARN**  | ARN for a SSL/TLS certificate of brontend domain name, managed by ACM |                                 |
| **DBUsername**             | The username for the DocumentDB cluster master user.         | leopold                         |
| **DBPassword**             | The password for the DocumentDB cluster master user.         |                                 |
| **S3BucketName**           | The name for S3 bucket, it must be globally unique           | skip-clone-frontend-hosting-123 |

After submitting the template via [AWS Cloudformation](https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks?filteringText=&filteringStatus=active&viewNested=true) console or AWS CLI, the creation process might take up to 15 min to complete.



### 3. Create an Auth0 Account

This project integrates Auth0 as an identity provider.

1. Go to [Auth0](https://auth0.com/) website and create an account.

2. After login, create a new application, select "Single Page Web Applications".

3. In [AWS Cloudfront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=us-east-1#/distributions) console, select the newly created distribution via Cloudformation template and copy "Distribution domain name", then paste it in following fields in Application settings of Auth0 with "http://" at the front:

   - "Allowed Callback URLs"
   - "Allowed Logout URLs"
   - "Allowed Web Origins"

   Then save changes

4. On the left side, under "Applications" menu, create a new API



### 4. Create a Cloudinary Account

This project uses [Cloudinary](https://cloudinary.com/) to host images



### 5. Deployment

