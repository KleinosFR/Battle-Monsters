import React, {Component} from "react"
import {Row} from "reactstrap"

import apiCall from "../components/apiCall"
import ExistingMonster from "./ExistingMonster";

class ExistingMonsters extends Component{
        constructor(props){
            super(props);
            this.state = {
                monsterList : [],
                error : "",
                userHasMonster : false,
                user : ""
            }
        }
    componentDidMount(){

        const user = localStorage.getItem('username')
        this.setState({user, user})
        apiCall.get(`/user/gogetthisone/${user}`)
        .then (res => 
            {
            const list = res.data
            const hasMonsters = (list[0].id !== null)
            console.log("hasMonsters " +  hasMonsters);
            console.log(list)
            this.setState({ monsterList : list,
                            userHasMonster : hasMonsters})
            
        })
        .catch(err => {
            this.setState({ error : err,
                            userHasMonster : false})

        })


    }
    
    render() 
    {

        const {monsterList, error, userHasMonster} = this.state
        console.log("monsterlist 0 name " + monsterList[0]);
        console.log("render hasmonster" + {userHasMonster});
        

if (userHasMonster){

    return(
        <Row className="p-2">
            <Row className="justify-content-center w-100"><h2 className="w-100 text-center text-warning">My monsters</h2></Row>
            <Row>
            {monsterList.map(monster => {
                return <ExistingMonster {...monster} />}
)}
            </Row></Row>
    )

}
else {
        return(
            <Row className="text-center text-white col xs-12">

            <h4 className="text-center text-white col xs-12">You don't have any monster yet, please create one</h4>
            
            </Row>
    )
    }
}
}





export default ExistingMonsters