# Outputs for AWS Lambda Sentry Deployment

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.sentry_lambda.arn
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.sentry_lambda.function_name
}

output "lambda_function_invoke_arn" {
  description = "Invoke ARN of the Lambda function"
  value       = aws_lambda_function.sentry_lambda.invoke_arn
}

output "lambda_role_arn" {
  description = "ARN of the IAM role for Lambda"
  value       = aws_iam_role.lambda_role.arn
}

output "cloudwatch_log_group_name" {
  description = "Name of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.lambda_logs.name
}

output "api_gateway_endpoint" {
  description = "API Gateway endpoint URL (if enabled)"
  value       = var.enable_api_gateway ? aws_apigatewayv2_api.sentry_api[0].api_endpoint : null
}
