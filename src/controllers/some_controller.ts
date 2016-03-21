import express = require('express');
import BaseController = require('../core/base_controller');

class SomeController extends BaseController {

  path() : string {
    return '/some';
  }

}

export = SomeController
