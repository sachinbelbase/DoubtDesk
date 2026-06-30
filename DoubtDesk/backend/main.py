from fastapi import FastAPI
from database import engine

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Welcome to DoubtDesk!"}

@app.get("/")
def test_db_connection():
    try:
        connection = engine.connect()
        connection.close()

        return {"message": "Database connection successful!"}
    
    except Exception as e:
        return {"message": f"Database connection failed: {str(e)}"} 

