"""Utility functions for the Sentinel project."""

import os
import yaml
from typing import Dict, Any, Optional
from .constants import SENTRY_MAPPING


def load_config(config_path: str) -> Dict[str, Any]:
    """
    Load configuration from a YAML file.
    
    Args:
        config_path: Path to the configuration file
        
    Returns:
        Dictionary containing configuration data
    """
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Configuration file not found: {config_path}")
    
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def get_sentry_for_industry(industry: str) -> Optional[str]:
    """
    Get the sentry name for a given industry.
    
    Args:
        industry: Name of the industry
        
    Returns:
        Sentry name or None if not found
    """
    for sentry, ind in SENTRY_MAPPING.items():
        if ind.lower() == industry.lower():
            return sentry
    return None


def get_industry_for_sentry(sentry: str) -> Optional[str]:
    """
    Get the industry name for a given sentry.
    
    Args:
        sentry: Name of the sentry
        
    Returns:
        Industry name or None if not found
    """
    return SENTRY_MAPPING.get(sentry)


def validate_sentry_name(sentry: str) -> bool:
    """
    Validate if a sentry name is valid.
    
    Args:
        sentry: Name of the sentry to validate
        
    Returns:
        True if valid, False otherwise
    """
    return sentry in SENTRY_MAPPING