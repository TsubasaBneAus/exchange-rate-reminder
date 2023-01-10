import os
import json
import requests
from dotenv import load_dotenv
import db

# Load contents of the .env file
load_dotenv()

# Configure the database to use
host = os.environ["HOST"]
user = os.environ["USER"]
password = os.environ["PASSWORD"]
database = os.environ["DATABASE"]

apikey = os.environ["API_KEY"]
base_currency = "JPY"
url = f"https://api.apilayer.com/exchangerates_data/latest?base={base_currency}"
payload = {}
headers = {"apikey": apikey}

response = requests.request("GET", url, headers=headers, data=payload)
json_data = response.json()
rates = json_data["rates"]
db.execute_query(host, user, password, database, json_data, rates)
