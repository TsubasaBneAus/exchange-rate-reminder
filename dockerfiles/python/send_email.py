import os
import requests
from dotenv import load_dotenv
import datetime

# Load contents of the .env file
load_dotenv()

MYSQL_ROOT_PASSWORD = os.environ["MYSQL_ROOT_PASSWORD"]

print(MYSQL_ROOT_PASSWORD)

# test code
now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
print(f"Current time: {now}")
