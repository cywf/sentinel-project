# Global Modules

The `global_modules` directory is meant to store terraform modules that are meant to be used across all environments. These modules should be designed to be as abstract and reusable as possible, and should not include any environment-specific configurations.

To use a global module in your environment-specific configuration, you can use the `module` block and specify the path to the module in the `global_modules` directory:

```hcl
module "example_module" {
  source = "../global_modules/example_module"
  # Other module inputs go here
}
```

## Adding a Global Module

To add a new global module, create a new directory within the global_modules directory and add your .tf files and any other necessary files (such as input and output variables).

For example, let's say we want to create a new global module called example_module:

1. Create a new directory within global_modules: mkdir global_modules/example_module
2. Add your .tf files and any other necessary files to the example_module directory
3. Test and debug your module as needed
4. Commit and push your changes to version control

Now, the example_module can be used in any environment by including it in the environment-specific configuration using the module block as shown above.

```tf
module "example_module" {
  source = "./example_module"
}
```

You can then add any additional configuration files for the module in the example_module directory.

To use the example_module module in an environment, you can include it in the environment's configuration using the module block:

```tf
module "example_module" {
  source = "../../global_modules/example_module"
}
```

Now, the example_module can be used in any environment by including it in the environment-specific configuration using the module block as shown above.