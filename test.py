from datetime import datetime
from zoneinfo import ZoneInfo

test_date = datetime.now(ZoneInfo("Asia/Tokyo")).strftime("%Y-%m-%d %H:%M:%S")
print(test_date)
