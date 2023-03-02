from datetime import datetime
from zoneinfo import ZoneInfo
import os
import requests
from dotenv import load_dotenv
import db

# Main function to execute all codes
def main():
    # Handle exception of "main" function
    try:
        # Load contents of the .env file
        load_dotenv()

        # Configure the database to use
        host = os.environ["MYSQL_RDS_HOST"]
        port = os.environ["MYSQL_RDS_PORT"]
        user = os.environ["MYSQL_RDS_USER"]
        password = os.environ["MYSQL_RDS_PASSWORD"]
        database = os.environ["MYSQL_RDS_DATABASE"]
        db_config = (host, port, user, password, database)

        # Fetch the exchange rate data
        apikey = os.environ["API_KEY"]
        base_currency = "JPY"
        url = f"https://api.apilayer.com/exchangerates_data/latest?base={base_currency}"
        payload = {}
        headers = {"apikey": apikey}
        current_datetime = datetime.now(ZoneInfo("Asia/Tokyo")).strftime(
            "%Y-%m-%d %H:%M:%S %Z"
        )

        # Handle exception of fetching the exchange rate data
        try:
            response = requests.request("GET", url, headers=headers, data=payload)
            response.raise_for_status()
            json_data = response.json()
            print(f"{current_datetime}: Data has been fetched decently!")
        except requests.HTTPError:
            # Retry to fetch data in case of not being able to fetch data at the 1st time
            try:
                response = requests.request("GET", url, headers=headers, data=payload)
                response.raise_for_status()
                json_data = response.json()
                print(f"{current_datetime}: Data has been fetched decently!")
            except requests.HTTPError:
                json_data = None
                print(f"{current_datetime}: Failed to fetch the data!")

        # Execute a query to store the exchange rate data
        db.execute_query(db_config, json_data)

    except Exception:
        # Log that an error happened in main.py
        print(f"{current_datetime}: An error happened in main.py!")


# This block of code is only executed when the script is run directly
if __name__ == "__main__":
    # Call the main function
    main()
