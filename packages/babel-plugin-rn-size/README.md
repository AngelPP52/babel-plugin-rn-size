# babel-plugin-rn-size

> 通过 `babel plugin` 的形式转换 `RN` 的尺寸，使其按照标准屏幕尺寸等比例缩放，达到自适应的效果。

## 使用说明

### 安装

```bash
# yarn
> yarn add babel-plugin-rn-size
# npm
> npm install babel-plugin-rn-size
# pnpm
> pnpm install babel-plugin-rn-size
```

### 配置插件

`babel.config.json`

```json
{
  // ...
  "plugins": [
    [
      "babel-plugin-rn-size",
      {
        "includes": ["src/"],
        "flatListIncludes": ["src/"],
        "defaultScreen": {
          "width": 375,
          "height": 667
        }
      }
    ]
  ]
}
```

`index.ts/tsx/js/jsx`

```tsx
import 'babel-plugin-rn-size/utils/useRnSize';

// ...
```

## 字段说明

`includes`
只转换配置目录的代码

`flatListIncludes`
只转换配置目录的代码（flatList）

`defaultScreen`
默认屏大小（375*667），即是设计稿约定标准屏幕

## 其他说明

通过添加注释：`@@ignore__adaptive`，**取消某个数值的自动转换逻辑**

```tsx
<Animated.View
  style={[
    styles.overlayRectangle,
    {
      bottom: topOverlayBottomBoundary /* @@ignore__adaptive */, // 这个尺寸不会被转换
      left: verticalOverlayLeftBoundary /* @@ignore__adaptive */, // 这个尺寸不会被转换
      right: verticalOverlayRightBoundary, // 这个尺寸会被自动转换
      backgroundColor: props.backdropColor,
    },
  ]}
/>
```