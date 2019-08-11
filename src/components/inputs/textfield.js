import React from 'react';

export default class TextField extends React.Component{
    constructor (props) {
        super(props);
    }

    render(){
        const props = this.props;
        return (
            <div className="text-field">
                <h3>{this.label}</h3>
                <input
                    onBlur={props.onBlur}
                    onFocus={props.onFocus}
                    type={props.inputType || 'text'} 
                    name={props.databaseId} 
                    id={props.id}
                    placeholder={props.placeholder} 
                    value={props.value} 
                    autoComplete="true"
                    required = {props.required}
                    onChange={value => props.handleChange(value)}/>
            </div>
        );
    }
}