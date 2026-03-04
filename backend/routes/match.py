import logging
from fastapi import APIRouter, Request, HTTPException
from models.profile import ProfileInput, MatchResponse
from engine.eligibility import calculate_eligibility
from services.data_layer import get_schemes

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/match", response_model=MatchResponse)
def match_schemes(profile: ProfileInput, request: Request):
    try:
        logger.info(f"Received scan request for user snippet (Age: {profile.age}, State: {profile.state})")
        
        # 1. Fetch data through the abstracted layer
        schemes_data = get_schemes(request)
        if not schemes_data:
            logger.warning("Data Layer returned empty scheme data.")
            return {"matched_schemes": []}
            
        # 2. Run deterministic matching algorithm
        results = calculate_eligibility(profile, schemes_data)
        logger.info(f"Scan complete. Matched {len(results)} schemes.")
        
        return {"matched_schemes": results}
        
    except ValueError as ve:
        logger.error(f"Validation Error in engine: {str(ve)}")
        raise HTTPException(status_code=422, detail=f"Invalid parameter: {str(ve)}")
    except Exception as e:
        logger.error(f"Internal Engine Error during matching: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="An internal error occurred while matching schemes.")
