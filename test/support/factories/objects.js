'use strict';

const chai = require('chai');
const factories = require('chai-factories');
const uuid = require('uuid/v4');

chai.use(factories);

// Factory definitions

chai.factory('EventLog', {
  websiteID: uuid(),
  eventObject: 'tests',
  eventObjectID: '-',
  event: `create`,
  modifiedBy: uuid(),
  metaData: {
    meta: 'data'
  }
});
