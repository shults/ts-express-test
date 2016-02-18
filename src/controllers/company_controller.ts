
import express = require('express');
import BaseController = require('../core/base_controller');

class CompanyController extends BaseController implements server.core.IAbstractController {

  path() : string {
    return '/';
  }

  list(req:express.Request, res:express.Response, next:Function) {
    res.send('i am at root')
  }

}

export = CompanyController
