import boto3
from currencies import currencies
from decimal import Decimal, ROUND_HALF_UP

# Calculate exchange rate
def calc_exchange_rate(base, converted, data):
    base_rate = data[base]
    converted_rate = data[converted]
    exchange_rate = Decimal(converted_rate) / Decimal(base_rate)
    exchange_rate = exchange_rate.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return exchange_rate


# Send email to all users utilising Amazon SES
def send_email(aws_config, data):
    # Handle exception of "send_email" function
    try:
        client = boto3.client(
            "ses",
            aws_access_key_id=aws_config[0],
            aws_secret_access_key=aws_config[1],
            region_name=aws_config[2],
        )

        for user_pref, user in zip(data[0], data[1]):
            # Check if users have already selected base or converted currencies
            if user_pref["base"] is None or user_pref["converted"] is None:
                continue
            else:
                # Calculate exchange rate
                exchange_rate = calc_exchange_rate(
                    user_pref["base"], user_pref["converted"], data[2]
                )

                # Convert texts in "user_pref" into readable texts for users
                base = ""
                converted = ""
                for each in currencies:
                    if each["value"] == user_pref["base"]:
                        base = each["name"]
                    if each["value"] == user_pref["converted"]:
                        converted = each["name"]

                # Set message texts for the email according to the language users selected
                subject_text = ""
                body_html = ""
                body_text = ""
                fetched_datetime = data[2]["fetched_datetime"]
                if user_pref["language"] == "ja":
                    subject_text = f"現在の為替レート：{exchange_rate} ({converted}/{base})"
                    body_html = f"""
                    <html>
                        <head></head>
                        <body>
                            <h1>Exchange Rate Reminder</h1>
                            <hr>
                            <h2>現在の為替レート</h2>
                            <h2>{base} &#8594; {converted}: {exchange_rate} ({converted}/{base})</h2>
                            <h4>取得日時：{fetched_datetime}</h4>
                            <br>
                            <br>
                            <p>このメールは<a href='https://aws.amazon.com/ses/'>Amazon SES</a>を使用して送信されています。</p>
                        </body>
                    </html>
                    """
                    body_text = (
                        "Exchange Rate Reminder\r\n\n"
                        "現在の為替レート\r\n"
                        f"{base} -> {converted}: {exchange_rate} ({converted}/{base})\r\n"
                        f"取得日時：{fetched_datetime}\r\n\n\n"
                        "このメールはAmazon SESを使用して送信されています。"
                    )
                else:
                    subject_text = f"The Current Exchange Rate: {exchange_rate} ({converted}/{base})"
                    body_html = f"""
                    <html>
                        <head></head>
                        <body>
                            <h1>Exchange Rate Reminder</h1>
                            <hr>
                            <h2>The Current Exchange Rate</h2>
                            <h2>{base} &#8594; {converted}: {exchange_rate} ({converted}/{base})</h2>
                            <h4>Fetched Date and Time: {fetched_datetime}</h4>
                            <br>
                            <br>
                            <p>This email is sent using <a href='https://aws.amazon.com/ses/'>Amazon SES</a>.</p>
                        </body>
                    </html>
                    """
                    body_text = (
                        "Exchange Rate Reminder\r\n\n"
                        "The Current Exchange Rate\r\n"
                        f"{base} -> {converted}: {exchange_rate} ({converted}/{base})\r\n"
                        f"Acquisition Date and Time: {fetched_datetime}\r\n\n\n"
                        "This email is sent using Amazon SES."
                    )

                # Send email to the users
                client.send_email(
                    Source="no-reply@exchange-rate-reminder.com",
                    Destination={
                        "ToAddresses": [
                            user["email"],
                        ]
                    },
                    Message={
                        "Subject": {"Data": subject_text, "Charset": "UTF-8"},
                        "Body": {
                            "Html": {"Data": body_html, "Charset": "UTF-8"},
                            "Text": {"Data": body_text, "Charset": "UTF-8"},
                        },
                    },
                )
    except Exception:
        # Log that an error happened in send_email.py
        print("An error happened in send_email.py!\n")
        raise
