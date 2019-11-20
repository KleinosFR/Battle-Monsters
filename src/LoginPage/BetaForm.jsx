import React, {useState} from "react";
import {Form, FormGroup, Input, Button} from "reactstrap"

import emailjs from 'emailjs-com';



function BetaForm () {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")


    const handleSubmit= (e) => {
        e.preventDefault();

        const templateId = 'battlemonsterbeta';
        const userId = "user_orWSlhi5fl70ZPiSAWcO3";
        const variables = {
            name,
            email,
            message
        };

        emailjs.send('gmail', templateId,variables, userId)
        .then(res => {
            setIsSubmited(true)
        })
          // Handle errors here however you like, or use a React error boundary
        .catch(err => {
        setIsError(true);
        setErrorMsg(err);
    })
    }





    
return(
    <Form className="pr-1" id="betaForm" onSubmit={handleSubmit}>
        <h3 className="text-center text-warning">Send us your feedback</h3>
            {isSubmited ?
                isError ? 
                <h5 color="danger" className="text-center">There was a problem sending your feedback, please try again later</h5>:
                <h5 color="success" className="text-center">Thank you for your feedback.</h5>
            : <></>}
        <FormGroup>
            <Input type="text" placeholder="your name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <Input type="email" placeholder="your email address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="textarea" id="myText" name="message" placeholder="your feedback" value={message} onChange={(e) => setMessage(e.target.value)}/>
        </FormGroup>

        <Button value="submit">Send</Button>

    </Form>
)


}

export default BetaForm;