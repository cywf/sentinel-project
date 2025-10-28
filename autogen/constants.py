"""Constants for the Sentinel project."""

# Sentry names mapped to their industries
SENTRY_MAPPING = {
    "Tyche": "Banking & Finance",
    "Ra": "Energy",
    "Lir": "Water",
    "Lugh": "Postal & Shipping",
    "Thoth": "Telecommunications",
    "Jupiter": "Government",
    "Apollo": "Healthcare",
    "Demeter": "Food & Agriculture",
    "Ares": "Defense Industrial Base",
    "Morrigan": "Chemical",
    "Mercury": "Commercial Facilities",
    "Osiris": "Emergency Services",
    "Shiva": "Nuclear Reactors, Materials, and Waste",
    "Sobek": "Dams",
    "Ptah": "Critical Manufacturing",
    "Hermes": "Transportation",
    "Fenrir": "Information Technology",
    "Athena": "Other Community-Based Governmental Organizations",
}

# All available sentries
SENTRIES = list(SENTRY_MAPPING.keys())

# All protected industries
INDUSTRIES = list(SENTRY_MAPPING.values())

# AutoGen configuration
DEFAULT_MODEL = "gpt-3.5-turbo"
DEFAULT_API_ENDPOINT = "https://api.openai.com/v1"

# Timeout settings (in seconds)
AGENT_TIMEOUT = 300
RESPONSE_TIMEOUT = 60
