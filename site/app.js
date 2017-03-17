// Data =======================================
var veggieDict = data
var months =["January", "February", "March", "April", "Friday", "June", "July", "August", "September", "October", "November", "December"]
var seasonStart ={"Spring":"2015-03-21","Summer":"2015-06-21","Fall":"2015-09-21","Winter":"2015-12-21"}
var CurrentMonth = new Date().getMonth()
var CurrentDate = new Date().getDate()
var CurrentYear = new Date().getFullYear()

// User input =================================





// Utility functions ==========================
function monthsIntersect(selectedMonths,availableMonths){
  if ( availableMonths.includes(selectedMonths)) {
    return true
  }
  return false
}

// Event Handlers =============================
function logMonthSelection(month){
  console.log("The month is"+month)
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
    if(this.props.months.includes(this.props.selectedMonth)){
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
      <VegItem name={veggieDict[veggie].name} months={veggieDict[veggie].months} selectedMonth={months[CurrentMonth]} />
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
          <label for={month} onClick={() => {logMonthSelection(month)}} >{month}</label>
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








