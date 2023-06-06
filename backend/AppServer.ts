require('dotenv').config();
import {App} from './App';

let server: any = new App().expressApp;
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
});