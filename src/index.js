import "./styles.css";
import helper from "./helper.js";

const todo = {
  state: {
    inputValue: "",
    todoText: ""
  },
  elm: {
    appendTarget: "",
    completeBtm: "",
    deleteBtn: "",
    returnBtm: ""
  },
  init: function () {
    this.bindEvent.onClickInputBtn();
  },
  bindEvent: {
    onClickInputBtn: function () {
      document
        .getElementById("js-input-button")
        .addEventListener("click", (e) => {
          todo.getInputValue();
          todo.initInputValue();
          todo.createTodo(e, { trigger: "inputBtn" });
          todo.createTodoBtn({ trigger: "inputBtn" });
        });
    },
    onclickComplateBtn: function () {
      todo.elm.completeBtm.addEventListener("click", (e) => {
        todo.getTodoText(e);
        todo.appendCompleteArea(e);
        todo.deleteTarget(e);
      });
    },
    onClickDeleteBtn: () => {
      todo.elm.deleteBtn.addEventListener("click", (e) => {
        todo.deleteTarget(e);
      });
    },
    onClickReturnBtn: () => {
      todo.elm.returnBtm.addEventListener("click", (e) => {
        todo.createTodo(e, { trigger: "returnBTn" });
        todo.createTodoBtn({ trigger: "returnBTn" });
        todo.deleteTarget(e);
      });
    }
  },
  getInputValue: function () {
    this.state.inputValue = document.getElementById("js-input").value;
  },
  initInputValue: function () {
    document.getElementById("js-input").value = "";
  },
  getText: function (e) {
    this.state.todoText = e.target
      .closest("li")
      .getElementsByClassName("item-title")[0].innerHTML;
  },
  createTodo: function (e, str) {
    const appendTargetId =
      str.trigger === "completeBtn"
        ? "js-add-complete-list"
        : "js-add-inComplete-list";
    const appendTarget = document.getElementById(`${appendTargetId}`);

    const li = helper.createElm("li", "item");
    const p = helper.createElm("p", "item-title");
    this.elm.appendTarget = helper.createElm("div");

    if (str.trigger === "inputBtn") {
      p.innerHTML = this.state.inputValue;
    } else {
      this.getText(e);
      p.innerHTML = this.state.todoText;
    }

    appendTarget.appendChild(li);
    li.appendChild(p);
    li.appendChild(this.elm.appendTarget);
  },
  createTodoBtn: function (str) {
    if (str.trigger === "completeBtn") {
      this.elm.returnBtm = helper.createBtn("戻す");
      this.elm.appendTarget.appendChild(this.elm.returnBtm);
      this.bindEvent.onClickReturnBtn();
    } else {
      this.elm.completeBtm = helper.createBtn("完了");
      this.elm.deleteBtn = helper.createBtn("削除");
      this.elm.appendTarget.appendChild(this.elm.completeBtm);
      this.elm.appendTarget.appendChild(this.elm.deleteBtn);
      this.bindEvent.onclickComplateBtn();
      this.bindEvent.onClickDeleteBtn();
    }
  },
  deleteTarget: function (e) {
    const deleteTarget = e.target.closest("li");
    deleteTarget.remove();
  },
  getTodoText: function (e) {
    this.state.target = e.target
      .closest("li")
      .getElementsByClassName("item-title")[0].innerHTML;
  },
  appendCompleteArea: function (e) {
    this.createTodo(e, { trigger: "completeBtn" });
    this.createTodoBtn({ trigger: "completeBtn" });
  }
};

todo.init();
