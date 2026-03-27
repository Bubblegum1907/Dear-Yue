import os
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 # Token lasts for 1 hour
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# Setup password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """Checks if the entered password matches the stored hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Generates a secure hash of a password."""
    return pwd_context.hash(password)

def create_access_token(data: dict):
    """Generates a JWT token that expires after a set time."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt