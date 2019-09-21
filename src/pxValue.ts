import createTransformRpx from './transformRpx';

export default (getSystemInfoSync: Function) => {
  const transformRpx = createTransformRpx(getSystemInfoSync);

  return (value: number | string) => {
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
  };
};
