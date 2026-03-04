from pydantic import BaseModel, Field
from typing import List

class ProfileInput(BaseModel):
    age: int = Field(..., ge=0, le=100)
    income: float
    state: str
    education: str
    category: str
    gender: str
    occupation: str
    disability: bool

class SchemeResponse(BaseModel):
    scheme_id: str
    scheme_name: str
    eligibility_score: int
    benefit_amount: float
    deadline: str
    description: str

class MatchResponse(BaseModel):
    matched_schemes: List[SchemeResponse]
