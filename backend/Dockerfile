# backend/Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port that FastAPI will run on
EXPOSE 8000

# Command to run the application
# Use uvicorn to run the FastAPI app.
# --host 0.0.0.0 makes the server accessible from outside the container.
# --port 8000 specifies the port.
# main:app refers to the 'app' object in 'main.py'.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
