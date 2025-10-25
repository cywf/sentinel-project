"""Tests for utility functions."""

import unittest
from unittest.mock import patch, mock_open
from autogen.utils import (
    get_sentry_for_industry,
    get_industry_for_sentry,
    validate_sentry_name,
    load_config,
)


class TestUtils(unittest.TestCase):
    """Test cases for utility functions."""
    
    def test_get_sentry_for_industry(self):
        """Test getting sentry name for an industry."""
        sentry = get_sentry_for_industry("Healthcare")
        self.assertEqual(sentry, "Apollo")
        
        sentry = get_sentry_for_industry("Energy")
        self.assertEqual(sentry, "Ra")
        
        sentry = get_sentry_for_industry("NonExistent")
        self.assertIsNone(sentry)
    
    def test_get_industry_for_sentry(self):
        """Test getting industry name for a sentry."""
        industry = get_industry_for_sentry("Apollo")
        self.assertEqual(industry, "Healthcare")
        
        industry = get_industry_for_sentry("Ra")
        self.assertEqual(industry, "Energy")
        
        industry = get_industry_for_sentry("NonExistent")
        self.assertIsNone(industry)
    
    def test_validate_sentry_name(self):
        """Test sentry name validation."""
        self.assertTrue(validate_sentry_name("Apollo"))
        self.assertTrue(validate_sentry_name("Ra"))
        self.assertFalse(validate_sentry_name("NonExistent"))
    
    @patch("builtins.open", new_callable=mock_open, read_data="key: value\n")
    def test_load_config(self, mock_file):
        """Test loading configuration from YAML file."""
        with patch("os.path.exists", return_value=True):
            config = load_config("test_config.yaml")
            self.assertIsInstance(config, dict)
            self.assertEqual(config.get("key"), "value")
    
    def test_load_config_file_not_found(self):
        """Test loading configuration when file doesn't exist."""
        with self.assertRaises(FileNotFoundError):
            load_config("nonexistent.yaml")


if __name__ == '__main__':
    unittest.main()
