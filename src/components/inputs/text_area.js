
import React from 'react';

export class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <textarea
                style={{
                    padding: this.props.padding || '20px',
                    borderRadius: this.props.borderRadius || '10px',
                    width: this.props.width
                }}
                type='text'
                name= {this.props.name}
                value={this.props.value}
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete || 'true'}
                onChange={e => this.props.handleChange(e)}
            />
        );
    }
}