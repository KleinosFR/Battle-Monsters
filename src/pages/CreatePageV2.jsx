import React from "react";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import Header from "../components/Header";
import UsernameBanner from "../components/UsernameBanner";
import apiCall from "../components/apiCall";
import '../components/inputNumbers.css';
import './createPage.css';
import axios from "axios";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.location.state.name,
            attack: this.props.location.state.attack,
            defense: Number(this.props.location.state.defense),
            originalPicture: this.props.location.state.picture,
            picture: this.props.location.state.picture,
            newPicture: "",
            description: this.props.location.state.description,
            attk1_name: "attack 1",
            attk1_value: 0,
            isAttack1Invalid : false,
            attk2_name: "attack 2",
            attk2_value: 0,
            isAttack2Invalid : false,
            attk3_name: "attack 3",
            attk3_value: 0,
            isAttack3Invalid : false,
            pointsRemaining: 0,
            isMonsterValid : true,
            user_id : localStorage.getItem("userId")
        }

        this.imageRef = React.createRef();
        this.handleName = this.handleName.bind(this);
        this.handlePicture = this.handlePicture.bind(this);
        this.handlePictureURL = this.handlePictureURL.bind(this);
        this.resetImage = this.resetImage.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleAttack1 = this.handleAttack1.bind(this);
        this.handleAttack2 = this.handleAttack2.bind(this);
        this.handleAttack3 = this.handleAttack3.bind(this);
        this.handleNameAttack1 = this.handleNameAttack1.bind(this);
        this.handleNameAttack2 = this.handleNameAttack2.bind(this);
        this.handleNameAttack3 = this.handleNameAttack3.bind(this);
        this.postNewMonster = this.postNewMonster.bind(this);
    }

    handleName(event) {
        const { value } = event.target;
        this.setState({ name: value })
    }

    handlePictureURL(event) {
        const { value } = event.target;
        this.setState({ newPicture: value, picture: value });
    }

    handlePicture() {
        if (this.imageRef) {
            axios
                .post('https://api.imgur.com/3/image', this.imageRef.current.files, {
                    headers: {
                        Authorization: 'Client-ID e9699dd93be01f6'
                    }
                })
                .then(resFromImgur => {
                    const link = resFromImgur.data.data.link;
                    this.setState({ picture: link });
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            const newPictureURL = this.state.newPicture;
            this.setState({picture: newPictureURL})
        }
    }

    resetImage() {
        const originalPicture = this.state.originalPicture;
        this.setState({ picture: originalPicture, newPicture: "" });
    }

    handleDescription(event) {
        const { value } = event.target;
        this.setState({ description: value })
    }

    handleAttack(nb,event){

        



    }

    handleAttack1(event) {
        const { value } = event.target;
        if (this.state.pointsRemaining >= value ) {
            this.setState({ attk1_value: value,isAttack1Invalid : false, pointsRemaining: (this.state.attack - value - this.state.attk2_value - this.state.attk3_value)})
        } else {

            this.setState({isAttack1Invalid : true})
        }
    
    }
    handleAttack2(event) {
        const { value } = event.target;
        if (this.state.pointsRemaining >= value) {
            this.setState({ attk2_value: value,isAttack2Invalid : false, pointsRemaining: (this.state.attack - value - this.state.attk1_value - this.state.attk3_value)})
        } else {

            this.setState({isAttack2Invalid : true})
        }
    
    }

    handleAttack3(event) {
        const { value } = event.target;
        if (this.state.pointsRemaining >= value) {
            this.setState({ attk3_value: value,isAttack3Invalid : false, pointsRemaining: this.state.attack - value - this.state.attk1_value - this.state.attk2_value})
        } else {

            this.setState({isAttack3Invalid : true})
        }
    }

    handleNameAttack1(event) {
        const { value } = event.target;
        this.setState({ attk1_name: value })
    }

    handleNameAttack2(event) {
        const { value } = event.target;
        this.setState({ attk2_name: value })
    }

    handleNameAttack3(event) {
        const { value } = event.target;
        this.setState({ attk3_name: value })
    }

    postNewMonster() {

// checking if the monsters data are valid
        if(
            this.state.name !=="" &&
            !this.state.isAttack1Invalid &&
            !this.state.isAttack2Invalid &&
            !this.state.isAttack3Invalid &&
            (Number(this.state.attk1_value) + Number(this.state.attk2_value) + Number(this.state.attk3_value)) <= this.state.attack
        )
            {
        this.setState({isMonsterValid : true})       

        apiCall({ method: "POST", url: '/UserMonster/addusermonster', data:{
            name: this.state.name,
            level: 1,
            attack: this.state.attack,
            defense: this.state.defense,
            picture : this.state.picture,
            description: this.state.description,
            attk1_name: this.state.attk1_name,
            attk1_value: this.state.attk1_value,
            attk2_name: this.state.attk2_name,
            attk2_value: this.state.attk2_value,
            attk3_name: this.state.attk3_name,
            attk3_value: this.state.attk3_value,
            user_id: this.state.user_id,
            isCreated : false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            console.log(res)
            this.setState({isCreated : true})
        })
        .catch (err => console.log(err));
    } else {

        this.setState({isMonsterValid : false, isCreated : false});
        alert("Your monster does not comply with the requirements. Please retry")
    }


}


componentDidMount() {
    this.setState({ attack: parseInt(this.props.location.state.attack, 10), pointsRemaining: parseInt(this.props.location.state.attack, 10) })

}

render() {

    const { name, attack, defense, picture, pointsRemaining, attk1_value, attk2_value, attk3_value, newPicture, isMonsterValid, isCreated } = this.state;


    if (isCreated){
        return(
        
        <Redirect to="/select" />
        )
    } else {


    return (
        <div>
            <Header />
            <UsernameBanner />
            <div className="">
                <Form className="d-flex flex-column w-container text-white m-auto border border-white rounded p-3">
                    <h1 className="align-self-center">My monster</h1>
                    {isMonsterValid ? <></> : <h3>Your monster does not comply with the requirements</h3>}
                    <FormGroup>
                        <Label for="name">Choose a name :</Label>
                        <Input type="text" name="name" id="name" required placeholder={name} onChange={this.handleName} />
                    </FormGroup>
                    <FormGroup>
                        <p>Your actual image :</p>
                        <img className="d-block m-auto size-img" src={picture} alt={name}/>
                        <br/>
                        <p>Change your image :</p>
                        <Label htmlFor="image">Upload an image from your files (available soon):</Label>
                        <Input  type="file" id="image" name="image" disabled ref={this.imageRef}></Input>
                        <Label htmlFor="image">Or with an URL :</Label>
                        <Input type="text" id="image" name="image" value={newPicture} placeholder="URL" onChange={this.handlePictureURL}/>
                        <div className="d-flex mt-2 mb-4">
                            <Button onClick={this.resetImage}>Reset image</Button>
                            <Button onClick={this.handlePicture}>Validate</Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Enter the description :</Label>
                        <Input type="textarea" name="description" id="description" onChange={this.handleDescription} />
                    </FormGroup>
                    <p className="text-center font-weight-bold lead">HP : {defense}</p>
                    <p className="text-center font-weight-bold lead">Attack points remaining : {pointsRemaining}</p>

                    <p className="text-center font-weight-bold lead">Customize 3 attacks by spreading the remaining attach points :</p>
                    <FormGroup>
                        <Label for="attack1">Attack 1 :</Label>
                        <Input type="text" name="attk1_name" id="attk1_name" placeholder="name attack" onChange={this.handleNameAttack1} />
                        <Input 
                        type="number" 
                        name="attk1_value" 
                        id="attk1_value" 
                        required 
                        min="0"
                        placeholder="attack damage" 
                        onChange={this.handleAttack1}
                        invalid = {this.state.isAttack1Invalid} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attack2">Attack 2 :</Label>
                        <Input type="text" name="attk2_name" id="attk2_name" placeholder="name attack" onChange={this.handleNameAttack2} />
                        <Input 
                        type="number" 
                        name="attk2_value" 
                        id="attk2_value" 
                        required 
                        max={attack - attk1_value - attk3_value} 
                        placeholder="attack damage" 
                        onChange={this.handleAttack2} 
                        invalid = {this.state.isAttack2Invalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="attack1">Attack 3 :</Label>
                        <Input type="text" name="attk3_name" id="attk3_name" placeholder="name attack" onChange={this.handleNameAttack3} />
                        <Input 
                            type="number" 
                            name="attk3_value" 
                            id="attk3_value" 
                            required min="0"
                            max={attack - attk1_value - attk2_value} 
                            placeholder="attack damage" 
                            onChange={this.handleAttack3}
                            invalid = {this.state.isAttack3Invalid} />
                    </FormGroup>
                    <div className="d-flex justify-content-around m-3">
                        <Link to="/select">
                            <Button>Cancel</Button>
                        </Link>
                            <Button onClick={this.postNewMonster}>Create</Button>
                    </div>
                    
                </Form>
            </div>
        </div>
        )
    }
}
    
}


export default Create;