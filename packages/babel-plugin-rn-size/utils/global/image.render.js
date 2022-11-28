import { Image, StyleSheet } from 'react-native';

//@ts-ignore
const __old3Render = Image.render;
//@ts-ignore
Image.render = function (...props) {
  return __old3Render.call(
    this,
    ...props.map(prop => {
      if (typeof prop === 'object' && prop && (typeof prop.style === 'object' || typeof prop.source !== 'undefined')) {
        const source = Image.resolveAssetSource(prop.source);
        const style = StyleSheet.flatten([prop.style]);
        const widthOrHeightIsSet = style?.width || style?.height;
        return {
          ...prop,
          style: [
            style,
            widthOrHeightIsSet
              ? undefined
              : {
                width: global.__adaptive('width', source?.width),
                height: global.__adaptive('height', source?.height),
              },
          ],
        };
      }
      return prop;
    })
  );
};