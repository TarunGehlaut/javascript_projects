window.onload = () => {
  function buildingClock() {
    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector("[data-hour]").innerText = hours;
    document.querySelector("[data-minute]").innerText = minutes;
    document.querySelector("[data-second]").innerText = seconds;
  }

  //   Initial Call
  buildingClock();

  setInterval(() => {
    buildingClock();
  }, 1000);
};
