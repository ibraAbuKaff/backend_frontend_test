import React, {Component} from "react";
import "./Signup.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import TextElement from "../../components/TextElement";
import CheckboxElement from "../../components/CheckboxElement";
import ButtonElement from "../../components/ButtonElement";
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";
import * as UserActionCreator from "../../actions/User";
import {bindActionCreators} from "redux";
import {redirectToUserPage} from "../../helpers";


class Signup extends Component {

    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSelectUserType = this.onSelectUserType.bind(this);
    }

    onEmailChange = (eve) => {
        const email = eve.target.value || "";
        this.props.actions.userActionCreator.setEmail(email)
    };

    onPasswordChange = (eve) => {
        const password = eve.target.value || "";
        this.props.actions.userActionCreator.setPassword(password)
    };

    onSelectUserType = (eve) => {
        const userType = eve.target.value || "";
        this.props.actions.userActionCreator.setUserType(userType)
    };

    onRegister = (eve) => {
        eve.stopPropagation();
        eve.preventDefault();
        if (this.props.userState.userType === "") {
            alert('Please select user type');

            return;
        }

        this.props.actions.userActionCreator.doSignup(this.props.userState.email, this.props.userState.password, this.props.userState.userType)

    };

    componentDidUpdate() {
        const typeOfUser = this.props.userState.user['type_of_user'] || "";
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
                            <Alert variant="danger">Can not register, Please try again</Alert> : <></>

                    }

                    {
                        this.props.userState.token !== "" && this.props.userState.error === "" ?
                            <Alert variant="success">Successfully Registered, <a href="/login">please login</a></Alert> : <></>

                    }
                    <Form>
                        <TextElement onChange={this.onEmailChange} id="email" label="Email" type="email" placeholder="Email"/>
                        <TextElement onChange={this.onPasswordChange} id="password" label="Password" type="password" placeholder="Password"/>

                        <CheckboxElement onChange={this.onSelectUserType} value="contractor" id="radioContractor" name="typeOfUser" label="Contractor" type="radio"/>
                        <CheckboxElement onChange={this.onSelectUserType} value="supplier" id="radioSupplier" name="typeOfUser" label="Supplier" type="radio"/>

                        <Form.Group as={Row}>
                            <ButtonElement onClick={this.onRegister} id="register" type="submit" label="Register"/>
                        </Form.Group>
                    </Form>
                </Container>
                <a href="/login">You Already Have An Account?</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);






