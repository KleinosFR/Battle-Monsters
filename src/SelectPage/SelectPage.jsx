import React from 'react';
import {Row, Col } from "reactstrap"

import Header from '../components/Header';
import NewMonster from './NewMonster';
import ExistingMonsters from './ExistingMonsters';
import UsernameBanner from '../components/UsernameBanner';


function SelectPage() {
    return (
        <div>
            <Header />
            <UsernameBanner />
                
            <Row>
                <Col xs={12} xl={10} lg={12} className="text-center text-warning offset-1 offset-xl-1">
                <h3>Select a monster to fight with or create one</h3>
                </Col>
                <Col xs={12} lg={10} xl={9} className="offset-lg-1 offset-xl-0">    
                    <ExistingMonsters />
                </Col>
                <Col xs={12} lg={12} xl={2}  className="border border-warning p-2 m-1 rounded">
                    <NewMonster />
                </Col>
            </Row>
        </div>
    
    )
}

export default SelectPage;