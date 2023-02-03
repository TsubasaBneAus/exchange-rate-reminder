import os
import requests
from dotenv import load_dotenv

# Load contents of the .env file
load_dotenv()

MYSQL_ROOT_PASSWORD = os.environ["MYSQL_ROOT_PASSWORD"]

print(MYSQL_ROOT_PASSWORD)
