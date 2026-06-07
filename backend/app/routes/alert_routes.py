from fastapi import APIRouter
from app.database import SessionLocal
from app.models.alert_model import AlertDB

router = APIRouter()

@router.get("/alerts")
def get_alerts():

    db = SessionLocal()

    alerts = db.query(AlertDB).all()

    result = []

    for alert in alerts:
        result.append({
            "id": alert.id,
            "ip": alert.ip,
            "alert_type": alert.alert_type,
            "message": alert.message
        })

    db.close()

    return result