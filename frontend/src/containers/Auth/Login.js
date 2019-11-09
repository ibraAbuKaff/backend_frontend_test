import React, {Component} from "react";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import TextElement from "../../components/TextElement";
import ButtonElement from "../../components/ButtonElement";
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";
import * as UserActionCreator from "../../actions/User";
import {bindActionCreators} from "redux";
import {redirectToUserPage} from "../../helpers";

class Login extends Component {

    constructor(props) {
        super(props);
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

    onLogin = (eve) => {
        eve.stopPropagation();
        eve.preventDefault();
        this.props.actions.userActionCreator.doLogin(this.props.userState.email, this.props.userState.password)
    };


    componentDidMount() {
        redirectToUserPage(localStorage.getItem('userType'));
    }


    componentDidUpdate() {
        const typeOfUser = localStorage.getItem('userType');
        if (!typeOfUser) {
            return;
        }
        redirectToUserPage(typeOfUser)
    }

    render() {
        return (
            <div className="App">
                <Container>

                    {
                        this.props.userState.error !== "" ?
                            <Alert variant="danger">Can not login, please check your Credintials</Alert> : <></>
                    }

                    <Form>
                        <TextElement onChange={this.onEmailChange} id="email" label="Email" type="email" placeholder="Email"/>
                        <TextElement onChange={this.onPasswordChange} id="password" label="Password" type="password" placeholder="Password"/>

                        <Form.Group as={Row}>
                            <ButtonElement onClick={this.onLogin} id="login" type="submit" label="Login"/>
                        </Form.Group>
                    </Form>
                </Container>
                <a href="/">You Don't Have An Account?</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);






