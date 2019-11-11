import React from "react";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import UsernameBanner from "../components/UsernameBanner";
import apiCall from "../components/apiCall";
import '../components/inputNumbers.css'

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            attack: "",
            defense: "",
            picture: "",
            description: "",
            attk1_name: "",
            attk1_value: 0,
            attk2_name: "",
            attk2_value: 0,
            attk3_name: "",
            attk3_value: 0,
            pointsRemaining: 0
        }

        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleAttack1 = this.handleAttack1.bind(this);
        this.handleAttack2 = this.handleAttack2.bind(this);
        this.handleAttack3 = this.handleAttack3.bind(this);
        this.handleNameAttack1 = this.handleNameAttack1.bind(this);
        this.handleNameAttack2 = this.handleNameAttack2.bind(this);
        this.handleNameAttack3 = this.handleNameAttack3.bind(this);
        this.postNewMonster = this.postNewMonster.bind(this);
        this.updatePointsRemaining = this.updatePointsRemaining.bind(this)
    }

    handleName(event) {
        const { value } = event.target;
        this.setState({ name: value })
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
        console.log(
            {
            name: this.state.name,
            attack: this.state.attack,
            defense: this.state.defense,
            picture: "",
            description: this.state.description,
            attk1_name: this.state.attk1_name,
            attk1_value: this.state.attk1_value,
            attk2_name: this.state.attk2_name,
            attk2_value: this.state.attk2_value,
            attk3_name: this.state.attk3_name,
            attk3_value: this.state.attk3_value,
            user_id: 6
            }
        )
        apiCall({ method: "POST", url: '/UserMonster/addusermonster', data:{
            name: this.state.name,
            attack: this.state.attack,
            defense: this.state.defense,
            picture: "",
            description: this.state.description,
            attk1_name: this.state.attk1_name,
            attk1_value: this.state.attk1_value,
            attk2_name: this.state.attk2_name,
            attk2_value: this.state.attk2_value,
            attk3_name: this.state.attk3_name,
            attk3_value: this.state.attk3_value,
            user_id: 6
        }})
        .then(res => {
            console.log(res)
        })
        .catch (err => console.log(err));
    }

updatePointsRemaining() {
    // this.setState({pointsRemaining: this.state.attack})
}

componentDidMount() {
    // const {picture} = this.props.location.state;
    // const imgProfilMonster = picture;
    // this.setState({picture: imgProfilMonster});
    // console.log(this.state.picture)
    this.setState({ attack: parseInt(this.props.location.state.attack, 10), pointsRemaining: parseInt(this.props.location.state.attack, 10) })

}

render() {

    const { name, attack, defense } = this.props.location.state;

    return (
        <div>
            <Header />
            <UsernameBanner />
            <div>
                <Form>
                    <h1>My monster</h1>

                    <FormGroup>
                        <Label for="name">Choose a name :</Label>
                        <Input type="text" name="name" id="name" defaultValue={name} onChange={this.handleName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Enter the description :</Label>
                        <Input type="textarea" name="description" id="description" onChange={this.handleDescription} />
                    </FormGroup>
                    <p>HP : {defense}</p>
                    <p>Attack points remaining : {this.state.pointsRemaining}</p>

                    <p>Customize 3 attacks :</p>
                    <FormGroup>
                        <Label for="attack1">Attack 1 :</Label>
                        <Input type="text" name="attk1_name" id="attk1_name" placeholder="name attack" onChange={this.handleNameAttack1} />
                        <Input type="number" name="attk1_value" id="attk1_value" min="0" max={this.state.attack - this.state.attk2_value - this.state.attk3_value} placeholder="HP attack" onBlur={this.handleAttack1} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attack2">Attack 2 :</Label>
                        <Input type="text" name="attk2_name" id="attk2_name" placeholder="name attack" onChange={this.handleNameAttack2} />
                        <Input type="number" name="attk2_value" id="attk2_value" min="0" max={this.state.attack - this.state.attk1_value - this.state.attk3_value} placeholder="HP attack" onBlur={this.handleAttack2} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attack1">Attack 3 :</Label>
                        <Input type="text" name="attk3_name" id="attk3_name" placeholder="name attack" onChange={this.handleNameAttack3} />
                        <Input type="number" name="attk3_value" id="attk3_value" min="0" max={this.state.attack - this.state.attk1_value - this.state.attk2_value} placeholder="HP attack" onBlur={this.handleAttack3} />
                    </FormGroup>
                    <Link to="/select">
                        <Button onClick={this.postNewMonster}>Create</Button>
                    </Link>
                </Form>
            </div>
        </div>
    )

}
    
}


export default Create;