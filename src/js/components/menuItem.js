
import React, { Component } from 'react';

export default class MenuItem extends Component {

    shouldComponentUpdate(nextProps) {
        //console.log('shouldComponentUpdate item');

        return false;
    }

    render() {
        //console.log('render item');
        const menuClass = 'menu__item ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {menuClass}>
                <div className = "item-decor" data-hover = {this.props.text}>
                    {this.props.text}
                </div>
            </div>
        )
    }
}