# Twili-Oh-Yes 🚀📱

## Introduction 📝

Twili-Oh-Yes is your gateway to seamlessly integrate Twilio's API for sending and receiving SMS messages right from a web interface! 
(Not quite real-time, but close enough! 🤫)

ℹ️*there is no socket you need to refresh the app when you receive a message*

### Pre-requisites 📦

Before diving into the world of Twili-Oh-Yes, make sure you have the following in place:

* **Node.js** with npm installed
* [Ngrok](https://ngrok.com/download) - Sign up and grab your authentication token
* [Twilio account](https://login.twilio.com/u/signup?state=hKFo2SBxNE9kNGRwRFhKbldPNTA2TllReXMycHJVZGphaEJHWaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIE05NVg3ekJCUGFrRXY0cHh2VDYyNU5tUmFKcEt0djh1o2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks) - Create one to acquire your own free phone number

To install all the necessary dependencies, simply run:

```npm
npm install
```

### Application Screen : 

**🔹 The Home Page `http://localhost:5173/`**
![Twili-Oh-Yes HomePage](https://github.com/YoubaImkf/Twili-Oh-Yes/blob/main/public/img/Twili-Oh-Yes_HomePage.png)

**🔹 The Swagger Page `ngrok-url__OR__localhost/swagger`**
![Twili-Oh-Yes Swagger](https://github.com/YoubaImkf/Twili-Oh-Yes/blob/main/public/img/Twili-Oh-Yes_Swagger.png)


‎ 
## Configuration ⚙️

### I) Add `.env` files to the project

Here's an example of a `.env` file 📄:
ℹ️ *Add your ngrok url to `ALLOWED_SUB_DOMAIN`*

```env=
# -- API --
NGROK_BASE_URL=
PORT=3000

ALLOWED_SUB_DOMAIN=http://localhost:5173,http://localhost:3000

# REDIS
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=

# TWILIO
TWILIO_PHONE_NUMBER=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER_SID=
```

* `TWILIO_PHONE_NUMBER` ↷
https://console.twilio.com/us1/develop/phone-numbers/manage/incoming

* `TWILIO_ACCOUNT_SID` ↷ 
https://console.twilio.com/us1/account/manage-account/general-settings

* `TWILIO_AUTH_TOKEN` ↷ 
https://console.twilio.com/us1/account/keys-credentials/api-keys

* `TWILIO_PHONE_NUMBER_SID` ↷ 
Go to [phoneNumber](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) click on your phoneNumber then go to properties.
‎ 

Additionally, add a second `.env` file 📄 inside the root folder Twilio-Oh-Yes.Web:

```env=
# -- Client --
VITE_APP_API_BASE_URL=
VITE_APP_PHONE_NUMBER=
```

‎ 
### II) Login to your Twilio account

**1) Create your account**

Here you go → [create-account](https://login.twilio.com/u/signup?state=hKFo2SBxNE9kNGRwRFhKbldPNTA2TllReXMycHJVZGphaEJHWaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIE05NVg3ekJCUGFrRXY0cHh2VDYyNU5tUmFKcEt0djh1o2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks).

**2) To access your Twilio account and run the `./UpdateTwilioWebhook.sh` script, you need to provide your Twilio credentials to the CLI. [(More details)](https://www.twilio.com/docs/twilio-cli/quickstart)**

You can accomplish this by running the following command:

```bash
twilio login
```

ℹ️ You will be prompted to enter your `Account SID` and `Auth Token`. 

Please use the secret values `Twilio–AccountSid` & `Twilio–AuthToken`, which can be found in your Twilio account as we seen above.

#### Answer the prompt ...
ℹ️     ps : The "identifier" is the ID of your key example `firstname.lastname`.
*This will create an API Key for you, which will be securely stored for future use.*


**2) Now it's time to activate your profile.**

Open a terminal and activate your Twilio profile by running this command:

```bash
twilio profiles:use identifier
```

**3) Add your phone number to twilio**

Follow this link to valid you phone number and send SMS : https://console.twilio.com/us1/develop/phone-numbers/manage/verified
‎ 

### III) Run the script `./UpdateTwilioWebhook.sh`

Run the script `./UpdateTwilioWebhook.sh` to update the Incoming webhook to receive incoming SMS by running :
```bash
./UpdateTwilioWebhook.sh
```

ℹ️ *if you are on windows use **git bash***
‎ 

### IV) Login to your Ngrok account

**1) [Install Ngrok](https://ngrok.com/docs/getting-started/?os=linux)**

Ngrok will enable us to expose our application to the internet.

- [Create an account](https://dashboard.ngrok.com/signup)
- Download and extract ngrok.zip

- In your terminal, use the following command to configure Ngrok with your authentication token:
    ```bash
    ngrok config add-authtoken <TOKEN>
    ```

- To run ngrok and put your API on internet use : 
    ```bash
    ngrok http <YOUR_PORT> # 3000
    ```

You will get your URL on the ngrok console.

‎ 
### V) Running the Projects 🚀

Now that everything is set up, let's get your Twili-Oh-Yes application up and running. 
Follow these simple steps:

#### Step 1: Navigate to the Project Directories
> ⚠️Dont forget to fill your `.env` files⚠️

🔹**For the API**:

Open your terminal and navigate to the API directory:

```bash
cd src
```
Start the Application

```bash
npm run dev
```

🔹**For the Client**:

Next, navigate to the Twili-Oh-Yes.Web directory:

```bash
cd src/Twili-Oh-Yes.Web
```
Start the Application
```bash
npm run dev
```