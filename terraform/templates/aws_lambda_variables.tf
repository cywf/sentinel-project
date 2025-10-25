# Variables for AWS Lambda Sentry Deployment Template

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "deployment_package_path" {
  description = "Path to the Lambda deployment package (ZIP file)"
  type        = string
}

variable "function_name" {
  description = "Name of the Lambda function (e.g., apollo-sentry, ra-sentry)"
  type        = string
}

variable "lambda_handler" {
  description = "Lambda function handler"
  type        = string
  default     = "index.handler"
}

variable "lambda_runtime" {
  description = "Lambda runtime environment"
  type        = string
  default     = "python3.12"
}

variable "lambda_timeout" {
  description = "Lambda function timeout in seconds"
  type        = number
  default     = 300
}

variable "lambda_memory_size" {
  description = "Lambda function memory size in MB"
  type        = number
  default     = 512
}

variable "environment_variables" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
  default     = {}
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 30
}

variable "enable_api_gateway" {
  description = "Whether to create an API Gateway for the Lambda function"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "Sentinel"
    ManagedBy   = "Terraform"
    Environment = "dev"
  }
}
