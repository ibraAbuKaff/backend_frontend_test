import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class CheckboxElement extends Component {
    render() {
        return (

            <Form.Group as={Row}>
                <Col>
                    <Form.Check
                        type={this.props.type}
                        label={this.props.label}
                        name={this.props.name}
                        id={this.props.id}
                    />
                </Col>
            </Form.Group>

        )
    }
}

export default CheckboxElement;