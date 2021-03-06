import React from "react";
import SelectMoodMonth from "./moodMonthSelect";
import axios from 'axios';

export const RightColumnComponent = () => class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDate: new Date().getMonth().toString(),
      data:[]
    }
  }
  componentDidMount(){
    axios.get("https://spreadsheets.google.com/feeds/cells/1wAmVqPzOuypUmg9o5lIQ1n62UP9N8_mEStY42bsBBTw/1/public/full?alt=json").then(res => {
      // NOT SECURE AND REAAAAALLY MESSY BUT WILL GO FOR OAUTH IN THE FUTURE, FOR NOW FOR THIS DEMO ITS JUST THIS
      var entries = res.data.feed.entry;
      var dataEntries = [];

      entries.map(function(item ,index){
        var entry = item.gs$cell;
        var pos = index;
        if(entry.row != "1" && entry.col != "1"){
          var obj = {
            data: []
          };
          obj.data.push( JSON.parse(entry.$t) );
          dataEntries.push(obj);
        }
      });
      this.setState({
        data : dataEntries.reverse()
      })
      console.log(this.state)
    });
  }

  shouldComponentUpdate(prevState,newState){
    console.log(prevState);
    console.log(newState);

    return true;
  }

  componentDidUpdate(){
    document.querySelectorAll('.log').forEach(function(item, index) {
        setTimeout(function(){
      		item.className += " render";
      	}, 100 * index)
    });
  }

  render() {
    console.log('Component Rendered');

    let content;

    if (this.state.data.length){
      content = <MoodLogs data={this.state} />;
    } else {
      content = <NoMoodLogs />;
    }

    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-8" id="mood-logs">
        <div className="mood-log-head col-12">
          <SelectMoodMonth/>
        </div>

        {content}
      </div>
    )
  }
}

const getReadableMonth = (value) => {
  var months = ["January", "February", "March" , "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  var date = new Date(value).getMonth();
  return months[date];
}
const getReadableTime = (value) => {
  var date =  new Date(value);
  var hourPrefix = date.getHours() < 10 ? "0" : "";
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var minutesPrefix = date.getMinutes()< 10 ? "0":"";
  var minutes = date.getMinutes();
  var ampm = date.getHours() >= 12 ? "pm":"am";

  return hourPrefix + hours + ":" + minutesPrefix + minutes + ampm;
}

const NoMoodLogs = () => {
    return(
      <div className="no-logs col-12">
        <div className="row tile-shadow">
          <div className="col-12 col-md-3 col-lg-3 text-center py-2">
            <i className="far fa-laugh-wink"></i>
          </div>
          <div className="col-12 col-md-9 col-lg-9 text-lg-left text-md-left text-sm-center text-center py-2">
            <h3 className="heading-text">Your secret is safe with us.</h3>
            <p className="paragraph-text">There are no logs yet, so tell us how you feel.. Don't worry we won't tell.</p>
          </div>
        </div>
      </div>
    )
}


const MoodLogs = (props) => {
  console.log(props);

  return(
    <div>
      {props.data.data.map( (item, index) =>
        <div className="row mood-log" key={index} data-pos={index}>
          <div className="col-12 mood-log-wrap">
            <div className="row">
              <div className="col-12 logs">
                { item.data.map( (log, pos) =>
                    <div className="row log tile-shadow" key={pos} data-date={log.date}>
                      <div className="col-md-2 col-12 logged-date">
                        <h3>{ new Date(log.date).getDate() }</h3>
                        <p>{ getReadableMonth(log.date) }</p>
                        <p>{ new Date(log.date).getFullYear() }</p>
                      </div>
                      <div className="col-md-10 col-12">
                        <div className="mood-log-desc-wrap">
                          <div className="mood-log-icon" data-mood={log.mood}>
                            <i className={log.mood}></i>
                            <span className="log-name">{log.name} is feeling </span>
                            <span>{log.mood}</span>
                          </div>
                            <p className="log-desc paragraph-text">{log.comment}</p>
                        </div>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
