import React from 'react';
import { Container, Row, Col } from "reactstrap"

import Header from '../components/Header';
import NewMonster from '../components/NewMonster';
import ExistingMonsters from '../components/ExistingMonsters';
import UsernameBanner from '../components/UsernameBanner';


function SelectPage() {
    return (
        <div>
            <Header />
            <UsernameBanner />
            <Row>
                <Col xs={12} lg={10}>    
                    <ExistingMonsters />
                </Col>
                <Col xs={12} lg={2}>
                    <NewMonster />
                </Col>
            </Row>
        </div>
    
    )
}

export default SelectPage;