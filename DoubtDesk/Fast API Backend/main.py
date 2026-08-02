from fastapi import FastAPI,Depends,HTTPException
from database import Base, engine
from routers import students , question , answer, Teachers, Login
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:3000",   # React dev server default
    "http://127.0.0.1:3000",
    "http://localhost:5173",   # Vite dev server default (also common for React)
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

#homepage
@app.get("/")
def home():
    return {"message": "Welcome to DoubtDesk!"}


