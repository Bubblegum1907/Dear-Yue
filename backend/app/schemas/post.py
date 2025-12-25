from pydantic import BaseModel
from datetime import datetime

class PostOut(BaseModel):
    id: int
    title: str
    slug: str
    content: str
    is_published: bool
    created_at: datetime

    class Config:
        from_attributes = True

class PostCreate(BaseModel):
    title: str
    content: str
    is_published: bool = True

class PostUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    is_published: bool | None = None

