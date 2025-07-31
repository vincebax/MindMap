import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { getFile, updateFile, type UUID } from "../../../backend/src/utilities";
import Nodeslist from "./Nodeslist";




interface EditorProps {
    id: UUID
}

export default function MarkdownEditor({ id}: EditorProps) {
    const [ contents, setContents ] = useState<string>("");

    useEffect(() => {

        async function getFileHelper() {
            try {
                const markdownString = await getFile(id); //Set by an onNodeClick event in the GraphView component and grabs the corresponding markdown content
                setContents(markdownString);
            } catch (err) {
                setContents("Click a Node to edit it!");
            }
        }

        getFileHelper();

    }, [id]); //if id changes rerender

    useEffect(() => {
        async function updateHelper() {
            await updateFile(null, id, contents);
        }

        updateHelper();

    }, [contents]) //updates every time contents changes

    async function handleContentChange(value?: string) {

        if (value) setContents(value);
        else setContents('');

    }


    return (
        <div>
        <MDEditor 
        value={contents}
        onChange={handleContentChange}
        />
        <Nodeslist nodes={[{title:"bob", id:"bob2"}]}/>
        </div>
    );
}