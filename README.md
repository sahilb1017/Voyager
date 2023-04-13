# Voyager


### 1. Server Configuration

1. Open a bash terminal if you are using Windows. On unix based systems open the default terminal.

2. Navigate into the backend folder
```
cd backend
```
3. Create a python virtual environment
```
python -m venv env
```
4a. Activate the environment (Windows)
```
source env/Scripts/activate
```
4b. Activate the environment (Mac)
```
source env/bin/activate
```
5. Install the nessessary modules & dependencies
```
pip install -r requirements.txt
```
6. Start the server
```
uvicorn main:app --reload
```


### 2. Client Configuration
1. Navigate into the frontend folder
```
cd frontend
```
2. Install the nessessary modules & dependencies
```
yarn install
```
3. Run the client (Ensure the server is also running)
```
yarn dev
```
4. Type the following url into your browser to access the website
```
http://localhost:5173
```

