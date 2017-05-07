class ReactSlickDemo extends React.Component {
  
  render(){
    return(
      <div className='container'>
        <Slider>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
        </Slider>
      </div>
    )
  }

}


ReactDOM.render(<ReactSlickDemo/>, document.getElementById('root'));