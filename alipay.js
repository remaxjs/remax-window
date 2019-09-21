import { ScrollView, View, getSystemInfoSync } from 'remax/alipay';
import createFixedSizeList from './lib/createFixedSizeList';

const FixedSizeList = createFixedSizeList(ScrollView, View, getSystemInfoSync);

export { FixedSizeList };
