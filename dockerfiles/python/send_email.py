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
            subject_text = f"{converted}/{base}: {exchange_rate}"
            body_html = ""
            body_text = ""
            if user_pref["language"] == "ja":
                body_html = """
                <html>
                    <head></head>
                    <body>
                        <h1>Amazon SES テスト</h1>
                        <p>
                            このメールは
                            <a href='https://aws.amazon.com/ses/'>Amazon SES</a>
                            を使用して送信されています。
                        </p>
                    </body>
                    </html>
                """

                body_text = "Amazon SES テスト\r\nこのメールはAmazon SESを使用して送信されています。"
            else:
                body_html = """
                <html>
                    <head></head>
                    <body>
                        <h1>Amazon SES Test</h1>
                        <p>
                            This email was sent using
                            <a href='https://aws.amazon.com/ses/'>Amazon SES</a>
                        </p>
                    </body>
                    </html>
                """

                body_text = (
                    "Amazon SES Test (Python)\r\nThis email was sent using Amazon SES."
                )

            # Send email
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
