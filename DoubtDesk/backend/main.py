from fastapi import FastAPI,Depends,HTTPException
from database import Base, engine
from routers import students , question


app = FastAPI()

# Connects the database to the application and creates the tables if they don't exist
Base.metadata.create_all(bind=engine)

app.include_router(students.router)
app.include_router(question.router)

#homepage
@app.get("/")
def home():
    return {"message": "Welcome to DoubtDesk!"}


