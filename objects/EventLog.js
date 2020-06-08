'use strict';

const httpRequest = require('request-promise');

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
  
  async create(shouldPost) {
    let options = {
        method:   'POST',
        uri:      `${process.env.EVENT_LOGS_URL}event-log`,
        headers:  this.constructor._headers(),
        json:     true,
        body:     this._body()
    };

    if (shouldPost) {
      return new Promise(function(resolve, reject) {
        httpRequest(options, function(error, data) {
          if (error) {
            console.log(`ERROR: Failed to POST to Event Logs: '${JSON.stringify(options)}'`);
            console.log(error);
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    } else {
      return new Promise(function(resolve, reject) {
        console.info('Logging EventLog:');
        console.dir(options);
        resolve(true);
      });
    }
  }
}

module.exports = EventLog;