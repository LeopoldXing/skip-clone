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

A cloudformation template can be found under **cloud-resources** folder, this template will create all the could resources needed:

![skip-clone-cloud-resources](https://hilda-notes-service.s3.ca-central-1.amazonaws.com/2025/04/ec9fda51cf09c4b31a71a26dfb66b0c10eb29ce20ba6596698a91e980136206b.png)

1. Network resources:

   - 1 VPC

   - 3 public subnets

   - 3 private subnets

   - 1 Internet Gateway (IGW)
   - 3 NAT gateway

   - Route tables and associations

2. Resources for frontend hosting

   - 1 S3 bucket serving frontend static pages
   - 1 Cloudfront distribution fronting the S3 bucket via OAC

3. IAM roles

   - Instance profile for EC2 instances
   - Elastic Beanstalk service role

4. Backend environment

   - 1 Elastic Beanstalk Application
   - 1 Elastic Beanstalk Environment, which will create
     - 1 Application Load Balancer
     - 1 Auto Scalling Group
     - 3 EC2 instances (t3.micro)
     - Security groups

5. Database cluster

   - 1 Amazon Document DB cluster (Instance-based, standard storage), which contains:
     - 3 Document DB instances (db.t3.medium)
   - Security groups



Some services are not eligible for [AWS Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all), so it will cost you some money.

You can run the template by uploading it in [AWS Cloudformation](https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1) console or using AWS CLI.

#### 2.2 Setting stack parameters

In the AWS console, you can set the following parameters for this stack

| Param              | Description                                                  | Example                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------- |
| **DomainName**     | Domain name that will later point to Elastic Beanstalk environment endpoint | skip-clone.example.com          |
| **CertificateARN** | ARN for the corresponding SSL/TLS certificate, managed by ACM or IAM |                                 |
| **DBUsername**     | The username for the DocumentDB cluster master user.         | leopold                         |
| **DBPassword**     | The password for the DocumentDB cluster master user.         |                                 |
| **S3BucketName**   | The name for S3 bucket, it must be globally unique           | skip-clone-frontend-hosting-123 |

After submiting, the creation process might take up to 15 min to complete



### 3. Create Auth0 Account



### 4. Create Cloudinary Account



### 5. Deployment

