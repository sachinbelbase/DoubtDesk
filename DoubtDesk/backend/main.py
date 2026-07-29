from fastapi import FastAPI,Depends,HTTPException
from database import Base, engine
from routers import students , question , answer, Teachers, Login


app = FastAPI()

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


