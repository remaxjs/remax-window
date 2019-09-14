import * as React from 'react';
import { ScrollView, View } from 'remax/wechat';
import transformRpx from './transformRpx';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  itemCount: number;
  itemSize: number;
  overscanCount?: number;
  onReachBottom?: () => any;
}

const FixedSizeList: React.FC<Props> = props => {
  const {
    className,
    overscanCount,
    children,
    style,
    itemCount,
    itemSize,
    onReachBottom
  } = props;
  const OVERSCAN_COUNT = overscanCount || 5;
  const [startIndex, setStartIndex] = React.useState(0 - OVERSCAN_COUNT);
  const [endIndex, setEndIndex] = React.useState(0 + OVERSCAN_COUNT);
  const reachBottomRef = React.useRef(false);
  const listHeight = itemCount * itemSize;
  const elements = React.Children.toArray(children)
    .map((element, index) => {
      if (React.isValidElement(element)) {
        const elementStyle = element.props.style || {};
        return React.cloneElement(element, {
          ...(element.props || {}),
          style: {
            ...elementStyle,
            position: 'absolute',
            top: transformRpx(index * itemSize) + 'px'
          }
        });
      }

      return element;
    })
    .filter((_, index) => index >= startIndex && index <= endIndex);

  function handleScroll(event: any) {
    const { scrollTop } = event.detail;
    const offset = Math.floor(scrollTop / transformRpx(itemSize));
    const newEndIndex = offset + 2 * OVERSCAN_COUNT;

    if (itemCount - endIndex <= OVERSCAN_COUNT) {
      if (!reachBottomRef.current && typeof onReachBottom === 'function') {
        onReachBottom();
        reachBottomRef.current = true;
      }
    } else {
      reachBottomRef.current = false;
    }

    setStartIndex(offset - OVERSCAN_COUNT);
    setEndIndex(offset + 2 * OVERSCAN_COUNT);
  }

  return (
    <ScrollView
      className={className}
      onScroll={handleScroll}
      scrollY={true}
      style={{
        ...style
      }}
    >
      <View
        style={{
          position: 'relative',
          height: transformRpx(listHeight) + 'px'
        }}
      >
        {elements}
      </View>
    </ScrollView>
  );
};

FixedSizeList.defaultProps = {
  overscanCount: 5
};

export default FixedSizeList;
