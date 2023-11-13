#!/bin/bash

echo "> Script is running..."

# Load environment variables from .env file
source .env

# Assign values to variables
ApplicationSid="$TWILIO_ACCOUNT_SID"
TwilioPhonenumber="$TWILIO_PHONE_NUMBER"
TwilioPhonenumberSid="$TWILIO_PHONE_NUMBER_SID"

# Print the assigned values (optional)
echo "ApplicationSid: $ApplicationSid"
echo "TwilioPhonenumber: $TwilioPhonenumber"
echo "TwilioPhonenumberSid: $TwilioPhonenumberSid"

# Retrieve de ngork URL
ngrokApiUri="http://127.0.0.1:4040/api"
TwilioTunnelsObject=$(curl -s "$ngrokApiUri/tunnels" | jq -r '.tunnels')
PublicBaseUrl=$(echo "$TwilioTunnelsObject" | jq -r '.[] | select(.proto == "https").public_url')

echo "$PublicBaseUrl"

#  Modify the webhook of sms 
PublicIncomingSmsUrl="$PublicBaseUrl/api/message/incoming"
twilio api:core:incoming-phone-numbers:update --sid="$TwilioPhonenumberSid" --sms-url="$PublicIncomingSmsUrl"

