import { Email } from './email';
import { Sms } from './sms';
import NOTIFICATION from './notification';
import Device from '../../models/device.model';
import User from '../../models/user.model';
import { ObjectID } from 'mongodb';

export class AlertUtility {
  static async tempAlert({ l }) {
    function oa(resData) {
      Object.assign(altval.emailData, { text: resData });
      Object.assign(altval.smsData, { text: resData });
      Object.assign(altval.notification, { data: resData });
    }
    let altval = {},
      altopt = {};
    var tlvaltQuery = [
      {
        $match: {
          deviceId: l.deviceId
        }
      },
      {
        $lookup: {
          from: 'customer',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customers'
        }
      },
      {
        $lookup: {
          from: 'asset',
          localField: 'assetId',
          foreignField: '_id',
          as: 'assets'
        }
      },
      {
        $unwind: '$customers'
      },
      {
        $unwind: '$assets'
      },
      {
        $project: {
          deviceId: 1,
          customers: {
            customerId: '$customers._id',
            alert: '$customers.alert',
            createdBy: '$customers.createdBy'
          },
          assets: {
            assetId: '$assets._id',
            minSpeed: '$assets.minSpeed',
            maxSpeed: '$assets.maxSpeed',
            minTemperature: '$assets.minTemperature',
            maxTemperature: '$assets.maxTemperature'
          }
        }
      }
    ];
    try {
      let tlvaltResult = await Device.getAggregation(tlvaltQuery);
      if (tlvaltResult) {
        let modifiedTlvaltResult = tlvaltResult[0];
        Object.assign(altopt, modifiedTlvaltResult.customers.alert);
        Object.assign(altval, {
          notification: {
            udid:
              modifiedTlvaltResult.customers.createdBy +
              modifiedTlvaltResult.deviceId
          }
        });
        var emQuery = [
          {
            $match: {
              _id: new ObjectID(modifiedTlvaltResult.customers.createdBy)
            }
          },
          {
            $project: {
              _id: 1,
              emailId: 1,
              mobile: 1
            }
          }
        ];
        var esResult = await User.getAggregation(emQuery);
        if (esResult) {
          let modifiedEsResult = esResult[0];
          Object.assign(
            altval,
            {
              emailData: {
                to: modifiedEsResult.emailId,
                subject: 'device alert'
              }
            },
            {
              smsData: {
                recipient: modifiedEsResult.mobile
              }
            }
          );
          if (Number(l.temp.split('(')[0]) > modifiedTlvaltResult.assets.maxTemperature) {
            var resData = JSON.stringify({
              fixedMaxTemp: modifiedTlvaltResult.assets.maxTemperature,
              actualMaxTemp: l.temp,
              type: 'max'
            });
            oa(resData);
            this.al({ altval, altopt });
          } else if (Number(l.temp.split('(')[0]) < modifiedTlvaltResult.assets.minTemperature) {
            var resData = JSON.stringify({
              fixedMinTemp: modifiedTlvaltResult.assets.minTemperature,
              actualMinTemp: l.temp,
              type: 'min'
            });
            oa(resData);
            this.al({ altval, altopt });
          } else {
            var resData = JSON.stringify({
              fixedAvgTemp: 'NA',
              actualAvgTemp: l.temp,
              type: 'avg'
            });
            oa(resData);
            this.al({ altval, altopt });
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  static al({ altval, altopt }) {
    if (
      altopt.email === true &&
      altopt.sms === true &&
      altopt.notification === true
    ) {
      Email.send(altval.emailData);
      NOTIFICATION(null, altval.notification);
      Sms.send(altval.smsData);
    } else if (
      altopt.email === true &&
      altopt.sms === true &&
      altopt.notification === false
    ) {
      Email.send(altval.emailData);
      Sms.send(altval.smsData);
    } else if (
      altopt.email === true &&
      altopt.sms === false &&
      altopt.notification === false
    ) {
      Email.send(altval.emailData);
    } else if (
      altopt.email === false &&
      altopt.sms === true &&
      altopt.notification === true
    ) {
      NOTIFICATION(null, altval.notification);
      Sms.send(altval.smsData);
    } else if (
      altopt.email === false &&
      altopt.sms === false &&
      altopt.notification === true
    ) {
      NOTIFICATION(null, altval.notification);
    } else if (
      altopt.email === true &&
      altopt.sms === false &&
      altopt.notification === true
    ) {
      Email.send(altval.emailData);
      NOTIFICATION(null, altval.notification);
    } else if (
      altopt.email === false &&
      altopt.sms === true &&
      altopt.notification === false
    ) {
      Sms.send(altval.smsData);
    }
  }
}
