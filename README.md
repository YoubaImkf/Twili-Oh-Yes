# Express/vue Project

## Introduction 
Integrating Twilio's API, users can send and receive SMS messages directly from the web interface. 

‎ 
##  Pre-requisites :package:

You need to have **Node.js** installed 
‎ 
To install all dependencies
```bash
npm install
```
‎ 

<details> <summary>📝 Click to see all the mandatory dependencies</summary> 

- [Express](https://www.npmjs.com/package/express) :
    ```bash
    npm install express
    ```

- [Swagger Autogen](https://swagger-autogen.github.io/docs/getting-started/advanced-usage) :
    ```bash
    npm install --save-dev swagger-autogen
    ```

- [Swagger ui express](https://www.npmjs.com/package/swagger-ui-express) :
    ```bash
    npm install --save-dev swagger-ui-express
    ```

- [Dotenv](https://www.npmjs.com/package/dotenv) :
    ```bash
    npm install dotenv --save
    ```

- [Cors](https://www.npmjs.com/package/cors) :
    ```bash
    npm install cors
    ```

- [Redis](https://www.npmjs.com/package/redis-om)
    ```bash
    npm install redis-om
    ```
    
    ```bash
    npm install redis
    ```

‎ 
**Dev dependencies :**
```bash
npm install --save-dev @types/cors @types/express @types/jest @types/node @types/swagger-jsdoc @types/swagger-ui-express jest swagger-autogen ts-jest ts-node-dev
```


</details>

‎ 
‎ 


- Add a .env file to the frolder project source.

- 📄Here a sample of the `.env ` file
    ```
    NGROK_BASE_URL=
    PORT=3000

    ALLOWED_SUB_DOMAIN=http://localhost:5173,http://localhost:3000

    # REDIS
    REDIS_PASSWORD=
    REDIS_HOST=
    REDIS_PORT=

    # TWILIO
    TWILIO_PHONE_NUMBER=1269205628
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTH_TOKEN=
    ```