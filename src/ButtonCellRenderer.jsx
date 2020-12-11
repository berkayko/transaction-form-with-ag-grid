import React, {Component} from 'react';

class ButtonCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
   this.props.clicked;
  }
  render() {
    return (
      <div><button onClick={this.props.clicked}>Edit</button>
      <button onClick={this.props.deleteClick}>Delete</button></div>

    )
  }
}

export default ButtonCellRenderer;