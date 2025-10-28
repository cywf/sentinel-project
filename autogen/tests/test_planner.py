"""Tests for the planner module."""

import unittest
from unittest.mock import Mock, patch, MagicMock
from autogen.agentchat.planner import SentinelPlanner, ask_planner



class TestPlanner(unittest.TestCase):
    """Test cases for the SentinelPlanner class."""

    @patch("autogen.agentchat.planner.autogen")
    def test_planner_initialization(self, mock_autogen):
        """Test that planner initializes correctly."""
        mock_autogen.AssistantAgent = Mock()
        mock_autogen.UserProxyAgent = Mock()
        mock_autogen.set_api_endpoint = Mock()

        planner = SentinelPlanner()

        self.assertIsNotNone(planner)
        self.assertEqual(planner.model, "gpt-3.5-turbo")

    @patch("autogen.agentchat.planner.autogen")
    def test_ask_planner_function(self, mock_autogen):
        """Test the ask_planner convenience function."""
        mock_autogen.AssistantAgent = Mock()
        mock_autogen.UserProxyAgent = Mock()
        mock_autogen.set_api_endpoint = Mock()

        # Mock the get_last_response to return a mock with content attribute
        mock_response = MagicMock()
        mock_response.content = "Test response"
        mock_user_proxy = MagicMock()
        mock_user_proxy.get_last_response.return_value = mock_response
        mock_autogen.UserProxyAgent.return_value = mock_user_proxy

        response = ask_planner("Sample question")

        self.assertIsNotNone(response)
        self.assertIsInstance(response, str)


if __name__ == "__main__":
    unittest.main()
