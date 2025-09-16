from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import shutil
import os
import json
import random
import smtplib
from email.mime.text import MIMEText
from twilio.rest import Client
import subprocess
from motor.motor_asyncio import AsyncIOMotorClient

# ---------------- FastAPI Setup ----------------
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static folder for uploaded files
if not os.path.exists("uploads"):
    os.makedirs("uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ---------------- Database ----------------
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client["testdb"]
coll = db["users"]
coll_1 = db["records"]

# ---------------- Globals ----------------
otpres = ""
email_value = ""

# ---------------- Models ----------------
class ValuesModel(BaseModel):
    Gender: str
    Hemoglobin: float
    MCH: float
    MCHC: float
    MCV: float
    opt: str

class LoginModel(BaseModel):
    email: str
    password: str

class SignupModel(BaseModel):
    name: str
    number: str
    email: str
    password: str
    otp: str

class EmailModel(BaseModel):
    email: str

class OTPNumModel(BaseModel):
    number: str

# ---------------- File Upload ----------------
@app.post("/upload-image")
async def upload_image(image: UploadFile = File(...)):
    try:
        file_location = f"uploads/{random.randint(1000,9999)}_{image.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        python_script = "dl.py"
        process = subprocess.Popen(
            ["python", python_script, file_location],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Python error: {stderr.decode()}")

        last_line = stdout.decode().strip().split("\n")[-1]
        parsed = json.loads(last_line)
        return parsed
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- Values Prediction ----------------
@app.post("/values")
async def values(data: ValuesModel):
    try:
        process = subprocess.Popen(
            ["python", "knn_aneamia.py", data.Gender, str(data.Hemoglobin),
             str(data.MCH), str(data.MCHC), str(data.MCV), data.opt],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        stdout, stderr = process.communicate()
        if process.returncode != 0:
            raise HTTPException(status_code=500, detail=stderr.decode())

        result = json.loads(stdout.decode())
        record = {
            "email": email_value,
            "Gender": data.Gender,
            "Hemoglobin": data.Hemoglobin,
            "MCH": data.MCH,
            "MCHC": data.MCHC,
            "MCV": data.MCV,
            "Result": result,
            "GroundTruth": result.get("GroundTruth")
        }
        await coll_1.insert_one(record)
        return JSONResponse(content=result.get("response", {}))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- OTP via SMS ----------------
@app.post("/otpnum")
async def otpnum(data: OTPNumModel):
    global otpres
    try:
        account_sid = "AC90ea98ae7efa00cb6257de44bf51a43e"
        auth_token = "2da78e780f8161d342f8e196d0b5b174"
        client = Client(account_sid, auth_token)
        otp = random.randint(100000, 999999)
        client.messages.create(
            body=f"Your OTP is {otp} for the verification of Mykart",
            from_="+13344384929",
            to=f"+91{data.number}"
        )
        otpres = str(otp)
        return {"status": "sent"}
    except Exception as e:
        otpres = "100"
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- OTP via Email ----------------
@app.post("/otp")
async def otp_email(data: EmailModel):
    global otpres
    try:
        otp = random.randint(100000, 999999)
        msg = MIMEText(str(otp))
        msg["Subject"] = "OTP verification from Mykart"
        msg["From"] = "five32149@gmail.com"
        msg["To"] = data.email

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login("five32149@gmail.com", "pbpg ztpl oopf sgpv")
            server.sendmail("five32149@gmail.com", data.email, msg.as_string())

        otpres = str(otp)
        return {"status": "sent"}
    except Exception as e:
        otpres = "100"
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- Login ----------------
@app.post("/Login")
async def login(data: LoginModel):
    global email_value
    email_value = data.email
    try:
        user = await coll.find_one({"email": data.email, "password": data.password})
        if user:
            return {
                "status": "exist",
                "name": user.get("name"),
                "number": user.get("number"),
                "email": user.get("email"),
                "password": user.get("password"),
            }
        else:
            return {"status": "notexist"}
    except:
        return {"status": "notexist"}

# ---------------- Signup ----------------
@app.post("/Signup")
async def signup(data: SignupModel):
    global email_value
    email_value = data.email
    try:
        check = await coll.find_one({"email": data.email})
        if not check:
            if data.otp == otpres:
                await coll.insert_one({
                    "name": data.name,
                    "number": data.number,
                    "email": data.email,
                    "password": data.password
                })
                return "notexist"
            else:
                return "otpfailed"
        else:
            return "exist"
    except:
        return "error occured"

# ---------------- Run ----------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
