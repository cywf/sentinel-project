# AWS Terraform Provider

The AWS Terraform provider is used to interact with the resources supported by AWS. The provider needs to be configured with the proper credentials before it can be used.

## Using the AWS Provider

```tf
provider "aws" {
  access_key = "ACCESS_KEY"
  secret_key = "SECRET_KEY"
  region     = "REGION"
}
```

## AWS Provider Variables

* `access_key` - (Required) This is the AWS access key.
* `secret_key` - (Required) This is the AWS secret key.
* `region` - (Required) This is the AWS region.

### Example

```tf
provider "aws" {
  access_key = "ACCESS_KEY"
  secret_key = "SECRET_KEY"
  region     = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-2757f631"
  instance_type = "t2.micro"
}
```

In the example above, we create an AWS instance using the aws_instance resource. We specify the AMI to use and the instance type.

## AWS Resources

AWS resources can be managed using Terraform using the `aws` provider. The `aws` provider can be configured using provider-specific variables in the `variables.tf` file. Here is an example of configuring the `aws` provider using the `access_key`, `secret_key`, and `region` variables:

```tf
provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}
```

The `access_key` and `secret_key` variables are used to authenticate with AWS and the `region` variable specifies which region the resources will be created in.

Once the `aws` provider is configured, resources can be created. Here is an example of creating an S3 bucket:

```tf
resource "aws_s3_bucket" "example_bucket" {
  bucket = "example-bucket"
  acl    = "private"
}
```

This will create an S3 bucket with the name `example-bucket` and a private ACL.

For more information on the aws provider and the resources it supports, see the [AWS Provider documentation](https://www.terraform.io/docs/providers/aws/index.html)