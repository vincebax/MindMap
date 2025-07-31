import { useState, useEffect } from 'react';
import { getNodes, getLinks } from "../../../backend/src/utilities";


interface GraphData {
  nodes: { title: string, id: string, [key: string]: any }[],
}

//Could just have a refresh button that handles updating the form

export default function Nodeslist({nodes}: GraphData){
    const [node, setNodes] = useState(nodes);

    //This will be async to grab the actual data
    function handleRefreshList (){
          //const newNodes = await getNodes();
          setNodes([{title:"bob", id:"asdlk",}, {title:"jimmy", id:"asdlk",}])
    }

    function handleDefaultRefresh(e){
        e.preventDefault();
    }

    return(
        <div>
        <form onSubmit={handleDefaultRefresh}>
        <ul>
        {/* Maps over the grabbed nodes (right now its dummy data) and creates a list elemnt with an checkbox input and will submit the id of the node. All of them are related, so they are sent under "checked-Nodes" */}
        {node.map((nodeObject) =>{
        return(
            <div className="inline-field"> {/* Makes this whole thing inline later on in css cuz right now its rendering below */}
            <li id = {nodeObject.title}><input type="checkbox" value ={nodeObject.id} name="checked-Nodes"/></li>
            <label htmlFor={nodeObject.title}>{nodeObject.title}</label>
            </div>
            )}
            )
        }
        </ul>
        <button>Submit</button>
        </form>
        <button onClick ={handleRefreshList}>Refresh Nodes</button>
        </div>
    )
}