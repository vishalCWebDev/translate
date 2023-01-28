import { languages } from "./lang.js";

const darkMode = document.querySelector(".ball"),
  alertMes = document.querySelector(".warn-mes"),
  translation = document.querySelectorAll(".translateTo, .translated"),
  text = document.querySelector("p"),
  select = document.querySelectorAll("select"),
  icon = document.querySelectorAll("i"),
  wordCount = document.querySelectorAll(".count-box"),
  button = document.querySelector(".btn"),
  loader = document.querySelector(".loader-con"),
  DarkclassLists =
    "section, .ball, .dark-mode-toggle, .wrapper, .option-box, .translateTo, .translated, .count-box, .mic , .bottom, footer, header, li, .btn, .policy-container, .click-cookies",
  classes = document.querySelectorAll(DarkclassLists);
document.querySelector(
  "footer"
).innerHTML = `<i class="fa fa-copyright" style="font-size:20px"></i> &nbsp;
  <h4>${new Date().getFullYear()} create by Vishal Chaudhari</h4>.`;

window.addEventListener("load", () => {
  loader.style.display = "none";
  document.querySelector(".wrapper").style.display = "block";
  // setTimeout(() => setCookies(), 1 * 1000);
});

darkMode.addEventListener("click", () =>
  classes.forEach((items) => items.classList.toggle("active"))
);

select.forEach((tags, i) => {
  for (const lang of languages) {
    let selected;
    if (i === 0 && lang.code === "en") {
      selected = "selected";
    } else if (i === 1 && lang.code === "hi") {
      selected = "selected";
    }
    const option = `<option value="${lang.code}" ${selected}>${lang.name}</option>`;
    tags.insertAdjacentHTML("beforeend", option);
  }
});

translation[0].addEventListener("input", (e) => {
  const val = e.target.innerHTML.trim();
  val === ""
    ? icon[4].style.setProperty("--view", "none")
    : icon[4].style.setProperty("--view", "block");
  if (val.length < 5000) {
    wordCount[0].innerHTML = `${val.length} / 5,000`;
  } else {
    translation[0].setAttribute("contenteditable", "false");
  }
  alertMes.parentNode.style.visibility = "hidden";
});

// button.addEventListener("click", (e) => {
//   const data = translation[0].innerText;
//   if (data !== "") {

//     const setOne = select[0].value;
//     const setTwo = select[1].value;

//     const url = `https://api.mymemory.translated.net/get?q=${data}&langpair=${setOne}|${setTwo}`;
//     fetch(url)
//       .then((response) => response.json())
//       .then((response) =>sendText(response.matches[0].translation))
//       .catch((err) => console.error(err));
//     // sendText(data);
//   } else {
//     alertMes.innerText = "warning! translation fild is empity";
//     alertMes.parentNode.style.visibility = "visible";
//   }

// });

// const sendText = (response) => {
//   translation[1].innerText = response;
//   icon[5].style.display = "block";
//   icon[6].style.display = "block";
// };

icon.forEach((icons) => {
  icons.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-microphone")) {
      navigator.onLine ? console.log("online") : console.log("off");
      speakAndWrite();
    } else if (e.target.classList.contains("fa-copy")) {
      navigator.clipboard.writeText(translation[1].textContent);
    } else if (
      e.target.classList.contains("fa-exchange") &&
      translation[1].innerText !== ""
    ) {
      if (translation[0].innerText !== "") {
        translation[1].innerText = translation[0].textContent;
        translation[0].innerText = translation[1].textContent;
      } else {
        alert();
      }
    } else if ("fa-volume-up") {
      speck(translation[0].textContent);
    }
  });
});

const speck = (textSpeech) => {
  var speech = new SpeechSynthesisUtterance();
  speech.volume = 1;
  speech.rate = 0.7;
  speech.pitch = 1;
  speech.text = textSpeech;
  speech.lang = "en";
  window.speechSynthesis.speak(speech);
};

const speakAndWrite = () => {
  if ("webkitSpeechRecognition" in window) {
    const audio =
      new webkitSpeechRecognition() ||
      oSpeechRecognition() ||
      mozSpeechRecognition();
    audio.start();

    audio.onstart = () => {
      icon[3].style.color = "red";
    };

    audio.onspeechend = () => {
      icon[3].style.color = "inherit";
    };

    audio.onresult = (e) => {
      const result = e.results[0][0].transcript;
      translation[0].innerHTML = result;
      icon[4].style.setProperty("--view", "block");
    };
  } else {
    console.error("Speech Recognition Not Available");
  }
};

window.addEventListener("resize", () => {
  // console.log(window.screen.width, window.screen.height);
  if (window.innerWidth < 767) {
    button.addEventListener("click", () => {
      const box = document.querySelectorAll(".first-box, .second-box");
      box.forEach((items) => items.classList.toggle(".active"));
      translation[1].innerHTML = window.innerWidth;
    });
  }
});

// window.addEventListener("click", ()=>{
//   console.log(window.screen.colorDepth);
// })

const setCookies = () => {
  const cookiesBtn = document.querySelectorAll(".click-cookies");
  const policyCon = document.querySelector(".policy-container");
  policyCon.style.bottom = "0";
  const userDeviesInfo = [
    {
      platform: navigator.platform,
      language: navigator.language,
      browersName: navigator.appName,
      codeName: navigator.appCodeName,
      product: navigator.product,
      deviesScreen: {
        width: window.screen.width,
        height: window.screen.height,
      },
    },
  ];
  document.cookie = `info=${userDeviesInfo}; expires=Thu, 31 Dec 2023 12:00:00 UTC`;
};
