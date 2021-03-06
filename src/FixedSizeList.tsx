import * as React from 'react';
import pxValue from './pxValue';
import { View, ScrollView } from './remax';

export interface FixedSizeListProps {
  className?: string;
  style?: React.CSSProperties;
  itemCount: number;
  itemSize: number | string;
  overscanCount?: number;
  onReachBottom?: () => void;
  reachBottomThreshold?: number;
}

const DEFAULT_OVERSCAN_COUNT = 5;

function useVisibleRange(
  overscanCount: number
): [number, number, typeof setRange] {
  const [start, setStart] = React.useState(0 - overscanCount);
  const [end, setEnd] = React.useState(0 + 2 * overscanCount);

  function setRange(offset: number) {
    setStart(offset - overscanCount);
    setEnd(offset + 2 * overscanCount);
  }

  return [start, end, setRange];
}

const cloneElement = (size: number) => (element: any, index: number) => {
  if (!React.isValidElement(element)) {
    return element;
  }

  const reactElement: React.ReactElement = element;

  const elementStyle = reactElement.props.style || {};

  return React.cloneElement(reactElement, {
    ...(reactElement.props || {}),
    style: {
      ...elementStyle,
      position: 'absolute',
      top: index * size + 'px'
    }
  });
};

const isVisible = (start: number, end: number) => (_: any, index: number) =>
  index >= start && index <= end;

const FixedSizeListRender: React.FC<FixedSizeListProps> = (props, ref) => {
  const {
    className,
    overscanCount = DEFAULT_OVERSCAN_COUNT,
    children,
    style,
    itemCount,
    itemSize,
    onReachBottom,
    reachBottomThreshold
  } = props;
  const ITEM_SIZE = pxValue(itemSize);
  const LIST_HEIGHT = itemCount * ITEM_SIZE;
  const REACH_BOTTOM_THRESHOLD = reachBottomThreshold || overscanCount;
  const reachBottomRef = React.useRef(false);
  const [start, end, setRange] = useVisibleRange(overscanCount);

  function handleScroll(event: any) {
    if (itemCount - end <= REACH_BOTTOM_THRESHOLD) {
      if (!reachBottomRef.current) {
        reachBottomRef.current = true;

        if (typeof onReachBottom === 'function') {
          onReachBottom();
        }
      }
    } else {
      reachBottomRef.current = false;
    }

    const { scrollTop } = event.detail;
    const offset = Math.floor(scrollTop / ITEM_SIZE);

    setRange(offset);
  }

  const elements = React.Children.toArray(children)
    .map(cloneElement(ITEM_SIZE))
    .filter(isVisible(start, end));

  return (
    <ScrollView
      className={className}
      onScroll={handleScroll}
      scrollY={true}
      style={style}
      ref={ref}
    >
      <View
        style={{
          position: 'relative',
          height: LIST_HEIGHT + 'px'
        }}
      >
        {elements}
      </View>
    </ScrollView>
  );
};

const FixedSizeList = React.forwardRef<
  {},
  React.PropsWithChildren<FixedSizeListProps>
>(FixedSizeListRender);

FixedSizeList.defaultProps = {
  overscanCount: DEFAULT_OVERSCAN_COUNT
};

export default FixedSizeList;
