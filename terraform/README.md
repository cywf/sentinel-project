# Terraform Root Directory

Welcome to the root directory of our Terraform project! This directory serves as the hub for all of our environments, modules, and global variables.

## Table of Contents

* [Environments](#environments)
* [Global Modules](#global-modules)
* [Global Variables](#global-variables)
* [Terraform Cloud](#terraform-cloud)
* [Git Actions](#git-actions)

## Environments

The `environments` directory contains all of the Terraform configuration for each of our environments. These configurations include resources such as virtual machines, networking infrastructure, and storage.

To navigate to a specific environment's directory, click on the environment's name in the list below:

* [AWS](environments/aws/README.md)
* [Azure](environments/azure/README.md)
* [DigitalOcean](environments/digitalocean/README.md)
* [GCP](environments/gcp/README.md)
* [Linode](environments/linode/README.md)
* [Vultr](environments/vultr/README.md)

## Global Modules

The `global_modules` directory contains modules that are intended to be reused across multiple environments. These modules might include things like networking infrastructure, security group rules, and storage.

To use a global module in an environment, you can use the `module` block in your environment's configuration, like this:

```t
module "example_module" {
  source = "../global_modules/example_module"

  # Insert any variables required by the module here
  example_variable = "value"
}
```

Now, the example_module can be used in any environment by including it in the environment-specific configuration using the module block as shown above.

## Global Variables

The `global_variables` directory contains files with global variables that can be used across multiple environments. These variables might include things like AMI IDs, IP ranges, and default tags.

To use a global variable in an environment, you can reference it in your environment's configuration like this:

```t
variable "default_ami" {
  description = "The default AMI to use for all instances"
  type        = string
}

resource "aws_instance" "example" {
  ami           = var.default_ami
  instance_type = "t2.micro"
}
```

By keeping these variables in a global directory, you can easily reuse them across multiple environments and make changes in a single location rather than having to update them in multiple places.