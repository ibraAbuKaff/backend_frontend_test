import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";


class RequestCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.items) {
            return <></>
        }

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {Object.entries(this.props.items).map((v) => {
                        return <ListGroupItem>{v[0]} : {v[1]}</ListGroupItem>;
                    })}
                </ListGroup>
            </Card>
        )
    }
}

export default RequestCard;