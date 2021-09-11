import Server from "./models/serverModel";

import dotenv from 'dotenv';

dotenv.config();

const server:Server = new Server();

server.listen();