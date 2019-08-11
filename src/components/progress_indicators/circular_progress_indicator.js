import React from 'react';

export default class CircularProgressIndicator extends React.Component{

    render(){
        return (
            <div 
                className="lds-ring"  
                // src='/assets/images/nerd-logo.png' 
                style={{ 
                    margin : this.props.margin || '20px'
                }}
            >
                <div></div><div></div><div></div><div></div>
            </div>
        );
    }
}