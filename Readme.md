## How to run this project
### 1. Clone the Project Repo

```cmd
git clone https://github.com/LeopoldXing/skip-clone.git

cd skip-clone
```



### 2. Create Cloud Resources

Before continue to this step, you need an AWS account and an IAM user to create all the resources.

Additionally, a domain name managed by Route 53, and a SSL/TLS certificate managed by ACM / IAM is needed to enable HTTPS listening for Application Load Balancer.

#### 2.1 Cloudformation template

A cloudformation template can be found under **cloud-resources** folder, this template will create following resources:

1. Network resources:

   - 1 VPC

   - 3 public subnets

   - 3 private subnets

   - 1 Internet Gateway (IGW)

   - Route tables and associations

2. Resources for frontend hosting

   - 1 S3 bucket serving frontend static pages
   - 1 Cloudfront distribution fronting the S3 bucket via OAC

3. IAM roles

   - 



Some services are not eligible for [AWS Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all), so it will cost you some money.

You can run the template by uploading it in [AWS Cloudformation](https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1) console or using AWS CLI.

#### 2.2 Setting stack parameters

In the AWS console, you can set the following parameters for this stack

| Param              | Description                                                  | Example                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------- |
| **DomainName**     | Domain name that will later point to ALB                     | skip-clone.example.com          |
| **CertificateARN** | ARN for the corresponding SSL/TLS certificate, managed by ACM or IAM |                                 |
| **DBUsername**     | The username for the DocumentDB cluster master user.         | leopold                         |
| **DBPassword**     | The password for the DocumentDB cluster master user.         |                                 |
| **S3BucketName**   | The name for S3 bucket, it must be globally unique           | skip-clone-frontend-hosting-123 |

After submiting, the creation process might take up to 15 min to complete



### 3. Create Auth0 Account



