# ROUTE FORMATTING

All routes either fall under /nodes or /edges, and all data is passed through the request body as a json
Routes have docstrings specifying parameters and returns in index.ts

# /nodes

GET /nodes: takes a node id, returns a json with the node data
POST /nodes: takes a title and (optionally) a origin node and creates an entry in the database based on those
UPDATE /nodes: takes a node id, (optionally) a title, and (optionally) contents and updates the title/contents of the node with the given id
DELETE /nodes: takes a node id and deletes the node with the given id from the database, this deletion will cascade down to all the edges linked to that node as well

GET /edges: takes an edge id, returns a json with the edge data