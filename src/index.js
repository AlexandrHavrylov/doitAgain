import "./styles/main.scss";
import template from "./templates/main.hbs";
import data from "./data/data.json";
import { setLocalStorage, getLocalStorage } from "./utils/utils";

let tmpUserNameState = "";

window.onload = () => {
  const container = document.getElementById("container");

  const isName = getLocalStorage();

  localStorage.setItem("test", JSON.stringify(data));

  if (isName) {
    const newData = Object.assign({}, data, { name: isName });
    container.innerHTML = template(newData);
  } else {
    container.innerHTML = template(data);

    const nameInput = document.getElementById("nameInput");
    const saveUser = document.getElementById("saveUser");

    nameInput.addEventListener("input", e => {
      tmpUserNameState = e.target.value;
    });

    saveUser.addEventListener("click", () => {
      setLocalStorage(tmpUserNameState);
      const newData = Object.assign({}, data, { name: tmpUserNameState });
      container.innerHTML = template(newData);
    });
  }
};
