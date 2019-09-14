# Remax Window

Remax 长列表组件，解决长列表的性能问题

Remax Window 借鉴了 [React Window](https://github.com/bvaughn/react-window) 的实现，因此基本沿用了 React Window 的用法。

## 安装使用

```bash
$ npm install remax-window --save
```

```javascript
import { View } from 'remax/wechat';
import { FixedSizeList } from 'remax-window';

export default () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <FixedSizeList height={150} itemCount={data.length} itemSize={35}>
      {data.map(item => (
        <View style={{ height: '35rpx' }} key={item}>
          {item}
        </View>
      ))}
    </FixedSizeList>
  );
};
```
