import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import engine, Base, SessionLocal
from app.routes import posts, auth
from app.auth import get_password_hash

from app.models.posts import Post, User 

app = FastAPI(title="Blog API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://dear-yue-api.onrender.com",
        "https://dear-yue.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def seed_admin():
    """Automatically creates the 'admin' user if it doesn't exist."""
    db = SessionLocal()
    try:
        # Check if an admin already exists in the 'users' table
        admin = db.query(User).filter(User.username == "admin").first()
        
        if not admin:
            print("--- SEEDING: Creating admin account ---")
            admin_pass = os.getenv("ADMIN_PASSWORD", "admin123") 
            
            new_admin = User(
                username="admin", 
                hashed_password=get_password_hash(admin_pass)
            )
            db.add(new_admin)
            db.commit()
            print("--- SEEDING: Admin created successfully ---")
        else:
            print("--- SEEDING: Admin account already exists ---")
    except Exception as e:
        print(f"--- SEEDING ERROR: {e} ---")
    finally:
        db.close()

seed_admin()

app.include_router(posts.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"Status": "Dear Yue Backend is Online"}