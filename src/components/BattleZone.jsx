import React, {Component} from "react"
import {Container, Row, Col} from "reactstrap"

import apiCall from "./apiCall"
import UserMonster from "../components/UserMonster"
import OponentMonster from "../components/OponentMonster"
import BattleDisplay from "../components/BattleDisplay"


class Battlezone extends Component {
        constructor(props){
            super(props);
            this.state={
                username : "",
                userMonster : {},
                oponentMonster : {}
            }
        }

    componentDidMount(){
        const user = localStorage.getItem('username');
        const monsterId = localStorage.getItem('monsterID');

        apiCall.get(`/user/gogetthisone/${user}`)
        .then(res => { 
            const monsters = res.data
            const monster = monsters.filter( monster => {
                const id = localStorage.getItem('monsterID')
                return monster.id == id                   
                });
            const userMonster = monster[0]
            console.log(userMonster)        
        })}

render() {

    return(
        <React.Fragment>

            <Container>
                <Row>
                    <Col>
                        <UserMonster />
                    </Col>
                    <Col>
                        <BattleDisplay />
                    </Col>
                    <Col>
                        <OponentMonster />
                    </Col>
                <Row>
                    <Col>

                    </Col>

                </Row>


                </Row>



            </Container>

        </React.Fragment>
)

}




}

export default Battlezone