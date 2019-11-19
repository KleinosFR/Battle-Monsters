import React, {Component} from "react";
import {Container} from "reactstrap"


import Header from "../components/Header"
import LoginSelect from "./LoginSelect"
import LoginCarousel from "./LoginCarousel";


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state ={}
    }
    
    
    render() {
        return (
        <>
                <Header />
                <LoginSelect />
                <LoginCarousel />
        </>
        )
    
        
        }}




export default LoginPage