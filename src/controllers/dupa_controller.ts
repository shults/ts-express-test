import express = require('express');
import BaseController = require('../core/base_controller');

class DupaController extends BaseController {

  path() {
    return '/dupa';
  }

  list(req, res, next) {
    res.send(this.path());
  }

  create(req, res, next) {
    res.send('jestem tu asdas da sdas dda')
  }

}

export = DupaController
