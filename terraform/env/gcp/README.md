# Google Cloud Platform (GCP) Terraform Provider

The GCP Terraform provider is used to interact with the many resources supported by Google Cloud Platform. The provider needs to be configured with the proper credentials before it can be used.

## Configuration

To use the GCP provider, you will need to create a service account and download the JSON key file.

```tf
provider "google" {
  credentials = file("service-account.json")
  project     = "my-project"
  region      = "us-central1"
}
```

## Resources

The GCP provider supports a wide range of resources, including compute instances, load balancers, and DNS records.

## Compute Instance

To create a compute instance, use the `google_compute_instance` resource:

```tf
resource "google_compute_instance" "web" {
  name         = "web"
  machine_type = "f1-micro"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = "default"
  }
}
```

## Load Balancer

To create a load balancer, use the `google_compute_http_health_check`, `google_compute_target_pool`, and `google_compute_forwarding_rule` resources:

```tf
resource "google_compute_http_health_check" "lb_health_check" {
  name               = "lb-health-check"
  request_path       = "/health"
  check_interval_sec = 1
  timeout_sec        = 1
```