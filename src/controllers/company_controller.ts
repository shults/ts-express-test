import express = require('express');
import BaseController = require('../core/base_controller');

function route(path:string, methods?) : PropertyDecorator {
  if (typeof methods === 'undefined') {
    methods = ['get'];
  }

  if (!Array.isArray(methods)) {
    let method : string = <string> methods;
    methods = [method];
  }

  return function(target : any, methodName:string) : void {
    target.routes = target.routes || [];

    target.routes.push({
      methods,
      path,
      methodName
    });
  }
}

class CompanyController extends BaseController implements server.core.IAbstractController {

  constructor(...args) {
    super(...args);
    this.routes = this.routes || [];
  }

  @route('/')
  rootPage(req:express.Request, res:express.Response, next:Function) {
    res.send('hello from and my house 123');
  }

  @route('/member', ['get'])
  sendMember(req:express.Request, res:express.Response, next:Function) {
    res.send('hello from member');
  }

  @route('/dummy')
  sendDummyData(req:express.Request, res:express.Response, next:Function) {
    res.send('Dummy data from express server');
  }

  registerCallbacks():void {
    this.routes.forEach((route : IControllerRoute) => {
      route.methods.forEach((method:string) => {
        this.app[method](route.path, this.wrap(route.methodName))
      });
    });
  }

  path() : string {
    return '/';
  }

  routes : IControllerRoute[];
}

interface IControllerRoute {
  methods: string[];
  path: string;
  methodName: string;
}

export = CompanyController
