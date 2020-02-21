import React, { Component } from 'react';
import './Error.css';

class Error extends Component{
  render(){
    return (
      <div className="Error">
        <span>{this.props.errorMessage}</span>
      </div>
    );
  }
}

export default Error;
