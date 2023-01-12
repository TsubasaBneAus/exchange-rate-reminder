import os
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
db_config = (host, user, password, database)

# Fetch exchange rate data
apikey = os.environ["API_KEY"]
base_currency = "JPY"
url = f"https://api.apilayer.com/exchangerates_data/latest?base={base_currency}"
payload = {}
headers = {"apikey": apikey}

try:
    response = requests.request("GET", url, headers=headers, data=payload)
    response.raise_for_status()
    json_data = response.json()
except requests.HTTPError:
    json_data = None

db.execute_query(db_config, json_data)
