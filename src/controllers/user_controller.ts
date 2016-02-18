import express = require('express');
import BaseController = require('../core/base_controller');

class UserController extends BaseController {

  path() : string {
    return '/user';
  }

  list(req, res, next) {
    res.send(this.path());
  }

}

export = UserController
