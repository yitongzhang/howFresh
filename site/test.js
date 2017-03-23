var all =["January", "February", "March", "April", "Friday", "June", "July", "August", "September", "October", "November", "December"]

var veg = ["January", "February"]



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