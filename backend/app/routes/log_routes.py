from fastapi import APIRouter

from app.schemas.log_schema import SecurityLog
from app.services.threat_service import detect_threat

from app.database import SessionLocal
from app.models.log_model import SecurityLogDB
from app.models.alert_model import AlertDB

router = APIRouter()


@router.post("/logs")
def create_log(log: SecurityLog):

    threat = detect_threat(
    log.event,
    log.ip
)

    db = SessionLocal()

    db_log = SecurityLogDB(
        ip=log.ip,
        event=log.event,
        severity=log.severity,
        threat_level=threat["threat_level"],
        recommendation=threat["recommendation"]
    )

    db.add(db_log)

    # Create Alert Automatically
    if threat["threat_level"] in ["High", "Critical"]:

        alert = AlertDB(
            ip=log.ip,
            alert_type=threat["threat_level"],
            message=threat["recommendation"]
        )

        db.add(alert)

    db.commit()

    db.close()

    return {
        "message": "Log saved to database",
        "analysis": {
            "ip": log.ip,
            "event": log.event,
            "severity": log.severity,
            "threat_level": threat["threat_level"],
            "recommendation": threat["recommendation"]
        }
    }


@router.get("/logs")
def get_logs():

    db = SessionLocal()

    logs = db.query(SecurityLogDB).all()

    result = []

    for log in logs:
        result.append({
            "id": log.id,
            "ip": log.ip,
            "event": log.event,
            "severity": log.severity,
            "threat_level": log.threat_level,
            "recommendation": log.recommendation
        })

    db.close()

    return result