from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.markdown import render_markdown, estimate_read_time
from app.database import get_db
from app.models.post import Post
from app.schemas.post import PostOut, PostCreate, PostUpdate
from app.services.admin import verify_admin
from app.services.slug import slugify

router = APIRouter(prefix="/posts", tags=["posts"])

# Get all published posts
@router.get("/")
def get_posts(db: Session = Depends(get_db)):
    posts = (
        db.query(Post)
        .order_by(Post.created_at.desc())
        .all()
    )

    return [
        {
            "id": post.id,
            "title": post.title,
            "slug": post.slug,
            "content": post.content,
            "is_published": post.is_published,
            "created_at": post.created_at,
            "read_time": estimate_read_time(post.content),
        }
        for post in posts
    ]

# Get single post by slug
@router.get("/{slug}")
def get_post(slug: str, db: Session = Depends(get_db)):
    post = (
        db.query(Post)
        .filter(Post.slug == slug, Post.is_published == True)
        .first()
    )

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    return {
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "content": post.content,
        "is_published": post.is_published,
        "created_at": post.created_at,
        "rendered_content": render_markdown(post.content),
        "read_time": estimate_read_time(post.content),
    }


# Create post (admin only)
@router.post("/", response_model=PostOut, dependencies=[Depends(verify_admin)])
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    slug = slugify(post.title)

    exists = db.query(Post).filter(Post.slug == slug).first()
    if exists:
        raise HTTPException(status_code=400, detail="Post with similar title exists")

    db_post = Post(
        title=post.title,
        slug=slug,
        content=post.content,
        is_published=post.is_published,
    )

    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

# Update post (admin only)
@router.put("/{slug}", response_model=PostOut, dependencies=[Depends(verify_admin)])
def update_post(slug: str, data: PostUpdate, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if data.title:
        post.title = data.title
        post.slug = slugify(data.title)

    if data.content:
        post.content = data.content

    if data.is_published is not None:
        post.is_published = data.is_published

    db.commit()
    db.refresh(post)
    return post

# Delete post (admin only)
@router.delete("/{slug}", dependencies=[Depends(verify_admin)])
def delete_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    db.delete(post)
    db.commit()
    return {"detail": "Post deleted"}
