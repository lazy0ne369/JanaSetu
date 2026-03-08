import os
import logging

logger = logging.getLogger(__name__)

AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "")
DYNAMODB_TABLE = os.getenv("DYNAMODB_TABLE", "janasetu-schemes")


# ---------------------------------------------------------------------------
# AWS Bedrock — LLM-powered eligibility explanations
# Phase 4: invoke Claude/Titan to generate personalised scheme explanations.
# ---------------------------------------------------------------------------
def generate_explanation(profile_data, scheme_data):
    """
    Generate a plain-language eligibility explanation for a matched scheme.
    Currently returns a deterministic stub; Phase 4 will route this through
    Amazon Bedrock (Claude 3 / Titan Text) for hyper-personalised output.
    """
    logger.info(f"[Bedrock stub] Generating explanation for: {scheme_data.get('scheme_name')}")

    # --- Phase 4 implementation (commented until Bedrock IAM role is provisioned) ---
    # import boto3, json
    # client = boto3.client("bedrock-runtime", region_name=AWS_REGION)
    # prompt = (
    #     f"Explain in simple terms why a {profile_data.age}-year-old "
    #     f"{profile_data.occupation} from {profile_data.state} qualifies for "
    #     f"'{scheme_data['scheme_name']}'. Keep it under 3 sentences."
    # )
    # response = client.invoke_model(
    #     modelId="anthropic.claude-3-sonnet-20240229-v1:0",
    #     body=json.dumps({"prompt": prompt, "max_tokens": 200}),
    # )
    # return json.loads(response["body"].read())["completion"]

    return (
        f"You are highly eligible for the {scheme_data.get('scheme_name')} "
        f"because your profile matches the core criteria (age, income, and category)."
    )


# ---------------------------------------------------------------------------
# AWS S3 — scheme document storage
# Phase 3: fetch scheme PDF/guidelines from S3 instead of bundling locally.
# ---------------------------------------------------------------------------
def get_scheme_document_url(scheme_id: str) -> str:
    """
    Return a pre-signed S3 URL for a scheme's official document.
    Returns None when S3_BUCKET_NAME is not configured (local/dev mode).
    """
    if not S3_BUCKET_NAME:
        logger.debug("[S3 stub] S3_BUCKET_NAME not set — skipping document fetch.")
        return None

    # --- Phase 3 implementation ---
    # import boto3
    # s3 = boto3.client("s3", region_name=AWS_REGION)
    # url = s3.generate_presigned_url(
    #     "get_object",
    #     Params={"Bucket": S3_BUCKET_NAME, "Key": f"schemes/{scheme_id}.pdf"},
    #     ExpiresIn=3600,
    # )
    # return url

    logger.info(f"[S3 stub] Would fetch s3://{S3_BUCKET_NAME}/schemes/{scheme_id}.pdf")
    return None


# ---------------------------------------------------------------------------
# AWS DynamoDB — production scheme data store
# Controlled by USE_DYNAMODB env var in data_layer.py
# ---------------------------------------------------------------------------
def fetch_schemes_from_dynamodb() -> list:
    """
    Scan the DynamoDB schemes table and return all items.
    Called by data_layer.py when USE_DYNAMODB=true.
    """
    logger.info(f"[DynamoDB stub] Would scan table '{DYNAMODB_TABLE}' in {AWS_REGION}")

    # --- Phase 3 implementation ---
    # import boto3
    # dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
    # table = dynamodb.Table(DYNAMODB_TABLE)
    # response = table.scan()
    # return response.get("Items", [])

    return []
