import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";

import apiCall from '../components/apiCall';
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
                this.setState({ listMonsters: datas })
                this.setState({selectedMonster : datas[0]});
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
        const { listMonsters, selectIsClosed, selectedMonster } = this.state

        if (selectIsClosed) {
            console.log(selectIsClosed)
            return (
                <Col xs={12} >
                    <Button className="fixed" onClick={this.handleSelectIsClosed}>New Monster</Button>
                </Col>
            )
        } else {
            console.log(selectIsClosed)
            return (
                <Col xs={12} className="justify-content-center">
                    <Button  onClick={this.handleSelectIsClosed}>New Monster</Button>
                    <SelectMonster monsters={listMonsters} getMonster={this.getMonster} />
                    <Row className="justify-content-center">
                        <CardNewMonster  {...selectedMonster} />
                    </Row>
                    <Link to={{
                        pathname: "/create",
                        state: { ...selectedMonster }
                    }}>
                        <Button>Create New Monster</Button>
                    </Link>
                </Col>
            );
        }
    }
}


export default NewMonster;