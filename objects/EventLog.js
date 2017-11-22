'use strict';

const httpRequest = require('request');

class EventLog {
  constructor(websiteID, eventObject, eventObjectID, event, modifiedBy, metaData) {
    this.websiteID          = websiteID;
    this.eventObject        = eventObject; // e.g. Table Name
    this.eventObjectID      = eventObjectID; // primary key for eventObject
    this.event              = event; // e.g. create, update
    this.modifiedBy         = modifiedBy; // e.g. Webhooks application UUID
    this.metaData           = metaData;
    
    this.associatedObjectID = null;
    this.createdAt          = null; // transmission date => now()
  }
  
  static _headers() {
    return {
      'Content-Type':   'application/json',
      Authorization:    process.env.EVENT_LOGS_TOKEN
    };
  }
  
  _body() {
    return {
      websiteID:      this.websiteID,
      eventObject:    this.eventObject,
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