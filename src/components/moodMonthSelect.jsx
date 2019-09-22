
import React from "react";

export default class SelectMoodMonth extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="row">
        <div className="col-md-6 col-12">
          <h2 className="heading-text py-2">Mood Board</h2>
        </div>
        <div className="col-md-6 col-12 text-md-right d-none">
          <select value={this.props.value} selected={this.props.selected} id="mood-month" onChange={this.props.onChangeHandler}>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
          </select>
        </div>
      </div>
    )
  }
}
