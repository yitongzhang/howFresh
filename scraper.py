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
veggieDreamsCsv = "Artichokes,Asparagus,Bitter melon,Broccoli rabe,Brussels sprouts,Burdock,Cactus pads,Cardoons,Celeriac,Celery,Corn,Cucumbers,Dandelion greens,Eggplant,Fava beans,Fava greens,Fiddleheads,Ginger root,Green beans,Green garlic,Horseradish,Jicama,Nettles,Okra,Parsnips,Pea shoots,Peas,Peppers chile,Peppers sweet,Potatoes,Pumpkins,Purslane,Rutabagas,Salsify,Shallots,Shelling beans,Squash summer,Squash winter,Sunchokes,Sweet potatoes,Taro root,Tatsoi,Tomatillos,Tomatoes,Yacon,Zucchini,olives,Arugula,Beets,Bok choy,Broccoli,Cabbage,Carrots,Cauliflower,Chard,Chicory,Collard greens,Cress,Endive,Fennel,Garlic,Herbs,Kale,Kohlrabi,Lambsquarters,Leeks,Lettuce,Mizuna,Mushrooms,Mustard greens,Onions,Orach,Radishes,Scallions,Sorrel,Spinach,Sprouts,Turnips,lemongrass"
veggieDreams = veggieDreamsCsv.split(",")

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

# Spit out Data here!

