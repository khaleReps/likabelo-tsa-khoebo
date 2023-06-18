import json

USER = [
    "George Washington", "Abraham Lincoln", "Thomas Jefferson", "Theodore Roosevelt",
    "Franklin D. Roosevelt", "Harry S. Truman", "Dwight D. Eisenhower", "John F. Kennedy",
    "Lyndon B. Johnson", "Richard Nixon", "Gerald Ford", "Jimmy Carter", "Ronald Reagan",
    "George H. W. Bush", "Bill Clinton", "George W. Bush", "Barack Obama", "Donald Trump",
    "Joe Biden"
]

HOME_ADDRESS = [
    "Mall of America", "West Edmonton Mall", "Dubai Mall", "Mall of the Emirates",
    "King of Prussia Mall", "Mall of Africa", "Istanbul Cevahir", "SM Megamall",
    "CentralWorld", "CentralPlaza WestGate", "Berjaya Times Square", "Mall Taman Anggrek",
    "The Avenues", "VivoCity", "Siam Paragon", "Eastgate Shopping Centre", "Queensbay Mall",
    "Siam Center", "The Grove", "V&A Waterfront"
]


LOCATION = [
    "44.8549, 93.2422", "53.5225, 113.6242", "25.1972, 55.2797","25.1181, 55.2006",
    "40.0885, 75.3904","26.0140, 28.1073","41.0631, 28.9925","14.5859, 121.0565",
    "13.7465, 100.5391","13.8771, 100.4113","3.1422, 101.7106","6.1782, 106.7919",
    "29.3031, 47.9370","1.2649, 103.8221","13.7462, 100.5347","26.1804, 28.1172", "5.3332, 100.3066"
    "13.7463, 100.5327","34.0719, 118.3575","33.9066, 18.4193",
]

PROFILE_PICTURE = [
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3176151&psig=AOvVaw3pmtdZMJedb9YT0I8vt7xp&ust=1683807069678000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCisajc6v4CFQAAAAAdAAAAABAa',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_a7hvkAi-RUVvg6j58cOBwyiL_52fF4Np3eJ90g1NbeYKHLpnGJxk7ngegcAnllATFyk&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHoidJQLVyoP-8-S47AwWMxU9p5y6CuVsZ1kTjyhLOQSmFj-fTpjx6nujQYyuRy4hnBh8&usqp=CAU',
    'https://cdn-icons-png.flaticon.com/512/3981/3981316.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8PS-Jb8bAhTkzz0lZ6lR_uULRe2zTQRElg9EZTFx81SDmrM_0TyULHiUUvxaoiXeK4Y&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9-se1D9SqhrfSVLQDBTyDCfc3UGttgUkj3l3rsw7Yunyxn8xVQb4cORc6TG3UCP9qxII&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctsb_AoB35dADTvZ0-znoRHHzI0OP_5kOmOsTrDfOPcUvS0CC9UaU988FKUGm-Slf4BY&usqp=CAU',
    'https://cdn-icons-png.flaticon.com/512/2922/2922529.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMPnY4TusCNAr-D3tz_LPmSOKyQ4Oai679JMfxKiuJPqZJm28eqi-5qu4nai2vi9nMz8&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFG1AcJy_c862d-a9NNXb4_COSoJVlX6QyS-H52enk48tS3PjvCD0tT-hTIwcFyruDvM&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunyjGiacjfWCF3Z4xqgRxk44ts3YpExypn4vzinpsszknF8xAz-eiJu90oJovoV8wphI&usqp=CAU',
    'https://cdn-icons-png.flaticon.com/512/4061/4061233.png',
    'https://cdn-icons-png.flaticon.com/512/1726/1726625.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7GzRc8vlC1lhRMz10K4GmBGXrwHTp8fMRxlfMzJmMrPEIV5hREKdz7IZFbbYcWO1tZ94&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnSmV2MJA6OkIniTccN1wYtggk_w7KJlMUxGBo-_MKjFff7tykVJUVCec6sTCe5sEIrdQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwI2ojaBtLE3CUfbxNUbHNTyF9NYUJ11UOu9D1dR7ZttCOlElNXyLvqTYxDuqHjmBj9LE&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_6M3vo3AAqu9f-0RSqxClV3oJm7sLbKBl2J2NciGwZxPDSLlkCIar1f7HrLE92URfOs&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5NtcA-G0Thf6l9yIcvn2eMXWFopZFAfxTIT_cBbKMSSCSybUSavMPI-vFUsR2-lHHPI&usqp=CAU',
    'https://cdn-icons-png.flaticon.com/512/2829/2829811.png',
    'https://cdn-icons-png.flaticon.com/512/1439/1439718.png',
    'https://cdn-icons-png.flaticon.com/512/1651/1651589.png',
    'https://cdn-icons-png.flaticon.com/512/3436/3436181.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_7TyT5GV8R_3y9V89r1cIlQghip9ziHZNgd5_Vi2FG8icOSvbpPga24dwXBD5aqV-v8U&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtu-fLn9SIZ90MxTTiWRAKFaS7JoyYu1fbXgL3B-TGPNb_-7IvExFuCS4xl_Ej_xVhbY&usqp=CAU',

]


DOB = [    
         
            "1732-02-22", "1809-02-12", "1743-04-13", "1858-10-27",    
            "1882-01-30", "1884-05-08", "1890-10-14", "1917-05-29",    
            "1908-08-27", "1913-01-09", "1913-07-14", "1924-10-01",    
            "1911-02-06", "1924-06-12", "1946-08-19", "1946-07-06",    
            "1961-08-04", "1946-06-14", "1942-11-20"
        ]


PHONE_NUMBERS= [    
                 
                 '1234567890',    '2345678901',    '3456789012',    '4567890123',    
                 '5678901234',    '6789012345',    '7890123456',    '8901234567',    
                 '9012345678',    '0123456789',    '1111111111',    '2222222222',    
                 '3333333333',    '4444444444',    '5555555555',    '6666666666',    
                 '7777777777',    '8888888888',    '9999999999'
    ]

users = []

for i in range(len(USER)):
    user = {}
    user["user"] = USER[i]
    user["profile_picture"] = PROFILE_PICTURE[i]
    user["date_of_birth"] = DOB[i]
    user["phone_number"] = PHONE_NUMBERS[i]
    user["home_address"] = HOME_ADDRESS[i]
    user["location"] = LOCATION[i]
    users.append(user)

json_string = json.dumps(users)

with open("users.json", "w") as f:
    f.write(json_string)
     
    