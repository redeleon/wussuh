import React from "react";

export default class LeftColumnComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mood:"",
      comment:"",
      date:""
    }
    this.selectMood = this.selectMood.bind(this);
    this.submit = this.submit.bind(this);
    this.typingComments = this.typingComments.bind(this);
  }

  selectMood(event){
    var mood = event.currentTarget.dataset.mood;
    this.setState({
      mood: mood
    })
  }

  submit(event){
    this.setState({
      date: new Date().getTime()
    })
    console.log(this.state);
  }

  typingComments(event){
    var value = event.target.value;
    this.setState({
      comment: value
    })
  }

  componentDidMount() {
    window.onscroll = function(){
      var yOffset = window.pageYOffset;
      var elem = document.getElementById('welcome');
      if (yOffset > 0){
        elem.style.marginTop = yOffset + "px";
      }
    }
  }

  render() {
    return (
      <div id="leftcol" className="col-12 col-lg-4 d-none d-sm-none d-md-none d-lg-block">
        <div className="tile-shadow" id="welcome">

          <div id="intro">
            <h1 className="heading-text">Hello {this.props.name}, Wussuh?</h1>
          </div>

          <div className="moods-box">
            <h3 className="subheading-text">Today I feel.. <span data-mood={this.state.mood}><span>{this.state.mood}</span></span></h3>

            <ul id="moods">
              <li className="mood" data-mood="angry" onClick={this.selectMood}>
                <i className="far fa-angry"></i>
                <p>Angry</p>
              </li>
              <li className="mood" data-mood="sad" onClick={this.selectMood}>
                <i className="far fa-sad-tear"></i>
                <p>Sad</p>
              </li>
              <li className="mood" data-mood="meh" onClick={this.selectMood}>
                <i className="far fa-meh"></i>
                <p>Meh</p>
              </li>
              <li className="mood" data-mood="happy" onClick={this.selectMood}>
                <i className="far fa-smile"></i>
                <p>Happy</p>
              </li>
              <li className="mood" data-mood="booyah" onClick={this.selectMood}>
                <i className="far fa-grin-wink"></i>
                <p>Booyah!</p>
              </li>
            </ul>

            <div id="log-mood">
              <textarea value={this.state.comment} onChange={this.typingComments} type="text" id="comment" placeholder="Tell us why you feel that way.."></textarea>
              <button type="button" id="submit" onClick={this.submit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
