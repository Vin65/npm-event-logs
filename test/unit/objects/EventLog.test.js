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
      it('should throw error', (done) => {
        let eventLogFactory = chai.create('EventLog');
        let eventLog = new EventLog(
          eventLogFactory.websiteID,
          eventLogFactory.eventObject,
          eventLogFactory.eventObjectID,
          eventLogFactory.event,
          eventLogFactory.modifiedBy,
          eventLogFactory.metaData
        );
        
        expect(() => {
          eventLog.create(true);
        }).to.throw('Error: Invalid URI "undefinedevent-log"');
        done();
      });
    });
  });
});
