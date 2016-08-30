const itemsToGenerate = 10000;
const intervalToUpdate = 100;

var initalState = {
  table1Data: [
    { name: "test ing", age: 20, comment: "funny looking" }
  ],
  table2Data: [
    { name: "test ing", age: 20, comment: "funny looking" }
  ]
}

const REFRESH_TABLE1 = "REFRESH_TABLE1";
const REFRESH_TABLE2 = "REFRESH_TABLE2";

function RefreshTableWithRandomItems(table = "TABLE1", comment = "") {
  return {
    type: "REFRESH_" + table,
    data: _.range(itemsToGenerate).map(x => { 
      return { name: "testing item - " + x, age: Math.floor((Math.random() * 100)), comment: comment + " (" + x + ")" }
    })
  };
}

function UpdateTable1Data(state = {}, action) {
  switch (action.type) {
    case REFRESH_TABLE1:
      return action.data;
    default:
      return state;
  }
}

function UpdateTable2Data(state = {}, action) {
  switch (action.type) {
    case REFRESH_TABLE2:
      return action.data;
    default:
      return state;
  }
}

let reducer = Redux.combineReducers({ table1Data: UpdateTable1Data, table2Data: UpdateTable2Data });
let store = Redux.createStore(reducer, initalState);

store.subscribe(() =>
  console.log(store.getState())
)

setInterval(() => store.dispatch(RefreshTableWithRandomItems("TABLE1", "Comment for TABLE1 item")), intervalToUpdate);
setInterval(() => store.dispatch(RefreshTableWithRandomItems("TABLE2", "Comment for TABLE2 item")), intervalToUpdate);