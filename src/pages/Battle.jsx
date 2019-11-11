import React, {Component} from "react";


import Header from "../components/Header"
import UsernameBanner from "../components/UsernameBanner";
import Battlezone from "../components/BattleZone";
import "./battle.css"


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state ={}
    }
    
    
    render() {
        return (
        <>
            <Header />
            <UsernameBanner />
            <Battlezone />

            
        </>
        )
    
        
        }}




export default LoginPage