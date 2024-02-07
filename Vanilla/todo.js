let appState = {
  totalItems: 0,
  todo: {},
  completed: {},
  pending: {},
};

function addRow(e) {
  e.preventDefault();
  if (document.getElementById("newTodo").value !== "") {
    let itemID = appState["totalItems"];
    var table = document.getElementById("todoTable");
    var row = table.insertRow(table.rows.length);
    var task = row.insertCell(0);
    task.innerHTML +=
      "<td>" + document.getElementById("newTodo").value + "</td>";
    task.setAttribute("id", `todoItem-${itemID}`);
    var status = row.insertCell(1);
    status.innerHTML +=
      '<td><label><input id="' +
      itemID +
      '" type="checkbox" onclick="toggleTodo(this)"/><span></span></label></td>';

    if (!appState["todo"][itemID]) {
      appState["todo"][itemID] = {
        item: document.getElementById("newTodo").value,
      };
    }

    if (!appState["pending"][itemID]) {
      appState["pending"][itemID] = {
        item: document.getElementById("newTodo").value,
      };
    }

    renderPendingElements(appState["pending"], itemID);

    appState["totalItems"] += 1;

    document.getElementById("newTodo").value = "";
  }
}

function toggleTodo(cb) {
  if (cb.checked) {
    if (!document.getElementById(`completedList-${cb.id}`)) {
      var ul = document.getElementById("completedItems");
      var li = document.createElement("li");
      li.appendChild(
        document.createTextNode(appState["pending"][cb.id]["item"])
      );
      li.setAttribute("id", `completedList-${cb.id}`);
      ul.appendChild(li);
    }
    var removeElement = document.getElementById(`pendingList-${cb.id}`);
    removeElement.parentNode.removeChild(removeElement);
  } else {
    if (!document.getElementById(`pendingList-${cb.id}`)) {
      var ul = document.getElementById("pendingItems");
      var li = document.createElement("li");
      li.appendChild(
        document.createTextNode(appState["completed"][cb.id]["item"])
      );
      li.setAttribute("id", `pendingList-${cb.id}`);
      ul.appendChild(li);
    }
    var removeElement = document.getElementById(`completedList-${cb.id}`);
    removeElement.parentNode.removeChild(removeElement);
  }

  if (cb.checked) {
    if (!appState["completed"][cb.id]) {
      appState["completed"][cb.id] = {
        item: appState["pending"][cb.id]["item"],
      };
    }
    delete appState["pending"][cb.id];
  } else {
    if (!appState["pending"][cb.id]) {
      appState["pending"][cb.id] = {
        item: appState["completed"][cb.id]["item"],
      };
    }
    delete appState["completed"][cb.id];
  }
}

function renderPendingElements(pending, itemID) {
  var ul = document.getElementById("pendingItems");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(pending[itemID]["item"]));
  li.setAttribute("id", `pendingList-${itemID}`);
  ul.appendChild(li);
}
