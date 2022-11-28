import nodePath from ('path');


export default {
  whetherWhiteFile(whiteFiles, filename) { return whiteFiles.findIndex(file => file && filename.includes(nodePath.join(process.cwd(), file))) === -1; },
  whetherWhiteKey(keyName) {
    return [
      'paddingHorizontal',
      'paddingLeft',
      'paddingRight',
      'marginHorizontal',
      'marginLeft',
      'marginRight',

      'paddingVertical',
      'paddingTop',
      'paddingBottom',
      'marginVertical',
      'marginTop',
      'marginBottom',

      'padding',
      'margin',

      // 'translateX',
      // 'translateY',
      // 'translate',
      // 'scale',
      // 'scaleX',
      // 'scaleY',

      'width', 'minWidth', 'maxWidth',
      'height', 'minHeight', 'maxHeight',
      'left', 'right', 'top', 'bottom',

      'fontSize', 'lineHeight',
    ].includes(keyName)
  },
  whetherFlatListJSX(jsxName) { return ['FlatList'].includes(jsxName) },
  whetherNativeJSX(jsxName) {
    return [
      'FlatList',
      'ActivityIndicator',
      'Image',
      'ImageBackground',
      'Button',
      'KeyboardAvoidingView',
      'Modal',
      'Pressable',
      'RefreshControl',
      'ScrollView',
      'SectionList',
      'StatusBar',
      'Switch',
      'Text',
      'TextInput',
      'TouchableHighlight',
      'TouchableOpacity',
      'TouchableWithoutFeedback',
      'View',
      'VirtualizedList',
      'SafeAreaView',
      'InputAccessoryView',
      'DrawerLayoutAndroid',
      'TouchableNativeFeedback'].includes(jsxName)
  },
  whetherIgnoreAdaptive(node) {
    const comments = [
      ...(node?.comments || []),
      ...(node?.trailingComments || []),
      ...(node?.leadingComments || [])
    ];
    return comments.findIndex(comment => comment.value.includes('@@ignore__adaptive')) !== -1;
  },
  addIgnoreAdaptive(node) {
    node.comments = node.comments || [];
    node.comments.push({
      type: 'CommentBlock',
      value: '@@ignore__adaptive',
      trailing: true
    });
    node.trailingComments = node.trailingComments || [];
    node.trailingComments.push({
      type: 'CommentBlock',
      value: '@@ignore__adaptive',
      trailing: true
    });
    node.leadingComments = node.leadingComments || [];
    node.leadingComments.push({
      type: 'CommentBlock',
      value: '@@ignore__adaptive',
      trailing: true
    });
  }
}