from sqlmodel import SQLModel, Field, create_engine
from typing import Optional

sqlite_url = "sqlite:///database.db"

engine = create_engine(sqlite_url, echo=True)

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str

def create_db_and_table():
    SQLModel.metadata.create_all(engine)
