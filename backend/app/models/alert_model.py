from sqlalchemy import Column, Integer, String
from app.database import Base

class AlertDB(Base):
    __tablename__ = "system_alerts"

    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String)
    alert_type = Column(String)
    message = Column(String)