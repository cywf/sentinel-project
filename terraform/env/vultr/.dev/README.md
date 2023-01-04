# Vultr Terraform Provider

The Vultr Terraform Provider is a plugin for Terraform that allows you to manage resources in Vultr.

## Configuring the Provider

To use the Vultr Terraform Provider, you will need to create an API key for your Vultr account. You can find instructions for doing this in the Vultr API documentation.

Once you have your API key, you can configure the provider by adding the following block to your Terraform configuration:

```t
provider "vultr" {
  api_key = "your_api_key_here"
}
```

## Using the Provider

With the provider configured, you can use the provider to manage resources in Vultr. Here is an example of how to create a new Vultr instance:

```t
resource "vultr_instance" "example" {
  region_id   = 1
  plan_id     = 201
  os_id       = 167
  hostname    = "example"
  ssh_keys = [123]
}
```

You can find a list of available resources and their properties in the [Vultr Terraform Provider documentation](https://www.terraform.io/docs/providers/vultr/index.html).