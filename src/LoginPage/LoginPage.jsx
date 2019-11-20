import React, {Component} from "react";
import {Row, Col} from "reactstrap"


import Header from "../components/Header"
import LoginSelect from "./LoginSelect"
import LoginCarousel from "./LoginCarousel";

import "./loginpage.css"
import BetaForm from "./BetaForm";

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state ={}
    }
    
    
    render() {
        return (
        <>
                <Header />
                <Row className="loginPageBody">
                    <Col xl={6} className="offset-xl-3 offset-0">
                        <LoginSelect />
                        <LoginCarousel />
                    </Col>
                    <Col xl={2} xs={10} className="my-5 offset-1 offset-xl-0">
                        <BetaForm />
                    </Col>
                    
                </Row>
        </>
        )
    
        
        }}




export default LoginPage