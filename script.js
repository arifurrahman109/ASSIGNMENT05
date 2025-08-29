 
const heartCount = document.querySelector("#heartCount");
const coinCount = document.querySelector("#coinCount");
const copyCount = document.querySelector("#copyCount");
const historyList = document.querySelector("#historyList");
 
// number function

function getNumber(el) {
  return parseInt(el.innerText) || 0;
}


function setNumber(el, value) {
  if (el) {
    el.innerText = value;
  }
}

// time ber korar function
function getTime() {
  return new Date().toLocaleString();
}

// card  theke value ber function
function getCardInfo(el) {
  let card = el.closest("[data-card]") || el.closest(".card") || el.closest("div.bg-white");
  if (!card) return {};

  let name = "Unknown Service";
  let number = "";

  let nameEl = card.querySelector("h4,.en-name");
  if (nameEl) {
    name = nameEl.innerText.trim();
  }

  let numberEl = card.querySelector(".number, span.text-3xl");
  if (numberEl) {
    number = numberEl.innerText.trim();
  } else {
    let all = card.querySelectorAll("p,span,div,h4,h3");
   for (let item of all) {
let digitCount = txt.replace(/\D/g, '').length;
if (digitCount >= 2) {
    number = txt;
    break;
}
    }
  }

  return { card, name, number };
}

//  add item  in history list
function addHistory(name, number) {
  let li = document.createElement("li");
  li.className = "py-3";
  li.innerHTML = `
    <div class="flex items-start justify-between gap-2">
      <div>
        <div class="font-medium text-sm">${name}</div>
        <div class="text-xs text-slate-500">${number}</div>
      </div>
      <div class="text-xs text-slate-400">${getTime()}</div>
    </div>`;
  document.querySelector("#historyList").prepend(li);
}

// copy function
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

// all button click handler
document.addEventListener("click", async function(e) {
  let target = e.target;

  // call button
  if (target.closest(".callBtn")) {
    let info = getCardInfo(target);
    let coins = getNumber(document.querySelector("#coinCount"));

    if (!info.number) {
      alert("No number for " + info.name);
      return;
    }

    if (coins < 20) {
      alert("Need 20 coins. You have " + coins);
      return;
    }

    alert("Calling " + info.name + " — " + info.number);
    setNumber(document.querySelector("#coinCount"), coins - 20);
    addHistory(info.name, info.number);
  }

  // COPY button
  if (target.closest(".copyBtn")) {
    let info = getCardInfo(target);

    if (!info.number) {
      alert("No number to copy for " + info.name);
      return;
    }

    if (await copyToClipboard(info.number)) {
      let copyEl = document.querySelector("#copyCount");
      setNumber(copyEl, getNumber(copyEl) + 1);
      alert("Copied " + info.number);
    }
  }

  // HEART button
  if (target.closest(".heart")) {
    let btn = target.closest(".heart");
    let liked = btn.classList.toggle("liked");

    if (liked) {
      btn.classList.add("text-red-500");
      btn.classList.remove("text-slate-400");
    } else {
      btn.classList.remove("text-red-500");
      btn.classList.add("text-slate-400");
    }

    let heartEl = document.querySelector("#heartCount");
    setNumber(heartEl, Math.max(0, getNumber(heartEl) + (liked ? 1 : -1)));
  }

  // CLEAR HISTORY button
  if (target.closest("#clearHistoryBtn")) {
    if (confirm("Clear call history?")) {
      document.querySelector("#historyList").innerHTML = "";
    }
  }
});

// default value Set
setNumber(document.querySelector("#heartCount"), getNumber(document.querySelector("#heartCount")));
setNumber(document.querySelector("#coinCount"), getNumber(document.querySelector("#coinCount")) || 100);
setNumber(document.querySelector("#copyCount"), getNumber(document.querySelector("#copyCount")) || 0);
