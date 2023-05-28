require('dotenv').config();
import {App} from './App';

let server: any = new App().expressApp;
server.listen(8000);