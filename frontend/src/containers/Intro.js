import React, { Component } from "react";
import { Button } from 'reactstrap';

import Player from '../components/Player';
import Captain from '../components/Captain';

export default class Intro extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
    render(){

        return (
            <div className='post'>
                <h1 className='post-title'>關於球隊</h1>
                <h3>隊長</h3>
                <Captain />
                <div>
                    <h3>現任隊員</h3>
                    <Player />
                </div>
            </div>
        )
    }
}