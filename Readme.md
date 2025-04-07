## How to run this project

### 1. Clone the Project Repo

```cmd
git clone https://github.com/LeopoldXing/skip-clone.git

cd skip-clone
```



### 2. Create Cloud Resources

Before continue to this step, you need an AWS account and an IAM user to create all the resources.

Additionally, a domain name managed by Route 53, and a SSL/TLS certificate managed by ACM / IAM is needed to enable HTTPS listening for Application Load Balancer.

A cloudformation template can be found under **cloud-resources** folder, this template will create all the could resources needed:

In the AWS console, you can set the following parameters for this stack

| Param              | Description                                                  | Example                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------- |
| **DomainName**     | Domain name that will later point to Elastic Beanstalk environment endpoint | skip-clone.example.com          |
| **CertificateARN** | ARN for the corresponding SSL/TLS certificate, managed by ACM or IAM |                                 |
| **DBUsername**     | The username for the DocumentDB cluster master user.         | leopold                         |
| **DBPassword**     | The password for the DocumentDB cluster master user.         |                                 |
| **S3BucketName**   | The name for S3 bucket, it must be globally unique           | skip-clone-frontend-hosting-123 |

After submiting, the creation process might take up to 15 min to complete.



### 3. Create Auth0 Account





### 4. Create Cloudinary Account



### 5. Deployment

