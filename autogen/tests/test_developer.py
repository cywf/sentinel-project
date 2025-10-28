"""Tests for the developer module."""

import unittest
from unittest.mock import Mock, patch
from autogen.agentchat.developer import SentinelDeveloper



class TestDeveloper(unittest.TestCase):
    """Test cases for the SentinelDeveloper class."""

    @patch("autogen.agentchat.developer.autogen")
    def test_developer_initialization(self, mock_autogen):
        """Test that developer initializes correctly."""
        mock_autogen.AssistantAgent = Mock()
        mock_autogen.UserProxyAgent = Mock()

        developer = SentinelDeveloper()

        self.assertIsNotNone(developer)
        self.assertEqual(developer.model, "gpt-3.5-turbo")

    @patch("autogen.agentchat.developer.autogen")
    def test_developer_ask_with_no_autogen(self, mock_autogen):
        """Test developer ask when AutoGen is not available."""
        mock_autogen.AssistantAgent.side_effect = Exception("AutoGen not available")

        developer = SentinelDeveloper()
        response = developer.ask("Sample question")

        self.assertIn("not available", response.lower())


if __name__ == "__main__":
    unittest.main()
