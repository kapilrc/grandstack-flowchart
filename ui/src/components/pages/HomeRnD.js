import React, { Component } from "react";
// import "../../../node_modules/jsplumb/css/jsplumbtoolkit-defaults.css";
import { jsPlumb } from "jsplumb";
import "../../css/Home.css";
import Sidebar from "../layout/Sidebar";
import DataSet from "../layout/DataSet";

import chartData from "../../db/db.json";
// import AppDragDropDemo from "./AppDragDropDemo";

class Home extends Component {
  state = {
    nodes: [],
    edges: []
  };

  componentDidMount() {
    console.log(chartData);
    this.setState({
      nodes: chartData.nodes,
      edges: chartData.edges
    });
    jsPlumb.bind("ready", function() {
      console.log("jsPlumb rebind");

      jsPlumb.importDefaults({
        Connector: ["Flowchart", { cornerRadius: 5 }],
        PaintStyle: { strokeWidth: 4, stroke: "rgb(243, 53, 0)" },
        HoverPaintStyle: { stroke: "rgb(0, 0, 135)" },
        EndpointStyle: { width: 10, height: 10 },
        Endpoint: "Rectangle"
      });
      jsPlumb.connect({
        source: "window1",
        target: "window2",
        anchors: ["Bottom", "Top"],
        paintStyle: { strokeWidth: 4, stroke: "rgb(243, 53, 0)" }
      });

      jsPlumb.connect({
        source: "window3",
        target: "window4",
        anchors: ["Right", "Right"],
        paintStyle: { strokeWidth: 4, stroke: "rgb(243, 53, 0)" }
      });
    });
  }

  render() {
    return (
      <div className="jtk-main">
        <section className="flex">
          <Sidebar />
          <div className="jtk-canvas">
            <div className="jtk-surface jtk-surface-panning">
              <div id="window1" className="element">
                Element 1
              </div>
              <div id="window2" className="element">
                Element 2
              </div>

              <div id="window3" className="element">
                Window 3
              </div>
              <div id="window4" className="element">
                Window 4
              </div>
            </div>
            <DataSet />
            {/* <AppDragDropDemo /> */}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
