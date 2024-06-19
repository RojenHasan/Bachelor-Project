Make sure you have the following software installed on your system:

Node.js
npm (Node Package Manager)
Python

Getting Started:
Clone the Repository

Running the Backend
Navigate to the backend directory and install the necessary dependencies:
cd backend
npm install
npm start

Running the Frontend
Navigate to the frontend directory and install the necessary dependencies:
cd frontend
npm install
npm start

NOTE:
when I run the frontend , it is running on : Metro waiting on exp://192.168.1.32:8081
So if you have another address change every address (192.168.1.32) in the code like in here
--const API_URL = "http://192.168.1.32:3000/api";
to the address shown in the terminal

Running the Price Prediction Service
To make the price prediction feature work, navigate to the backend directory and run the Python script:
cd backend
python .\app.py
