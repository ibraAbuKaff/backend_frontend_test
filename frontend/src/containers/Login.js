import React, {Component} from "react";
import "./SignupLogin.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import TextElement from "../components/TextElement";
import CheckboxElement from "../components/CheckboxElement";
import ButtonElement from "../components/ButtonElement";
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";
import * as UserActionCreator from "../actions/User";
import {bindActionCreators} from "redux";

class SignupLogin extends Component {

    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange = (eve) => {
        const email = eve.target.value || "";
        this.props.actions.userActionCreator.setEmail(email)
    };

    onPasswordChange = (eve) => {
        const password = eve.target.value || "";
        this.props.actions.userActionCreator.setPassword(password)
    };

    onRegister = (eve) => {
        eve.stopPropagation();
        eve.preventDefault();
    };

    onLogin = (eve) => {
        eve.stopPropagation();
        eve.preventDefault();
        this.props.actions.userActionCreator.doLogin(this.props.userState.email, this.props.userState.password)
    };

    render() {

        if (this.props.userState.error !== "") {
            return (<Alert variant="danger">
                Can not login, please check your Credintials
            </Alert>)
        }

        return (
            <div className="App">
                <Container>
                    <Form>
                        <TextElement onChange={this.onEmailChange} id="email" label="Email" type="email" placeholder="Email"/>
                        <TextElement onChange={this.onPasswordChange} id="password" label="Password" type="password" placeholder="Password"/>

                        <CheckboxElement id="radioContractor" name="typeOfUser" label="Contractor" type="radio"/>
                        <CheckboxElement id="radioSupplier" name="typeOfUser" label="Supplier" type="radio"/>

                        <Form.Group as={Row}>
                            <Col>Not needed for the login</Col>
                            <ButtonElement onClick={this.onRegister} id="register" type="submit" label="Register"/>
                            <ButtonElement onClick={this.onLogin} id="login" type="submit" label="Login"/>

                        </Form.Group>
                    </Form>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userState: state.userState,
    };
}

function mapDispatchToProps(dispatch) {

    return {
        actions: {
            userActionCreator: bindActionCreators(UserActionCreator, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupLogin);






