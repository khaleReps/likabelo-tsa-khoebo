import json
from profiles.models import Profile
import sys
# sys.path.append('C:\Users\KhotsoTsoaela\Documents\(3)EMPLOYMENT-PROJECTS\KARTOZA-(django-map)\PROGEO\profiles')
sys.path.append('C:/Users/KhotsoTsoaela/Documents/(3)EMPLOYMENT-PROJECTS/KARTOZA-(django-map)/PROGEO/profiles')

with open('users.json') as f:
    data = json.load(f)

for user_data in data:
    user = Profile(
        user=user_data['user'],
        profile_picture=user_data['profile_picture'],
        date_of_birth=user_data['date_of_birth'],
        phone_number=user_data['phone_number'],
        home_address=user_data['home_address'],
        location=user_data['location'],
    )
    user.save()
