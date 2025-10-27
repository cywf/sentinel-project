"""Setup configuration for Sentinel Project."""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="sentinel-project",
    version="0.1.0",
    author="FolkvarLabs",
    author_email="info@folkvarlabs.com",
    description="A cutting-edge security system for critical infrastructure protection",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/cywf/sentinel-project",
    packages=find_packages(exclude=["tests", "docs", "terraform"]),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Topic :: Security",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
    ],
    python_requires=">=3.8",
    install_requires=[
        "pyautogen>=0.2.0",
        "pyyaml>=6.0.1",
        "python-dotenv>=1.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.4.0",
            "pytest-cov>=4.1.0",
            "pytest-mock>=3.11.1",
            "black>=23.7.0",
            "flake8>=6.1.0",
            "pylint>=2.17.5",
            "mypy>=1.5.0",
        ],
    },
)
