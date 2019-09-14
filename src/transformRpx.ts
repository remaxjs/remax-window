import { getSystemInfoSync } from 'remax/wechat';

let isIPhone = false;
let deviceWidth: number;
let deviceDPR: number;

const BASE_DEVICE_WIDTH = 750;

const checkDeviceWidth = () => {
  const info = getSystemInfoSync();
  isIPhone = info.platform === 'ios';
  const newDeviceWidth = info.screenWidth || 375;
  const newDeviceDPR = info.pixelRatio || 2;

  if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
    deviceWidth = newDeviceWidth;
    deviceDPR = newDeviceDPR;
  }
};
checkDeviceWidth();

const eps = 1e-4;
const transformByDPR = (number: number) => {
  if (number === 0) {
    return 0;
  }
  number = (number / BASE_DEVICE_WIDTH) * deviceWidth;
  number = Math.floor(number + eps);
  if (number === 0) {
    if (deviceDPR === 1 || !isIPhone) {
      return 1;
    }
    return 0.5;
  }
  return number;
};

export default transformByDPR;
