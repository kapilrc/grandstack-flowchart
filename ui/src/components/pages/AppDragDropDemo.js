import React, { Component } from "react";
import "../../css/AppDragDropDemo.css";

class AppDragDropDemo extends Component {
  state = {
    tasks: [
      { name: "React", category: "complete", bgcolor: "pink" },
      { name: "Apollo", category: "wip", bgcolor: "#c1f7c6" },
      { name: "GraphQL", category: "complete", bgcolor: "skyblue" },
      { name: "Neo4j", category: "wip", bgcolor: "yellow" },
      { name: "Cypher", category: "wip", bgcolor: "#fc9cff" }
    ]
  };

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, category) => {
    let id = ev.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter(t => {
      if (t.name === id) {
        t.category = category;
      }
      return t;
    });
    console.log("state");

    this.setState({
      ...this.state,
      tasks
    });
    console.log(this.state);
  };

  render() {
    var tasks = {
      wip: [],
      complete: []
    };

    this.state.tasks.forEach(t =>
      tasks[t.category].push(
        <div
          draggable
          key={t.name}
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
          onDragStart={e => this.onDragStart(e, t.name)}
        >
          {t.name}
        </div>
      )
    );
    return (
      <div className="container-drag">
        <h2>DRAG & DROP DEMO</h2>
        <div
          className="wip"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "wip")}
        >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div
          className="droppable"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "complete")}
        >
          <span className="task-header">Completed</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}

export default AppDragDropDemo;
