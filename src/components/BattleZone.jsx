import React, { Component } from "react"
import {Container, Row, Col, Button } from "reactstrap"
import {Link} from "react-router-dom"

import apiCall from "./apiCall"
import UserMonster from "../components/UserMonster"
import OponentMonster from "../components/OponentMonster"
import BattleDisplay from "../components/BattleDisplay"
import "./battlezone.css"

const sleep = (ms) => {
    // Temporise par le temps passé en argument
    const start = new Date().getTime() // Snapshot of the time
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > ms) {
            break;
        }
    }
}


class Battlezone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userMonster: {},
            oponentMonster: {},
            feedMessages: [],
            userEnergy : 100,
            oponentEnergy : 100,
            isBattleStarted: false,
            isGameOver: false,
            userCanPlay : true,
            maxUserHP : 0,
            maxOppHP : 0
        }
        this.handleAttack = this.handleAttack.bind(this)
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        apiCall.get(`/user/gogetthisone/${user}`)
            .then(res => {
                const monsters = res.data
                const monster = monsters.filter(monster => {
                    const id = localStorage.getItem('monsterID')
                    return monster.id === id
                });
                this.setState({ userMonster: monster[0] })
                console.log(this.state.userMonster)
                this.setState({maxUserHP : this.state.userMonster.defense})
            })
        apiCall.get(`/item/gogetit`)
            .then(res => {
                const monsters = res.data
                const randomindex = Math.floor(Math.random() * monsters.length)
                this.setState({ oponentMonster: monsters[randomindex] })
                this.setState({maxOppHP : this.state.oponentMonster.defense})
            })
    }

    async handleAttack(nb) {
        await this.setState({userCanPlay : false})

// user fighting turn

        let attackDatas = {}
        let userStaminaGain = 10
        let oponentStaminaGain = 10
        switch (nb) {
            case 1:
                attackDatas = { attackName: this.state.userMonster.attk1_name, attackValue: Number(this.state.userMonster.attk1_value)}
                break;
            case 2:
                attackDatas = { attackName: this.state.userMonster.attk2_name, attackValue: Number(this.state.userMonster.attk2_value)}
                break;
            case 3:
                attackDatas = { attackName: this.state.userMonster.attk3_name, attackValue: Number(this.state.userMonster.attk3_value)}
                break;
            case 0:
                attackDatas = { attackName: "resting", attackValue: 0};
                break;
            default:
                return;
                
        }

        let attackMessage =""
        if (attackDatas.attackValue !== 0){
            attackMessage = `${this.state.userMonster.name} is attacking ${this.state.oponentMonster.name} with ${attackDatas.attackName}, dealing ${attackDatas.attackValue} damages !`
            userStaminaGain = 10
        }
        else{
            attackMessage = `${this.state.userMonster.name} is resting for this turn and gains 20 Stamina`;
            userStaminaGain = 20;
        }
        const newHP = (this.state.oponentMonster.defense - attackDatas.attackValue)
        const newEnergy = (this.state.userEnergy - attackDatas.attackValue)

        await this.setState({ feedMessages: [...this.state.feedMessages, attackMessage] })

        this.setState({ oponentMonster: { ...this.state.oponentMonster, defense: newHP } })
        this.setState({userEnergy : newEnergy})

        sleep(1000)

// opponent fighting turn

        let isNotResolved = true
        let oppNb = 0
        const miniStamina = Math.min(this.state.oponentMonster.attk1_value, this.state.oponentMonster.attk2_value, this.state.oponentMonster.attk3_value)
        console.log("ministam" + miniStamina)


        
        
        console.log("attack" + oppNb);
        let oppDatas = {}

    while (isNotResolved) {
        oppNb = (miniStamina > this.state.oponentEnergy) ? 0 : Math.floor(Math.random() * 3) + 1;
        switch (oppNb) {
            case 1:
                oppDatas = { attackName: this.state.oponentMonster.attk1_name, attackValue: Number(this.state.oponentMonster.attk1_value) }
                isNotResolved = !(oppDatas.attackValue <= this.state.oponentEnergy)
                break;
            case 2:
                oppDatas = { attackName: this.state.oponentMonster.attk2_name, attackValue: Number(this.state.oponentMonster.attk2_value) }
                isNotResolved = !(oppDatas.attackValue <= this.state.oponentEnergy)
                break;
            case 3:
                oppDatas = { attackName: this.state.oponentMonster.attk3_name, attackValue: Number(this.state.oponentMonster.attk3_value) }
                isNotResolved = !(oppDatas.attackValue <= this.state.oponentEnergy)
            break;
            case 0:
                oppDatas = { attackName: "resting", attackValue: 0}
                isNotResolved = false;
                break;
            default:
                break;

            }
console.log(isNotResolved);


}

       let oppMessage =""
       if (oppDatas.attackValue !== 0){
        oppMessage = `${this.state.oponentMonster.name} is attacking ${this.state.userMonster.name} with ${oppDatas.attackName}, dealing ${oppDatas.attackValue} damages !`;
        oponentStaminaGain = 10
       }
        else{
        oppMessage = `${this.state.oponentMonster.name} is resting for this turn and gains 20 Stamina`;
        oponentStaminaGain = 20;
    }
            
            const newOppHP = (this.state.userMonster.defense - oppDatas.attackValue)
            const newOppEnergy = (this.state.oponentEnergy - oppDatas.attackValue)

            this.setState({ feedMessages: [...this.state.feedMessages, oppMessage] })
            await this.setState({ userMonster: { ...this.state.userMonster, defense: newOppHP } })
            this.setState({oponentEnergy : newOppEnergy})

    

// game over check

        if ((this.state.oponentMonster.defense <= 0) && (this.state.userMonster.defense <= 0)){
            this.setState({isGameOver : true})
            this.setState({ feedMessages: [...this.state.feedMessages,"GAME OVER !!!", `Equality !`] })
        }
        else if (this.state.oponentMonster.defense <= 0){
            this.setState({isGameOver : true})
            this.setState({ feedMessages: [...this.state.feedMessages,"GAME OVER !!!", `'${this.state.userMonster.name} won !!! Shame on ${this.state.oponentMonster.name}'`] })

        }
        else if (this.state.userMonster.defense <= 0){
            this.setState({isGameOver : true})
            this.setState({ feedMessages: [...this.state.feedMessages,"GAME OVER !!!", `'${this.state.oponentMonster.name} won !!! Shame on ${this.state.userMonster.name}'`] })

        }
        else {
            this.setState({userCanPlay : true, userEnergy : (this.state.userEnergy + userStaminaGain), oponentEnergy : (this.state.oponentEnergy + oponentStaminaGain)})
        }

        
    }



    render() {
        const { userMonster, oponentMonster, feedMessages, isBattleStarted, userCanPlay, userEnergy, oponentEnergy, isGameOver } = this.state

        const disableBtn1 = (userEnergy < Number(userMonster.attk1_value)) && userCanPlay
        const disableBtn2 = (userEnergy < Number(userMonster.attk2_value)) && userCanPlay
        const disableBtn3 = (userEnergy < Number(userMonster.attk3_value)) && userCanPlay


        return (
            <React.Fragment>
                <Col className="battlezone">
                    <Row>
                        <Col xs={6} xl={2} className="offset-lg-1">
                            <UserMonster {...userMonster} energy={userEnergy} maxHP={this.state.maxUserHP} />
                        </Col>
                        <Col sm={12} xl={6} className="align-self-center order-last order-xl-2">
                            <BattleDisplay messages={feedMessages} isGameOver={isGameOver}/>
                        </Col>
                        <Col xs={6} xl={2} className="align-self-center order-sm-1 order-xl-3">
                            <OponentMonster {...oponentMonster} energy={oponentEnergy} maxHP={this.state.maxOppHP}/>
                        </Col>
                    </Row>
                    <Row className="justify-content-around" >
                        {isBattleStarted ? <Container fluid className="justify-content-center" ><Row className="justify-content-around">
                            
                            <Button color="danger" disabled={disableBtn1} onClick={() => this.handleAttack(1)}>{userMonster.attk1_name} ({userMonster.attk1_value} dmg)</Button>
                            <Button color="danger" disabled={disableBtn2} onClick={() => this.handleAttack(2)}>{userMonster.attk2_name} ({userMonster.attk2_value} dmg)</Button>
                            <Button color="danger" disabled={disableBtn3} onClick={() => this.handleAttack(3)}>{userMonster.attk3_name} ({userMonster.attk3_value} dmg)</Button>
                            <Button color="success" onClick={() => this.handleAttack(0)}> Rest one turn (+20 Stamina)</Button>

                            {this.state.isGameOver ? <Link to="/select"><Button color="danger">Play again</Button></Link> : <></>}</Row></Container>
                        :
                            <Button color="danger" onClick={() => this.setState({ isBattleStarted: true })}>Start Battle !</Button>}
                    </Row>
                </Col>
            </React.Fragment>
        )

    }




}

export default Battlezone