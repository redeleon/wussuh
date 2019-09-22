import React from "react";
import axios from 'axios';
import {LeftColumnComponent} from "./leftColumn";
import {RightColumnComponent} from "./rightColumn";
import LoaderRing from './loader';

export const Columns = (HeaderComponent) => class extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      refresh: false,
      isLoggedIn : typeof(localStorage.isLoggedIn) == "undefined" ? false : true,
      isLoading: false,
      name: typeof(localStorage.name) == "undefined" ? "" : localStorage.name,
      email: "",
      password: "",
    };

    this.toggleRegister = this.toggleRegister.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.registerAccount = this.registerAccount.bind(this);
    this.login = this.login.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggleRegister(){
    var elem = document.getElementById('login');
    elem.classList.remove("login");
    elem.className += "register";
  }

  login(){
    var url = "https://spreadsheets.google.com/feeds/cells/1GRlLZ_FKsSMPLYE3-hufytUQMNXIoPZROD_ZU968Q2g/1/public/full?alt=json";
    var component = this;
    component.setState({
      isLoading: true
    });

      axios.get(url).then(res => {
        // NOT SECURE AND REAAAAALLY MESSY BUT WILL GO FOR OAUTH IN THE FUTURE, FOR NOW FOR THIS DEMO ITS JUST THIS
        var entries = res.data.feed.entry;
        var searchIndex;
        var email = this.state.email;

        entries.map(function(item ,index){
        	if ( item.gs$cell.col == "4" && item.gs$cell.inputValue == email ){
            searchIndex = index-1;
            component.setState({
              name: entries[searchIndex].gs$cell.inputValue,
              email: email,
              isLoading: false,
              isLoggedIn: true
            });

            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("name", component.state.name);
            localStorage.setItem("email", email);
          }
        });
      });

  }

  registerAccount(){
    this.setState({
      isLoading: true
    });

    var url = "https://script.google.com/macros/s/AKfycbzZ0uX85I45dwozkCgU-WD74K_qFfQlD_ikxD8YmmE8muohO1A/exec" + "?Name=" + this.state.name + "&Email=" + this.state.email + "&Password=" + this.state.password;
    axios.get(url).then(res => {
      this.login()
    })
  }

  changeHandler(event){
    console.log("change");
    var type = event.target.id;
    var value = event.target.value;
    switch(type){
      case "name":
        this.setState({
          name: value
        })
      break;
      case "email":
        this.setState({
          email: value
        })
      break;
      case "password":
        this.setState({
          password: value
        })
      break;
    }
  }

  addEntry(){
      document.getElementById('main-content').classList.toggle('addentry');
      document.getElementById('add-entry').classList.toggle('addentry');
  }

  submit(data){
    var data = JSON.stringify(data);
    axios.get("https://script.google.com/macros/s/AKfycbxFcESBu8OzdcuvmZhHRKkWqbFcoKJGdkLixSCKst7MISs-mPe2/exec?Data="+data).then(res => {
      this.setState({
        isLoading: false,
        name: typeof(localStorage.name) == "undefined" ? "" : localStorage.name
      })
    });
  }

  render() {
    let RenderLeftColumn = LeftColumnComponent();
    let RenderRightColumn = RightColumnComponent();
    if (this.state.isLoggedIn ){
      return(
        <div className="app-wrapper">
            <HeaderComponent />
            <div id="main-content" className="container-fluid max-width">
              <div className="row">
                <RenderLeftColumn name={this.state.name} submitHandler={this.submit} />
                <RenderRightColumn name={this.state.name} />
              </div>
            </div>
            <div id="add-entry" className="tile-shadow d-lg-none" onClick={this.addEntry}>
              <i className="fas fa-plus"></i>
            </div>
        </div>
      )
    } else {
      return (
        <div className="app-wrapper">
          <div id="login" className="login">
            <div className="login-wrapper">
              <h1 className="heading-text">WÜSSUH</h1>
              <input value={this.state.name} className="w-input" type="text" id="name" placeholder="Your name or your 'Secret name'" onChange={this.changeHandler} />
              <input value={this.state.email} className="w-input" type="text" id="email" placeholder="Email Address" onChange={this.changeHandler} />
              <input value={this.state.password} className="w-input" type="password" id="password" placeholder="Password" onChange={this.changeHandler} />
              <button data-state={this.state.isLoading ? "loading" : "notloading"} type="button" id="sign-in" className="w-button" onClick={this.login}><span>Sign in</span><LoaderRing /></button>
              <button data-state={this.state.isLoading ? "loading" : "notloading"} type="button" id="register" className="w-button" onClick={this.registerAccount}><span>Register</span><LoaderRing /></button>
              <p onClick={this.toggleRegister} className="paragraph-text text-center">Don't have an account yet? <br /> Register here</p>
            </div>
          </div>
        </div>
      )
    }

  }
}
