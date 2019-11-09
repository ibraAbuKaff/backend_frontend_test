import React, {Component} from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import {connect} from "react-redux";
import * as ContractorRequestActionCreator from "../../actions/ContractorRequest";
import {bindActionCreators} from "redux";
import {doLogout} from "../../helpers";
import RequestCard from "../../components/RequestCard";

class ListRequests extends Component {

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

            <Tabs id="controlled-tab-example">
                <Tab eventKey="myRequests" title="My Requests">
                    <TabContainer>
                        <TabContent>
                            {this.props.awaitingDocs.map((v) => {
                                const {name, model, location, year, capacity, status, startAt, endAt} = v;
                                return (
                                    <RequestCard title={name} items={{
                                        Model: model,
                                        Capacity: capacity,
                                        Year: year,
                                        Location: location,
                                        Status: status,
                                        Ending: endAt
                                    }}/>
                                )
                            })}
                        </TabContent>
                    </TabContainer>
                </Tab>
                <Tab eventKey="myCompletedRequests" title="My Completed Requests">
                    <TabContainer>
                        <TabContent>

                            {this.props.completedDocs.map((v) => {
                                const {name, model, location, year, capacity, status, startAt, endAt} = v;
                                return (
                                    <RequestCard title={name} items={{
                                        Model: model,
                                        Capacity: capacity,
                                        Year: year,
                                        Location: location,
                                        Status: status,
                                        Ending: endAt
                                    }}/>
                                )
                            })}


                        </TabContent>

                    </TabContainer>

                </Tab>
            </Tabs>

        );
    }
}

function mapStateToProps(state) {
    return {
        contractorRequestState: state.contractorRequestState,
    };
}

function mapDispatchToProps(dispatch) {

    return {
        actions: {
            contractorRequestActionCreator: bindActionCreators(ContractorRequestActionCreator, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRequests);