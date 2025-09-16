from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import Optional, Any

# ---------------- Database Connection ----------------
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client["react-login"]

# Collections (similar to mongoose models)
coll_2 = db["coll_2"]   # For image details
coll = db["coll"]       # For users
coll_1 = db["coll_1"]   # For medical records

print("✅ MongoDB connected")

# ---------------- Pydantic Models ----------------
class ImageDetails(BaseModel):
    image: str

class User(BaseModel):
    name: str
    number: int
    email: str
    password: str

class Record(BaseModel):
    email: str
    Gender: int
    Hemoglobin: float
    MCH: float
    MCHC: float
    MCV: float
    Result: Any
    GroundTruth: Optional[int] = None