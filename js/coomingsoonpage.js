const countingTags = document.querySelectorAll(".day, .hour, .minute, .second");
let countDown = new Date("2024-7-15 00:00:00").getTime();

window.addEventListener("load", () => {
  setInterval(() => counting(), 1000);
});
const counting = () => {
  const courntDate = new Date().getTime(),
    gap = countDown - courntDate;

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const d = Math.trunc(gap / day),
    h = Math.trunc((gap % day) / hour),
    m = Math.trunc((gap % hour) / minute),
    s = Math.trunc((gap % minute) / second),
    getDate = [d, h, m, s];

  countingTags.forEach((items, i) => (items.innerText = getDate[i]));
};
