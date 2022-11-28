import { StyleSheet } from 'react-native';
import { scaleSize, screenH, screenW } from '../screen';
// import { SafeAreaInsetsTop, SafeAreaInsetsBottom } from '../device';

const hairlineWidth = StyleSheet.hairlineWidth < 0.5 ? 0.5 : StyleSheet.hairlineWidth;

const __scaleSize = (v) => +scaleSize(v);

const __setSpText = (v) => +scaleSize(v);

const __adaptive = (key, value) => {
  let newValue = value;
  if (typeof newValue === 'function') {
    newValue = newValue();
  }
  if (typeof newValue === 'string') {
    return newValue;
  }

  if (typeof newValue === 'number') {
    if (['fontSize', 'lineHeight'].includes(key)) {
      newValue = __setSpText(newValue);
    } else {
      // ignore width, when value is full screen
      if (['width', 'minWidth', 'maxWidth'].includes(key) && newValue === screenW) {
        return newValue;
      }
      // ignore height, when value is full screen
      if (['height', 'minHeight', 'maxHeight'].includes(key) && newValue === screenH) {
        return newValue;
      }
      // // ignore top gap, when value is SafeAreaInsetsTop
      // if (['paddingTop', 'marginTop', 'top'].includes(key) && newValue === SafeAreaInsetsTop) {
      //   return newValue;
      // }
      // // ignore bottom gap, when value is SafeAreaInsetsBottom
      // if (['paddingBottom', 'marginBottom', 'bottom'].includes(key) && newValue === SafeAreaInsetsBottom) {
      //   return newValue;
      // }
      newValue = __scaleSize(newValue);
    }
    // make sure the smallest size (after scale) is not smaller than the hairlineWidth provided by RN
    if (newValue < hairlineWidth && newValue > 0) {
      return hairlineWidth;
    }
    return newValue;
  }

  return value;
};

const __getItemLayout = (originGetItemLayout) =>
  typeof originGetItemLayout !== 'function'
    ? originGetItemLayout
    : (_, index) => {
        const layout = originGetItemLayout(_, index);
        const length = __scaleSize(layout.length);
        const offset = __scaleSize(layout.offset);
        const isOneScreen = layout.length === screenW;
        return {
          ...layout,
          length: isOneScreen ? layout.length : length,
          offset: isOneScreen ? layout.offset : offset,
        };
      };

global.__adaptive = __adaptive;
global.__getItemLayout = __getItemLayout;
