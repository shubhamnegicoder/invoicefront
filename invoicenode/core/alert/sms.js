import Nexmo from 'nexmo';

var sender = 'NEXMO';
var options = { type: 'unicode' };
var nexmo = new Nexmo(
  {
    apiKey: '231688b2',
    apiSecret: 'YBsvUJVF87Ca3OgK'
  },
  {
    debug: true
  }
);

export class Sms {
  static send(data) {
    if (!sender || !data.recipient) {
      console.info("Can't send sms: sms configured");
      return;
    }
    return new Promise(function(resolve, reject) {
      nexmo.message.sendSms(
        sender,
        data.recipient,
        data.text,
        options,
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(result.response);
        }
      );
    });
  }
}
