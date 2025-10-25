# Terraform Templates

This directory contains reusable Terraform templates for deploying Sentinel Project sentries across different cloud providers.

## Available Templates

### AWS Lambda Sentry Template
- `aws_lambda_sentry.tf` - Main infrastructure definition
- `aws_lambda_variables.tf` - Variable definitions
- `aws_lambda_outputs.tf` - Output values

## Usage

To use these templates for a specific sentry:

1. Copy the template files to your sentry's terraform directory
2. Customize the variables in a `terraform.tfvars` file
3. Initialize and apply:

```bash
cd ai/<sentry_name>/terraform
terraform init
terraform plan
terraform apply
```

## Example terraform.tfvars

```hcl
function_name            = "apollo-sentry"
deployment_package_path  = "../lambda_package.zip"
aws_region              = "us-east-1"
lambda_runtime          = "python3.12"
lambda_memory_size      = 1024
enable_api_gateway      = true

environment_variables = {
  SENTRY_NAME = "Apollo"
  INDUSTRY    = "Healthcare"
  LOG_LEVEL   = "INFO"
}

tags = {
  Project     = "Sentinel"
  Sentry      = "Apollo"
  Industry    = "Healthcare"
  Environment = "production"
}
```

## Notes

- Replace placeholder values with actual configuration
- Ensure AWS credentials are properly configured
- Review IAM permissions before deployment
- Consider using remote state storage for production deployments
