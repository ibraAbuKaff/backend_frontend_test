import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import TextElement from "../../components/TextElement";
import ButtonElement from "../../components/ButtonElement";
import {connect} from "react-redux";
import * as ContractorRequestActionCreator from "../../actions/ContractorRequest";
import {bindActionCreators} from "redux";
import Alert from "react-bootstrap/Alert";

class Request extends Component {

    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onCapacityChange = this.onCapacityChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }


    onNameChange = (eve) => {
        const name = eve.target.value || "";
        this.props.actions.contractorRequestActionCreator.set_name(name);
    };


    onYearChange = (eve) => {
        const year = eve.target.value || "";
        this.props.actions.contractorRequestActionCreator.set_year(year);
    };


    onModelChange = (eve) => {
        const model = eve.target.value || "";
        this.props.actions.contractorRequestActionCreator.set_model(model);
    };


    onCapacityChange = (eve) => {
        const capacity = eve.target.value || "";
        this.props.actions.contractorRequestActionCreator.set_capacity(capacity);
    };


    onLocationChange = (eve) => {
        const location = eve.target.value || "";
        this.props.actions.contractorRequestActionCreator.set_location(location);
    };

    onSubmit = (eve) => {
        eve.stopPropagation();
        eve.preventDefault();

        const request = {
            name: this.props.contractorRequestState.name,
            year: this.props.contractorRequestState.year,
            model: this.props.contractorRequestState.model,
            capacity: this.props.contractorRequestState.capacity,
            location: this.props.contractorRequestState.location,
        };

        this.props.actions.contractorRequestActionCreator.submit(request)
    };

    render() {
        return (
            <div className="App">
                <Container>
                    {
                        this.props.contractorRequestState.error !== "" ?
                            <Alert variant="danger">{this.props.contractorRequestState.error}</Alert> : <></>

                    }

                    {
                        this.props.contractorRequestState.id !== "" && this.props.contractorRequestState.error === "" ?
                            <Alert variant="success">Successfully Posted</Alert> : <></>

                    }

                    <Form>
                        <TextElement onChange={this.onNameChange} id="name" label="Equipment Name" type="text" placeholder="Equipment Name"/>
                        <TextElement onChange={this.onYearChange} id="year" label="Year" type="text" placeholder="Which Year (1950 -> 2030)"/>
                        <TextElement onChange={this.onModelChange} id="model" label="Model" type="text" placeholder="Model Of The Equipment"/>
                        <TextElement onChange={this.onCapacityChange} id="capacity" label="Capacity" type="text" placeholder="Capacity"/>
                        <TextElement onChange={this.onLocationChange} id="location" label="Location" type="text" placeholder="Location"/>

                        <Form.Group as={Row}>
                            <ButtonElement onClick={this.onSubmit} id="register" type="submit" label="Place A Request"/>
                        </Form.Group>
                    </Form>
                </Container>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Request);