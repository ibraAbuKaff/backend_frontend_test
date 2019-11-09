import React, {Component} from "react";
import Request from "./Request";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import * as ContractorRequestActionCreator from "../../actions/ContractorRequest";
import {bindActionCreators} from "redux";
import ButtonElement from "../../components/ButtonElement";
import {doLogout} from "../../helpers";

class Contractors extends Component {

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
            <Container>
                <Row>
                    <Col>
                        <h2>Welcome Contractor {localStorage.getItem('email')}</h2>
                        <h4><ButtonElement onClick={this.onLogout} id="logout" type="submit" label="Logout"/></h4>
                    </Col>
                    <Col>
                        <Request />
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        contractorRequestState: state.contractorRequestState,
        userState: state.userState,
    };
}

function mapDispatchToProps(dispatch) {

    return {
        actions: {
            contractorRequestActionCreator: bindActionCreators(ContractorRequestActionCreator, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contractors);