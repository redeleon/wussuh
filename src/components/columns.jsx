import React from "react";

export const Columns = (HeaderComponent, LeftColumnComponent, RightColumnComponent) => class extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <HeaderComponent />
        <div id="main-content" className="container-fluid max-width">
          <div className="row">
            <LeftColumnComponent name={this.props.name} />
            <RightColumnComponent />
          </div>
        </div>
      </div>
    )
  }
}
