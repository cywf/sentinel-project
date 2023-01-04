#!/bin/bash

# ------------------------------------- #
# Project directory provisioning script #
# ------------------------------------- #

# Create the root terraform directory
mkdir sentinel-project/terraform

# Create the documentation directory
mkdir sentinel-project/terraform/docs
touch sentinel-project/terraform/docs/README.md

# Create the global_modules directory
mkdir sentinel-project/terraform/global_modules

# Create the global_variables directory
mkdir sentinel-project/terraform/global_variables

# -------------------------- #
# ------ ENVIORNMENTS ------ #
# -------------------------- #

## GCP ##

# Create the gcp directory
mkdir sentinel-project/terraform/env/gcp
touch sentinel-project/terraform/env/gcp/README.md

# Create the gcp/modules directory
mkdir sentinel-project/terraform/env/gcp/modules

# Create the gcp/terraform directory
mkdir sentinel-project/terraform/env/gcp/terraform

# Create the gcp/variables directory
mkdir sentinel-project/terraform/env/gcp/variables

# Create the necessary files in the gcp terraform directory
touch sentinel-project/terraform/env/gcp/terraform/main.tf
touch sentinel-project/terraform/env/gcp/terraform/variables.tf
touch sentinel-project/terraform/env/gcp/terraform/providers.tf

# Create the gcp/policy directory
mkdir sentinel-project/terraform/env/gcp/policy
touch sentinel-project/terraform/env/gcp/policy/policy.hcl

## --- ##
## AWS ##
## --- ##

# Create the aws directory
mkdir sentinel-project/terraform/env/aws
touch sentinel-project/terraform/env/aws/README.md

# Create the aws/modules directory
mkdir sentinel-project/terraform/env/aws/modules

# Create the aws/terraform directory
mkdir sentinel-project/terraform/env/aws/terraform

# Create the aws/variables directory
mkdir sentinel-project/terraform/env/aws/variables

# Create the aws/policy directory
mkdir sentinel-project/terraform/env/aws/policy
touch sentinel-project/terraform/env/aws/policy/policy.hcl

# Create the necessary files in the aws terraform directory
touch sentinel-project/terraform/env/aws/terraform/main.tf
touch sentinel-project/terraform/env/aws/terraform/variables.tf
touch sentinel-project/terraform/env/aws/terraform/providers.tf

## ----- ##
## AZURE ##
## ----- ##

# Create the azure directory
mkdir sentinel-project/terraform/env/azure
touch sentinel-project/terraform/env/azure/README.md

# Create the azure/modules directory
mkdir sentinel-project/terraform/env/azure/modules

# Create the azure/terraform directory
mkdir sentinel-project/terraform/env/azure/terraform

# Create the azure/variables directory
mkdir sentinel-project/terraform/env/azure/variables

# Create the azure/policy directory
mkdir sentinel-project/terraform/env/azure/policy
touch sentinel-project/terraform/env/azure/policy/policy.hcl

## ------ ##
## LINODE ##
## ------ ##

# Create the linode directory
mkdir sentinel-project/terraform/env/linode
touch sentinel-project/terraform/env/linode/README.md

# Create the linode/modules directory
mkdir sentinel-project/terraform/env/linode/modules

# Create the linode/terraform directory
mkdir sentinel-project/terraform/env/linode/terraform

# Create the linode/variables directory
mkdir sentinel-project/terraform/env/linode/variables

# Create the necessary files in the linode terraform directory
touch sentinel-project/terraform/env/linode/terraform/main.tf
touch sentinel-project/terraform/env/linode/terraform/variables.tf
touch sentinel-project/terraform/env/linode/terraform/providers.tf

## ----- ##
## VULTR ##
## ----- ##

# Create the vultr directory
mkdir sentinel-project/terraform/env/vultr
touch sentinel-project/terraform/env/vultr/README.md

# Create the vultr/modules directory
mkdir sentinel-project/terraform/env/vultr/modules

# Create the vultr/terraform directory
mkdir sentinel-project/terraform/env/vultr/terraform

# Create the vultr/variables directory
mkdir sentinel-project/terraform/env/vultr/variables

# Create the necessary files in the vultr terraform directory
touch sentinel-project/terraform/env/vultr/terraform/main.tf
touch sentinel-project/terraform/env/vultr/terraform/variables.tf
touch sentinel-project/terraform/env/vultr/terraform/providers.tf

## ------------ ##
## DIGITALOCEAN ##
## ------------ ##

# Create the digitalocean directory
mkdir sentinel-project/terraform/env/digitalocean
touch sentinel-project/terraform/env/digitalocean/README.md

# Create the digitalocean/modules directory
mkdir sentinel-project/terraform/env/digitalocean/modules

# Create the digitalocean/terraform directory
mkdir sentinel-project/terraform/env/digitalocean/terraform

# Create the digitalocean/variables directory
mkdir sentinel-project/terraform/env/digitalocean/variables

# Create the necessary files in the digitalocean terraform directory
touch sentinel-project/terraform/env/digitalocean/terraform/main.tf
touch sentinel-project/terraform/env/digitalocean/terraform/variables.tf
touch sentinel-project/terraform/env/digitalocean/terraform/providers.tf
