import nodemailer from 'nodemailer';
var service = 'Gmail';
var systemMail = 'yalgorithms@gmail.com';
var systemPass = 'Ulgmail-7';

export class Email {
  static get transport() {
    if (this._transport) return this._transport;
    return (this._transport = nodemailer.createTransport({
      service: service,
      auth: {
        user: systemMail,
        pass: systemPass
      }
    }));
  }

  static send(data) {
    if (!service || !systemMail) {
      console.info("Can't send mail: smtp configured");
      return;
    }

    return new Promise((r, rj) => {
      var mail = Object.assign(
        {
          from: systemMail
        },
        data
      );
      console.info(mail);
      this.transport.sendMail(mail, (err, info) => {
        if (err) {
          console.error(err);
          rj(err);
          return;
        }
        r(info.response);
      });
    });
  }
}
