"""Tests for constants module."""

import unittest
from autogen.constants import (
    SENTRY_MAPPING,
    SENTRIES,
    INDUSTRIES,
    DEFAULT_MODEL,
)


class TestConstants(unittest.TestCase):
    """Test cases for constants."""

    def test_sentry_mapping_structure(self):
        """Test that sentry mapping has correct structure."""
        self.assertIsInstance(SENTRY_MAPPING, dict)
        self.assertEqual(len(SENTRY_MAPPING), 18)

        # Check some key mappings
        self.assertEqual(SENTRY_MAPPING["Apollo"], "Healthcare")
        self.assertEqual(SENTRY_MAPPING["Ra"], "Energy")
        self.assertEqual(SENTRY_MAPPING["Fenrir"], "Information Technology")

    def test_sentries_list(self):
        """Test that sentries list is correctly populated."""
        self.assertIsInstance(SENTRIES, list)
        self.assertEqual(len(SENTRIES), 18)
        self.assertIn("Apollo", SENTRIES)
        self.assertIn("Ra", SENTRIES)

    def test_industries_list(self):
        """Test that industries list is correctly populated."""
        self.assertIsInstance(INDUSTRIES, list)
        self.assertEqual(len(INDUSTRIES), 18)
        self.assertIn("Healthcare", INDUSTRIES)
        self.assertIn("Energy", INDUSTRIES)

    def test_default_model(self):
        """Test default model constant."""
        self.assertEqual(DEFAULT_MODEL, "gpt-3.5-turbo")


if __name__ == "__main__":
    unittest.main()
