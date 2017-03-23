// Data =======================================
var veggieDict = data
var monthsConvert ={"January":0, "February":1, "March":2, "April":3, "Friday":4, "June":5, "July":6, "August":7, "September":8, "October":9, "November":10, "December":11}
var months =["January", "February", "March", "April", "Friday", "June", "July", "August", "September", "October", "November", "December"]
var seasonStart ={"Spring":"2015-03-21","Summer":"2015-06-21","Fall":"2015-09-21","Winter":"2015-12-21"}
var CurrentMonth = new Date().getMonth()
var CurrentDate = new Date().getDate()
var CurrentYear = new Date().getFullYear()
var selectedMonths=[]
selectedMonths.push(CurrentMonth)
console.log(selectedMonths)

// User input =================================





// Utility functions ==========================
function arrayIntersect(vege, alle){
  var test = alle.filter(function(n) {return vege.indexOf(n) !== -1})
  if (test.length == 0) {
    console.log("no intersect "+test)
    return false
  }
  console.log("intersects are "+test)
  return true
   
}

function numberToAlpha(number,months){
  return months[number]
}

function alphaToNumber(alpha,monthsConvert){
  return monthsConvert[alpha]
}


// Event Handlers =============================
function logMonthSelection(month,monthArray){
  console.log("The month is"+month)
  if (monthArray.includes(monthsConvert[month])) {
    var index = monthArray.indexOf(monthsConvert[month])
    
    if (index > -1) {
        monthArray.splice(index, 1);
    }
  }
  else{
     monthArray.push(monthsConvert[month])
   }
   
  console.log("I have selected these months:"+monthArray)
  ReactDOM.render( <App/> , document.getElementById('root'));
}


// Components =================================

// Picture of veg
class VegImage extends React.Component {
  render() {
    const fallbackImg = "http://placehold.it/350x150"
    return <img src={"img/"+this.props.name+".png"} onError={(e)=>{e.target.src=fallbackImg}}/>;
  }
}

// Conditional veggie component
class VegItem extends React.Component {
  render() {
    // use .map arrowfunction to rejig this alpha array into numbs
    if(arrayIntersect(this.props.months,this.props.selectedMonth)){
      return (
        <div className="vegItem">
          <VegImage name={this.props.name}/>
          <h4>Hello, I'm {this.props.name}</h4>
          <p>{this.props.months}</p>
        </div>
      );
    }
    return null;
  }
}


// TO DO: Make this read one veg item, then a bunch
//Veg List
class VeggiesList extends React.Component {
  render() {
    var vegStyle = {
    }
    const veggies = this.props.veggies;
    const vegItems = veggies.map((veggie) =>
      <VegItem name={veggieDict[veggie].name} months={veggieDict[veggie].months} selectedMonth={selectedMonths} key={veggieDict[veggie].name}/>
    );
    return (
      <div>{vegItems}</div>
    );
  }
}

class MonthCheckList extends React.Component{
  render(){
    const months = this.props.months;
    const checkItems = months.map((month) =>
        <li key={month.toString()}>
          <label for={month} onClick={() => {logMonthSelection(month,selectedMonths)}} >{month}</label>
          <input type="checkbox" name="month" id={month} value={month}/>
        </li>
    );
    return (
      <ul>{checkItems}</ul>
    );
  }
}

class SeasonCheck extends React.Component{
  render(){
    // Insert season stuff later
  }
}


// Final assembly ============================
function Header(){
  return(
    <header>  
      <h1>What's Fresh?</h1>
      <h2>in {months[CurrentMonth]} in Northern California</h2>
      <MonthCheckList months={months}/>
      <hr/>
    </header>
  )
}

function Body(){
  return(
    <main>
      <VeggiesList veggies={Object.keys(veggieDict)}/>
      <hr/>
    </main>
  );
  console.log("SAY WHAT?");
}

function Footer(){
  return(
    <footer>
      <p>Made by <a href="http://omstudio.co/">O/M Studio</a></p>
      <p>Data from <a href="http://www.cuesa.org/">CUESA</a></p>
    </footer>
  )
}

function App(){
  return(
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

// onload set initial

ReactDOM.render( <App/> , document.getElementById('root'));


// onclick update

// Catch error using this method: http://stackoverflow.com/questions/9022427/see-if-src-of-img-exists








