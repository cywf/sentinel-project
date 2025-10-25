"""
Example Lambda function implementation for a Sentinel Sentry.

This is a template that can be customized for each specific sentry.
"""

import json
import os
import logging
from typing import Dict, Any

# Configure logging
logger = logging.getLogger()
log_level = os.environ.get('LOG_LEVEL', 'INFO').upper()
# Validate log level
if log_level not in ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']:
    log_level = 'INFO'
logger.setLevel(getattr(logging, log_level))


class SentryProcessor:
    """Base processor for sentry threat detection and response."""
    
    def __init__(self, sentry_name: str, industry: str):
        """
        Initialize the sentry processor.
        
        Args:
            sentry_name: Name of the sentry (e.g., "Apollo", "Ra")
            industry: Protected industry (e.g., "Healthcare", "Energy")
        """
        self.sentry_name = sentry_name
        self.industry = industry
        logger.info(f"Initialized {sentry_name} Sentry for {industry}")
    
    def analyze_event(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze a security event.
        
        Args:
            event: Event data to analyze
            
        Returns:
            Analysis results including threat level and recommendations
        """
        logger.info(f"Analyzing event: {event.get('type', 'unknown')}")
        
        # Extract event details
        event_type = event.get('type')
        source = event.get('source')
        timestamp = event.get('timestamp')
        data = event.get('data', {})
        
        # Perform threat analysis (customize per sentry)
        threat_level = self._assess_threat_level(event_type, data)
        
        # Generate response recommendations
        recommendations = self._generate_recommendations(threat_level, event_type)
        
        return {
            'sentry': self.sentry_name,
            'industry': self.industry,
            'event_type': event_type,
            'source': source,
            'timestamp': timestamp,
            'threat_level': threat_level,
            'recommendations': recommendations,
            'status': 'analyzed'
        }
    
    def _assess_threat_level(self, event_type: str, data: Dict[str, Any]) -> str:
        """
        Assess the threat level of an event.
        
        Args:
            event_type: Type of the event
            data: Event data
            
        Returns:
            Threat level: "critical", "high", "medium", "low", or "info"
        """
        # Implement industry-specific threat assessment logic
        # This is a simplified example
        
        if event_type in ['unauthorized_access', 'data_breach', 'ransomware']:
            return 'critical'
        elif event_type in ['suspicious_activity', 'failed_login_attempts']:
            return 'high'
        elif event_type in ['policy_violation', 'unusual_pattern']:
            return 'medium'
        elif event_type in ['configuration_change', 'user_activity']:
            return 'low'
        else:
            return 'info'
    
    def _generate_recommendations(self, threat_level: str, event_type: str) -> list:
        """
        Generate response recommendations based on threat level.
        
        Args:
            threat_level: Assessed threat level
            event_type: Type of the event
            
        Returns:
            List of recommended actions
        """
        recommendations = []
        
        if threat_level == 'critical':
            recommendations.extend([
                "Immediately isolate affected systems",
                "Alert security team and management",
                "Initiate incident response protocol",
                "Preserve forensic evidence"
            ])
        elif threat_level == 'high':
            recommendations.extend([
                "Monitor affected systems closely",
                "Review access logs",
                "Notify security team",
                "Consider temporary restrictions"
            ])
        elif threat_level == 'medium':
            recommendations.extend([
                "Log and track the event",
                "Review related activities",
                "Update monitoring rules"
            ])
        else:
            recommendations.append("Log event for future reference")
        
        return recommendations


def lambda_handler(event, context):
    """
    AWS Lambda handler function.
    
    Args:
        event: Lambda event data
        context: Lambda context object
        
    Returns:
        Response dictionary with status code and body
    """
    try:
        # Get sentry configuration from environment
        sentry_name = os.environ.get('SENTRY_NAME', 'Unknown')
        industry = os.environ.get('INDUSTRY', 'Unknown')
        
        # Initialize sentry processor
        processor = SentryProcessor(sentry_name, industry)
        
        # Parse event data
        try:
            if isinstance(event, str):
                event_data = json.loads(event)
            else:
                event_data = event.get('body', event)
                if isinstance(event_data, str):
                    event_data = json.loads(event_data)
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in request: {str(e)}")
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'error': 'Invalid request format',
                    'message': 'Request body must be valid JSON'
                })
            }
        
        # Process the security event
        result = processor.analyze_event(event_data)
        
        # Return response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'X-Sentry': sentry_name
            },
            'body': json.dumps(result)
        }
        
    except Exception as e:
        logger.error(f"Error processing event: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': 'An error occurred while processing your request'
            })
        }


# For local testing
if __name__ == "__main__":
    # Example test event
    test_event = {
        'type': 'unauthorized_access',
        'source': '192.168.1.100',
        'timestamp': '2025-10-25T04:00:00Z',
        'data': {
            'user': 'unknown_user',
            'resource': 'sensitive_database',
            'action': 'read'
        }
    }
    
    # Set environment variables for testing
    os.environ['SENTRY_NAME'] = 'Apollo'
    os.environ['INDUSTRY'] = 'Healthcare'
    
    # Test the handler
    result = lambda_handler(test_event, None)
    print(json.dumps(result, indent=2))
