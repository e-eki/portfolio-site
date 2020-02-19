'use strict';

import React, { Component } from 'react';

export default class MatrixColumn extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        ////console.log('shouldComponentUpdate');
        return (this.props.columnContent.length !== 0);
    }

    render() {
        //console.log('========render column');
        return (
            <div className="matrix__column">
                {this.props.columnContent}
            </div>
        );
    }
}