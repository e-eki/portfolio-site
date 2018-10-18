import React, { Component } from 'react';

export default class Logo extends Component {

    constructor(props) {
        super(props);

        this.turningVariants = ['eeki', 'ekie', 'ieek', 'kiee', 'keei', 'eeik', 'ekei', 'ikee', 'eiek'];
        this.variantNum = 0;

        this.state = {
            turningVariant: this.turningVariants[0],
        }

        this.prevTime = null;
        this.turnLogo = this.turnLogo.bind(this);
    }

    turnLogo(event) {
        var now = (new Date()).getSeconds();
        var interval = now - this.prevTime;
        this.prevTime = now;

        // чтобы не мельтешило сменой букв
        if (interval < 1) return;

        this.variantNum ++;
        if (this.variantNum == this.turningVariants.length) this.variantNum = 0;
        
        this.setState({turningVariant: this.turningVariants[this.variantNum]});
    }

    componentDidMount() {
        this.triangle.addEventListener('mousemove', this.turnLogo);
    }

    render() {
        //console.log('render logo');

        const logoClass = 'logo ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {logoClass}>
                <div  ref={elem => this.triangle = elem} className = 'triangle'>
                    <div className="triangle__side triangle__side_left">{this.state.turningVariant[0]}</div>
                    <div className="triangle__side triangle__side_bottom">{this.state.turningVariant[1]}</div>
                    <div className="triangle__side triangle__side_right">{this.state.turningVariant[2]}</div>           
                    <div className="triangle__side triangle__side_front">{this.state.turningVariant[3]}</div>
                </div>
            </div>
        )
    }
}