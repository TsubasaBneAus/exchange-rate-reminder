import mysql.connector as db

# Execute the query to get all user preferences
def execute_query(db_config):
    # Connect to the database
    connection = db.connect(
        host=db_config[0],
        port=db_config[1],
        user=db_config[2],
        password=db_config[3],
        database=db_config[4],
    )

    # List to store fetched records
    results = []

    # Get records from "UserPreference", "User" and "ExchangeRate" tables
    cursor = connection.cursor(buffered=True, dictionary=True)
    query_1 = "SELECT `language`, `base`, `converted` FROM `UserPreference` ORDER BY `id`"
    cursor.execute(query_1)
    results.append(cursor.fetchall())

    query_2 = "SELECT `email` FROM `User` ORDER BY `id`"
    cursor.execute(query_2)
    results.append(cursor.fetchall())

    query_3 = "SELECT * FROM `ExchangeRate` ORDER BY `id` DESC"
    cursor.execute(query_3)
    results.append(cursor.fetchone())

    # Close the connection
    cursor.close()
    connection.close()

    return results
