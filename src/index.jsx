// DEPENDENCIES
import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

// COMPONENTS
import HeaderComponent from "./components/header";
import {Columns} from "./components/columns";

// STYLING
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/app.css';
import '../styles/login.css';
import '../styles/header.css';
import '../styles/leftcol.css';
import '../styles/rightcol.css';
import '../styles/mediaQueries.css';

// HARDCODED API URLS ONLY FOR DEMONSTRATION PURPOSES
let accURL = "https://script.google.com/macros/s/AKfycbzZ0uX85I45dwozkCgU-WD74K_qFfQlD_ikxD8YmmE8muohO1A/exec";
let getAccUrl = "https://spreadsheets.google.com/feeds/cells/1GRlLZ_FKsSMPLYE3-hufytUQMNXIoPZROD_ZU968Q2g/1/public/full?alt=json";
let postURL = "https://script.google.com/macros/s/AKfycbxFcESBu8OzdcuvmZhHRKkWqbFcoKJGdkLixSCKst7MISs-mPe2/exec";
let getDataURL = "https://spreadsheets.google.com/feeds/cells/1wAmVqPzOuypUmg9o5lIQ1n62UP9N8_mEStY42bsBBTw/1/public/full?alt=json";

WebFont.load({
  google: {
    families: ['Poppins:400,500,600,700,800,900', 'Baloo', 'Work+Sans:400,700', 'sans-serif']
  }
});

let RenderAppColumns = Columns(HeaderComponent);
var mountNode = document.getElementById("app");
ReactDOM.render(<RenderAppColumns name="Rafael"/>, mountNode);
