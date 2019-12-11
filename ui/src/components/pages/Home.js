import React, { Component } from "react";
import { jsPlumb } from "jsplumb";
import "../../css/Home.css";
import Sidebar from "../layout/Sidebar";
import DataSet from "../layout/DataSet";

import chartData from "../../db/db.json";
import NodeItem from "./NodeItem";

class Home extends Component {
  state = {
    nodes: [],
    edges: [],
    jsInstance: null
  };

  componentDidUpdate() {
    const { nodes, edges, jsInstance } = this.state;
    console.log("edges", edges);
    jsPlumb.bind("ready", function() {
      edges.forEach((e, idx) => {
        jsPlumb.connect({
          source: e.source,
          target: e.target,
          paintStyle: { strokeWidth: 2, stroke: "rgb(243, 53, 0)" },
          overlays:e.data.label ? [ 
            [ "Arrow", { width:10, length:10, location: 1, id:"arrow" } ],
            [ "Label", {label:e.data.label, id:"label"+idx}] ] : [[ "Arrow", { width:10, length:10, location: 0.8, id:"arrow" } ] ]
        });
        jsPlumb.makeTarget(document.getElementsByClassName("element"), {
          anchor: "Continuous"
        });
      });

      nodes.forEach(n => {
        jsInstance.draggable(n.id)
      })
    });
  }

  componentDidMount() {
    this.setState({
      nodes: chartData.nodes,
      edges: chartData.edges,
      jsInstance: jsPlumb.getInstance()
    });

    jsPlumb.bind("ready", function() {
      jsPlumb.importDefaults({
        Connector: ["Flowchart", { cornerRadius: 5 }],
        PaintStyle: { strokeWidth: 2, stroke: "rgb(243, 53, 0)" },
        HoverPaintStyle: { stroke: "rgb(0, 0, 135)" },
        EndpointStyle: { width: 10, height: 10 },
        Endpoint: "Blank"
      });
    });
  }

  render() {
    const { nodes, edges } = this.state;
    console.log(nodes, edges);

    return (
      <div className="jtk-main">
        <section className="flex">
          <Sidebar />
          <div className="jtk-canvas">
            <div className="jtk-surface jtk-surface-panning">
              {nodes.map(node => (
                <NodeItem key={node.id} node={node} />
              ))}
            </div>
            <DataSet />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
