# JanaSetu AI - Core Testing Scenarios

This document outlines the determinism and UI validation tests required for the JanaSetu AI platform. These should be tested locally before any cloud deployment.

## Test Case 1: Multiple Valid Schemes (Sorting & Scoring)
**Objective**: Ensure the ranking algorithm correctly favors exact criteria matches and calculates the exact score bounds.
- **Input Profile**:
  - Age: 30
  - Income: 150000
  - State: "Maharashtra"
  - Gender: "Female"
  - Category: "General"
- **Expected Output**:
  - Should return `PM Kisan Samman Nidhi` and `Stand-Up India Scheme`.
  - `Stand-Up India Scheme` should score higher specifically because it prioritizes female entrepreneurs (Gender +10 criteria points met).
- **UI Validation**:
  - The highest scoring scheme is displayed at the top.
  - The Overall Score Bar is green/cyan if score > 80.

## Test Case 2: Exhaustive Exclusion (No Matches)
**Objective**: Verify the engine securely filters out users violating hard/mandatory constraints and gracefully handles empty return arrays.
- **Input Profile**:
  - Age: 12 (Underaged for adult employment schemes)
  - Income: 5000000 (High income invalidates BPL/EWS schemes)
  - State: "Not Applicable"
- **Expected Output**:
  - Engine returns `[]` (empty list).
- **UI Validation**:
  - The "No Matches Found" idle state is displayed with the purple icon indicating 0 matches.
  - No error toast is shown; this is an expected programmatic state.

## Test Case 3: Partial Eligibility / Soft Criteria
**Objective**: Validate scoring degradation when optional parameters are missing or unmatched.
- **Input Profile**:
  - Age: 65
  - Income: 50000
  - State: "Any" (Disability: True)
- **Expected Output**:
  - Will match IGNOAPS (Indira Gandhi National Old Age Pension Scheme).
  - The baseline score is awarded for Age and Income, but if they fall outside the *optimal* state criteria, the score remains between 50-70.
  - A +5 bonus score is correctly appended because Disability is True.
- **UI Validation**:
  - Score bar indicates Purple (Partial Match).

## Test Case 4: Edge Conditions (Boundary Values)
**Objective**: Ensure `>=` and `<=` logic properly processes boundary constraints without panicking.
- **Input Profile**:
  - Age: exactly `60` (Lower bound for Senior Citizen schemes).
  - Income: exactly `800000` (EWS upper limit boundary).
- **Expected Output**:
  - Matches schemes requiring `min_age = 60` and `income_limit = 800000`.
- **UI Validation**:
  - Component renders successfully. No internal server errors 500.

## Test Case 5: 500 Internal Error / Backend Offline
**Objective**: Verify system robustness during complete API failure.
- **Action**: Shut down the Uvicorn server manually (`Ctrl+C`), and attempt to scan.
- **Expected Output**:
  - Frontend fetch fails.
- **UI Validation**:
  - The red `! Error connecting to server` idle state UI component correctly catches and handles the promise rejection, preventing a React fatal crash.
