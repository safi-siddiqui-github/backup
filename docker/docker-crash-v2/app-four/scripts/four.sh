#!/bin/bash
#
current=$(date '+%Y-%m-%d-%M')
echo "Running Cron Job: $current" > /home/safi/app-four/cron-scripts/File-$current.txt
