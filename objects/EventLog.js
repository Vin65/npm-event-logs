'use strict';

const httpRequest = require('request');

class EventLog {
  constructor(websiteID, event, modifiedBy, metaData) {
    this.websiteID          = websiteID;
    this.event              = event; // method name(version)
    this.modifiedBy         = modifiedBy; // WebserviceAccountID
    this.metaData           = metaData;
    
    this.associatedObjectID = null;
    this.createdAt          = null; // transmission date => now()
    this.eventObjectID      = '-'; // TODO: remove restriction to have this required
  }
  
  static _headers() {
    return {
      'Content-Type':   'application/json', // not related to JsonRequest.contentType()
      Authorization:    process.env.EVENT_LOGS_TOKEN
    };
  }
  
  _body() {
    return {
      websiteID:      this.websiteID,
      eventObject:    'webservices',
      eventObjectID:  this.eventObjectID,
      event:          this.event,
      modifiedBy:     this.modifiedBy,
      metaData:       this.metaData
    };
  }
  
  create(shouldPost) {
    let options = {
        url:      `${process.env.EVENT_LOGS_URL}event-log`,
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
      console.info('Logging EventLog:');
      console.dir(this._body());
    }
  }
}

module.exports = EventLog;