# DigitalOcean Terraform Provider

The DigitalOcean Terraform provider is used to interact with the resources supported by DigitalOcean. The provider needs to be configured with the proper credentials before it can be used.

## Example Usage

```tf
# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = "your_do_token"
}

# Create a droplet
resource "digitalocean_droplet" "example" {
  image  = "ubuntu-20-04-x64"
  name   = "example"
  region = "nyc3"
  size   = "s-1vcpu-1gb"
}

# Create a firewall
resource "digitalocean_firewall" "example" {
  name = "example"

  inbound_rule {
    protocol = "tcp"
    port_range = "22"
  }

  outbound_rule {
    protocol = "tcp"
    port_range = "22"
  }

  droplet_ids = [digitalocean_droplet.example.id]
}
```

## Argument Reference

The following arguments are supported:

* `token` - (Required) The token used to authenticate with DigitalOcean. This can also be provided by the `DIGITALOCEAN_TOKEN` environment variable.

## Attributes Reference

The following attributes are exported:

* `id` - The ID of the droplet.
* `name` - The name of the droplet.
* `region` - The region the droplet is in.
* `image` - The image the droplet was created from.
* `size` - The size of the droplet.
* `ipv4_address` - The IPv4 address of the droplet.
* `ipv6_address` - The IPv6 address of the droplet.