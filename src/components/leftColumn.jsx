import React from "react";
import LoaderRing from './loader';
import axios from 'axios';

export const LeftColumnComponent = () => class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      mood:"",
      comment:"",
      date: new Date().getTime(),
      name: typeof(localStorage.name) != "undefined" ? localStorage.name : "Anonymous"
    }
    this.selectMood = this.selectMood.bind(this);
    this.typingComments = this.typingComments.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  loadState(){
    console.log("change isLoading");
    this.setState({
      isLoading: true
    })
  }

  selectMood(event){
    var mood = event.currentTarget.dataset.mood;
    this.setState({
      mood: mood
    })
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
              <button data-state={this.props.isLoading || this.state.isLoading ? "loading" : "notloading"} className="w-button" type="button" id="submit" onClick={ () => { this.props.submitHandler(this.state); this.loadState(); }}><span>Submit</span><LoaderRing /></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
