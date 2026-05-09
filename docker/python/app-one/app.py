
# Single Line Comment
""""
Multi Line Comment
"""
# Variable
lang = 'python'
isWorking = True
whatType = type(lang) # get type
changeType = str(isWorking) # type casting

# city = input('Enter city: ')
city = 'city'
formatCity = f"My city is {city}"
getInfo = dir(city)

if 5 > 10:
    isGreater = True
elif 5 == 5:
    isGreater = 'Equals'
else:
    isGreater = False

def addSome():
    return 5+5
retData = addSome()

nta = 1
for i in range(0,5):
    nta += 1

import os
uname = os.uname()

# List - collection of variable data types, can be duplicate []
listPL = ['py', 'js']
lenPL = len(listPL)

# Set - collection of same data types, cannot be duplicate {}
marks = {72, 88, 96, 88, 45, 72, 96, 45}

# Dict - collection of key value pair {}
house = {
    'name': 'Huge',
    'rooms': 5
}
hName = house.get('name')
house.update({'rooms': nta})

# Tuple - collection of data, cannot be changed, immutable, unchangeable ()
gender = ('male', 'female')

# Array - collection of similar data type []
import array as ar

# API
import requests

urlT = 'https://jsonplaceholder.typicode.com/todos/1'
res = requests.get(url=urlT)
resJson = res.json()

# Class
class Utils:

    def show_disk_space(self):
        print(os.system("df -h"))
        pass

    def show_ram(self):
        print(os.system("free -h"))
        pass

    def show_system_details(self):
        print(os.uname().sysname)
        pass

machA = Utils()
# machA.show_system_details()

# Subprocess
import subprocess

def exec(cmd):
    proc = subprocess.run(cmd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return proc.stdout.decode()

# Backup
import shutil
import datetime

today = datetime.date.today()

def create_backup(name, src, dest):
    bn = os.path.join(dest, name)

    try:
        shutil.make_archive(bn,'gztar', src)
    except Exception as e:
        print(e)

src = '/home/safi/python/app-one'
dest = '/home/safi/python/backups'
name = f"{today}-backup"
# create_backup(name, src, dest)

def unzip_backup(name, ext, src, dest):
    unSrc = os.path.join(src, f"{name}{ext}")
    unDest = os.path.join(dest, name)

    if os.path.exists(unDest):
        pass
    else:
        os.mkdir(unDest)

    try:
        shutil.unpack_archive(unSrc, unDest, 'gztar')
    except Exception as e:
        print(e)

dest = "/home/safi/python/unzips"
src = '/home/safi/python/backups'
name = f"{today}-backup"
ext = '.tar.gz'
# unzip_backup(name, ext, src, dest)

# AWS
# python -m venv .venv
# source .venv/bin/activate
import boto3

s3 = boto3.resource('s3')

for bucket in s3.buckets.all():
    print(bucket.name)