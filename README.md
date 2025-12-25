# Dear Yue

Dear Yue is a personal full-stack blog platform built as a private writing space on the internet.  
It features a custom admin panel that allows the author to create, edit, and manage blog posts without relying on third-party CMS tools.

The project is intentionally minimalist, focusing on clarity, control, and simplicity.

---

## Features

- Custom admin dashboard for managing blog posts
- Create, edit, and delete posts
- Clean and minimal blog interface
- Separation of admin and public views
- Full-stack implementation

---

## Tech Stack

### Frontend
- React
- JavaScript
- CSS

### Backend
- FastAPI
- Python

### Database
- PostgreSQL
- SQLAlchemy ORM
---

## Project Structure

project/
├── backend/
│ └── app/
├── frontend/
│ └── src/
├── .gitignore
├── README.md
└── package.json

---

## Setup Instructions

### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## Status
Version 1 complete.
This version focuses on core blogging functionality and local development.

## Future improvements:
Image uploads
Rich text editor
Deployment
Authentication enhancements

Author
Iba Shibli.