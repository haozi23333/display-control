"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Router = require("koa-router");
var control = require('display-control');
var Cli = require("cli");
var fs_1 = require("fs");
Cli.enable('help');
var option = Cli.parse({
    port: ['p', 'listen port  default <2333>', 'int', 2333],
    host: ['h', 'listen host default <0.0.0.0>', 'ip', '0.0.0.0'],
    token: ['t', 'token  default null', 'string', null]
});
var app = new Koa();
var prefix = '/display' + (option.token ? "/" + option.token : '');
var router = new Router({ prefix: prefix });
var guiHtmlCache = fs_1.readFileSync('./gui.html');
router.get('/', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(ctx.request.type);
        console.log(ctx.request);
        if (ctx.accepts('text/html')) {
            return [2 /*return*/, ctx.body = "\n            control your display\n            \n            API:\n                GET /display/<token>/gui    control WebGui\n                GET /display/<token>        return your display state\n                PUT /display/<token>        set your display state\n                    params: \n                        state: true | false | 0 | 1\n        \n            Example:\n                curl -X PUT -d \"state=0\"  http://<your host>:<your port>/display \n        "];
        }
        ctx.body = { code: -1, message: 'unrealized' };
        return [2 /*return*/];
    });
}); });
router.put('/', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var state;
    return __generator(this, function (_a) {
        if (!ctx.request.body) {
            return [2 /*return*/, ctx.body = { code: -1, message: 'params not found' }];
        }
        console.log(ctx.request.body);
        state = ctx.request.body.state;
        if (state === true || state === 1 || state === '1') {
            control.wake();
            return [2 /*return*/, ctx.body = { code: 0, message: 'display wake up' }];
        }
        if (state === true || state === 0 || state === '0') {
            control.sleep();
            return [2 /*return*/, ctx.body = { code: 0, message: 'display go sleep' }];
        }
        return [2 /*return*/, ctx.body = { code: -1, message: 'params error,  want[0, 1, true, false]' }];
    });
}); });
router.get('/gui', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.type = 'text/html;chartset=utf-8';
        return [2 /*return*/, ctx.body = guiHtmlCache];
    });
}); });
app.use(require('koa-bodyparser')());
app.use(router.routes());
app.listen(option.port, option.host, function () { return console.log("listen to http://" + option.host + ":" + option.port + prefix); });
//# sourceMappingURL=app.js.map