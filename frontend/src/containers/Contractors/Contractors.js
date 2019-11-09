import React, {Component} from "react";
import PostRequests from "./PostRequest";
import ListRequests from "./ListRequests";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ButtonElement from "../../components/ButtonElement";
import {doLogout} from "../../helpers";
import {getMyRequests} from "../../services/Contractor";
import __ from "lodash";

class Contractors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            awaitingRequests: [],
            completedRequests: [],
        };
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = (eve) => {
        eve.preventDefault();
        eve.stopPropagation();
        doLogout();
    };

    async componentDidMount() {
        this.getAwaitingRequests();
        this.getCompletedRequests();
    }

    getAwaitingRequests = async () => {
        const that = this;
        getMyRequests(1, 'awaiting').then((results) => {
            const docs = __.get(results.data, 'docs');
            that.setState({awaitingRequests: docs});
        })
    };

    getCompletedRequests = async () => {
        const that = this;
        getMyRequests(1, 'completed').then((results) => {
            const docs = __.get(results.data, 'docs');
            that.setState({completedRequests: docs});
        })
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
                        <PostRequests />
                    </Col>
                </Row>
                <div>
                    <ListRequests awaitingDocs={this.state.awaitingRequests} completedDocs={this.state.completedRequests}/>
                </div>
            </Container>
        );
    }
}


export default Contractors;