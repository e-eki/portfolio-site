'use strict';

import React, { Component } from 'react';
import Matrix from './matrix';

export default class App extends Component {

    render() {

        return (
            <div className = 'page'>
                <Matrix height = {this.props.height} width = {this.props.width}/>
            </div>
        )
    }
}




