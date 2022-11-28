import 'babel-plugin-rn-size/utils/useRnSize';

// 1️⃣ 创建的样式表
styles = StyleSheet.create({
  header: {
    width: 100,
    height: 100,
  },
});
const Component = (
  <>
    {/* 2️⃣ 内敛样式 */}
    <View style={{ height: 12, width: 1 }} />
    {/* 3️⃣ 原生组件：支持样式同名的 Props */}
    <Image source={logo} height={24} />
    {/* 4️⃣ 非原生组件：支持样式同名的 Props */}
    <MyComponent width={24} />
    {/* 5️⃣ FlatList 为了保证 getItemLayout 的准确，也会被重新计算 */}
    <FlatList
      getItemLayout={(_, index) => ({
        index,
        length: 102,
        offset: 102 * index,
      })}
    />
  </>
);

// 解构不应被重新计算 - object
const { width, height } = obj;
// 解构不应被重新计算 - function parameters
const fun = ({ width, height }) => {
  return `${width}*${height}`;
};
