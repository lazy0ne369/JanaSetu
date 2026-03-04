import os
import logging

logger = logging.getLogger(__name__)

# Toggle setup for Phase 3: local JSON vs DynamoDB
USE_DYNAMODB = os.getenv("USE_DYNAMODB", "false").lower() == "true"

def get_schemes(request):
    """
    Fetch schemes from the configured data store.
    Currently defaults to local in-memory JSON from app.state.
    """
    if USE_DYNAMODB:
        logger.info("Fetching schemes from DynamoDB (Mocked implementation)...")
        # Placeholder: boto3 client logic would go here
        # e.g., dynamodb = boto3.resource('dynamodb')
        # table = dynamodb.Table('SchemesTable')
        # response = table.scan()
        # return response.get('Items', [])
        return []
    else:
        logger.debug("Fetching schemes from local memory cache...")
        return getattr(request.app.state, 'schemes_data', [])
