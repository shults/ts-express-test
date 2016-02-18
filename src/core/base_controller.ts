import express = require('express');

abstract class BaseController implements server.core.IAbstractController {

  constructor(
    private app:express.Application
  ) {}

  registerCallbacks() : void {
    this.methods().forEach((cnf : server.core.IControllerConfig) => {
      if (this.constructor.prototype.hasOwnProperty(cnf.method)) {
        this.app[cnf.httpMethod](`${cnf.pathPrefix}${this.path()}${cnf.pathSuffix}`, this.wrap(cnf.method));
      }
    })
  }

  private wrap(method:string):Function {
    if (this[method].length === 4) {
      return (err, req, res, next) => this[method](err, req, res, next)
    }

    if (this[method].length === 3) {
      return (req, res, next) => this[method](req, res, next)
    }

    return (req, res) => this[method](req, res)
  }

  methods() : server.core.IControllerConfig[] {
    return [
      {
        httpMethod: 'get',
        method: 'read',
        pathSuffix: '/:id'
      },
      {
        httpMethod: 'put',
        method: 'update',
        pathSuffix: '/:id'
      },
      {
        httpMethod: 'del',
        method: 'del',
        pathSuffix: '/:id'
      },
      {
        httpMethod: 'get',
        method: 'list'
      },
      {
        httpMethod: 'post',
        method: 'create'
      }
    ]
  }

  abstract path():string;
}

export = BaseController
