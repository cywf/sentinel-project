# Linode Terraform Provider

The Linode Terraform Provider allows you to manage Linode resources, such as instances and DNS records, within your Terraform configuration. It is part of the Linode API, which is a RESTful API for interacting with Linode programmatically.

## Provider Configuration

To use the Linode provider, you must configure the provider block in your Terraform configuration. The minimum required configuration is your Linode API access token.

```t
provider "linode" {
  token = "your-linode-api-access-token"
}
```

## Resources

The Linode provider offers several resources for managing Linode resources within your Terraform configuration. Some examples include:

### Instance

The linode_instance resource allows you to create and manage Linode instances. Here is an example of how to create a Linode instance using the linode_instance resource:

```t
resource "linode_instance" "web_server" {
  label        = "web-server"
  region       = "us-west"
  image        = "linode/ubuntu20.04"
  type         = "g6-nanode-1"
  root_pass    = "supersecurepassword"
  authorized_keys = [
    "ssh-rsa AAAAB...",
  ]
}
```

### DNS Zone

The linode_domain resource allows you to create and manage DNS zones for your domains. Here is an example of how to create a DNS zone for the domain example.com using the linode_domain resource:

```t
resource "linode_domain" "example_com" {
  domain = "example.com"
}
```

## Data Sources

The Linode provider offers several data sources for retrieving information about Linode resources. Some examples include:

### Instance

The linode_instance data source allows you to retrieve information about a Linode instance. Here is an example of how to retrieve the IP address of a Linode instance using the linode_instance data source: