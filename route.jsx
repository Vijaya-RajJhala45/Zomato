import React, { Component } from "react";
import Home from "../component/home";
import Visit from "../component/visitrestro";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Router, Route, Switch } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';


class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {  

        }
  
    }


    render() { 
        return (  
        <React.Fragment>
            <Router > 
                    <Link to="/" />

                    <div className="main-panel">
                        <Route exact path="/" component={Home}/>
                        <Route  path="/visit" component={Visit}/>
                    </div>
            </Router>

        </React.Fragment>

        );
    }
}
 
export default Routers;