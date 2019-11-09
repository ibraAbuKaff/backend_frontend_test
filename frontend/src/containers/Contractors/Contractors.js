import React, {Component} from "react";
import Request from "./Request";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import * as ContractorRequestActionCreator from "../../actions/ContractorRequest";
import {bindActionCreators} from "redux";

class Contractors extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Container>
                <Row>
                    <Col>
                        <h2>Welcome {localStorage.getItem('email')}, You are a contractor</h2>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Request />
                    </Col>
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