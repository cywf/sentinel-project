resource "aws_lambda_function" "_lambda" {
  filename      = "_deployment_package.zip"
  function_name = "_function"
  role          = aws_iam_role._lambda.arn
  handler       = "index.handler"
}
resource "aws_iam_role" "_lambda" {
  name = "_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
        Sid    = ""
      }
    ]
  })
}
