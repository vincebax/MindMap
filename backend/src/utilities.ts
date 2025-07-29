import axios from 'axios';

export type UUID = string;

export const API_URL = 'http://localhost:3000';

export interface Node {
    id: UUID,
    title: string,
    file_link: string
}

export interface Link {
    id: UUID,
    source: UUID,
    target: UUID
}

export async function getNodes(): Promise<{ title: string, id: string , [key: string]: any }[]> {
    const res = await axios.get(`${API_URL}/nodes`);
    const data = res.data as Node[];
    return data.map(node => ({ title: node.title, id : node.id }));
}

export async function getLinks(): Promise<{ source: string, target: string, [key: string]: any }[]> {
    const res = await axios.get(`${API_URL}/links`);
    const data = res.data as Link[];
    return data.map(link => ({ source : link.source, target : link.target }));
}

export async function getFile(id: UUID): Promise<string> {

    const res = await axios.get(`${API_URL}/files/${id}`);
    const data = res.data as string;
    return data;

}

export async function updateFile(title: string | null = null, id: UUID, data: string): Promise<void> {
    const requestBody = title ? {'title' : title, 'newContent': data} : {'newContent' : data};
    const res = await axios.patch(`${API_URL}/nodes/${id}`, requestBody);
    console.log(res);
    console.log('finished patching');
}