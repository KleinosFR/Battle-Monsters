import React from "react"
import { Container, Col, Row } from "reactstrap"


const BattleDisplay = ({ messages, isGameOver }) => {

    if (isGameOver) {

        return (
        <Container id="battleZoneGameOver">
            <Row className="justify-content-center text-danger align-content-end">
                <Col xs={12} className="text-center">
                    GAME OVER !!
                </Col>
                <Col className="text-center">
                    {messages[messages.length-1]}
                </Col>
            </Row>
        </Container>
        )



    }
else {
    return (
        <Container id="battleZoneDisplay">
            <Row className="justify-content-center text-white align-content-end" >
                {messages.length !== 0 ? (messages.map(msg => {
                    return <Col  xs={6} className="my-2">{msg}</Col>
                })) : <Col xs={12} className="text-center">Ready for Battle</Col>}
            </Row>
        </Container>
    )



}
}

export default BattleDisplay