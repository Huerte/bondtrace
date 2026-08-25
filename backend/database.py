from sqlmodel import SQLModel, Field, Relationship, create_engine
from typing import Optional, List

sqlite_url = "sqlite:///database.db"

engine = create_engine(sqlite_url, echo=True)

# class User(SQLModel, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     username: str
#     email: str
#     password: str

#     posts: List["Post"] = Relationship(back_populates="user")

# class PostTagLink(SQLModel, table=True):
#     tag_id: int = Field(foreign_key="tag.id", primary_key=True)
#     post_id: int = Field(foreign_key="post.id", primary_key=True)

# class Tag(SQLModel, table=True):
#     id: int | None = Field(primary_key=True, default=None)
#     name: str

#     posts: list["Post"] = Relationship(back_populates="tags", link_model=PostTagLink)

# class Post(SQLModel, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     title: str
#     content: str

#     user_id: int = Field(foreign_key="user.id")
#     user: Optional[User] = Relationship(back_populates="posts")

#     tags: list["Tag"] = Relationship(back_populates="posts", link_model=PostTagLink)

class FollowLink(SQLModel, table=True):
    follower_id: int = Field(foreign_key="user.id", primary_key=True)
    following_id: int = Field(foreign_key="user.id", primary_key=True)

class User(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    username: str
    github_id: int
    avatar_url: str
    github_access_token: str


def create_db_and_table():
    SQLModel.metadata.create_all(engine)
