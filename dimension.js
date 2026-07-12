const apple = String.raw`
                          /\/\/\/\/\/\/\
                    /\/\/\/\/\/\/\/\/\/\/\/\
                /\/\/\/\                /\/\/\/\
             /\/\/\/                        \/\/\/\
           /\/\/\                              /\/\/\
          /\/\/                                  \/\/\
          |\/|       /\/\/\/\/\/\/\/\/\           |\/|
          |/\|      /                  \          |/\|
           \/      /                    \          \/
                  /                      \
                 |                        |
                 |                        |
                 |                        |
                  \                      /
           /\      \                    /          /\
          |\/|      \__________________/          |\/|
          |/\|                                  /\/\|
          \/\/\                                /\/\/
           \/\/\                              /\/\/
             \/\/\/\                      /\/\/\/
                \/\/\/\/\            /\/\/\/\/
                    \/\/\/\/\/\/\/\/\/\/
                          \/\/\/\/\/
                              ||
                              ||
`;

const coolS = String.raw`
             /\
            /  \
           | | |
           | | |
          /  |  \
         /   |   \
        /    |    \
       /     |     \
       \     |     /
        \    |    /
         \   |   /
          \  |  /
           | | |
           | | |
            \  /
             \/
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
  "This error will now become two errors.",
  "One slash has different behavior.",
  "You have clicked too many things.",
  "The website is watching your cursor."
];

const fileContents = {
  FLASH: "ACCESS DENIED.\nThe flash can see you.",
  DO_NOT_OPEN: "You opened it.\n\nThat was the whole test.",
  WORM: "worm.exe is currently running.\nLocation: unknown.",
  "journal_04.txt": "I don't think the apple is supposed to move."
};

const appleEl = document.querySelector("#ascii-apple");
const sEl = document.querySelector("#cool-s");
const errorLayer = document.querySelector("#error-layer");
const fxLayer = document.querySelector("#fx-layer");
const secret = document.querySelector("#secret");
const drive = document.querySelector("#drive");

let errorCount = 0;

function renderInteractiveAscii(el, art, secretIndex = -1) {
  let slashCount = 0;
  const fragment = document.createDocumentFragment();

  [...art].forEach((char) => {
    if (char === "\n") {
      fragment.append(document.createTextNode("\n"));
      return;
    }

    if (char === " ") {
      fragment.append(document.createTextNode(" "));
      return;
    }

    const span = document.createElement("span");
    span.className = "ascii-char";
    span.dataset.char = char;
    span.textContent = char;

    if (Math.random() < 0.05) {
      span.classList.add(
        Math.random() < 0.5 ? "flash-blue" : "flash-yellow"
      );
    }

    if (char === "/") {
      slashCount += 1;

      if (slashCount === secretIndex) {
        span.classList.add("the-one");
        span.title = "this one feels different";
        span.addEventListener("click", () => openModal(secret));
      }
    }

    span.addEventListener("mouseenter", () => {
      if (!span.classList.contains("the-one")) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        const rotation = 12 + Math.floor(Math.random() * 45);
        span.style.transform =
          `rotate(${direction * rotation}deg) scale(1.18)`;
      }
    });

    span.addEventListener("mouseleave", () => {
      if (!span.classList.contains("the-one")) {
        span.style.transform = "";
      }
    });

    fragment.append(span);
  });

  el.append(fragment);
}

function openModal(element) {
  element.classList.add("open");
  element.setAttribute("aria-hidden", "false");
}

function closeModal(element) {
  element.classList.remove("open");
  element.setAttribute("aria-hidden", "true");
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
      createError(
        messages[Math.floor(Math.random() * messages.length)],
        ++errorCount,
        false
      );

      createError(
        "Closing this error created another error.",
        ++errorCount,
        false
      );
    }

    box.classList.add("vanish");
    setTimeout(() => box.remove(), 600);
  });

  errorLayer.append(box);
}

function spawnErrors(count = 16) {
  let made = 0;

  const timer = setInterval(() => {
    createError(
      messages[Math.floor(Math.random() * messages.length)],
      ++errorCount,
      true
    );

    made += 1;

    if (made >= count) {
      clearInterval(timer);
      setTimeout(clearErrors, 5200);
    }
  }, 115);
}

function clearErrors() {
  document.querySelectorAll(".error-box").forEach((box, index) => {
    setTimeout(() => {
      box.classList.add("vanish");
      setTimeout(() => box.remove(), 600);
    }, index * 35);
  });
}

function rainApples() {
  for (let i = 0; i < 55; i += 1) {
    const apple = document.createElement("div");
    apple.className = "falling-apple";
    apple.textContent = Math.random() < 0.3 ? "🍏" : "🍎";
    apple.style.left = `${Math.random() * 100}vw`;
    apple.style.animationDuration = `${1.6 + Math.random() * 2.5}s`;
    apple.style.animationDelay = `${Math.random() * 0.8}s`;

    fxLayer.append(apple);
    setTimeout(() => apple.remove(), 5000);
  }
}

function pixelFireworks() {
  const colors = ["red", "blue", "yellow", "lime", "magenta"];

  for (let burstIndex = 0; burstIndex < 5; burstIndex += 1) {
    const centerX = 80 + Math.random() * (window.innerWidth - 160);
    const centerY = 80 + Math.random() * (window.innerHeight - 160);

    for (let i = 0; i < 24; i += 1) {
      const pixel = document.createElement("div");
      pixel.className = "pixel";
      pixel.style.left = `${centerX}px`;
      pixel.style.top = `${centerY}px`;
      pixel.style.color =
        colors[Math.floor(Math.random() * colors.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 160;

      pixel.style.setProperty(
        "--x",
        `${Math.cos(angle) * distance}px`
      );

      pixel.style.setProperty(
        "--y",
        `${Math.sin(angle) * distance}px`
      );

      fxLayer.append(pixel);
      setTimeout(() => pixel.remove(), 1200);
    }
  }
}

function dancingApples() {
  for (let i = 0; i < 8; i += 1) {
    const dancer = document.createElement("div");
    dancer.className = "dancer";
    dancer.textContent = "🍎";
    dancer.style.left = `${-10 - Math.random() * 20}vw`;
    dancer.style.top = `${10 + Math.random() * 75}vh`;
    dancer.style.animationDelay = `${Math.random() * 0.5}s`;

    fxLayer.append(dancer);
    setTimeout(() => dancer.remove(), 5000);
  }
}

function releaseWorm() {
  const worm = document.createElement("div");
  worm.className = "worm";
  worm.textContent = "~oOoOoOoOoOoOoOoOoOoOo~";
  fxLayer.append(worm);
  setTimeout(() => worm.remove(), 7500);
}

function freeApples() {
  const outcomes = [
    spawnErrors,
    rainApples,
    pixelFireworks,
    dancingApples,
    releaseWorm
  ];

  outcomes[Math.floor(Math.random() * outcomes.length)]();
}

renderInteractiveAscii(appleEl, apple, 42);
renderInteractiveAscii(sEl, coolS);

document
  .querySelector("#error-trigger")
  .addEventListener("click", (event) => {
    event.preventDefault();
    freeApples();
  });

document
  .querySelector("#drive-link")
  .addEventListener("click", (event) => {
    event.preventDefault();
    openModal(drive);
  });

document.querySelectorAll("[data-fake-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    createError(
      "That link worked yesterday.",
      ++errorCount,
      false
    );
  });
});

document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(document.getElementById(button.dataset.close));
  });
});

document.querySelectorAll(".folder-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#file-output").textContent =
      fileContents[button.dataset.file] || "FILE NOT FOUND";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(secret);
    closeModal(drive);
  }
});

setInterval(() => {
  document.querySelector("#clock").textContent =
    new Date().toLocaleTimeString();
}, 1000);

document.querySelector("#counter").textContent =
  String(Math.floor(1 + Math.random() * 99999999)).padStart(8, "0");

console.log(
  "%cIf you're reading this, you're looking in the right place.",
  "color: lime; background: black; padding: 8px;"
);

console.log("apple_03 isn't real anymore.");
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
