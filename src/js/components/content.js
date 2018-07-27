
import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

export default class Content extends Component {

    constructor(props) {
        super(props);

        //чтобы не отрисовывать при каждой перерисовкe матрицы
        this.header = <Header className = 'content__header '/>;
        this.main = <Main />;
        this.footer = <Footer />;
    }

    render() {
        console.log('render content');
        
        const contentClass = 'content ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {contentClass}>
                {this.header}
                {this.main}
                {this.footer}
            </div>
        )
    }
}