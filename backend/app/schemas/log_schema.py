from pydantic import BaseModel

class SecurityLog(BaseModel):
    ip: str
    event: str
    severity: str