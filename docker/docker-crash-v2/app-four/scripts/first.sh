#!/bin/bash

title="first Shell Script"
msg1="folder created"

echo $title
mkdir -p demo
echo "Msg: $msg1"
touch demoF.txt
echo "file created"

read -p "Modify your file:" file_text
echo $file_text > demoF.txt
echo "file modified"

#mv demoF.txt ./demo/demoF.txt
#echo "file moved"

#echo "ENV"
#echo "Current user $USER"

#arguments
echo "File Name: $0"
