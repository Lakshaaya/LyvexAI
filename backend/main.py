from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.log_routes import router as log_router
from app.routes.alert_routes import router as alert_router

from app.database import engine, SessionLocal
from app.models.log_model import SecurityLogDB
from app.models.alert_model import AlertDB

# Create tables
SecurityLogDB.metadata.create_all(bind=engine)
AlertDB.metadata.create_all(bind=engine)

# Add sample data if DB is empty
db = SessionLocal()

if db.query(SecurityLogDB).count() == 0:
    sample_logs = [
        SecurityLogDB(
            ip="192.168.1.99",
            event="admin_created",
            severity="high",
            threat_level="High",
            recommendation="Verify admin account creation"
        ),
        SecurityLogDB(
            ip="45.67.89.100",
            event="data_exfiltration",
            severity="critical",
            threat_level="Medium",
            recommendation="Review security event"
        ),
        SecurityLogDB(
            ip="192.168.1.77",
            event="failed_login",
            severity="medium",
            threat_level="High",
            recommendation="Possible brute-force attempt"
        ),
        SecurityLogDB(
            ip="45.67.89.100",
            event="data_exfiltration",
            severity="critical",
            threat_level="Medium",
            recommendation="Review security event"
        ),
        SecurityLogDB(
            ip="45.67.89.100",
            event="data_exfiltration",
            severity="critical",
            threat_level="Critical",
            recommendation="Blacklisted IP detected - Immediate action required"
        ),
    ]

    db.add_all(sample_logs)
    db.commit()

db.close()

app = FastAPI(
    title="LyvexAI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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