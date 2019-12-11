import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="jtk-sidebar">
        <div data-node-type="question" className="jtk-sidebar-item">
          Question
        </div>
        <div data-node-type="action" className="jtk-sidebar-item">
          Action
        </div>
        <div data-node-type="output" className="jtk-sidebar-item">
          Output
        </div>
      </div>
    );
  }
}

export default Sidebar;
