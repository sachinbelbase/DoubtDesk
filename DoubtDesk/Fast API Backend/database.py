import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not set. Add it to your .env file, e.g.\n"
        "DATABASE_URL=mysql+pymysql://user:password@localhost:3306/doubtdesk"
    )

engine = create_engine(DATABASE_URL)

session_local = sessionmaker(
    autocommit=False,
    autoflush=False, 
    bind=engine
    )

Base = declarative_base()

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()