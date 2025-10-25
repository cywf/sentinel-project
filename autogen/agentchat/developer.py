#!/usr/bin/env python
"""Developer agent for the Sentinel project."""

import os
from typing import Optional

try:
    import autogen
except ImportError:
    autogen = None

from .planner import ask_planner
from ..constants import DEFAULT_MODEL


class SentinelDeveloper:
    """Development agent for the Sentinel project."""
    
    def __init__(self, model: str = DEFAULT_MODEL):
        """
        Initialize the developer agent.
        
        Args:
            model: Model to use for the agent
        """
        if autogen is None:
            raise ImportError(
                "AutoGen is not installed. Please install it with: pip install pyautogen"
            )
        
        self.model = model
        self._initialize_agents()
    
    def _initialize_agents(self):
        """Initialize the AutoGen agents."""
        try:
            self.dev = autogen.AssistantAgent(
                name="dev",
                model=self.model,
                system_message="You are a development agent for the Sentinel project. "
                              "You help implement and maintain security solutions for "
                              "critical infrastructure protection.",
                functions={
                    "ask_planner": ask_planner
                }
            )
            
            self.user_proxy = autogen.UserProxyAgent(
                name="user_proxy",
                human_input_mode="TERMINATE",
                function_map={
                    "ask_planner": ask_planner
                }
            )
        except Exception as e:
            print(f"Warning: Failed to initialize AutoGen agents: {e}")
            self.dev = None
            self.user_proxy = None
    
    def ask(self, message: str) -> str:
        """
        Send a message to the developer agent.
        
        Args:
            message: The message to send
            
        Returns:
            The developer's response
        """
        if not self.dev:
            return "Developer is not available. Please check AutoGen installation and configuration."
        
        try:
            response = self.dev.ask(message)
            return response
        except Exception as e:
            return f"Error communicating with developer: {e}"


if __name__ == "__main__":
    # Sample execution
    developer = SentinelDeveloper()
    response = developer.ask("What's the status of the current development task?")
    print(response)
