require('dotenv').config();
import {App} from './App';

let server: any = new App().expressApp;
server.listen(process.env.PORT, () => {
    console.log('Express server listening on port ' + process.env.PORT);
});