# Installation
* `npm install --save git+ssh://git@github.com/Vin65/npm-event-logs.git#master`

* Ensure the following environment variables are added to your secrets:
  * `EVENT_LOGS_URL`
    - URL for Event Logs service
  * `EVENT_LOGS_TOKEN`
    - Token for authorization

# Usage
* Add `const EventLog = require('npm-event-logs/objects/EventLog');` to make `EventLog` constructor available to your code.
