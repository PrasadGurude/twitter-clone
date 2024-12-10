import {initServer} from './app/index'

const PORT  = 8000;

async function init() {
    const app = await initServer()
    app.listen(PORT,()=>console.log(`server is running on the port number PORT:${PORT}`))

}

init();
