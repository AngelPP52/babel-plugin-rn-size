import {
  whetherWhiteFile,
  whetherWhiteKey,
  whetherIgnoreAdaptive,
  addIgnoreAdaptive,
  whetherFlatListJSX,
  whetherNativeJSX,
} from '../utils/common';
import { presetDefaultScreen } from '../utils/screen';

function plugin({ types, template }) {
  return {
    pre(state) {
      presetDefaultScreen(state.opts.defaultScreen);
    },
    visitor: {
      Property: {
        exit: function (path, state) {
          const { includes = [] } = state.opts || {};
          // ignore. This is a filter to ignore some files.
          if (!types.isObjectExpression(path.parent)) {
            return;
          }
          // ignore. This is a filter to ignore some files.
          if (whetherWhiteFile(includes, state.file.opts.filename)) {
            return;
          }
          var node = path.node;
          // ignore. @@ignore__adaptive logic
          if (whetherIgnoreAdaptive(node)) {
            return;
          }
          if (whetherWhiteKey(node.key && node.key.name)) {
            if (!types.isCallExpression(node.value)) {
              const expression = types.callExpression(template.expression(`global.__adaptive`)(), [
                types.stringLiteral(node.key.name),
                node.value,
              ]);

              var ast = types.objectProperty(types.identifier(node.key.name), expression);

              path.replaceWith(ast);
            }
          }
        },
      },
      JSXOpeningElement: {
        enter: function (path, state) {
          const { flatListIncludes = [] } = state.opts || {};
          if (whetherWhiteFile(flatListIncludes, state.file.opts.filename)) {
            return;
          }
          // let refAttribute = null;
          let getItemLayoutAttribute = null;
          path.get('attributes').forEach((attribute) => {
            if (!attribute.node.name) {
              return;
            }
            const attributeName = attribute.node.name.name;
            // if (attributeName === 'ref') { refAttribute = attribute; }
            if (attributeName === 'getItemLayout') {
              getItemLayoutAttribute = attribute;
            }

            if (!whetherNativeJSX(attributeName) && whetherWhiteKey(attributeName)) {
              addIgnoreAdaptive(attribute.node);
            }
          });

          // only FlatList JSX, and has getItemLayoutAttribute
          if (whetherFlatListJSX(path.node.name.name) && getItemLayoutAttribute) {
            const expression = types.callExpression(template.expression(`global.__getItemLayout`)(), [
              getItemLayoutAttribute.node.value.expression,
            ]);

            getItemLayoutAttribute.remove();
            path.node.attributes.push(
              types.JSXAttribute(types.JSXIdentifier('getItemLayout'), types.jsxExpressionContainer(expression))
            );
          }
        },
      },
    },
  };
}

module.exports = plugin;
