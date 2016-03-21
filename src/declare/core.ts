// import express = require('express')

module server {
  export module core {

    export interface IAbstractController {
      path() : string;
      methods() : IControllerConfig[];
      registerCallbacks() : void;
    }

    export interface IAbstractControllerClass {
      new( app:Express.Application ) : IAbstractController
    }

    export interface IMap<T> {
      [key:string] : T
    }

    export interface IControllerConfig {
      httpMethod: string;
      method: string;
      pathPrefix? : string;
      pathSuffix? : string;
    }

  }
}
