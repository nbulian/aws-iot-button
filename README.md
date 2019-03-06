# AWS IoT Button 
Is a programmable button based on the Amazon Dash Button hardware. This simple Wi-Fi device is easy to configure and designed.

I this code this script to use the Dash Button with my Hue Lights.

This is a sample that connects Lambda with IFTTT Maker channel. The event is sent in this format: <serialNumber>-<clickType>.
 
The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 
 A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 
 For more documentation, follow the link below.
 http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
