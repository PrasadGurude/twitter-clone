import {initServer} from './app/index'


async function init() {
    const app = await initServer()
    app.listen(8000,()=>console.log("server is running on the port number 8000"))

}

init();
