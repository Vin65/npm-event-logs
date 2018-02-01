# Installation
* `npm install --save npm-event-logs`

* Ensure the following environment variables are added to your secrets:
  * `EVENT_LOGS_URL`
    - URL for Event Logs service
  * `EVENT_LOGS_TOKEN`
    - Token for authorization

# Usage
* Add `const EventLog = require('npm-event-logs/objects/EventLog');` to make `EventLog` constructor available to your code.
