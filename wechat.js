import { ScrollView, View, getSystemInfoSync } from 'remax/wechat';
import createFixedSizeList from './lib/createFixedSizeList';

const FixedSizeList = createFixedSizeList(ScrollView, View, getSystemInfoSync);

export { FixedSizeList };
