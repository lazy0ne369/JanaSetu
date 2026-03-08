import os
import logging
from services.aws_service import fetch_schemes_from_dynamodb

logger = logging.getLogger(__name__)

# Toggle setup for Phase 3: local JSON vs DynamoDB
USE_DYNAMODB = os.getenv("USE_DYNAMODB", "false").lower() == "true"

def get_schemes(request):
    """
    Fetch schemes from the configured data store.
    Set USE_DYNAMODB=true to switch to AWS DynamoDB (Phase 3).
    Defaults to local in-memory JSON loaded at startup.
    """
    if USE_DYNAMODB:
        logger.info("Fetching schemes from DynamoDB...")
        return fetch_schemes_from_dynamodb()
    else:
        logger.debug("Fetching schemes from local memory cache...")
        return getattr(request.app.state, 'schemes_data', [])
