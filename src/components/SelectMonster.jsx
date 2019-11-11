import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

function SelectMonster({ monsters, getMonster }) {
    const [monster, setMonster] = useState("Choose your monster to customize")

        return (
        <>   
        <FormGroup className="row justify-content-center">
        <Label for="selectMonster">Choose your monster to customize :</Label>
        <select className="row justify-content-center" value={monster} onChange={e => getMonster(e.target.value)}>
          {
              monsters.map(monster => {
                  return <option value={monster.id}>{monster.name}</option>
              })
          }
        </select>
      </FormGroup>
      </>
    )
}

export default SelectMonster;