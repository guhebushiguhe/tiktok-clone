const defaultStore = {
  value: "CenterButton的初始值",
};

// 方法统一写在这里，看懂示例之后将示例删除
const fn = {
  // -----示例-----
  // add: function (store, action) {
  //   store.num++;
  //   return store;
  // },
};

// store中不要出现undefined、null、NaN

const reducer = function (store = defaultStore, action) {
  if (action.type.indexOf("redux") === -1) {
    if (fn[action.type]) {
      store = fn[action.type](store, action);
    }
  }
  return JSON.parse(JSON.stringify(store));
};

export default reducer;
