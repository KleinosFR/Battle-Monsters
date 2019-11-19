import React from 'react';
import { Card } from 'reactstrap';

function CardNewMonster({name, picture, attack, defense}) {
    return (
        <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt={name} src={picture} />}
        >
            <h3>{name}</h3>
            <p>PV : {defense}</p>
            <p>Attack : {attack}</p>
        </Card>
    )
}


export default CardNewMonster;