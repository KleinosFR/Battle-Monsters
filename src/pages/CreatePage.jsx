import React from "react";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";
import { Link } from "react-router-dom";

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
            attk2_name: "attack 2",
            attk2_value: 0,
            attk3_name: "attack 3",
            attk3_value: 0,
            pointsRemaining: 0,
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

    handleAttack1(event) {
        const { value } = event.target;
        if (this.state.pointsRemaining - value >= 0) {
            this.setState({ attk1_value: value, pointsRemaining: this.state.attack - value - this.state.attk2_value - this.state.attk3_value})
        }
    }

    handleAttack2(event) {
        const { value } = event.target;
        if (this.state.pointsRemaining - value >= 0) {
            this.setState({ attk2_value: value, pointsRemaining: this.state.attack - value - this.state.attk1_value - this.state.attk3_value})
        }
    }

    handleAttack3(event) {
        const { value } = event.target;
        if (this.state.pointsRemaining - value >= 0) {
            this.setState({ attk3_value: value, pointsRemaining: this.state.attack - value - this.state.attk1_value - this.state.attk2_value})
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
            createdAt: new Date(),
            updatedAt: new Date()
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            console.log(res)
        })
        .catch (err => console.log(err));
    }


componentDidMount() {
    this.setState({ attack: parseInt(this.props.location.state.attack, 10), pointsRemaining: parseInt(this.props.location.state.attack, 10) })

}

render() {

    const { name, attack, defense, picture, pointsRemaining, attk1_value, attk2_value, attk3_value, newPicture } = this.state;

    return (
        <div>
            <Header />
            <UsernameBanner />
            <div className="">
                <Form className="d-flex flex-column w-container text-white m-auto border border-white rounded p-3">
                    <h1 className="align-self-center">My monster</h1>
                    <FormGroup>
                        <Label for="name">Choose a name :</Label>
                        <Input type="text" name="name" id="name" placeholder={name} onChange={this.handleName} />
                    </FormGroup>
                    <FormGroup>
                        <p>Your acutal image :</p>
                        <img className="d-block m-auto size-img" src={picture} alt={name}/>
                        <br/>
                        <p>Change your image :</p>
                        <Label htmlFor="image">Upload an image from your files :</Label>
                        <Input  type="file" id="image" name="image" ref={this.imageRef}></Input>
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

                    <p className="text-center font-weight-bold lead">Customize 3 attacks :</p>
                    <FormGroup>
                        <Label for="attack1">Attack 1 :</Label>
                        <Input type="text" name="attk1_name" id="attk1_name" placeholder="name attack" onChange={this.handleNameAttack1} />
                        <Input type="number" name="attk1_value" id="attk1_value" min="0" max={attack - attk2_value - attk3_value} placeholder="HP attack" onBlur={this.handleAttack1} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attack2">Attack 2 :</Label>
                        <Input type="text" name="attk2_name" id="attk2_name" placeholder="name attack" onChange={this.handleNameAttack2} />
                        <Input type="number" name="attk2_value" id="attk2_value" min="0" max={attack - attk1_value - attk3_value} placeholder="HP attack" onBlur={this.handleAttack2} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attack1">Attack 3 :</Label>
                        <Input type="text" name="attk3_name" id="attk3_name" placeholder="name attack" onChange={this.handleNameAttack3} />
                        <Input type="number" name="attk3_value" id="attk3_value" min="0" max={attack - attk1_value - attk2_value} placeholder="HP attack" onBlur={this.handleAttack3} />
                    </FormGroup>
                    <div className="d-flex justify-content-around m-3">
                        <Link to="/select">
                            <Button>Cancel</Button>
                        </Link>
                        <Link to="/select">
                            <Button onClick={this.postNewMonster}>Create</Button>
                        </Link>
                    </div>
                    
                </Form>
            </div>
        </div>
    )

}
    
}


export default Create;