import React from "react"
import {Col, Card, CardTitle, CardText, CardBody, Row} from "reactstrap"
import {Link} from "react-router-dom"
import '../index.css' ;


const ExistingMonster = ({ name, attack, defense, picture, attk1_name, attk1_value, attk2_name, attk2_value, attk3_name, attk3_value, id,level, description }) => {

    return (
        <React.Fragment>

            <Col xs={12} lg={3}>
<Link to="/battle" className ="link">
        <Card className="text-muted" onClick={ ()=> { 
                localStorage.setItem("monsterID" , id)
                }}>
            
        
                <CardBody  >
                    <CardTitle className="name" >{name}</CardTitle>
                </CardBody>
                <Row className="justify-content-center">
                <img width="60%" src={picture ? picture : "https://i.pinimg.com/originals/f8/64/5b/f8645b8957654aed39cb675376cc1783.jpg"} alt="Card image cap" />
                </Row>
                <CardBody className="">
                    <CardText className="description">{description}</CardText>
                    <CardText className="action">Attaque : {attack} Defense : {defense}</CardText>
                    <CardText className="attak">First attack : {attk1_name} {attk1_value} dmg </CardText>
                    <CardText className="attak">Second attack : {attk2_name} {attk2_value} dmg </CardText>
                    <CardText className="attak">Third attack : {attk3_name} {attk3_value} dmg  </CardText>
                </CardBody>
        </Card>
            
</Link>
            </Col>
        </React.Fragment>



    )
}

export default ExistingMonster
