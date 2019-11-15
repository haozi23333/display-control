import * as Koa   from 'koa'
import * as Router from 'koa-router'
const control = require('display-control')
import * as Cli from 'cli'
import { readFileSync } from 'fs'

interface Option {
    port: number
    host: string
    token: string
}

Cli.enable('help')

const option: Option = Cli.parse({
    port: [ 'p', 'listen port  default <2333>', 'int', 2333 ],
    host: [ 'h', 'listen host default <0.0.0.0>', 'ip', '0.0.0.0' ],
    token: [ 't', 'token  default null', 'string', null ]
})

const app = new Koa();
const prefix = '/display' + (option.token ? `/${option.token}` : '');
const router = new Router({ prefix });
const guiHtmlCache = readFileSync('./gui.html');

router.get('/', async ctx => {
    console.log(ctx.request.type)
    console.log(ctx.request)
    if (ctx.accepts('text/html')) {
        return ctx.body = `
            control your display
            
            API:
                GET /display/<token>/gui    control WebGui
                GET /display/<token>        return your display state
                PUT /display/<token>        set your display state
                    params: 
                        state: true | false | 0 | 1
        
            Example:
                curl -X PUT -d "state=0"  http://<your host>:<your port>/display 
        `
    }
    ctx.body = { code: -1, message: 'unrealized' }
})

router.put('/', async (ctx: Router.IRouterContext & { request: { readonly body: { state: any } } }) => {
    if (!ctx.request.body) {
        return ctx.body = { code: -1, message: 'params not found' }
    }
    console.log(ctx.request.body)
    const state = ctx.request.body.state;
    if (state === true || state === 1 || state === '1') {
        control.wake();
        return ctx.body = { code: 0, message: 'display wake up' }
    }
    if (state === true || state === 0 ||  state === '0') {
        control.sleep();
        return ctx.body = { code: 0, message: 'display go sleep' }
    }
    return ctx.body = { code: -1, message: 'params error,  want[0, 1, true, false]' }
})

router.get('/gui', async ctx => {
    ctx.type = 'text/html;chartset=utf-8'
    return ctx.body = guiHtmlCache;
})

app.use(require('koa-bodyparser')())
app.use(router.routes());

app.listen( option.port, option.host, () => console.log(`listen to http://${option.host}:${option.port}${prefix}`))