'use strict';

require('./../../support/factories/objects');

import EventLog from './../../../objects/EventLog';

const chai = require('chai');
const expect = require('chai').expect;

describe('EventLog', () => {
  describe('.headers', () => {
    it('should include content-type', () => {
      expect(EventLog._headers()).to.have.property('Content-Type');
    });
    
    it('should include content-type set to application/json', () => {
      expect(EventLog._headers()['Content-Type']).to.equal('application/json');
    });
  });
  
  describe('#create', () => {
    context('without environment variables', () => {
      it('should throw error', async () => {
        let eventLogFactory = chai.create('EventLog');
        let eventLog = new EventLog(
          eventLogFactory.websiteID,
          eventLogFactory.eventObject,
          eventLogFactory.eventObjectID,
          eventLogFactory.event,
          eventLogFactory.modifiedBy,
          eventLogFactory.metaData
        );
        
        try {
          await eventLog.create(true);
        } catch (error) {
          expect(error).to.be.an.instanceof(Error);
          expect(error.message).to.include('Invalid URI "undefinedevent-log"');
        }
      });
    });
  });
});
