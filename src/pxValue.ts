import transformRpx from './transformRpx';

export default function pxValue(value: number | string) {
  // 数值
  if (typeof value === 'number') {
    return transformRpx(value);
  }

  // rpx
  if (value.endsWith('rpx')) {
    return transformRpx(Number(value.replace('rpx', '')));
  }

  // px
  return Number(value.replace('px', ''));
}
