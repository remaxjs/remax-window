import * as React from 'react';
import { Platform } from 'remax';
import {
  View as AlipayView,
  ScrollView as AlipayScrollView,
  getSystemInfoSync as alipayGetSystemInfoSync
} from 'remax/alipay';
import {
  View as WechatView,
  ScrollView as WechatScrollView,
  getSystemInfoSync as wechatGetSystemInfoSync
} from 'remax/wechat';

interface ViewProps {
  style: React.CSSProperties;
}

export const View: React.FC<React.PropsWithChildren<ViewProps>> = props => {
  switch (Platform.current) {
    case 'alipay':
      return <AlipayView style={props.style} >
        {props.children}
      </AlipayView>;
    case 'wechat':
    default:
      return <WechatView style={props.style} >
        {props.children}
      </WechatView>;
  }
};

interface ScrollViewProps {
  className?: string;
  onScroll?: (event: any) => void;
  scrollY?: boolean;
  style?: React.CSSProperties;
}

const ScrollViewRender: React.FC<React.PropsWithChildren<ScrollViewProps>> = (
  props,
  ref
) => {
  switch (Platform.current) {
    case 'alipay':
      return (
        <AlipayScrollView
          style={props.style}
          className={props.className}
          onScroll={props.onScroll}
          scrollY={props.scrollY}
          ref={ref}
        >
          {props.children}
        </AlipayScrollView>
      );
    case 'wechat':
    default:
      return (
        <WechatScrollView
          style={props.style}
          className={props.className}
          onScroll={props.onScroll}
          scrollY={props.scrollY}
          ref={ref}
        >
          {props.children}
        </WechatScrollView>
      );
  }
};

export const ScrollView = React.forwardRef(ScrollViewRender);

export let getSystemInfoSync:
  | typeof wechatGetSystemInfoSync
  | typeof alipayGetSystemInfoSync;

switch (Platform.current) {
  case 'wechat':
    getSystemInfoSync = wechatGetSystemInfoSync;
    break;
  case 'alipay':
    getSystemInfoSync = alipayGetSystemInfoSync;
    break;
}
