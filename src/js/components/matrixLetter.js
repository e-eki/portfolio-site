'use strict';

import React, { Component } from 'react';
//import {Motion, spring} from 'react-motion';

export default class MatrixLetter extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log('letter shouldComponentUpdate');
        return (nextProps.opacity !== this.props.opacity || nextProps.class !== this.props.class);
    }
    
    render() {
        //console.log('render letter');
        const letterStyle = { opacity: this.props.opacity };
        
        return <div className={this.props.class} style={letterStyle}>{this.props.letterContent}</div>;
        /*return (
            <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(this.props.opacity)}}>
                {interpolatingStyle => <div className={this.props.class} style={interpolatingStyle}>{this.props.letterContent}</div>}                
            </Motion>
        )*/
    }
}