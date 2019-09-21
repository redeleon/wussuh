// DEPENDENCIES
import React from "react";
import ReactDOM from "react-dom";

// COMPONENTS
import HeaderComponent from "./components/header";
import {Columns} from "./components/columns";
import LeftColumnComponent from "./components/leftColumn";
import RightColumnComponent from "./components/rightColumn";

// STYLING
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/app.css';
import '../styles/header.css';
import '../styles/leftcol.css';
import '../styles/rightcol.css';
import '../styles/mediaQueries.css';

WebFont.load({
  google: {
    families: ['Poppins:400,500,600,700,800,900', 'Baloo', 'Work+Sans:400,700', 'sans-serif']
  }
});

let RenderAppColumns = Columns(HeaderComponent, LeftColumnComponent, RightColumnComponent);
var mountNode = document.getElementById("app");
ReactDOM.render(<RenderAppColumns name="Rafael"/>, mountNode);
