// Data =======================================
var veggieDict = data
var monthsConvert ={"January":0, "February":1, "March":2, "April":3, "May":4, "June":5, "July":6, "August":7, "September":8, "October":9, "November":10, "December":11}
var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var seasonStart ={"Spring":"2015-03-21","Summer":"2015-06-21","Fall":"2015-09-21","Winter":"2015-12-21"}
var CurrentMonth = new Date().getMonth()
var CurrentDate = new Date().getDate()
var CurrentYear = new Date(). getFullYear()
// In number format
var selectedMonths=[]
selectedMonths.push(CurrentMonth)



// Components =================================
// Display months
class MonthCheckList extends React.Component{
  constructor(props) {
    super(props);
    this.state ={clicked:false};
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      display: !prevState.clicked
    }));
    // console.log(this.state)
  }
  render(){
    const styles ={
      normal:{
        color:"red"
      },
      selected:{
        color:"blue"
      }
    };

    const months = this.props.months;
    const checkItems = months.map((month) =>
        <li key={month.toString()}>
          <label style={styles.normal}for={month} onClick={() => {logMonthSelection(month,selectedMonths)}}> {month}</label>
          <input type="checkbox" name="month" id={month} value={month}/>
        </li>
    );
    return (
      <ul>{checkItems}</ul>
    );
  }
}

// Picture of veg
class VegImage extends React.Component {
  render() {
    // const fallbackImg = "http://placehold.it/346x400"  
    const fallbackImg = "img/Beets.png"  
    return <img src={"img/"+this.props.name+".png"} onError={(e)=>{e.target.src=fallbackImg}}/>;
  }
}

// Conditional veggie component
class VegItem extends React.Component {
  render() {
    // console.log("=========================================")
    // console.log("Trying the following veg: "+this.props.name)
    const vegMonths = this.props.months;
    const lastMonth = vegMonths.length-1;
    const userSelectedMonths = this.props.selectedMonth;
    const convertDict = this.props.convertDict;
    // use .map arrowfunction to rejig this alpha vegMonths into numbs
    const vegMonthsInNumber = alphaToNumber(vegMonths,convertDict);
    if(arrayIntersect(vegMonthsInNumber,userSelectedMonths)){
      // if  omni-seasonal
      if (vegMonths[0]=="January" && vegMonths[lastMonth]=="December"){
        return (
          <div className="vegItem four columns">
            <VegImage name={this.props.name}/>

              <div className="vegInfo">
                <h4>{this.props.name}</h4>
                <h5>Available all year</h5>
              </div>

          </div>
        );
      }
      else{
        return (
          <div className="vegItem four columns">
            <VegImage name={this.props.name}/>

              <div className="vegInfo">
                <h4>{this.props.name}</h4>
                <h5>{vegMonths[0]}–{vegMonths[lastMonth]}</h5>
              </div>

          </div>
        );
      }
    }
    return null;
  }
}


//Veg List
class VeggiesList extends React.Component {
  render() {
    var vegStyle = {
    }
    const veggies = this.props.veggies;
    const vegItems = veggies.map((veggie) =>
      <VegItem name={veggieDict[veggie].name} months={veggieDict[veggie].months} selectedMonth={selectedMonths} key={veggieDict[veggie].name} convertDict={monthsConvert}/>
    );
    return (
      <div>{vegItems}</div>
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
  // TO DO: Display veggie count
  return(
    <header>  
      <h1>What's Fresh?</h1>
      <h2>in {months[CurrentMonth]} in Northern California</h2>
      <MonthCheckList months={months}/>
    </header>
  )
}

function Body(){
  return(
    <main>
      <VeggiesList veggies={Object.keys(veggieDict)}/>
    </main>
  );
  // console.log("SAY WHAT?");
}

function Footer(){
  return(
    <footer className="twelve columns">
      <p>Made by <a href="http://omstudio.co/">O/M Studio</a></p>
      <p>Data from <a href="http://www.cuesa.org/">CUESA</a></p>
    </footer>
  )
}

function App(){
  // console.log("=========================================")
  // console.log("================REFRESH!!================")
  return(
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

ReactDOM.render( <App/> , document.getElementById('root'));

// ============================================
// Utility functions ==========================
function arrayIntersect(veg, all){
  // console.log("----")
  // console.log("veg months are "+veg)
  // console.log("selected months are "+all)
  // console.log("----")
  var test = all.filter(function(n) {return veg.indexOf(n) !== -1})
  if (test.length == 0) {
    // console.log("There's no intersect. Don't display. "+test)
    return false
  }
  // console.log("Intersect of veg and selected months are: "+test)
  return true
   
}

function numberToAlpha(number,months){
  return months[number]
}

function alphaToNumber(alphaList,monthsConvert){
  var numberList =[]
  for (var i = 0; i < alphaList.length; i++) {
    numberList.push(monthsConvert[alphaList[i]])
  }
  return numberList
  // console.log("convert output is: "+numberList)
  // console.log("convert output type is: "+ typeof(numberList))
}

// Event Handlers =============================
function logMonthSelection(month,monthArray){
  // console.log("The month is"+month)
  if (monthArray.includes(monthsConvert[month])) {
    var index = monthArray.indexOf(monthsConvert[month])
    
    if (index > -1) {
        monthArray.splice(index, 1);
    }
  }
  else{
     monthArray.push(monthsConvert[month])
   }
   
  // console.log("I have selected these months:"+monthArray)
  ReactDOM.render( <App/> , document.getElementById('root'));
}







