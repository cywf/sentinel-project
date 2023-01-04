# Azure Terraform Provider

The Azure Terraform Provider allows users to manage Azure resources using the Terraform configuration language.

## Configuration

To use the Azure Terraform Provider, you will need to specify the version of the provider you want to use and configure the provider using an Azure Active Directory service principal and tenant ID.

```t
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.0"
    }
  }
}

provider "azurerm" {
  version = "~> 2.0"

  subscription_id = "00000000-0000-0000-0000-000000000000"
  client_id       = "00000000-0000-0000-0000-000000000000"
  client_secret   = "00000000-0000-0000-0000-000000000000"
  tenant_id       = "00000000-0000-0000-0000-000000000000"
}
```

## Resources

The Azure Terraform Provider supports a wide range of resources, including Virtual Machines, Storage Accounts, and Network Interfaces.

Here is an example of how to create an Azure Virtual Machine using the `azurerm_virtual_machine` resource:

```t
resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "westus"
}

resource "azurerm_virtual_machine" "example" {
  name                  = "example"
  resource_group_name   = azurerm_resource_group.example.name
  location              = azurerm_resource_group.example.location
  size                  = "Standard_
```