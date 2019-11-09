import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import TextElement from "./components/TextElement";
import CheckboxElement from "./components/CheckboxElement";
import ButtonElement from "./components/ButtonElement";

function App() {
    return (
        <div className="App">
            <Container>
                <Form>
                    <TextElement id="email" label="Email" type="email" placeholder="Email"/>
                    <TextElement id="password" label="Password" type="password" placeholder="Password"/>

                    <CheckboxElement id="radioContractor" name="typeOfUser" label="Contractor" type="radio"/>
                    <CheckboxElement id="radioSupplier" name="typeOfUser" label="Supplier" type="radio"/>

                    <Form.Group as={Row}>

                        <ButtonElement id="register" type="submit" label="Register"/> <ButtonElement id="login" type="submit" label="Login"/>

                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default App;





