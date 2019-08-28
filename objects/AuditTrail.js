'use strict';

const httpRequest = require('request');

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
  
  create(shouldPost) {
    let options = {
        url:      `${process.env.EVENT_LOGS_URL}auditTrail`,
        headers:  this.constructor._headers(),
        body:     JSON.stringify(this._body())
    };
    if (shouldPost) {
      httpRequest.post(options, (error, response, body) => {
        // process returned response
        if (error) throw new Error(error);
      }).on('error', (error) => {
        console.error(error);
      });
    } else {
      console.info('Logging AuditTrail:');
      console.dir(this._body());
    }
  }
}

module.exports = AuditTrail;