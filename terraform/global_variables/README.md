# Global Variables

The `global_variables` directory contains Terraform variables that are used across all environments. These variables should be defined in the `variables.tf` file within this directory.

Here is an example of how to define and use a global variable:

```tf
# variables.tf
variable "region" {
  description = "The default region to use for resources"
  default     = "us-east-1"
}

# main.tf
module "ec2_instance" {
  source = "./modules/ec2_instance"

  region = var.region
}
```

Now, the `region` variable can be used in any environment by including it in the environment-specific configuration and setting its value as shown above.

Note: It is recommended to define default values for all global variables in order to provide a fallback in case no value is set.