import { ScrollView, View } from 'remax/wechat';
import createFixedSizeList from './lib/createFixedSizeList';

const FixedSizeList = createFixedSizeList(ScrollView, View);

export { FixedSizeList };
