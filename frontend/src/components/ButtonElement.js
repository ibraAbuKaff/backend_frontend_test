import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class ButtonElement extends Component {
    render() {
        return (
            <Col>
                <Button id={this.props.id} type={this.props.type}>{this.props.label}</Button>
            </Col>
        )
    }
}

export default ButtonElement;