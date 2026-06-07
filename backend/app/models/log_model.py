from sqlalchemy import Column, Integer, String
from app.database import Base

class SecurityLogDB(Base):
    __tablename__ = "security_logs"

    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String)
    event = Column(String)
    severity = Column(String)
    threat_level = Column(String)
    recommendation = Column(String)