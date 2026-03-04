import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from contextlib import asynccontextmanager
from routes import match

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# Load data at startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    data_path = os.path.join(os.path.dirname(__file__), "data", "data_scheme.json")
    try:
        logger.info(f"Loading scheme dataset from {data_path} into memory.")
        with open(data_path, "r", encoding="utf-8") as f:
            app.state.schemes_data = json.load(f)
        logger.info(f"Successfully loaded {len(app.state.schemes_data)} schemes.")
    except Exception as e:
        logger.error(f"Failed to load specific dataset: {e}")
        app.state.schemes_data = []
    yield
    logger.info("Shutting down JanaSetu core engine.")

app = FastAPI(title="JanaSetu AI Backend", lifespan=lifespan)

# Global unified error handler for unexpected 500s
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.critical(f"Unhandled exception at {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Critical service error. The incident has been logged."},
    )

# CORS Rule
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"], # Added 5174 just in case
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(match.router, prefix="/api/schemes", tags=["Schemes"])
