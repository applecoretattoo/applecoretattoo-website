const apple = String.raw`
                  /\/\/\/\/\/\/\
             /\/\/////////////\/\/\
          /\/\///////_______///////\/\
        /\/\/////____/       \____////\/\
       /\/\///___/                 \___///\/\
      /\/\//__/       /\/\/\/\         \__//\/\
      |/////          /      \           \\\\|
      |////          /        \           \\\|
      |///          |          |           \\\|
       \\\\         |          |          ////
        \\\\        |          |         ////
         \\\\       |          |        ////
          \\\\      |          |       ////
           \\\\     |          |      ////
            \\\\    |          |     ////
             \\\\   |          |    ////
              \\\\  |          |   ////
               \\\\ |          |  ////
                \\\\|          |////
                 \\\|          |///
                  \\|__________|//
                    \__________/
`;

const coolS = String.raw`
        _______
       / _____/
      / /
      \ \____
       \____ \
            \ \
       _____/ /
      /______/
`;

const messages = [
  "APPLECORE.EXE has stopped responding.",
  "Too many apples detected.",
  "Coffee levels critical.",
  "Worm escaped containment.",
  "Traditional levels below acceptable limits.",
  "404: Tattoo not found.",
  "Closing this error created another error.",
  "Eagle escaped.",
  "Someone clicked the wrong slash.",
  "Please insert church coffee.",
  "Client requested infinity symbol.",
  "Comic Sans detected.",
  "The apple knows what you did.",
  "C:\\APPLE\\FLASH\\SECRET is unavailable.",
  "This error will now become two errors."
];

const appleEl = document.querySelector("#ascii-apple");
const sEl = document.querySelector("#cool-s");
const errorLayer = document.querySelector("#error-layer");
const secret = document.querySelector("#secret");
let errorCount = 0;

function renderInteractiveAscii(el, art, secretIndex = -1) {
  let slashCount = 0;
  const frag = document.createDocumentFragment();

  [...art].forEach((char) => {
    if (char === "\n") {
      frag.append(document.createTextNode("\n"));
      return;
    }

    if (char === " ") {
      frag.append(document.createTextNode(" "));
      return;
    }

    const span = document.createElement("span");
    span.className = "ascii-char";
    span.dataset.char = char;
    span.textContent = char;

    if (char === "/") {
      slashCount += 1;
      if (slashCount === secretIndex) {
        span.classList.add("the-one");
        span.title = "this one feels different";
        span.addEventListener("click", openSecret);
      }
    }

    span.addEventListener("mouseenter", () => {
      if (!span.classList.contains("the-one")) {
        const colors = ["#f00", "#00f", "#008000", "#800080", "#ff8c00", "#000"];
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.transform = `rotate(${Math.random() > .5 ? "" : "-"}${12 + Math.floor(Math.random() * 45)}deg) scale(1.18)`;
      }
    });

    span.addEventListener("mouseleave", () => {
      if (!span.classList.contains("the-one")) {
        span.style.color = "";
        span.style.transform = "";
      }
    });

    frag.append(span);
  });

  el.append(frag);
}

function openSecret() {
  secret.classList.add("open");
  secret.setAttribute("aria-hidden", "false");
  spawnErrors(5, true);
}

function closeSecret() {
  secret.classList.remove("open");
  secret.setAttribute("aria-hidden", "true");
}

function createError(message, index, multiply = true) {
  const box = document.createElement("div");
  box.className = "error-box";
  const maxX = Math.max(10, window.innerWidth - 330);
  const maxY = Math.max(40, window.innerHeight - 150);
  box.style.left = `${Math.floor(Math.random() * maxX)}px`;
  box.style.top = `${35 + Math.floor(Math.random() * maxY)}px`;
  box.style.setProperty("--fly-x", `${-180 + Math.random() * 360}px`);
  box.style.setProperty("--fly-y", `${-120 + Math.random() * 280}px`);
  box.innerHTML = `
    <div class="error-title">
      <span>Apple Core Error ${String(index).padStart(3, "0")}</span>
      <button class="error-close" aria-label="Close error">X</button>
    </div>
    <div class="error-body">
      <span class="error-icon">🍎</span>
      <span>${message}</span>
    </div>
  `;

  box.querySelector(".error-close").addEventListener("click", () => {
    if (multiply && errorCount < 26) {
      createError(messages[Math.floor(Math.random() * messages.length)], ++errorCount, false);
      createError("Closing this error created another error.", ++errorCount, false);
    }
    box.classList.add("vanish");
    setTimeout(() => box.remove(), 600);
  });

  errorLayer.append(box);
  return box;
}

function spawnErrors(count = 16, multiply = true) {
  let made = 0;
  const timer = setInterval(() => {
    errorCount += 1;
    createError(messages[Math.floor(Math.random() * messages.length)], errorCount, multiply);
    made += 1;

    if (made >= count) {
      clearInterval(timer);
      setTimeout(clearErrors, 5200);
    }
  }, 115);
}

function clearErrors() {
  document.querySelectorAll(".error-box").forEach((box, i) => {
    setTimeout(() => {
      box.classList.add("vanish");
      setTimeout(() => box.remove(), 600);
    }, i * 35);
  });
}

renderInteractiveAscii(appleEl, apple, 37);
renderInteractiveAscii(sEl, coolS);

document.querySelector("#error-trigger").addEventListener("click", (event) => {
  event.preventDefault();
  spawnErrors();
});

document.querySelector("#secret-close").addEventListener("click", closeSecret);
secret.addEventListener("click", (event) => {
  if (event.target === secret) closeSecret();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSecret();
});

setInterval(() => {
  document.querySelector("#clock").textContent = new Date().toLocaleTimeString();
}, 1000);

const fakeCount = String(Math.floor(1 + Math.random() * 99999999)).padStart(8, "0");
document.querySelector("#counter").textContent = fakeCount;

// A quiet clue for people who inspect the source.
console.log("%cIf you're reading this, you're looking in the right place.", "color: lime; background: black; padding: 8px;");
console.log("apple_03 isn't real anymore.");
