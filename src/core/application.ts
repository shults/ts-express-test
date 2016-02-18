import express = require('express');
import fs = require('fs');

class Application {

  constructor(private app:express.Application) {}

  static create(app:express.Application):Application {
    if (!Application.app) {
      Application.app = new Application(app)
    }
    return Application.app
  }

  static get():Application {
    return Application.app;
  }

  public configure(config):Application {
    this.config = config;

    return this;
  }

  public registerControllers():Application {
    const controllersDir : string = <string> this.config['controllersDir'];

    fs.readdirSync(controllersDir).forEach(controllerFileName => {
      let ControllerClass:server.core.IAbstractControllerClass = require(`${controllersDir}/${controllerFileName}`);
      this.registerController(ControllerClass);
    })

    return this;
  }

  private registerController( ControllerClass : server.core.IAbstractControllerClass ) {
    const controller : server.core.IAbstractController = new ControllerClass(this.app);
    controller.registerCallbacks();
  }

  public run(PORT):Application {
    this.app.listen(PORT);
    return this;
  }

  private config:Object;
  private static app:Application;
}

export = Application
