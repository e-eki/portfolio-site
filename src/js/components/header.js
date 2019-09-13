'use strict';

import React, { Component } from 'react';
import Logo from './logo';

export default class Header extends Component {

    render() {
        //console.log('render header');
        const headerClass = 'header ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {headerClass}>
                <Logo className = 'header__logo '/>

                 <div className = "header__title">
                    <h1><span className = "header__title_caption-letter">С</span>айт&#8209;портфолио <span className = "header__title_caption-letter">В</span>еб&#8209;разработчика</h1>
                </div>
            </div>
        )
    }
}