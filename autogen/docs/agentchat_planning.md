# Auto Generated Agent Chat: Collaborative Task Solving with Sentinel Project

AutoGen offers conversable agents powered by LLM, tool or human, which can be used to perform tasks collectively via automated chat. This framework allows tool use and human participation through multi-agent conversation. Please find documentation about this feature here.

In this notebook, we demonstrate how to use multiple agents to work together and accomplish a task for the Sentinel project which requires finding info from the web and coding. `DevAgent` is an LLM-based agent that can write and debug Python code (in a Python coding block) for a user to execute for a given task. `UserProxyAgent` is an agent which serves as a proxy for a user to execute the code written by `DevAgent`. We further create a planning agent for the dev agent to consult. The planning agent is a variation of the LLM-based `DevAgent` with a different system message.

## Requirements

1. AutoGen requires Python>=3.8. To run this notebook example, please install ag2 and docker:

```python
pip install ag2 docker
```
2. Set your API Endpoint

```python
import autogen
autogen.set_api_endpoint("YOUR_API_ENDPOINT")
```

## Construct Agents

First, let's create the planning agent and its user proxy:

```python
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
```
Now, let's create the development agent and its user proxy for the Sentinel project:

```python
dev = autogen.AssistantAgent(
    name="dev",
    model="gpt-3.5-turbo",
    system_message="You are a development agent for the Sentinel project.",
    functions={
        "ask_planner": ask_planner
    }
)

user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="TERMINATE",
    function_map={
        "ask_planner": ask_planner
    }
)
```

### Perform a Task with Sentinel

We invoke the `initiate_chat()` method of the user proxy agent to start the conversation. When you run the cell below, you will be prompted to provide feedback after the dev agent sends a **"TERMINATE"** signal at the end of the message.

```python
user_proxy.initiate_chat(
    dev,
    message="""Implement a new feature for the Sentinel project."""
)
```