import React from 'react';

export default class SafeArea extends React.Component{

    constructor (props) {
        super(props);
        this.padding = 20;
        this.paddingTwo = this.padding*2;
    }
    render(){
        return (
            <div 
                style={{
                    padding: this.props.padding || '20px',
                    alignItems: this.props.alignItems ||'center',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100% - 40px)',
                    width: 'calc(100% - 40px)',
                    marginTop: this.props.marginTop,
                    placeContent: this.props.placeContent,
                    margin: this.props.margin,
                }} 
                className="safe-area"
                ref={ this.props.referance } >
                {this.props.children}
            </div>
        );
    }
}