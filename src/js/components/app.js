
import React, { Component } from 'react';
import MatrixWrapper from './matrixWrapper';

export default class App extends Component {

    render() {

        return (
            <div className = 'page'>
                <MatrixWrapper height = {this.props.height} width = {this.props.width}/>
            </div>
        )
    }
}




