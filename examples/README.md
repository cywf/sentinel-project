# Example Implementations

This directory contains example implementations for Sentinel Project sentries.

## Contents

### lambda_function.py
A complete example AWS Lambda function that demonstrates:
- Event processing and threat analysis
- Threat level assessment
- Automated response recommendations
- Error handling and logging
- Environment configuration

## Usage

### Testing Locally

```bash
cd examples
python lambda_function.py
```

### Deploying to AWS Lambda

1. **Prepare the deployment package:**
```bash
cd examples
zip -r lambda_package.zip lambda_function.py
```

2. **Copy to your sentry directory:**
```bash
# Ensure the target directory exists
mkdir -p ../ai/apollo/terraform/
cp lambda_package.zip ../ai/apollo/terraform/
```

3. **Update terraform.tfvars:**
```hcl
deployment_package_path = "./lambda_package.zip"
function_name           = "apollo-sentry"
```

4. **Deploy with Terraform:**
```bash
cd ../ai/apollo/terraform
terraform init
terraform apply
```

## Customization

Each sentry should customize the following:

### 1. Threat Assessment Logic
Modify `_assess_threat_level()` to include industry-specific threat patterns:

```python
def _assess_threat_level(self, event_type: str, data: Dict[str, Any]) -> str:
    # Healthcare-specific (Apollo Sentry)
    if event_type == 'hipaa_violation':
        return 'critical'
    if event_type == 'patient_data_access':
        return 'high'
    # Add more healthcare-specific rules
```

### 2. Response Recommendations
Customize `_generate_recommendations()` for your industry:

```python
def _generate_recommendations(self, threat_level: str, event_type: str) -> list:
    recommendations = []
    
    if threat_level == 'critical':
        # Energy sector-specific (Ra Sentry)
        recommendations.append("Isolate affected SCADA systems")
        recommendations.append("Notify grid operators")
    
    return recommendations
```

### 3. Event Processing
Extend `analyze_event()` to include additional analysis:

```python
def analyze_event(self, event: Dict[str, Any]) -> Dict[str, Any]:
    # Add machine learning predictions
    ml_score = self.ml_model.predict(event)
    
    # Add correlation with historical events
    similar_events = self.find_similar_events(event)
    
    # Include in results
    return {
        **base_result,
        'ml_confidence': ml_score,
        'similar_events': similar_events
    }
```

## Testing

Create test cases for your sentry:

```python
import unittest
from lambda_function import SentryProcessor

class TestApolloSentry(unittest.TestCase):
    def setUp(self):
        self.sentry = SentryProcessor('Apollo', 'Healthcare')
    
    def test_hipaa_violation(self):
        event = {
            'type': 'hipaa_violation',
            'data': {'patient_id': '12345'}
        }
        result = self.sentry.analyze_event(event)
        self.assertEqual(result['threat_level'], 'critical')
```

## Environment Variables

Configure these in your Lambda function:

- `SENTRY_NAME` - Name of the sentry (e.g., "Apollo", "Ra")
- `INDUSTRY` - Protected industry (e.g., "Healthcare", "Energy")
- `LOG_LEVEL` - Logging level (DEBUG, INFO, WARNING, ERROR)
- Additional sentry-specific variables as needed

## Security Considerations

1. **Input Validation**: Always validate and sanitize input data
2. **Credentials**: Use AWS Secrets Manager for sensitive data
3. **IAM Roles**: Follow principle of least privilege
4. **Encryption**: Enable encryption at rest and in transit
5. **Monitoring**: Set up CloudWatch alarms for anomalies

## Integration

### With AWS Services
- **CloudWatch**: For logging and monitoring
- **SNS**: For alerting and notifications
- **S3**: For storing forensic data
- **DynamoDB**: For tracking incidents

### With Third-Party Tools
- **SIEM Integration**: Send events to Splunk, ELK, etc.
- **Incident Response**: Integrate with PagerDuty, OpsGenie
- **Threat Intelligence**: Connect to threat feeds

## Performance Optimization

1. **Cold Start**: Use provisioned concurrency for critical sentries
2. **Memory**: Allocate appropriate memory (512MB-1024MB typical)
3. **Timeout**: Set based on processing complexity (300s default)
4. **Concurrency**: Configure reserved concurrency as needed

## Monitoring

Track these metrics:
- Invocation count
- Error rate
- Duration
- Throttles
- Concurrent executions

## Further Reading

- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Python Logging](https://docs.python.org/3/library/logging.html)
- [Security in AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html)
