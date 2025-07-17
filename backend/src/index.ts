import express from 'express';
import { createClient } from '@supabase/supabase-js';
import {  v4 as uuidv4, validate as uuidValidate } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_API_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !serviceKey) {
    console.log('error retrieving supabase credentials');
}

const supabase = createClient(supabaseUrl, serviceKey);

const app = express()
app.use(express.json())
const port = 3000

type UUID = string;

interface IdJson {
    id: UUID
}

interface AddNodeJson {
    origin: UUID
    title: string
};

interface UpdateNodeJson {
    id: UUID,
    title: string,
    contents: string
}

app.get('/nodes', async (req, res) => {

    /**
     * 
     * endpoint to fetch a node from the local database
     * 
     * params (request body):
     * id - uuid corresponding to the node of interest
     *
     * returns:
     * object corresponding to the node data
     *  
     */

    const recievedJson: IdJson = req.body;
    
    if (recievedJson && typeof recievedJson === 'object' && uuidValidate(recievedJson.id)) {
        const { data, error } = await supabase
        .from('Nodes')
        .select('id, title, contents')
        .eq('id', recievedJson.id)

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        res.json(data[0]); // [0] because there should only ever be one entry with a given uuid
    } else {
        if (!uuidValidate(recievedJson.id)) {
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

    const recievedJson: AddNodeJson = req.body;
    
    if (recievedJson && typeof recievedJson === 'object' && recievedJson.title) {
        const newNodeId = uuidv4();

        const { error } = await supabase
        .from('Nodes')
        .insert({ id: newNodeId, title: recievedJson.title });

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        if (recievedJson.origin) {
            const newEdgeId = uuidv4();
            const { error } = await supabase
            .from('Edges')
            .insert({ id: newEdgeId, origin: recievedJson.origin, destination: newNodeId });

            if (error) {
                return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
            }
        }

        return res.send('Successful addition');
    }

    return res.status(400).send("Invalid body format");

});

app.patch('/nodes', async (req, res) => {

    /**
     * 
     * endpoint to insert nodes into the local database
     * 
     * params (request body):
     * id - uuid corresponding to the node of interest
     *
     * returns:
     * nothing
     *  
     */
    
    const recievedJson: UpdateNodeJson = req.body;

    if (recievedJson && typeof recievedJson === 'object' && uuidValidate(recievedJson.id)) {
        const { error } = await supabase
        .from('Nodes')
        .update({ 'title': recievedJson.title, 'contents': recievedJson.contents })
        .eq('id', recievedJson.id);

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        return res.send("Successful update");

    } else {
        if (!uuidValidate(recievedJson.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }
    
});

app.delete('/nodes', async (req, res) => {

    /**
     * 
     * endpoint to delete nodes from the local database
     * 
     * params (request body):
     * id - uuid corresponding to the node of interest
     *
     * returns:
     * nothing
     *  
     */

    const recievedJson: IdJson = req.body;

    if (recievedJson && typeof recievedJson === 'object' && uuidValidate(recievedJson.id)) {
        const response = await supabase
        .from('Nodes')
        .delete()
        .eq('id', recievedJson.id)

        if (response.error) {
            const error = response.error;
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        };

        return res.send('Successful deletion');
    } else {
        if (!uuidValidate(recievedJson.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }

});

app.get('/edges', async (req, res) => {
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

    const recievedJson: IdJson = req.body;
    
    if (recievedJson && typeof recievedJson === 'object' && uuidValidate(recievedJson.id)) {
        const { data, error } = await supabase
        .from('Edges')
        .select('id, origin, destination')
        .eq('id', recievedJson.id)

        if (error) {
            return res.status(500).send(`Supabase error: ${error.code} - ${error.message}`);
        }

        res.json(data[0]); // [0] because there should only ever be one entry with a given uuid
    } else {
        if (!uuidValidate(recievedJson.id)) {
            return res.status(400).send('Invalid UUID passed as node ID');
        }
        return res.status(400).send('Invalid data format');
    }
});

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});