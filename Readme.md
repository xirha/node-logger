## Winston logger wrapper for nodejs


#### Usage

Add module to dependencies: <br>
```"logger": "git+https://github.com/xirha/node-logger.git",```

Install module: <br>
```nmp install node-logger```

Usage: <br>
```js
let logger = require("node-logger")("Identification");

logger.info("No arguments provided, running default base URL: " + baseURL);

```