/**
 * AWS IoT Button is a programmable button based on the Amazon Dash Button hardware. 
 *
 * This is a sample that connects Lambda with IFTTT Maker channel. The event is
 * sent in this format: <serialNumber>-<clickType>.
 *
 * I this code this script to use the Dash Button with my Hue Lights.
 *
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * This script run on to AWS Lambda.
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

'use strict';

const https = require('https');

const makerKey = ''; // change it to your Maker key

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);

    var makerEvent = null;    
    switch(event.clickType) {
        case "SINGLE":
          makerEvent = 'AWS_SINGLE_ON';
            break;
        case "DOUBLE":
            makerEvent = 'AWS_DOUBLE_OFF';
            break;
        default: //LONG
            makerEvent = 'AWS_LONG_DIM';
    }

    const url = `https://maker.ifttt.com/trigger/${makerEvent}/with/key/${makerKey}`;
    https.get(url, (res) => {
        let body = '';
        console.log(`STATUS: ${res.statusCode}`);
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Event has been sent to IFTTT Maker channel');
            callback(null, body);
        });
    }).on('error', (e) => {
        console.log('Failed to trigger Maker channel', e);
        callback(`Failed to trigger Maker channel: ${e.message}`);
    });
};