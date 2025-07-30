import { useState, useEffect } from 'react';
import { getNodes, getLinks } from "../../../backend/src/utilities";

import ForceGraph3D from "react-force-graph-3d";


interface GraphProps {
    handleClick: (id: string) => void;
    className?:string;
}


interface GraphData {
  nodes: { title: string, id: string, [key: string]: any }[],
  links: { source: string, target: string, [key: string]: any }[]
}

export default function GraphView({ handleClick, className }: GraphProps) {
    const [graphData, setGraphData] = useState<GraphData>({nodes: [{title:"hello2", id:"hello2"}], links: []});
    const [isloading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetchData() {
            const nodes = await getNodes();
            const links = await getLinks();
            setGraphData({nodes: nodes, links: links});
            setIsLoading(false);
        }

        fetchData();

    }, []);

    if (isloading) return <h1>LOADING</h1>;
    else {
        return (
            <ForceGraph3D 
            graphData={graphData}
            nodeLabel={(node) => node.title}
            onNodeClick={(node) => handleClick(node.id)}
            linkOpacity={0.5}
            />
        );
    }

}