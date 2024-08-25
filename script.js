const dailyBtn = document.getElementById("daily-btn");
const weeklyBtn = document.getElementById("weekly-btn");
const monthlyBtn = document.getElementById("monthly-btn");

window.addEventListener("load", (e) => {
  getData("weekly");
});

dailyBtn.addEventListener("click", function () {
  weeklyBtn.classList.remove("selected-btn");
  monthlyBtn.classList.remove("selected-btn");
  this.classList.add("selected-btn");
  getData("daily");
});

weeklyBtn.addEventListener("click", function () {
  dailyBtn.classList.remove("selected-btn");
  monthlyBtn.classList.remove("selected-btn");
  this.classList.add("selected-btn");
  getData("weekly");
});

monthlyBtn.addEventListener("click", function () {
  dailyBtn.classList.remove("selected-btn");
  weeklyBtn.classList.remove("selected-btn");
  this.classList.add("selected-btn");
  getData("monthly");
});

function getData(timeFrame) {
  fetch("./data.json")
    .then((request) => {
      return request.json();
    })
    .then((data) => {
      data.forEach((item, index) => {
        const current = item.timeframes[timeFrame].current;
        const previous = item.timeframes[timeFrame].previous;

        let currentHrs = document.getElementById(`hour-${index}`);
        currentHrs.innerHTML = current + "hrs";

        let span = document.createElement("span");
        let text;

        if (timeFrame === "daily") {
          text = document.createTextNode("Yesterday - " + previous + "hrs");
        } else if (timeFrame === "weekly") {
          text = document.createTextNode("Last Week - " + previous + "hrs");
        } else {
          text = document.createTextNode("Last Month - " + previous + "hrs");
        }

        span.appendChild(text);
        currentHrs.appendChild(span);
      });
    });
}
