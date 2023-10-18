import requests
from html.parser import HTMLParser

class ConferenceParser(HTMLParser):
  def __init__(self):
    # super() # ? returns an object that represents the parent class
    self.tagList = []
    self.dataResulted = []


  def handle_starttag(self, tag, attrs):
    self.tagList.append(tag)
  def handle_data(self, data):
    if confName in data:
      pass
      # TODO handle
  def handle_endtag(self, tag: str):
    if True: # TODO remove tag if confName not in data

confName = 'recomb'
url = 'https://recomb.org/recomb2024/'
response = requests.get(url)
print(response.content.decode('utf-8'))
# html = 

# ? store every startag until you find data with the name of the conference
# ? when you find, think about how to get the data per se
# ! if it checks out, trigger a conditional and start to capture data
# ! then, figure it out


# TODO catch statuses

# TODO catch answers that dont have a usable body