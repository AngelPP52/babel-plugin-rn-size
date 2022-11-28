import { Dimensions } from 'react-native';
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

//以 iphone6 为基准，如果以其他尺寸为基准的话，请修改下面的 defaultWidth 和 defaultHeight 为对应尺寸即可。以下为 1 倍图时
const defaultWidth = 375;
const defaultHeight = 667;
const defaultScreen = {
  defaultWidth: defaultWidth,
  defaultHeight: defaultHeight,
};

/**
 * 适配单位，根据原来是否有小数单位，对结果四舍五入
 * @param {*} size 尺寸
 * @param {*} scale 适配 scale
 * @returns {number}
 */
function keepFloat(size, scale) {
  const roundSize = Math.round(size);
  const roundNewSize = Math.round(size * scale);
  return size > roundSize ? roundNewSize + (size - Math.floor(size)) : roundNewSize;
}

/**
 * 屏幕适配，缩放 size , 默认根据宽度适配，纵向也可以使用此方法
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size) {
  //缩放比例
  const _scaleWidth = screenW / defaultScreen.defaultWidth;
  const _scaleHeight = screenH / defaultScreen.defaultHeight;
  const scale = Math.min(_scaleWidth, _scaleHeight);
  return keepFloat(size, scale);
}

export function presetDefaultScreen({ width = defaultWidth, height = defaultHeight }) {
  defaultScreen.defaultWidth = width;
  defaultWidth.defaultHeight = height;
}
