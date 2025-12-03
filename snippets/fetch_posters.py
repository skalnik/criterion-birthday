#!/usr/bin/env python

import csv
import urllib.request

with open('snippets/data.csv', newline='') as file:
    csvreader = csv.reader(file, delimiter=';')
    next(csvreader, None)
    for row in csvreader:
        spine = row[0]
        poster_url = row[2]
        if poster_url:
            print(f"Downloading poster for {spine}...")
            urllib.request.urlretrieve(poster_url, f"posters/{spine}.jpg")
