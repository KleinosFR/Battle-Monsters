import React, {Component} from 'react';

import './header.css'


class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            isHover : false,
}
        this.handleHover = this.handleHover.bind(this)

    }

    handleHover(){
        const newHover = !this.state.isHover
        this.setState({isHover : newHover})


    }
    render(){


        if (this.state.isHover){
            return(
        <div className="rowHeader1" onMouseOver={() => this.handleHover()}>
            Hackathon m'a tuer
        </div>    
                

            )
        }
        else {
            return(

                <div className="rowHeader" onMouseOver={() => this.handleHover()}>
            Battle Monsters
        </div>
            )


        }

        
            
    }
}

export default Header;