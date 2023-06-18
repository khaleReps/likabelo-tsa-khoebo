import random
from datetime import date, timedelta

USER = [
    "George Washington", "Abraham Lincoln", "Thomas Jefferson", "Theodore Roosevelt",
    "Franklin D. Roosevelt", "Harry S. Truman", "Dwight D. Eisenhower", "John F. Kennedy",
    "Lyndon B. Johnson", "Richard Nixon", "Gerald Ford", "Jimmy Carter", "Ronald Reagan",
    "George H. W. Bush", "Bill Clinton", "George W. Bush", "Barack Obama", "Donald Trump",
    "Joe Biden"
]

# Start and end date for generating random birthdays
start_date = date(1920, 1, 1)
end_date = date(2010, 12, 31)

users = {}
for name in USER:
    # Generate a random date between start_date and end_date
    delta_days = (end_date - start_date).days
    random_days = random.randint(0, delta_days)
    birthday = start_date + timedelta(days=random_days)
    # Format the birthday as YYYY-MM-DD
    birthday_str = birthday.strftime("%Y-%m-%d")
    users[name] = birthday_str

print(users)
