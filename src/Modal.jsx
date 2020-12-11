import React, { Component } from 'react';
class Modal extends Component {
    constructor(props) {
      super(props);
     
    }
    btnClickedHandler() {
     this.props.clicked;
    }
    render() {
      return (
        <div>
            <p>Are you sure?</p>
            <button onClick={this.props.clickedYes}>Confirm</button>
            <button onClick={this.props.clickedNo}>Cancel</button>
        </div>
  
      )
    }
  }
  
  export default Modal;