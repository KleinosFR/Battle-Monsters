import React, {Component} from "react"
import {Row, Form, Input, Button, Col} from "reactstrap"
import {Redirect} from "react-router-dom"

import apiCall from "../components/apiCall"


class UserLogin extends Component {
    constructor(props){
        super(props);
        this.state ={
            userName : "",
            isLogged : false,
            userId : "",
            isUserExisting : true,
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)

}
componentDidMount(){
    const username = localStorage.getItem('username')
    this.setState({userName : username })

}

handleSubmit(event){
    event.preventDefault()
    const userName = this.state.userName
    apiCall.get(`/user/gogetuser/${this.state.userName}`)
    .then(res => {
        const id=res.data[0].id;
        if (id) {
            localStorage.setItem("userId", id);
            localStorage.setItem("username", userName)
            this.setState({isUserExisting : true})
            this.setState({userId : id})
            this.setState({isLogged : true})
            console.log(this.state.isUserExisting, id);
        }
        else{
            localStorage.clear()
            console.log("no account")
            this.setState({isUserExisting : false})
        }


        
        })

}

handleChange(event){
    let inputText = event.target.value;
    this.setState({userName : inputText})

}

handleLogOut(){
    localStorage.clear()
    this.setState({userName : "", isLogged : false})




}

render() {

    if (this.state.isLogged) {

        return(
        <Redirect to="/select" />
        )
    }
    else{

    return (
        <>
        <Row className="login">
            {this.state.isUserExisting ? <></> : 
                    <Row className="justify-content-center text-danger">
                        <Col xs={12}>
                    <h5>This username doesn't exists, try again if you think you mistyped it or sign up for an account</h5>
                        </Col>
                    </Row>}
            <Form  onSubmit={this.handleSubmit}>
                
                    <Col xs={12}>
                <Input
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    />
                <Button color="primary" htmlType="submit">
                    Sign in
                </Button>
                </Col>
            </Form>
        </Row>
        </>    

        )
    }
        
        }


    }




export default UserLogin