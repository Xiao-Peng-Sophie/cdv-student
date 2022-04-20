import requests
from bs4 import BeautifulSoup
from pprint import pprint
import json

print("wow")

url="https://wheresthejump.com/full-movie-list/"
result = requests.get(url)
print(result)
plain_result = result.text
#print(plain_result)


soup = BeautifulSoup(result.text,"html.parser")
#print(soup)

table_of_interest = soup.select_one(".table-movie")
#print(table_of_interest)
rows = table_of_interest.select("tr")
#print(rows[0])
data = []
for row in rows[:20]:
    #print(row)
    cells = row.select("td")
    #print(cells)
    title = cells[0].text
    director = cells[1].text
    data.append({
        "title": cells[0].text,
        "director" : cells[1].text

    })
    #print("-"*20)

pprint(data)

with open("data.json","w") as outfile:
    json.dump(data, outfile, indent=4 )
