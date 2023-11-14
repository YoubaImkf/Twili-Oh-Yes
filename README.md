# Twili-Oh-Yes 

## Introduction 
Integrating Twilio's API, users can send and receive SMS messages directly from a web interface. 


###  Pre-requisites :package:
You need to have :
* **Node.js** installed with npm;
* [ngrok](https://ngrok.com/download): A free account is all that's necessary to get your authentification token;
* Twilio account : to have your own free phone number;
‎ 

To install all dependencies :
```bash
npm install
``` 
‎
## Configuration 

### I) Add a .env file to the folder project source.**

- Here a example of `.env ` file 📄

    ```=
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
    TWILIO_PHONE_NUMBER_SID=
    ```
‎ 
### II) Login to your ngrok account
‎ 
**1 ) [Install ngrok](https://ngrok.com/docs/getting-started/?os=linux)**
ngrok will allow us to put our application on the internet.

- [Create an account ](https://dashboard.ngrok.com/signup)
- Download : ngrok Opens in new window or tab
- Extract ngrok.zip

Use terminal :

```bash
ngrok config add-authtoken <TOKEN>
```

### III) Login to your Twilio account

**1 ) In order to access your Twilio account and being able to run the script** `.\UpdateTwilioWebhook.sh`, you need to provide your Twilio credentials to the CLI [(more details)](https://www.twilio.com/docs/twilio-cli/quickstart).

This can be done by running this command:
```bash
twilio login
```

You will be prompted for your `Account SID` and `Auth Token`, Notice that you must use the secret values `Twilio–AccountSid` & `wilio–AuthToken`, that you can find on twilio.

#### Answer The Prompt:
```
... 
? The Account SID for your Twilio Account or Subaccount: Twilio–AccountSid
? Your Twilio Auth Token for your Twilio Account or Subaccount: Twilio–AuthToken[hidden]
? Shorthand identifier for your profile: identifier (example: firstname.lastname)
...
```
(*identifier is the ID of your key*)

> This will create an API Key for you that will be stored securely for future use.

‎

**2 ) Now you need to active your profile**

Open a terminal and active your Twilio profile by running this command :
```bash
twilio profiles:use identifer
```

**The Output :**
```bash!
set "identifer" as active profile
twilio-cli configuration saved to "/home/identifer/.twilio-cli/config.json"

```
