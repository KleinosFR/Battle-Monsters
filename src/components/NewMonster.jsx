import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";

import apiCall from './apiCall';
import CardNewMonster from './CardNewMonster';
import SelectMonster from './SelectMonster';


class NewMonster extends React.Component {
    constructor() {
        super();
        this.state = {
            listMonsters: [],
            selectIsClosed: true,
            selectedMonster: {}
        };

        this.handleSelectIsClosed = this.handleSelectIsClosed.bind(this)
        this.getMonster = this.getMonster.bind(this)
    }

    componentDidMount() {
        apiCall
            .get('/item/gogetthat')
            .then(res => {
                const datas = res.data;
                this.setState({ listMonsters: datas });
            })
            .catch(err => console.log(err));
    };

    handleSelectIsClosed() {
        const selectIsClosed = this.state;
        console.log(selectIsClosed)
        this.setState({ selectIsClosed: !this.state.selectIsClosed })
    }

    getMonster(monsterId) {
        const monster = this.state.listMonsters.find(monster => monster.id === monsterId)
        this.setState({ selectedMonster: monster })
    }


    render() {
        const { listMonsters } = this.state
        const { selectIsClosed } = this.state

        if (selectIsClosed) {
            console.log(this.state.selectIsClosed)
            return (
                <Col xs={12}>
                    <Button className="fixed" onClick={this.handleSelectIsClosed}>New Monster</Button>
                </Col>
            )
        } else {
            console.log(this.state.selectIsClosed)
            return (
                <Col xs={12} className="justify-content-center">
                    <Button onClick={this.handleSelectIsClosed}>New Monster</Button>
                    <SelectMonster monsters={this.state.listMonsters} getMonster={this.getMonster} />
                    <Row className="justify-content-center">
                        <CardNewMonster  {...this.state.selectedMonster} />
                    </Row>
                    <Link to={{
                        pathname: "/create",
                        state: { ...this.state.selectedMonster }
                    }}>
                        <Button>Create New Monster</Button>
                    </Link>
                </Col>
            );
        }
    }
}


export default NewMonster;