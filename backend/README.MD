# Setup

1. Clone the repo to your machine

2. cd into the backend folder

3. Run: npm install to install all dependencies

4. Open docker desktop (install it at https://docs.docker.com/get-started/introduction/get-docker-desktop/ if you don't have it)

5. Run: npx supabase start to start the database locally in a docker container

6. fill out your environment file with the data supabase gives back after the database is set up

7. Run: npx ts-node-dev src/index.ts to start the api in development mode, Run: tsc && node dist/index.js to run in production mode
