#!/usr/bin/env python

import autogen
from planner import ask_planner

dev = autogen.AssistantAgent(
    name="dev",
    model="gpt-3.5-turbo",
    system_message="You are a development agent for the Sentinel project.",
    functions={"ask_planner": ask_planner},
)

user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="TERMINATE",
    function_map={"ask_planner": ask_planner},
)

if __name__ == "__main__":
    # Sample execution
    response = dev.ask("What's the status of the current development task?")
    print(response)
