import React from "react";

export default class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
  }

  logOut(){
    localStorage.clear();
    location.reload();
  }

  render() {
    return (
      <div id="header">
        <div className="container-fluid max-width">
          <div id="header-content" className="row relative">
            <div className="col-12 py-3 relative">
              <h1 className="brand heading-text">WÜSSUH</h1>
              <p id="logout" onClick={this.logOut}><i className="fas fa-sign-out-alt"></i> Log Out</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
