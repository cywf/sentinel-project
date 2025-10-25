#!/usr/bin/env python
"""Planning agent for the Sentinel project."""

import os
from typing import Optional

try:
    import autogen
except ImportError:
    autogen = None

from ..constants import DEFAULT_MODEL


class SentinelPlanner:
    """Planning agent for coordinating Sentinel project tasks."""
    
    def __init__(self, api_endpoint: Optional[str] = None, model: str = DEFAULT_MODEL):
        """
        Initialize the planner agent.
        
        Args:
            api_endpoint: Optional API endpoint for AutoGen
            model: Model to use for the agent
        """
        if autogen is None:
            raise ImportError(
                "AutoGen is not installed. Please install it with: pip install pyautogen"
            )
        
        self.api_endpoint = api_endpoint or os.getenv(
            "AUTOGEN_API_ENDPOINT", 
            "https://api.openai.com/v1"
        )
        self.model = model
        
        # Initialize agents when AutoGen is available
        self._initialize_agents()
    
    def _initialize_agents(self):
        """Initialize the AutoGen agents."""
        try:
            if self.api_endpoint:
                autogen.set_api_endpoint(self.api_endpoint)
            
            self.planner = autogen.AssistantAgent(
                name="planner",
                model=self.model,
                system_message="You are a planning agent for the Sentinel project. "
                              "You help coordinate security tasks across multiple critical "
                              "infrastructure sentries."
            )
            
            self.planner_user = autogen.UserProxyAgent(
                name="planner_user",
                human_input_mode="NEVER"
            )
        except Exception as e:
            print(f"Warning: Failed to initialize AutoGen agents: {e}")
            self.planner = None
            self.planner_user = None
    
    def ask_planner(self, message: str) -> str:
        """
        Send a message to the planner agent.
        
        Args:
            message: The message to send
            
        Returns:
            The planner's response
        """
        if not self.planner or not self.planner_user:
            return "Planner is not available. Please check AutoGen installation and configuration."
        
        try:
            self.planner_user.send(self.planner, message)
            return self.planner_user.get_last_response().content
        except Exception as e:
            return f"Error communicating with planner: {e}"


def ask_planner(message: str) -> str:
    """
    Convenience function to ask the planner a question.
    
    Args:
        message: The message to send to the planner
        
    Returns:
        The planner's response
    """
    planner = SentinelPlanner()
    return planner.ask_planner(message)


if __name__ == "__main__":
    # Sample execution
    response = ask_planner("What are the tasks for today?")
    print(response)
