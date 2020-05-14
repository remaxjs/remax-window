# Remax Window

# 已废弃，建议使用 https://github.com/remaxjs/remax-recycle-view

![npm](https://img.shields.io/npm/v/remax-window?style=flat-square)

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

## API

### FixedSizeList

| 属性名               | 类型                | 必填 | 默认值 | 描述                                                                                            |
| -------------------- | ------------------- | ---- | ------ | ----------------------------------------------------------------------------------------------- |
| className            | string              | 否   | 无     | class 样式名称                                                                                  |
| style                | React.CSSProperties | 否   | 无     | React 行内样式                                                                                  |
| itemCount            | number              | 是   | 无     | 列表里 item 的个数                                                                              |
| itemSize             | number \| string    | 是   | 无     | 每个 item 的高度，支持 rpx 和 px。默认 rpx 单位。如：`35（默认 rpx 单位）`, `'35rpx'`, `'35px'` |
| overscanCount        | number              | 否   | 5      | 预加载的 item 个数                                                                              |
| onReachBottom        | () => void          | 否   | 无     | scroll 触底回调                                                                                 |
| reachBottomThreshold | number              | 否   | 无     | onReachBottom 触发阈值，默认使用 overscanCount                                                  |
