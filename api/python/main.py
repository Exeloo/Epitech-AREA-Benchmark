from fastapi import FastAPI, HTTPException
import firebase_admin
from firebase_admin import firestore
from dotenv import load_dotenv, dotenv_values
import json

load_dotenv()
env = dotenv_values(".env")

creds = {
    "type": "service_account",
    "project_id": env["PROJECT_ID"],
    "private_key_id": env["PRIVATE_KEY_ID"],
    "private_key": env["PRIVATE_KEY"],
    "client_email": env["CLIENT_MAIL"],
    "client_id": env["CLIENT_ID"],
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": env["CLIENT_CERT_URL"],
    "universe_domain": "googleapis.com",
}

cred = firebase_admin.credentials.Certificate(creds)
firebase_admin.initialize_app(cred)
db = firestore.client()
app = FastAPI()

@app.post("/register")
async def register(body):
    try:
        json_data = json.loads(body)
        user_ref = db.collection('users').document(json_data.get("name"))
        user_ref.set(json_data)

        if "password" in json_data:
            del json_data["password"]

        return {
            "message": "User created successfully",
            "user": json_data,
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjM4ODc5OCwiaWF0IjoxNzMyMzg4Nzk4fQ.mLDskKU5MfLlLG7yTP5YC4BE51E2MGLX9nxyyCNFX-k"
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

@app.post("/login")
async def login(body):
    try:
        cred = json.loads(body)
        email = cred.get("email")
        password = cred.get("password")

        if not email or not password:
            raise HTTPException(status_code=400, detail="Email and password are required.")

        users_ref = db.collection('users')
        query = users_ref.where('email', '==', email).stream()

        user = None
        for doc in query:
            user = doc.to_dict()
            user_id = doc.id
            break

        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password.")

        if user.get("password") != password:
            raise HTTPException(status_code=401, detail="Invalid email or password.")

        return {
            "message": "Login successful",
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjM4ODc5OCwiaWF0IjoxNzMyMzg4Nzk4fQ.mLDskKU5MfLlLG7yTP5YC4BE51E2MGLX9nxyyCNFX-k"
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")
