import React from "react";
import SelectMoodMonth from "./moodMonthSelect";

export default class RightColumnComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDate: new Date().getMonth().toString(),
      data:[

      ]
    }
    this.selectMoodMonth = this.selectMoodMonth.bind(this);
  }

  selectMoodMonth(event){
    var month = parseInt(event.target.value);

    this.setState({
      selectedDate: month,
      data: [
        {
          month:"8",
          data:[
            {
              date: 1569063923022,
              mood: "happy",
              comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
              date: 1568827374,
              mood: "sad",
              comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
              date: 1568481774,
              mood: "angry",
              comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
              date: 1568308974,
              mood: "booyah",
              comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
              date: 1568560974,
              mood: "meh",
              comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
          ]
        }
      ]
    });

    console.log(this.state);
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
          <SelectMoodMonth selected={this.state.selectedDate} value={this.state.selectedDate} onChangeHandler={this.selectMoodMonth} />
        </div>

        {content}
      </div>
    )
  }
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
            <h3 className="heading-text">Your secret is safe with me.</h3>
            <p className="paragraph-text">You haven't logged anything yet for this month. Tell me how you feel.. Don't worry I won't tell.</p>
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
        <div className="row mood-log" key={index}>
          <div className="col-12 mood-log-wrap">
            <div className="row">
              <div className="col-12 logs">
                {item.data.map((log, pos) =>
                    <div className="row log tile-shadow" key={pos}>
                      <div className="col-md-2 col-12 logged-date">
                        <h3>{ new Date(log.date).getDate() }</h3>
                        <p>{getReadableTime(log.date) }</p>
                      </div>
                      <div className="col-md-10 col-12">
                        <div className="mood-log-desc-wrap">
                          <div className="mood-log-icon" data-mood={log.mood}>
                            <i className={log.mood}></i>
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
