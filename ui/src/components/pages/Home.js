import React, { Component } from "react";
import { jsPlumb } from "jsplumb";
import Sidebar from "../layout/Sidebar";
import DataSet from "../layout/DataSet";

import chartData from "../../db/db.json";
import NodeItem from "./NodeItem";

// import Utils from "../../common/Utils"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      edges: []
    };
  }

  componentDidUpdate() {
    const { edges } = this.state;
    console.log("edges", edges);

    jsPlumb.bind("ready", function() {
      console.log("get connections ", jsPlumb.getConnections())

      edges.forEach((e, idx) => {

        // jsPlumb.addEndpoint(e.source, {uuid: e.source})
        // jsPlumb.makeTarget( e.target );  
        
  
        jsPlumb.connect({
          source: e.source,
          target: e.target,
          paintStyle: { strokeWidth: 2, stroke: "rgb(243, 53, 0)" },
          overlays:e.data.label ? [ 
            [ "Arrow", { width:10, length:10, location: 1, id:"arrow"+idx } ],
            [ "Label", {label:e.data.label, id:"label"+idx}] ] : [[ "Arrow", { width:10, length:10, location: 0.8, id:"arrow"+idx } ] 
          ],
          // endpoint:"Rectangle",
          anchors: ["BottomCenter", "TopCenter", "LeftCenter", "RightCenter"],
          connector:"Flowchart" //,
          // anchor: "AutoDefault"
        });
      });
      
    });
  }

  componentDidMount() {
    this.setState({
      nodes: chartData.nodes,
      edges: chartData.edges
    });

    jsPlumb.bind("ready", function() {
      jsPlumb.importDefaults({
        Connector: ["Flowchart", { cornerRadius: 5 }],
        PaintStyle: { strokeWidth: 2, stroke: "rgb(243, 53, 0)" },
        HoverPaintStyle: { stroke: "rgb(0, 0, 135)" },
        EndpointStyle: { width: 10, height: 10 },
        Endpoint: "Blank", 
        dragAllowedWhenFull:false
      });
    });

    // jsPlumb.setContainer('zoomContainer'); jsPlumb.getContainer()
    // let zoomContainer = document.getElementById('zoomContainer'), zoomLevel = 1;
    // zoomContainer.addEventListener('wheel', (e) => {
    //   console.log(e)
    //   if(e.deltaY < 0){
    //     zoomLevel = zoomLevel + 0.01; 
    //     jsPlumb.getContainer().firstElementChild.style.zoom = zoomLevel;
    //   }else if(e.deltaY > 0){
    //     zoomLevel = zoomLevel - 0.01; 
    //     jsPlumb.getContainer().firstElementChild.style.zoom = zoomLevel;
    //   }
    // });

  }

  render() {
    const { nodes } = this.state;
    console.log(nodes);

    return (
      <div className="jtk-main">
        <section className="flex">
          <Sidebar />
          <div className="jtk-canvas">
            <div id="zoomContainer" className="jtk-surface jtk-surface-panning">
            {nodes.map(node => (
                <NodeItem key={node.id} node={node} />
              ))
            }
            </div>
            <DataSet />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
