#!/bin/bash
#

read -p "Name: " username
read -p "Repeat: " repeat_num

function show_name {
    echo "My name is $username"
}

for((num=1; num <=$repeat_num; num++))
do
	show_name
done
