import React, { Component } from "react";
import { jsPlumb } from "jsplumb";

class NodeItem extends Component {

  componentDidMount() {
    
    const { node } = this.props;

    jsPlumb.getInstance().draggable(node.id);
  }

  componentDidUpdate(){
    
    const { node, edges } = this.props;
    
    jsPlumb.bind("ready", function() {
        let el = document.getElementById(node.id);
        let outer = el.getElementsByClassName('outer')[0]; 
        let inner = el.getElementsByClassName('inner')[0];

        let instance = jsPlumb.getInstance();

        // instance.connect({ source: "opened", target: "phone1", type:"basic" })

        // console.log(outer, inner)
        // instance.draggable(el, {
        //   containment: 'parent'
        // });
        
        // if(outer){
        //   jsPlumb.makeSource(el, { //'outer_'+node.id 
        //     parent: el,
        //     anchor: 'Continuous'
        //   });
        // }
        
        // if(inner) {
        //   // jsPlumb.getInstance().draggable(inner, {
        //   //   containment: 'parent'
        //   // });
        //   jsPlumb.makeTarget(el, {
        //     anchor: "Continuous"
        //   });
        // }
    });
  }

  render() {
    const { node } = this.props;

    let svgItem;

    if(node.type === "start"){
      svgItem = (
        <div>
          <svg width={node.w} height={node.h}>
            <ellipse cx={node.w / 2} cy={node.h / 2} rx={node.w / 2} ry={node.h / 2} className="outer"/>
            <ellipse cx={node.w / 2} cy={node.h / 2} rx={(node.w /2) - 10} ry={(node.h/2) - 10} className="inner"/>
            <text textAnchor="middle" x={node.w / 2} y={ node.h / 2 } dominantBaseline="central">{node.text}</text>
          </svg>
        </div>
      )
    }else if(node.type === "question"){
      svgItem = (
        <div>
          <svg width={node.w} height={node.h}>
            <path d={'M' +  (node.w/2) + ' 0 L ' + node.w + ' ' +  (node.h/2) + ' L ' + (node.w/2) + ' ' + node.h + '  L 0 ' + (node.h/2) + '  Z'} className="outer"/>
            <path d={'M' +  (node.w/2) + ' 10 L ' + (node.w - 10) + ' ' +  (node.h/2) + ' L ' + (node.w/2) + ' ' + (node.h - 10) + '  L 10 ' + (node.h/2) + '  Z'} className="inner"/>
            <text textAnchor="middle" x={node.w/2} y={node.h/2} dominantBaseline="central">{node.text}</text>
          </svg>
        </div>
      )
    }else if(node.type === "action") {
      svgItem = (
        <div>
          <svg width={node.w} height={node.h}>
            <rect x={0} y={0} width={node.w} height={node.h} className="outer drag-start"/>
            <rect x={10} y={10} width={node.w-20} height={node.h-20} className="inner"/>
            <text textAnchor="middle" x={node.w/2} y={node.h/2} dominantBaseline="central">{node.text}</text>
          </svg>
        </div>
      )
    }else {
      svgItem = (
        <div>
          <svg width={node.w} height={node.h}>
            <rect x={0} y={0} width={node.w} height={node.h}/>
            <text textAnchor="middle" x={node.w/2} y={node.h/2} dominantBaseline="central">{node.text}</text>
          </svg>
        </div>
      )
    }

    return (
      <div
        className={"element " + node.type}
        key={node.type} id={node.id}
        style={{
          position: "absolute",
          left: node.left,
          top: node.top,
          width: node.w,
          height: node.h
        }}
      >
        <div className={'flowchart-object flowchart-'+node.type + ' jtk-node'}>
          {svgItem}
        </div>
      </div>
    );
  }
}

export default NodeItem;
