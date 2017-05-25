from lxml import html
import requests
import csv
import json

print "----------------------------------------"

# Creating data structures ----------
veggieDict={}

class veggie:
	count = 0
	def __init__(self, name, months):
		self.name = name
		self.months = months
		veggie.count += 1

# Import veggies we want -----------
veggieDreamsCsv = "Artichokes,Arugula,Asparagus,Beets,Bitter melon,Bok choy,Broccoli,Broccoli rabe,Brussels sprouts,Burdock,Cabbage,Cactus pads,Cardoons,Carrots,Cauliflower,Celeriac,Celery,Chard,Chicory,Collard greens,Corn,Cress,Cucumbers,Dandelion greens,Eggplant,Endive,Fava beans,Fava greens,Fennel,Fiddleheads,Garlic,Ginger root,Green beans,Green garlic,Herbs,Horseradish,Jicama,Kale,Kohlrabi,Lambsquarters,Leeks,Lemongrass,Lettuce,Mizuna,Mushrooms,Mustard greens,Nettles,Okra,Olives,Onions,Orach,Parsnips,Pea shoots,Peas,Peppers chile,Peppers sweet,Potatoes,Pumpkins,Purslane,Radishes,Rutabagas,Salsify,Scallions,Shallots,Shelling beans,Sorrel,Spinach,Sprouts,Squash summer,Squash winter,Sunchokes,Sweet potatoes,Taro root,Tatsoi,Tomatillos,Tomatoes,Turnips,Yacon,Zucchini"
veggieDreams = veggieDreamsCsv.split(",")

# check if ordered
print veggieDreams


for i, vegSpace in enumerate(veggieDreams):
	veggieDreams[i]=vegSpace.replace(" ","-")


# Scraping CUESA --------------------

for veg in veggieDreams:
	try:
		pageString = 'http://www.cuesa.org/food/'+veg
		print pageString

		page = requests.get(pageString)

		tree = html.fromstring(page.content)

		veggieName = tree.xpath("//div[@class='panel-display burr-flipped clearfix radix-burr-flipped']")
		veggieDescription = tree.xpath("//div[@class='views-field views-field-description']")
		freshMonths =tree.xpath("//div[@class='panel-pane pane-entity-field pane-taxonomy-term-field-food-months']")

		tempName = veggieName[0][0][0][0][0][0][0][0].text
		tempMonths = freshMonths[0][1].text

		monthsList = tempMonths.split(",")
		for index, item in enumerate(monthsList):
			monthsList[index]=item.strip()


		# Create veggie instance -------------
		veggieDict[tempName] = veggie(tempName,monthsList)
		print veggieDict[tempName].name
		print veggieDict[tempName].months
	
	except:
		print "error, going to next."
		continue

print veggieDict
# Make dictionary of objects json serializable
# Replace %20, with -
serialVegDict ={}

for veg in sorted(veggieDict):
	serialVegDict[veg] =veggieDict[veg].__dict__

print serialVegDict

# Spit out Data here!
with open('vegData.json', 'w') as fp:
    json.dump(serialVegDict, fp)


