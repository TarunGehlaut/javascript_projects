window.onload = () => {
  const buttons = document.querySelectorAll(".btns");
  const screen = document.querySelector("[data-screen]");
  const AC = document.querySelector("[data-clear-all]");
  const CE = document.querySelector("[data-clear-Element]");
  const result = document.querySelector("[data-result]");
  const theme = document.querySelector("[data-theme]");
  const themeIcon = document.querySelector(".theme-circle i");
  const newResult = document.querySelector(".result");

  let isDarkMode = localStorage.getItem("DarkMode");

  if (isDarkMode === "enabled") {
    enableDarkMode();
  }

  theme.addEventListener("click", () => {
   
    isDarkMode = localStorage.getItem("DarkMode");

    if (isDarkMode === "enabled") {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  function enableDarkMode() {
    document.body.classList.add("dark-theme");

    theme.classList.add("active");

    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("DarkMode", "enabled");
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-theme");

    theme.classList.remove("active");

    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

    localStorage.setItem("DarkMode", "disabled");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      switch (e.target.innerText) {
        case "X":
          screen.innerText += "*";
          break;
        case "-/+":
          screen.innerText *= "-1";
          break;

        default:
          screen.innerText += e.target.innerText;
          break;
      }
    });
  });

  AC.addEventListener("click", () => {
    screen.innerText = "";
    newResult.innerText = "";
  });

  CE.addEventListener("click", () => {
    screen.innerText = screen.innerText.toString().slice(0, -1);
  });

  result.addEventListener("click", () => {
    const expression = screen.innerText;

    if (isValidateExpression(expression)) {
      EvaluateExpression(expression, (result, error) => {
        if (error) {
          screen.innerText = error.message;
        } else {
          screen.innerText = result;
          newResult.innerText = result;
        }
      });
    } else {
      screen.innerText = "Invalid Expression";
    }
  });

  function isValidateExpression(expression) {
    return /^[0-9+\-*/().]+$/.test(expression);
  }

  function EvaluateExpression(expression, callback) {
    try {
      const evaluatedinnerText = new Function("return " + expression)();
      console.log("evaluatedinnerText:", evaluatedinnerText);
      callback(evaluatedinnerText, null);
    } catch (error) {
      callback(null, error);
    }
  }
};
