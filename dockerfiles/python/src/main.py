import os
from dotenv import load_dotenv
from db import execute_query
from send_email import send_email

# Main function to execute all codes
def main():
    # Handle exception of "main" function
    try:
        # Load contents of the .env file
        load_dotenv()

        # Configure the database to use
        host = os.environ["MYSQL_RDS_HOST"]
        port = os.environ["MYSQL_RDS_PORT"]
        user = os.environ["MYSQL_USER"]
        password = os.environ["MYSQL_PASSWORD"]
        database = os.environ["MYSQL_DATABASE"]
        db_config = (host, port, user, password, database)

        # Execute query
        data = execute_query(db_config)

        # Configure the AWS Credentials to use Amazon SES
        aws_access_key_id = os.environ["AWS_ACCESS_KEY_ID"]
        aws_secret_access_key = os.environ["AWS_SECRET_ACCESS_KEY"]
        aws_region_name = os.environ["AWS_REGION_NAME"]
        aws_config = (aws_access_key_id, aws_secret_access_key, aws_region_name)

        # Send email to all users
        send_email(aws_config, data)

        # Log that email has been sent to the users
        print ("Email has been sent to the users\n")

    except Exception:
        # Log that an error happened in main.py
        print("An error happened in main.py\n")

# This block of code is only executed when the script is run directly
if __name__ == "__main__":
    # Call the main function
    main()
