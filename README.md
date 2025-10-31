# Sentinel Project

[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Overview

The Sentinel Project is a cutting-edge AI-powered security system that uses Microsoft AutoGen to provide autonomous threat intelligence and incident response for critical infrastructure. Designed by FolkvarLabs, the Sentinel Project features a set of highly specialized "Sentries" - AI agents that can be deployed to protect 18 major critical infrastructure sectors including Energy, Water, Transportation, Communications, Banking and Finance, and more.

Each Sentry is an autonomous AI agent designed to provide real-time threat intelligence and incident response capabilities tailored to the unique challenges of its designated sector. Built on the AutoGen framework, these sentries can think, plan, and respond to security incidents with minimal human intervention.

This repository contains the core implementation, including the AutoGen agent framework, individual sentry configurations, infrastructure-as-code for deployment, and comprehensive documentation for getting started.

## Quick Start

### Prerequisites

- Python 3.8 or higher
- Docker and Docker Compose (optional, for containerized deployment)
- OpenAI API key for AutoGen agents

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cywf/sentinel-project.git
   cd sentinel-project
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -e ".[dev]"
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

5. **Run tests to verify installation:**
   ```bash
   pytest autogen/tests/ -v
   ```

For detailed development setup and usage instructions, see the [DEVELOPMENT.md](DEVELOPMENT.md) guide.

## Live Codebase Mindmap

Auto-generated on each push: **repo-map.html** (via GitHub Pages and CI artifact).
When Pages is enabled, it will be served at: `https://cywf.github.io/sentinel-project/repo-map.html`

The mindmap provides an interactive visualization of the repository structure, including:
- Directory tree with file organization
- Language distribution statistics
- Quick navigation through the codebase

## Architecture

The Sentinel Project is built on the following core components:

- **AutoGen Framework**: Microsoft's AutoGen library powers the autonomous AI agents
- **Planner Agent**: Coordinates security tasks and threat responses across sentries
- **Developer Agent**: Implements and maintains security solutions
- **Sentry Modules**: 18 specialized AI agents, each focused on a specific infrastructure sector
- **Infrastructure as Code**: Terraform configurations for multi-cloud deployment
- **Lambda Functions**: Serverless deployment options for individual sentries

## Sentries Overview

The Sentinel Project protects 18 critical infrastructure sectors through specialized AI sentries:

* [Tyche](ai/tyche/README.md) - Banking & Finance
* [Ra](ai/ra/README.md) - Energy
* [Lir](ai/lir/README.md) - Water
* [Lugh](ai/lugh/README.md) - Postal & Shipping
* [Thoth](ai/thoth/README.md) - Telecommunications
* [Jupiter](ai/jupiter/README.md) - Government
* [Apollo](ai/apollo/README.md) - Healthcare
* [Demeter](ai/demeter/README.md) - Food & Agriculture
* [Ares](ai/ares/README.md) - Defense Industrial Base
* [Morrigan](ai/morrigan/README.md) - Chemical
* [Mercury](ai/mercury/README.md) - Commercial Facilities
* [Osiris](ai/osiris/README.md) - Emergency Services
* [Shiva](ai/shiva/README.md) - Nuclear Reactors, Materials, and Waste
* [Sobek](ai/sobek/README.md) - Dams
* [Ptah](ai/ptah/README.md) - Critical Manufacturing 
* [Hermes](ai/hermes/README.md) - Transportation
* [Fenrir](ai/fenrir/README.md) - Information Technology
* [Athena](ai/athena/README.md) - Other Community-Based Governmental Organizations

Each sentry is documented in its own directory within the `ai/` folder.

## Technology Stack

The Sentinel Project is implemented using:

**Core Technologies:**
- **Python 3.8+**: Primary implementation language
- **Microsoft AutoGen**: AI agent framework for autonomous operations
- **PyYAML**: Configuration management
- **Python-dotenv**: Environment variable management

**Infrastructure & Deployment:**
- **Docker**: Containerization for consistent deployment
- **Docker Compose**: Multi-container orchestration
- **Terraform**: Infrastructure as Code for multi-cloud deployment (AWS, Azure, GCP, Linode, Digital Ocean, Vultr)
- **AWS Lambda**: Serverless deployment options

**Data & Caching:**
- **PostgreSQL**: Persistent data storage
- **Redis**: Caching and session management

**Development Tools:**
- **pytest**: Testing framework
- **black**: Code formatting
- **flake8**: Linting
- **mypy**: Static type checking
- **pylint**: Code analysis

## Features

- **Autonomous AI Agents**: Built on Microsoft AutoGen for intelligent, self-directed operation
- **18 Specialized Sentries**: Each tailored to specific critical infrastructure sectors
- **Multi-Cloud Deployment**: Terraform configurations for AWS, Azure, GCP, and more
- **Containerized Deployment**: Docker and Docker Compose support
- **Serverless Options**: AWS Lambda function templates included
- **Comprehensive Testing**: Full test suite with pytest
- **Extensible Architecture**: Easy to add new sentries or capabilities
- **Real-time Threat Analysis**: Event processing and threat assessment
- **Automated Response**: Configurable incident response protocols

## Project Structure

```
sentinel-project/
├── ai/                      # Individual sentry implementations
│   ├── apollo/             # Healthcare sentry
│   ├── ra/                 # Energy sentry
│   ├── fenrir/             # IT sentry
│   └── ...                 # Other 15 sentries
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
├── examples/               # Example implementations
│   └── lambda_function.py # AWS Lambda template
├── docs/                   # Documentation
├── requirements.txt        # Python dependencies
├── setup.py               # Package configuration
├── Dockerfile             # Container image
├── docker-compose.yml     # Multi-container setup
└── README.md              # This file
```

## Development

For detailed development instructions, including:
- Environment setup
- Running tests
- Code standards
- Contributing guidelines
- Terraform deployment
- Working with sentries

Please refer to the [DEVELOPMENT.md](DEVELOPMENT.md) guide.

## Docker Deployment

The project includes Docker support for easy deployment:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services included:
- **sentinel-dev**: Development environment
- **postgres**: PostgreSQL database
- **redis**: Redis cache

## Example Usage

### Using the Planner Agent

```python
from autogen.agentchat import SentinelPlanner, ask_planner

# Option 1: Using the instance method
planner = SentinelPlanner()
response = planner.ask_planner("What security tasks should we prioritize today?")
print(response)

# Option 2: Using the convenience function
response = ask_planner("What security tasks should we prioritize today?")
print(response)
```

**Note**: Ensure your OpenAI API key is set in the environment variables before running.

### Using the Developer Agent

```python
from autogen.agentchat import SentinelDeveloper

# Initialize developer
developer = SentinelDeveloper()

# Query about sentry status
response = developer.ask("What's the current status of the Apollo sentry?")
print(response)
```

**Note**: The `ask()` method will return error messages if AutoGen is not properly installed or configured. Always check for error responses in production code.

### Deploying a Lambda Function

See `examples/lambda_function.py` for a complete serverless deployment template that includes:
- Event processing
- Threat assessment
- Automated response recommendations
- Error handling

## Testing

Run the test suite:

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=autogen --cov-report=html

# Run specific test file
pytest autogen/tests/test_planner.py -v
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests and linting (`pytest && black autogen/ && flake8 autogen/`)
5. Commit your changes (`git commit -m 'Add your feature'`)
6. Push to the branch (`git push origin feature/your-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/cywf/sentinel-project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cywf/sentinel-project/discussions)
- **Documentation**: See the `docs/` directory
- **Development Guide**: [DEVELOPMENT.md](DEVELOPMENT.md)

## Acknowledgments

- Built with [Microsoft AutoGen](https://github.com/microsoft/autogen)
- Developed by [FolkvarLabs](https://github.com/cywf)

---

**Sector Coverage Table**

```md
| Industry                                            | Sentry Name     |
| --------------------------------------------------- | ----------------|
| Energy                                              | Ra              |
| Water                                               | Lir             |
| Transportation                                      | Hermes          |
| Telecommunications                                  | Thoth           |
| Banking and Finance                                 | Tyche           |
| Government                                          | Jupiter         |
| Healthcare                                          | Apollo          |
| Food and Agriculture                                | Demeter         |
| Defense Industrial Base                             | Ares            |
| Chemical                                            | Morrigan        |
| Commercial Facilities                               | Mercury         |
| Emergency Services                                  | Osiris          |
| Nuclear Reactors, Materials, and Waste              | Shiva           |
| Dams                                                | Sobek           |
| Critical Manufacturing                              | Ptah            |
| Postal and Shipping                                 | Lugh            |
| Information Technology                              | Fenrir          |
| Other Community-Based Governmental Organizations    | Athena          |
```

