import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { getFile, updateFile, type UUID } from "../../../backend/src/utilities";

interface EditorProps {
    id: UUID
}

export default function MarkdownEditor({ id }: EditorProps) {
    const [ contents, setContents ] = useState<string>("");

    useEffect(() => {

        async function getFileHelper() {
            try {
                const markdownString = await getFile(id);
                setContents(markdownString);
            } catch (err) {
                setContents("Click a Node to edit it!");
            }
        }

        getFileHelper();

    }, [id]);

    useEffect(() => {
        async function updateHelper() {
            await updateFile(null, id, contents);
        }

        updateHelper();

    }, [contents])

    async function handleContentChange(value?: string) {

        if (value) setContents(value);
        else setContents('');

    }

    return (
        <MDEditor 
        value={contents}
        onChange={handleContentChange}
        />
    );
}