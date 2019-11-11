import React, {Component} from "react"
import {Row, Button, Col} from "reactstrap"
import {Redirect} from "react-router-dom"

class UsernameBanner extends Component {
    constructor(props){
        super(props);
        this.state ={
            userName : "",
            isLogged : true,
            usernameError : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)

}
componentDidMount(){
    const username = localStorage.getItem('username')
    username ? this.setState({isLogged : true}) : this.setState({isLogged : false})
    this.setState({userName : username })

}

handleSubmit(){
    localStorage.setItem("username",this.state.userName)
    this.setState({})

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
            <div>
                <Row className="justify-content-between align-items-center bg-dark text-white" style={{minHeight : "20px", paddingBottom : "10px", maxWidth : "100%"}}>
                    <Col xs={5} xl={2} text-center className="offset-1" >
                    User : {this.state.userName}
                    </Col>
                    <Col xs={5} xl={2} text-center>
                    <Button  type="primary" onClick={()=> this.handleLogOut()}>
                        Log out
                    </Button>
                    </Col>
                </Row>
            </div>
        )


    }
    else {
    return (

    <Redirect to="/"/>

        )
    }
        
        }}







export default UsernameBanner