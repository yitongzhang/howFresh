// Data =======================================
var veggieDict = data
var months =["January", "February", "March", "April", "Friday", "June", "July", "August", "September", "October", "November", "December"]
var seasonStart ={"Spring":"2015-03-21","Summer":"2015-06-21","Fall":"2015-09-21","Winter":"2015-12-21"}
var CurrentMonth = new Date().getMonth()
var CurrentDate = new Date().getDate()
var CurrentYear = new Date().getFullYear()

console.log(CurrentMonth)
console.log(CurrentDate)

// Utility functions ==========================
function availableThisMonth(selectedMonth,availableMonths){
  if ( availableMonths.includes(selectedMonth)) {
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
    const fallbackImg = "https://placeimg.com/300/300/animals"
    return <img src={"img/"+this.props.name+".png"} onError={(e)=>{e.target.src=fallbackImg}}/>;
  }
}

//TO DO: build condtional Veg component
class VegItem extends React.Component {
  render() {
      let months = this.props.months;
      let name = this.props.name;
      let selectedMonth = this.props.selectedMonth

      let vegStyle = {
        Width: "30vw",
        display:"inline-block",
      }

      if (veggieDict[name].months.includes(selectedMonth)) {
        <div className ="VegItem" style={vegStyle} key={name.toString()}>
          <VegImage name={name}/>
          <div>Hello, I'm {name}</div>
          <div>{months}</div>
        </div>
      }

  }
}

// Veg List
class VeggiesList extends React.Component {
  render() {
    var vegStyle = {
      Width: "30vw",
      display:"inline-block",
    }

    const veggies = this.props.veggies;
    const vegItems = veggies.map((veggie) =>
      // TO DO: Make this read from vegitem
      // <vegItem name={veggieDict[veggie].name} months={veggieDict[veggie].months} selectedMonth={"March"} />
      <div className ="VegItem" style={vegStyle} key={veggie.toString()}>
        <VegImage name={veggie}/>
        <div>Hello, I'm {veggieDict[veggie].name}</div>
        <div>{veggieDict[veggie].months}</div>
      </div>
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
      <h2>in Northern California</h2>
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








