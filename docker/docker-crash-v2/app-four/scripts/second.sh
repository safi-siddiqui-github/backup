#!/bin/bash

echo "Create User"
read -p "Username: " username
read -p "Password: " password

sudo useradd $username
echo -e "$password\n$password" |  sudo passwd $username

echo "Delete User"
sudo userdel $username

count=$(cat /etc/passwd | grep $username | wc | awk '{print $1}')
if [ $count == 0 ];
then 
	echo "$count represents no user"
else
	echo "User Exist"
fi
