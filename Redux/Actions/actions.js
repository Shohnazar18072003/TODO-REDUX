const ADD_TODO_LIST = "ADD_TODO_LIST";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_TOTAL_ITEMS = "ADD_TOTAL_ITEMS";
const ADD_NEW_PENDING_LIST = "ADD_NEW_PENDING_LIST";
const ADD_PENDING_LIST = "ADD_PENDING_LIST";
const ADD_COMPLETE_LIST = "ADD_COMPLETE_LIST";
const RM_PENDING_LIST = "RM_PENDING_LIST";
const RM_COMPLETE_LIST = "RM_COMPLETE_LIST";

const bindAddTotalItems = () => store.dispatch(addTotalItems());
const bindAddTodoList = (todo) => store.dispatch(addTodoList(todo));
const bindAddPendingList = (todo) => store.dispatch(addPendingList(todo));

function addTodo(todo) {
  bindAddTotalItems();
  bindAddTodoList(todo);
  bindAddPendingList(todo);
}

function addTotalItems() {
  return {
    type: ADD_TOTAL_ITEMS,
  };
}

function addTodoList(todo) {
  return {
    type: ADD_TODO_LIST,
    payload: {
      count: store.getState()["totalItems"]["count"],
      todo,
    },
  };
}

function toggleTodoItem(cb, id) {
  if (cb.checked) {
    let item = {};
    item[id] = store.getState()["pendingList"][id];

    store.dispatch(addCompleteList(item));
    store.dispatch(removePendingList(item));
  } else {
    let item = {};
    item[id] = store.getState()["completedList"][id];

    store.dispatch(removeCompleteList(item));
    store.dispatch(addPendingList(null, item));
  }
}

function addPendingList(todo, item = null) {
  if (todo) {
    return {
      type: ADD_NEW_PENDING_LIST,
      payload: {
        count: store.getState()["totalItems"]["count"],
        todo,
      },
    };
  } else {
    return {
      type: ADD_PENDING_LIST,
      payload: item,
    };
  }
}

function addCompleteList(item) {
  return {
    type: ADD_COMPLETE_LIST,
    payload: item,
  };
}

function removePendingList(item) {
  return {
    type: RM_PENDING_LIST,
    payload: {
      state: store.getState()["pendingList"],
      item,
    },
  };
}

function removeCompleteList(item) {
  return {
    type: RM_COMPLETE_LIST,
    payload: {
      state: store.getState()["completedList"],
      item,
    },
  };
}
