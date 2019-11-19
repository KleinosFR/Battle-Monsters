import React, {useState} from "react"
import {Row, Button, ButtonGroup, Container} from "reactstrap"
import {Redirect, useHistory} from "react-router-dom"

import UserLogin from "./UserLogin"
import NewUser from "./NewUser"


function LoginSelect() {

const [createUser, setCreateUser] = useState (false)
const [signInColor, setSingInColor] = useState("warning")
const [signUpColor, setSingUpColor] = useState("dark")



const handleSignIn = () => {
    setCreateUser(false);
    setSingInColor("warning");
    setSingUpColor("dark")
}

const handleSignUp = () => {
    setCreateUser(true);
    setSingInColor("dark");
    setSingUpColor("warning");

}


return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <ButtonGroup className="">
                    <Button color={signInColor} size="lg" className="border border-secondary" onClick={handleSignIn}>Sign In</Button>
                    <Button color={signUpColor} size="lg" className="border border-secondary" onClick={handleSignUp}>Sign Up</Button>
                </ButtonGroup>
            </Row>
            <Row className="justify-content-center m-2">
            {createUser ? <NewUser /> : <UserLogin />}
            
            </Row>
            </Container>
)





}







export default LoginSelect