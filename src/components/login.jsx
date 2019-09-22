import React from "react";
import axios from 'axios';
import LoaderRing from './loader';

export default class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.toggleRegister = this.toggleRegister.bind(this);
    this.state = {
      isLoading: false,
      name:"",
      email:"",
      password:""
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.registerAccount = this.registerAccount.bind(this);
    this.login = this.login.bind(this);
  }

  toggleRegister(){
    var elem = document.getElementById('login');
    elem.classList.remove("login");
    elem.className += "register";
  }

  login(){

  }

  registerAccount(){
    this.setState({
      isLoading: true
    });

    var url = "https://script.google.com/macros/s/AKfycbzZ0uX85I45dwozkCgU-WD74K_qFfQlD_ikxD8YmmE8muohO1A/exec" + "?Name=" + this.state.name + "&Email=" + this.state.email + "&Password=" + this.state.password;
    axios.get(url).then(res => {
      this.setState({
        isLoading: false
      });
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

  render() {
    return (
      <div id="login" className="login">
        <div className="login-wrapper">
          <h1 className="heading-text">WÜSSUH</h1>
          <input className="w-input" type="text" id="name" placeholder="First Name" onChange={this.changeHandler} />
          <input className="w-input" type="text" id="email" placeholder="Email Address" onChange={this.changeHandler} />
          <input className="w-input" type="password" id="password" placeholder="Password" onChange={this.changeHandler} />
          <button data-state={this.state.isLoading ? "loading" : "notloading"} type="button" id="sign-in" className="w-button" onClick={this.login}><span>Sign in</span><LoaderRing /></button>
          <button data-state={this.state.isLoading ? "loading" : "notloading"} type="button" id="register" className="w-button" onClick={this.registerAccount}><span>Register</span><LoaderRing /></button>
          <p onClick={this.toggleRegister} className="paragraph-text text-center">Don't have an account yet? <br /> Register here</p>
        </div>
      </div>
    )
  }
}
