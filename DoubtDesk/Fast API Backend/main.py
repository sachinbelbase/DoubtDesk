import os
from fastapi import FastAPI,Depends,HTTPException
from database import Base, engine
from routers import students , question , answer, Teachers, Login
from fastapi.middleware.cors import CORSMiddleware
from routers import dashboard
from routers import admin
from routers import notification
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

app = FastAPI()

# Rate limiting (used per-route, e.g. on /login, to slow down brute force)
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Origins come from the environment so prod/staging/dev can each set their
# own without touching source. Comma-separated, e.g.
#   ALLOWED_ORIGINS=http://localhost:5173,https://doubtdesk.example.com
_default_dev_origins = "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173"
origins = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", _default_dev_origins).split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Connects the database to the application and creates the tables if they don't exist
Base.metadata.create_all(bind=engine)

app.include_router(students.router)
app.include_router(question.router)
app.include_router(answer.router)
app.include_router(Teachers.router)
app.include_router(Login.router)
app.include_router(dashboard.router)
app.include_router(admin.router)
app.include_router(notification.router)

#homepage
@app.get("/")
def home():
    return {"message": "Welcome to DoubtDesk!"}