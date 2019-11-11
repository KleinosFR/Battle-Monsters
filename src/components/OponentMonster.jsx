import React from "react"
import {Container, Card, CardBody, CardTitle, CardText, Progress} from "reactstrap"

const OponentMonster = ({name, attack, defense, picture, energy, maxHP}) => {


    return(

        <>
        <Container>
        <Card>
            <CardTitle>
                <h4>{name}</h4>
            </CardTitle>
            <CardText>Attack Power : {attack}</CardText>
            <img width="100%" src={picture} alt={name} />
            <CardBody>
                <CardText>
                    Stamina : {energy}
                    <Progress value={energy}></Progress>
                </CardText>
                <CardText>
                    Health Points : {defense}
                    <Progress color={"success"} value={defense} max={maxHP}></Progress>
                </CardText>
            </CardBody>
        </Card>
        </Container>
        </>
    )
}

export default OponentMonster