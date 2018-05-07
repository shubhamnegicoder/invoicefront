'use strict';

import { DeviceFunctionUtility } from './deviceFunctionUtility';

export class DeviceParserUtility {
  static deviceType1(s) {
    var p = {
      header: s.slice(0, 2),
      length: Number(s.slice(2, 6)),
      alaramCode: s.slice(6, 8),
      deviceId: s.slice(8, 23),
      vehicleStatus: s.slice(24, 32),
      dateTime: DeviceFunctionUtility.dateTime(s.slice(32, 44)),
      batteryVoltage: DeviceFunctionUtility.convertBV(s.slice(44, 46)),
      supplyVoltage: DeviceFunctionUtility.convertSV(s.slice(46, 48)),
      ADC: DeviceFunctionUtility.convertADC(s.slice(48, 52)),
      temperatureA: s.slice(52, 56),
      temperatureB: s.slice(56, 60),
      LACCI: s.slice(60, 64),
      cellID: s.slice(64, 68),
      GPSSatellites: s.slice(68, 70),
      GSMsignal: s.slice(70, 72),
      angle: s.slice(72, 75),
      speed: s.slice(75, 78),
      HDOP: s.slice(78, 82),
      mileage: s.slice(82, 89),
      latitude: DeviceFunctionUtility.lat(s.slice(89, 98)),
      NS: s.slice(98, 99),
      longitude: DeviceFunctionUtility.lng(s.slice(99, 109)),
      EW: s.slice(109, 110),
      serialNumber: s.slice(110, 114),
      checksum: s.slice(114, 116),
      createdAt: new Date()
    };
    return p;
  }
  static deviceType2() {
    return null;
  }
  static deviceType3(s) {
    var p = {
      runningNo: s.slice(1, 13),
      commandWord: s.slice(13, 17),
      deviceId: s.slice(17, 32),
      date: DeviceFunctionUtility.date(s.slice(32, 38)),
      valid: s.slice(38, 39),
      latitude: DeviceFunctionUtility.lat(s.slice(39, 48)),
      NS: s.slice(48, 49),
      longitude: DeviceFunctionUtility.lng(s.slice(49, 59)),
      EW: s.slice(59, 60),
      speed: s.slice(60, 65),
      time: DeviceFunctionUtility.time(s.slice(65, 71)),
      direction: s.slice(71, 77),
      power: s.slice(77, 85),
      mileage: s.slice(85, 86),
      mileageData: s.slice(86, 94),
      temp: DeviceFunctionUtility.temp(s.slice(94, 98)),
      createdAt: new Date()
    };
    return p;
  }
}
