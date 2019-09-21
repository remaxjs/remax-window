import { ScrollView, View } from 'remax/alipay';
import createFixedSizeList from './lib/createFixedSizeList';

const FixedSizeList = createFixedSizeList(ScrollView, View);

export { FixedSizeList };
