from typing import List, Dict, Any

def score_scheme(user: Any, scheme: Dict[str, Any]) -> int:
    score = 0
    
    # Income (25 points)
    if user.income <= scheme["income_limit"]:
        score += 25
        
    # Age (15 points)
    if scheme["min_age"] <= user.age <= scheme["max_age"]:
        score += 15
        
    # State (15 points)
    if scheme["state"] == "All" or scheme["state"].lower() == user.state.lower():
        score += 15
        
    # Category (20 points)
    if scheme["category"] == "All" or scheme["category"].lower() == user.category.lower():
        score += 20
        
    # Gender (10 points)
    if scheme["gender"] == "All" or scheme["gender"].lower() == user.gender.lower():
        score += 10
        
    # Occupation (10 points)
    if scheme["occupation"] == "All" or scheme["occupation"].lower() == user.occupation.lower():
        score += 10
        
    # Disability (5 points)
    if user.disability and scheme.get("disability_friendly", False):
        score += 5
        
    return score

def calculate_eligibility(user_profile: Any, schemes_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    matched_schemes = []
    
    for scheme in schemes_data:
        # Hard Filter: Education
        scheme_education = scheme.get("education", "Any")
        if scheme_education != "Any" and scheme_education.lower() != user_profile.education.lower():
            continue

        # Hard Filter: Gender — exclude schemes restricted to a different gender
        scheme_gender = scheme.get("gender", "All")
        if scheme_gender != "All" and scheme_gender.lower() != user_profile.gender.lower():
            continue

        # Hard Filter: State — exclude schemes restricted to a different state
        scheme_state = scheme.get("state", "All")
        if scheme_state != "All" and scheme_state.lower() != user_profile.state.lower():
            continue

        # Hard Filter: Category — exclude schemes restricted to a different category
        scheme_category = scheme.get("category", "All")
        if scheme_category != "All" and scheme_category.lower() != user_profile.category.lower():
            continue

        # Hard Filter: Occupation — exclude schemes restricted to a different occupation
        scheme_occupation = scheme.get("occupation", "All")
        if scheme_occupation != "All" and scheme_occupation.lower() != user_profile.occupation.lower():
            continue

        # Hard Filter: Age — exclude if user is outside the scheme's age range
        if not (scheme["min_age"] <= user_profile.age <= scheme["max_age"]):
            continue

        # Hard Filter: Income — exclude if user's income exceeds the scheme's income limit
        if user_profile.income > scheme["income_limit"]:
            continue
            
        # Calculate Score deterministically
        score = score_scheme(user_profile, scheme)
        
        # Hard Filter: Exclude if final score == 0
        if score > 0:
            scheme_response = {
                "scheme_id": scheme["scheme_id"],
                "scheme_name": scheme["scheme_name"],
                "eligibility_score": score,
                "benefit_amount": scheme["benefit_amount"],
                "deadline": scheme["deadline"],
                "description": scheme["description"]
            }
            matched_schemes.append(scheme_response)
            
    # Sort descending by score
    matched_schemes.sort(key=lambda x: x["eligibility_score"], reverse=True)
    
    # Return top 5 schemes
    return matched_schemes[:5]
