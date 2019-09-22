import React from "react";

export default class LoaderRing extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
  }
}
