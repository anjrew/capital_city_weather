import React from 'react';

export default class Row extends React.Component{

    render(){
        return (
            <div 
                id={this.props.id}
                className="row" 
                style={{ 
                    height: this.props.height,
                    flex: this.props.flex,
                    boxSizing: this.props.boxSizing,
                    minWidth: this.props.minWidth,
                    minHeight: this.props.minHeight,
                    maxHeight: this.props.maxHeight,
                    maxWidth: this.props.maxWidth,
                    display: this.props.display || 'flex', 
                    flexDirection: 'row',
                    alignItems: this.props.alignItems || 'center',
                    width: this.props.width || '100%',
                    backgroundColor: this.props.backgroundColor,
                    padding: this.props.padding,
                    placeContent: this.props.placeContent || 'center space-between',
                    margin: this.props.margin,
                    transform: this.props.transform,
                    borderBottomStyle: this.props.borderBottomStyle,
                    border: this.props.border,
                    borderRadius: this.props.borderRadius,
                    boxShadow: this.props.boxShadow,
                    borderTop: this.props.topBorder || this.props.borderTop ,
                    borderBottom: this.props.bottomBorder || this.props.borderBottom ,
                }}
                onClick={this.props.onClick}
            >
                { this.props.children }
            </div>
        );
    }
}