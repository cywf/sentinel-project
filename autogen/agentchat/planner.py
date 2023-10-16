#!/usr/bin/env python

import autogen

autogen.set_api_endpoint("YOUR_API_ENDPOINT") # TODO: determine API endpoint

planner = autogen.AssistantAgent(
    name="planner",
    model="gpt-3.5-turbo",
    system_message="You are a planning agent for the Sentinel project."
)

planner_user = autogen.UserProxyAgent(
    name="planner_user",
    human_input_mode="NEVER"
)

def ask_planner(message):
    planner_user.send(planner, message)
    return planner_user.get_last_response().content

if __name__ == "__main__":
    # Sample execution
    response = ask_planner("What are the tasks for today?")
    print(response)
