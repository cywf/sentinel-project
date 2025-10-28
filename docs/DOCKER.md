# Docker Setup for Sentinel Project

This directory contains Docker configurations for running the Sentinel Project in containerized environments.

## Prerequisites

- Docker 20.10 or higher
- Docker Compose 2.0 or higher

## Quick Start

### 1. Development Environment

Start the development environment with all services:

```bash
docker-compose up -d
```

This will start:
- `sentinel-dev`: Development container with Python environment
- `redis`: Redis cache server
- `postgres`: PostgreSQL database
- `api`: API service (optional)

### 2. Run Tests in Container

```bash
docker-compose run --rm sentinel-dev pytest autogen/tests/ -v
```

### 3. Access Development Container

```bash
docker-compose exec sentinel-dev bash
```

### 4. Stop Services

```bash
docker-compose down
```

### 5. Clean Up (including volumes)

```bash
docker-compose down -v
```

## Building Individual Images

### Build development image:
```bash
docker build -t sentinel-project:dev .
```

### Build production image:
```bash
docker build -f Dockerfile.prod -t sentinel-project:prod .
```

### Run specific sentry:
```bash
docker run -e SENTRY_NAME=Apollo -e INDUSTRY=Healthcare sentinel-project:dev
```

## Environment Configuration

Create a `.env` file for Docker Compose:

```bash
# Copy example
cp .env.example .env

# Edit with your values
vim .env
```

## Service Endpoints

When running with docker-compose:

- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`
- **API** (if enabled): `http://localhost:8000`

## Volumes

Persistent data is stored in Docker volumes:

- `sentinel-data`: Application data
- `redis-data`: Redis cache data
- `postgres-data`: PostgreSQL database data

## Custom Commands

### Run Python shell:
```bash
docker-compose run --rm sentinel-dev python
```

### Run specific test file:
```bash
docker-compose run --rm sentinel-dev pytest autogen/tests/test_utils.py -v
```

### Run linting:
```bash
docker-compose run --rm sentinel-dev flake8 autogen/
```

### Format code:
```bash
docker-compose run --rm sentinel-dev black autogen/
```

## Production Deployment

For production, consider:

1. **Use multi-stage builds** to reduce image size
2. **Set up health checks** for container orchestration
3. **Use secrets management** instead of environment variables
4. **Configure logging drivers** for centralized logging
5. **Set resource limits** for containers

Example production docker-compose snippet:

```yaml
services:
  sentinel-prod:
    image: sentinel-project:prod
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '2'
          memory: 2G
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Kubernetes Deployment

For Kubernetes deployment, use the manifests in `k8s/`:

```bash
kubectl apply -f k8s/
```

## Troubleshooting

### Container won't start
```bash
docker-compose logs sentinel-dev
```

### Permission issues
```bash
docker-compose run --rm --user root sentinel-dev chown -R $(id -u):$(id -g) /app
```

### Database connection issues
```bash
docker-compose exec postgres psql -U sentinel -d sentinel
```

### Redis connection issues
```bash
docker-compose exec redis redis-cli ping
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
