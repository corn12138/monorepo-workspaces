const Koa = require('koa');
const koaCors = require('@koa/cors');
const KoaBodyParser = require('koa-bodyparser');
const KoaSession = require('koa-session');
const views = require('koa-views');
const koaStatic = require('koa-static');
const path = require('path');
const app = new Koa();

global.tokenScret = 'qG0QpVft4P1_u6U~ixLdspa0C,-PnR1+'

app.use(koaCors());

app.use(KoaBodyParser({
  enableTypes: ['json', 'form', 'text'],
}));

app.keys = ['qG0QpVft4P1_u6U~ixLdspa0C,-PnR1+'];

const CONFIG = {
  key: '123456', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
};

app.use(KoaSession(CONFIG, app));

// 配置模板引擎中间件
app.use(views(path.join(__dirname, 'template'), {
  extension: 'ejs'
}));

const staticPath = path.join(__dirname, 'static');
app.use(koaStatic(staticPath))

const router = require('./controllers/api');
app.use(router.routes(), router.allowedMethods());
const pageRouter = require('./controllers/page');
app.use(pageRouter.routes(), pageRouter.allowedMethods());

app.listen('6969');