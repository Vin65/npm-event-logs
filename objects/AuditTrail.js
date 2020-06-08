'use strict';

const httpRequest = require('request-promise');

class AuditTrail {
  constructor(data) {
    this.data = data;
  }
  
  static _headers() {
    return {
      'Content-Type': 'application/json',
      Authorization: process.env.EVENT_LOGS_TOKEN
    };
  }
  
  _body() {
    return this.data;
  }
  
  async create(shouldPost) {
    let options = {
        method:   'POST',
        uri:      `${process.env.EVENT_LOGS_URL}auditTrail`,
        headers:  this.constructor._headers(),
        json:     true,
        body:     this._body()
    };
    
    if (shouldPost) {
      return new Promise(function(resolve, reject) {
        httpRequest(options, function(error, data) {
          if (error) {
            console.log(`ERROR: Failed to POST to AuditTrail: '${JSON.stringify(options)}'`);
            console.log(error);
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    } else {
      return new Promise(function(resolve, reject) {
        console.info('Logging AuditTrail:');
        console.dir(options);
        resolve(true);
      });
    }
  }
}

module.exports = AuditTrail;