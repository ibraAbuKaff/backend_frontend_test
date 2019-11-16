import React, {Component} from "react";
//import "./Login.css";
import ButtonElement from "../../components/ButtonElement";
import {doLogout} from "../../helpers";

class Suppliers extends Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = (eve) => {
        eve.preventDefault();
        eve.stopPropagation();
        doLogout();
    };

    render() {
        return (
            <div>
                Supplier
                <h4><ButtonElement onClick={this.onLogout} id="logout" type="submit" label="Logout"/></h4>
            </div>

        );
    }
}


export default Suppliers;