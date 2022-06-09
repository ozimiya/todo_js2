export default {
  createElm: (elm, className) => {
    const createElm = document.createElement(elm);
    if (className) createElm.setAttribute("class", className);
    return createElm;
  },
  createBtn: (className) => {
    const createBtn = document.createElement("button");
    createBtn.innerHTML = className;
    return createBtn;
  }
};
