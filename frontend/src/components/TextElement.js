import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class TextElement extends Component {
    render() {
        return (
            <Form.Group as={Row} controlId={this.props.id}>
                <Form.Label column sm={2}>
                    {this.props.label}
                </Form.Label>
                <Col sm={10}>
                    <Form.Control id={this.props.id} type={this.props.type} placeholder={this.props.placeholder}/>
                </Col>
            </Form.Group>
        )
    }
}

export default TextElement;