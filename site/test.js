var all =["January", "February", "March", "April", "Friday", "June", "July", "August", "September", "October", "November", "December"]

var veg = ["January", "February"]

var monthsConvert ={"January":0, "February":1, "March":2, "April":3, "Friday":4, "June":5, "July":6, "August":7, "September":8, "October":9, "November":10, "December":11}


console.log(arrayIntersect(veg,all))
function arrayIntersect(vege, alle){
	var test = alle.filter(function(n) {return vege.indexOf(n) !== -1})
	if (test.length == 0) {
		console.log("no intersect "+test)
		return false
	}
	console.log(test)
	return true
	 
}
function numberToAlpha(number,months){
  return months[number]
}

function alphaToNumber(alpha,monthsConvert){
  return monthsConvert[alpha]
}

function alphaToNumber(alphaList,monthsConvert){
  var numberList =[]
  for (var i = 0; i < alphaList.length; i++) {
    numberList.push(monthsConvert[alphaList[i]])
  }
  console.log(numberList)
}

alphaToNumber(all,monthsConvert)