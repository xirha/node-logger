## Winston logger wrapper for nodejs


#### Usage

Add module to dependencies: <br>
```"ice": "git+ssh://gitolite@git.swind.sk:node-packages/logger.git",```

Install module: <br>
```nmp install logger```

Usage: <br>
```js
let logger = require("ice");

logger.info("No arguments provided, running default base URL: " + baseURL);

```