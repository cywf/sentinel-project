# Sentinel Project - Development Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Running Tests](#running-tests)
- [Code Standards](#code-standards)
- [Contributing](#contributing)

## Getting Started

The Sentinel Project is a cutting-edge security system designed to protect critical infrastructure across 18 major industries using specialized AI-powered "Sentries."

### Prerequisites

- Python 3.8 or higher
- Git
- Terraform (for infrastructure deployment)
- AWS CLI (for cloud deployments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cywf/sentinel-project.git
cd sentinel-project
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install development dependencies:
```bash
pip install -e ".[dev]"
```

## Project Structure

```
sentinel-project/
├── ai/                      # Individual sentry implementations
│   ├── apollo/             # Healthcare sentry
│   ├── ra/                 # Energy sentry
│   ├── fenrir/             # IT sentry
│   └── ...                 # Other sentries
├── autogen/                # AutoGen agent implementations
│   ├── agentchat/         # Chat agents (planner, developer)
│   ├── configs/           # Configuration files
│   ├── tests/             # Unit tests
│   ├── constants.py       # Project constants
│   └── utils.py           # Utility functions
├── terraform/              # Infrastructure as Code
│   ├── env/               # Environment-specific configs
│   ├── global_modules/    # Reusable modules
│   └── global_variables/  # Global variables
├── docs/                   # Documentation
├── requirements.txt        # Python dependencies
├── setup.py               # Package setup
└── README.md              # Main project documentation
```

## Development Setup

### Environment Variables

Create a `.env` file in the project root:

```bash
# AutoGen API Configuration
AUTOGEN_API_ENDPOINT=https://api.openai.com/v1
OPENAI_API_KEY=your_api_key_here

# AWS Configuration (for Terraform)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
```

### Running the AutoGen Agents

```python
from autogen.agentchat import SentinelPlanner, SentinelDeveloper

# Initialize planner
planner = SentinelPlanner()
response = planner.ask_planner("What tasks should we prioritize today?")

# Initialize developer
developer = SentinelDeveloper()
response = developer.ask("What's the current status of the Apollo sentry?")
```

## Running Tests

### Run all tests:
```bash
pytest
```

### Run specific test file:
```bash
pytest autogen/tests/test_utils.py
```

### Run with coverage:
```bash
pytest --cov=autogen --cov-report=html
```

### Run tests for a specific module:
```bash
pytest autogen/tests/test_planner.py -v
```

## Code Standards

### Code Formatting

We use `black` for code formatting:
```bash
black autogen/
```

### Linting

We use `flake8` for linting:
```bash
flake8 autogen/ --max-line-length=100
```

### Type Checking

We use `mypy` for static type checking:
```bash
mypy autogen/
```

### Running all checks:
```bash
# Format code
black autogen/

# Check linting
flake8 autogen/ --max-line-length=100

# Type check
mypy autogen/

# Run tests
pytest
```

## Terraform Deployment

### Initialize Terraform:
```bash
cd terraform/env/aws/terraform
terraform init
```

### Plan deployment:
```bash
terraform plan
```

### Apply changes:
```bash
terraform apply
```

## Working with Sentries

Each sentry is organized in the `ai/` directory with the following structure:

```
ai/<sentry_name>/
├── README.md              # Sentry documentation
├── sentry-build.md        # Build instructions
└── terraform/             # Sentry-specific infrastructure
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
```

### Creating a New Sentry Component

1. Add the sentry to `autogen/constants.py` if not already present
2. Create the sentry directory structure
3. Write tests for new functionality
4. Implement the sentry logic
5. Update documentation

## Contributing

### Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Description of changes"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

### Code Review Guidelines

- All code must pass tests
- Code must be formatted with `black`
- Code must pass `flake8` linting
- All new functions must have docstrings
- Complex logic should include comments

## Troubleshooting

### AutoGen Import Errors

If you encounter `ModuleNotFoundError: No module named 'autogen'`:
```bash
pip install pyautogen
```

### Terraform Errors

Ensure AWS credentials are properly configured:
```bash
aws configure
```

### Test Failures

Run tests in verbose mode to see detailed output:
```bash
pytest -v -s
```

## Additional Resources

- [AutoGen Documentation](https://microsoft.github.io/autogen/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Python Testing with pytest](https://docs.pytest.org/)

## Support

For questions or issues, please:
- Open an issue on GitHub
- Check existing documentation in the `docs/` directory
- Review the project wiki

---

Last Updated: 2025-10-25
Maintained by: FolkvarLabs
