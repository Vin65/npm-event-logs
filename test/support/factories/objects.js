'use strict';

const chai = require('chai');
const factories = require('chai-factories');
const uuid = require('uuid/v4');

chai.use(factories);

// Factory definitions

chai.factory('EventLog', {
  websiteID: uuid(),
  event: `methodName(v200)`,
  modifiedBy: uuid(),
  metaData: {}
});
