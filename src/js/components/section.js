'use strict';

import React, { Component } from 'react';

export default class Section extends Component {

    shouldComponentUpdate(nextProps) {
        //console.log('shouldComponentUpdate section');

        return (nextProps.num == this.props.num && nextProps.heading !== this.props.heading);
    }

    render() {
        
        //console.log('render section ' + this.props.hiddenText);
        const sectionClass = 'section ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {sectionClass}>
                <h2 className ="section__heading" num = {this.props.num} hidden-text = {this.props.hiddenText}>
                    {this.props.heading}
                    <span className ="section__heading_blinking">_</span>
                </h2>                    
                <div className ="section__description section__description_shown">
                    {(this.props.shownDescription) ? this.props.shownDescription : ''}
                </div>
                <div className ="section__description section__description_hidden">
                    {this.props.hiddenDescription}
                </div>                    
            </div>
        )
    }
}