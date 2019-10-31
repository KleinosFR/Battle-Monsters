import React, {Component} from "react";
import {Container} from "reactstrap"


import Header from "../components/Header"
import UserLogin from "../components/UserLogin"


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state ={}
    }
    
    
    render() {
        return (
        <>
            <Container>
                <Header />
                <UserLogin />
            </Container>
        </>
        )
    
        
        }}




export default LoginPage