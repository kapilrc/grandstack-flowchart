import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li data-node-type="question">
            <span>Question</span>
          </li>
          <li data-node-type="action">
            <span>Action</span>
          </li>
          <li data-node-type="output">
            <span>Output</span>
          </li>
        </ul>
        
      </div>
    );
  }
}

export default Sidebar;
