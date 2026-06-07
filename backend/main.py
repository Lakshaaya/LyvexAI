from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.log_routes import router as log_router
from app.routes.alert_routes import router as alert_router

from app.database import engine
from app.models.log_model import SecurityLogDB
from app.models.alert_model import AlertDB

# Create tables
SecurityLogDB.metadata.create_all(bind=engine)
AlertDB.metadata.create_all(bind=engine)

app = FastAPI(
    title="LyvexAI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(log_router)
app.include_router(alert_router)

@app.get("/")
def home():
    return {"message": "Welcome to LyvexAI"}

@app.get("/health")
def health():
    return {"status": "running"}