import promise = require('es6-promise');

import clientRpc = require("./rpc");

var Promise = promise.Promise;

export interface RegistryListing {
  path: Array<string>;
  dirs: Array<string>;
  keys: Array<string>;
  vals: Array<string>;
}

export interface RegistryApi {
  dir(params: {path: Array<string>}): Promise<RegistryListing>;
  set(params: {path: Array<string>; key: string; value: string}): Promise<RegistryListing>;
  del(params: {path: Array<string>; key: string}): Promise<RegistryListing>;

  mkDir(params: {path: Array<string>; dir: string}): Promise<RegistryListing>;
  rmDir(params: {path: Array<string>; dir: string}): Promise<RegistryListing>;

  rename(params: {path: Array<string>; key: string; newKey: string}): Promise<RegistryListing>;
  copy(params: {path: Array<string>; key: string; newPath: Array<string>; newKey: string}): Promise<RegistryListing>;
  move(params: {path: Array<string>; key: string; newPath: Array<string>; newKey: string}): Promise<RegistryListing>;

  renameDir(params: {path: Array<string>; dir: string; newDir: string}): Promise<RegistryListing>;
  copyDir(params: {path: Array<string>; dir: string; newPath: Array<string>; newDir: string}): Promise<RegistryListing>;
  moveDir(params: {path: Array<string>; dir: string; newPath: Array<string>; newDir: string}): Promise<RegistryListing>;
}

export class RegistryServiceJsonRpc implements RegistryApi{
  socket: clientRpc.JsonRpcSocket;

  constructor(socket: clientRpc.JsonRpcSocket) {
    this.socket = socket;
  }

  dir(params: {path: Array<string>}): Promise<RegistryListing> {
    return this.sendRequest('dir', params);
  }
  set(params: {path: Array<string>; key: string; value: string}): Promise<RegistryListing> {
    return this.sendRequest('set', params);
  }
  del(params: {path: Array<string>; key: string}): Promise<RegistryListing> {
    return this.sendRequest('del', params);
  }

  mkDir(params: {path: Array<string>; dir: string}): Promise<RegistryListing> {
    return this.sendRequest('mkDir', params);
  }
  rmDir(params: {path: Array<string>; dir: string}): Promise<RegistryListing> {
    return this.sendRequest('rmDir', params);
  }

  rename(params: {path: Array<string>; key: string; newKey: string}): Promise<RegistryListing> {
    return this.sendRequest('rename', params);
  }
  copy(params: {path: Array<string>; key: string; newPath: Array<string>; newKey: string}): Promise<RegistryListing> {
    return this.sendRequest('copy', params);
  }
  move(params: {path: Array<string>; key: string; newPath: Array<string>; newKey: string}): Promise<RegistryListing> {
    return this.sendRequest('move', params);
  }

  renameDir(params: {path: Array<string>; dir: string; newDir: string}): Promise<RegistryListing> {
    return this.sendRequest('renameDir', params);
  }
  copyDir(params: {path: Array<string>; dir: string; newPath: Array<string>; newDir: string}): Promise<RegistryListing> {
    return this.sendRequest('copyDir', params);
  }
  moveDir(params: {path: Array<string>; dir: string; newPath: Array<string>; newDir: string}): Promise<RegistryListing> {
    return this.sendRequest('moveDir', params);
  }

  sendRequest(method: string, params: Object): Promise<RegistryListing> {
      console.log("sending registry RPC: "+ method+" argument: "+ JSON.stringify(params));
    return this.socket.call("org.labrad.registry." + method, params)
                      .then((result) => <RegistryListing>result);
  }
}

