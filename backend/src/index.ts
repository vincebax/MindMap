import express from 'express';
import { createClient } from '@supabase/supabase-js';
import {  v4 as uuidv4, validate as uuidValidate } from 'uuid';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path'

dotenv.config();

const supabaseUrl = process.env.SUPABASE_API_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !serviceKey) {
    console.log('error retrieving supabase credentials');
}

const supabase = createClient(supabaseUrl, serviceKey);

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

type UUID = string;

interface AddNodeRequestBody {
    origin: UUID
    title: string
};

interface UpdateNodeRequestBody {
    title: string,
    newContent: string
}

app.get('/nodes', async (req, res) => {

    const { data, error } = await supabase
    .from('Nodes')
    .select('id, title, file_link')

    if (error) {
        return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
    }

    res.json(data); // [0] because there should only ever be one entry with a given uuid

});

app.get('/nodes/:id', async (req, res) => {

    /**
     * 
     * endpoint to fetch a node from the local database
     * 
     * params (url):
     * id - uuid corresponding to the node of interest
     *
     * returns:
     * object corresponding to the node data
     *  
     */
    
    if (uuidValidate(req.params.id)) {
        const { data, error } = await supabase
        .from('Nodes')
        .select('id, title, file_link')
        .eq('id', req.params.id)

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        res.json(data[0]); // [0] because there should only ever be one entry with a given uuid

    } else {
        if (!uuidValidate(req.params.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }

});

app.post('/nodes', async (req, res) => {

    /**
     * 
     * endpoint to insert nodes into the local database
     * 
     * params (request body):
     * origin - the node you are connecting the new node to (default of null)
     * title - title of the new node you are inserting
     *
     * returns:
     * nothing
     *  
     */

    const newNode: AddNodeRequestBody = req.body;
    
    if (newNode && typeof newNode === 'object' && newNode.title) {

        const newNodeId = uuidv4();

        // dump the temporary file to the supabase bucket with correct naming
        const file_link = await emptyFileToBucket(newNodeId, 'markdown-files');

        // insert given data to the nodes database
        const { error } = await supabase
        .from('Nodes')
        .insert({ id: newNodeId, title: newNode.title, file_link: file_link });

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        if (newNode.origin) {
            const newEdgeId = uuidv4();
            const { error } = await supabase
            .from('Links')
            .insert({ id: newEdgeId, source: newNode.origin, target: newNodeId });

            if (error) {
                return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
            }
        }

        return res.send('Successful addition');
    }

    return res.status(400).send("Invalid body format");

});

app.patch('/nodes/:id', async (req, res) => {

    /**
     * 
     * endpoint to update node in the local database
     * 
     * params (request body):
     * title - new title you want the node to have
     * bufferBase64 - base64 encoded string that represents the new version of the file you want to update storage to
     *
     * returns:
     * nothing
     *  
     */
    
    const newNodeData: UpdateNodeRequestBody = req.body;

    if (newNodeData && typeof newNodeData === 'object' && uuidValidate(req.params.id)) {

        // update title if it needs updating

        console.log(req.body);

        if (newNodeData.title) {
            const { error } = await supabase
            .from('Nodes')
            .update({ 'title': newNodeData.title })
            .eq('id', req.params.id);

            if (error) {
                return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
            }
        }

        // update the associated bucket storage if there is a new file version provided

        if (newNodeData.newContent) {
            
            // make a buffer from the base64 encoded string passed
            const fileBuffer = Buffer.from(newNodeData.newContent, 'utf-8');

            await givenFileToBucket(req.params.id, fileBuffer, 'markdown-files');
        }

        return res.send("Successful update");

    } else {
        if (!uuidValidate(req.params.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }
    
});

app.delete('/nodes/:id', async (req, res) => {

    /**
     * 
     * endpoint to delete nodes from the local database
     * 
     * params (url):
     * id - uuid corresponding to the node of interest
     *
     * returns:
     * nothing
     *  
     */

    if (uuidValidate(req.params.id)) {

        // get a reference to the target node

        const { data, error } = await supabase
        .from('Nodes')
        .select('id, title, file_link')
        .eq('id', req.params.id)

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        const target = data[0];

        // delete corresponding entry in the data bucket (no check since one is created on every addition)

        await deleteGivenBucketEntry(target.file_link, 'markdown-files');

        // delete entry from the Nodes table
        
        const response = await supabase
        .from('Nodes')
        .delete()
        .eq('id', req.params.id)

        if (response.error) {
            const error = response.error;
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        };

        return res.send('Successful deletion');

    } else {
        if (!uuidValidate(req.params.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }

});

app.get('/links', async (req, res) => {

    const { data, error } = await supabase
    .from('Links')
    .select('id, source, target');

    if (error) {
        return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
    }

    res.json(data); // [0] because there should only ever be one entry with a given uuid

});

app.get('/links/:id', async (req, res) => {
    /**
     * 
     * endpoint to fetch edge data from the local database
     * 
     * params (request body):
     * id - uuid corresponding to the edge of interest
     *
     * returns:
     * nothing
     *  
     */
    
    if (uuidValidate(req.params.id)) {
        const { data, error } = await supabase
        .from('Links')
        .select('id, source, target')
        .eq('id', req.params.id)

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        res.json(data[0]); // [0] because there should only ever be one entry with a given uuid
    } else {
        if (!uuidValidate(req.params.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }
});

app.get('/files/:id', async (req, res) => {

    if (uuidValidate(req.params.id)) {

        const { data, error } = await supabase
        .storage
        .from('markdown-files')
        .download(`${req.params.id}/data.md`);

        if (error) {
            return res.status(500).send(`Supabase error: ${error.name} - ${error.message}`);
        }

        const arrayBuffer = await data.arrayBuffer();
        return res.send(Buffer.from(arrayBuffer).toString('utf-8'));
        
    } else {
        if (!uuidValidate(req.params.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
    }
        return res.status(400).send('Invalid data format');

});

app.get('/test', (req, res) => {
    return res.send('hello');
});

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

async function emptyFileToBucket(id: UUID, bucketName: string) {

    // create a temporary empty markdown file to insert
    const tempFilePath = path.join(__dirname, '/temp.md');

    await fs.writeFile(tempFilePath, '', err => {
        if (err) {
            console.error(`Error creating temporary markdown file ${err}`);
        } else {
            console.log('Temporary file written successfully');
        }
    });

    try {

        const tempFileBuffer = await fs.promises.readFile(tempFilePath);

        const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(`${id}/data.md`, tempFileBuffer, {
            contentType: 'text/markdown',
        });

        if (error) {
            console.log('Error uploading image to bucket');
        }

        // delete temp file

        await fs.unlink(tempFilePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('Temporary file deleted successfully!');
        }
        });

        return data?.path;

    } catch (err) {
        console.log('Error reading file or uploading: ', err);
    }

}

async function givenFileToBucket(id: UUID, fileBuffer: Buffer, bucketName: string) {

    try {

        const { data, error } = await supabase
        .storage
        .from(bucketName)
        .update(`${id}/data.md`, fileBuffer, {
            contentType: 'text/markdown',
        });

        if (error) {
            console.log('Supabase error uploading image to bucket ', error);
        }

        return data?.path;

    } catch (err) {
        console.log('Error reading file or uploading: ', err);
        return null;
    }

}

async function deleteGivenBucketEntry(file_link: string, bucketName: string) {

    try {
        
        const { data, error } = await supabase
        .storage
        .from(bucketName)
        .remove([file_link]);

        if (error) {
            console.log("Supabase error deleting data from bucket");
        }

    } catch (err) {
        console.log('Error deleting bucket data', err);
    }

}