// Data =======================================
var veggieDict = data;
var monthsConvert ={"January":0, "February":1, "March":2, "April":3, "May":4, "June":5, "July":6, "August":7, "September":8, "October":9, "November":10, "December":11}
var reMonthsConvert ={0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June", 6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"}
var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var seasons ={
  "Spring":[2,3,4],
  "Summer":[5,6,7],
  "Fall":[8,9,10],
  "Winter":[11,0,1]
}
var seasonColors={
  "Spring":['#027003','#EEFEEF','#F8FFF6'],
  "Summer":['#F1B005','#FEFDDE','#FFFCF0'],
  "Fall":['#C84F30','#FDEBDD','#FFF8F2'],
  "Winter":['#2269A1','#F1F9FF','#FAFDFF']
}
var CurrentMonth = new Date().getMonth()
var CurrentDate = new Date().getDate()
var CurrentYear = new Date(). getFullYear()
var selectedMonths=[]
selectedMonths.push(CurrentMonth)
var CurrentSeason;

// Components =================================

// Display months -------------
// Used by: Header
// Using: *
class MonthCheckList extends React.Component{
  constructor(props) {
    super(props);
    var CurrentMonth = props.CurrentMonth;
    this.state = {
      isToggleOn: props.months.map(
        function(currentValue, index){
          if (index==CurrentMonth) {
            return true;
          }
          return false;
        }),
      test:"string"
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(num) {
    this["num"]=num;
    var selected = this.num;
    selectedMonths=[];
    selectedMonths.push(selected);
    for (var key in seasons) {
      if (seasons[key].includes(selectedMonths[0])) {
        CurrentSeason = key;
      }
    }
    console.log("====selected month is "+selectedMonths)
    console.log("====selected season is "+CurrentSeason)
   
    this.setState(function(prevState, props) {
      return {
        isToggleOn: prevState.isToggleOn.map(
          function(currentValue, index, arr){
            if (selected==index) {
              return true;
            }
            return false;
          }
        )
      };
    });
    ReactDOM.render( <App/> , document.getElementById('root'));
    setTimeout(function(){setSeasonColor(CurrentSeason,seasonColors); }, 300);
  }


  render(){
    
    const months = this.props.months;
    const checkItems = months.map((month, i) =>
        <li key={month.toString()}>
          <button className={this.state.isToggleOn[i]} onClick={() => this.handleClick(i)}> {month}</button>
        </li>
    );
    const checkItemsSmall = months.map((month, i) =>
        <li key={month.toString()}>
          <button className={this.state.isToggleOn[i]} onClick={() => this.handleClick(i)}> {month.substring(0,3)}</button>
        </li>
    );
    const winWidth = window.innerWidth;
    const settings = {
      infinite: true,
      speed: 500,
      centerMode:true,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: CurrentMonth,
      arrows:false,
      afterChange: function(currentIndex) {
        console.log('currentIndex', currentIndex);
        console.log('nextIndex', (currentIndex+1)%12);
        console.log('prevIndex', (currentIndex+11)%12);
      }
    };
    if (winWidth>1200) {
      return (
        <ul>{checkItems}</ul>
      );
    }
    else if (winWidth>650) {
      return (
        <ul>{checkItemsSmall}</ul>
      );
    }
    else {
      return(
        <div className="container">
          <div className="monthMask leftBox"></div>
          <Slider {...settings}>
            {checkItemsSmall}
          </Slider>
          <div className="monthMask rightBox"></div>
        </div>
      );
    }
  }
}

// Picture of veg -------------
// Used by VegItem
// Using: *
class VegImage extends React.Component {
  render() {
    const fallbackImg = "img/Dirt.png"  
    return (
      <div className="imgContainer">
        <img src={"img/"+this.props.name+".png"} onError={(e)=>{e.target.src=fallbackImg}}/>
      </div>
    );
  }
}

// Conditional veggie component ------------
// Used by: VeggiesList
// Using: VegImage
class VegItem extends React.Component {
  render() {
    const vegMonths = this.props.months;
    const lastMonth = vegMonths.length-1;
    const userSelectedMonths = this.props.selectedMonth;
    const convertDict = this.props.convertDict;
    const vegMonthsInNumber = alphaToNumber(vegMonths,convertDict);
    if(arrayIntersect(vegMonthsInNumber,userSelectedMonths)){

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


// Makes a list of VegItems
// Used by: Body
// Using: VegItem
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

// Final assembly ============================
function Header(){
  const winWidth = window.innerWidth;
  if (winWidth>650) { return(
      <header id="header">  
        <div className="titleArea">
          <h1>How Fresh</h1>
          <div className="smallTitle"><div className="line left"></div><h5>Are Vegetables In</h5><div className="line right"></div></div>
          <h2>Northern California</h2>
        </div>
        <nav id="desktopMonthFilter">
          <MonthCheckList months={months} CurrentMonth={CurrentMonth}/>
        </nav>
      </header>
  )}
  else{ return(
      <header>  
        <div className="titleArea">
          <h1>How Fresh</h1>
          <div className="smallTitle"><div className="line left"></div><h5>Are Vegetables In</h5><div className="line right"></div></div>
          <h2>Northern Cali</h2>
          <div className="smallTitle"><div className="line left"></div><h5>In the Month of</h5><div className="line right"></div></div>
        </div>
        <nav id="mobileMonthFilter">
          <MonthCheckList months={months} CurrentMonth={CurrentMonth}/>
        </nav>
      </header>
  )}
}

function Body(){
  return(
    <main id='main'>
      <VeggiesList veggies={Object.keys(veggieDict)}/>
    </main>
  );
}

function Footer(){
  return(
    <footer className="twelve columns">

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


// Utility functions ==========================

function arrayIntersect(veg, all){
  var test = all.filter(function(n) {return veg.indexOf(n) !== -1})
  if (test.length == 0) {
    return false
  }
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
}

function stickMobileNav (){
  var mobileSticky = document.getElementById('mobileMonthFilter');
  var stickyMain = document.getElementById('main');
  if( document.body.scrollTop+document.documentElement.scrollTop > 184){
    mobileSticky.className = "stuck";
    stickyMain.className = "stuckMainMobile";
  }
  else{
    mobileSticky.className = "";
    stickyMain.className = "";
  } 
}

function stickDesktopNav (){
  var desktopSticky = document.getElementById('desktopMonthFilter');
  var stickyMain = document.getElementById('main');
  if( document.body.scrollTop+document.documentElement.scrollTop > 215){
    desktopSticky.className = "stuck";
    stickyMain.className = "stuckMainDesktop";
  }
  else {
    desktopSticky.className = "";
    stickyMain.className = "";
  }
}

function setSeasonColor(CurrentSeason,seasonColors){
  var monthButton = document.getElementsByTagName("button");
  var vegItem = document.getElementsByClassName("vegItem");
  var html = document.getElementsByTagName("html")[0];
  var line = document.getElementsByClassName("line");

  var textColor = seasonColors[CurrentSeason][0];
  var itemColor = seasonColors[CurrentSeason][1];
  var bgColor = seasonColors[CurrentSeason][2];

  console.log(textColor);
  console.log(itemColor);
  console.log(bgColor);

  html.style["background-color"]=bgColor;
  html.style["color"]=textColor;

  for (let button of monthButton) {
    button.style["color"]=textColor;
    button.style["background-color"]=bgColor;
  }
  for (let veg of vegItem) {
    veg.style["background-color"]=itemColor;
  }
  for (let item of line) {
    item.style["background-color"]=textColor;
  }

}

// Main ==========================
ReactDOM.render( <App/> , document.getElementById('root'));
window.onresize = function(event) {
  setTimeout(function(){ ReactDOM.render( <App/> , document.getElementById('root')); }, 300);
};

// Fixed navbar ==========================
window.onscroll = function() {
  if (window.innerWidth < 720) {
    stickMobileNav();
  }
  else {
    stickDesktopNav();
  }
};