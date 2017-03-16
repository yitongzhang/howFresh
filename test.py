from lxml import html
import requests
import csv
import json

print "----------------------------------------"

class veggie:
	count = 0
	def __init__(self, name, months):
		self.name = name
		self.months = months
		veggie.count += 1

vegDict ={}

vegDict["t"]= veggie("tomatoes",["jan","feb","mar","april","may"])
vegDict["c"]= veggie("cucumber",["feb","mar"])
vegDict["g"]= veggie("garlic",["may","june","july"])

## Print the damn dict
# for veg in vegDict:
# 	print veg + ": " + vegDict[veg].name + "at "
# 	for i, month in enumerate(vegDict[veg].months):
# 		print vegDict[veg].months[i]


serialVegDict ={}

for veg in vegDict:
	serialVegDict[veg] =vegDict[veg].__dict__

print json.dumps(serialVegDict)


# with open('result.json', 'w') as fp:
#     json.dump(vegDict, fp)