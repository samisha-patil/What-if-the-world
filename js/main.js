const grid = document.getElementById("scenarioGrid");
const modalBackdrop = document.getElementById("scenarioModal");
const createBackdrop = document.getElementById("createModal");
const toast = document.getElementById("toast");
let currentScenario = null;
let toastTimer;

function renderScenarios(filter = "all") {
  const items = scenarioData.filter(item => filter === "all" || item.category === filter);
  grid.innerHTML = items.length ? items.map(item => `
    <article class="scenario-card" style="--glow:${item.color}">
      <div class="card-top"><div class="scenario-icon" style="--iconbg:${item.color}22">${item.icon}</div><span class="card-tag">${item.tag}</span></div>
      <h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p>
      <div class="card-bottom"><span>3 possible paths</span><button class="card-open" aria-label="Explore ${escapeHTML(item.title)}" data-open="${item.id}">↗</button></div>
    </article>`).join("") : '<div class="empty-state">No scenarios in this category yet. Create one of your own!</div>';
  grid.querySelectorAll("[data-open]").forEach(button => button.addEventListener("click", () => openScenario(button.dataset.open)));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

function openScenario(id) {
  currentScenario = scenarioData.find(item => item.id === id);
  if (!currentScenario) return;
  document.getElementById("modalIcon").textContent = currentScenario.icon;
  document.getElementById("modalCategory").textContent = currentScenario.tag.toUpperCase() + " · CHOOSE YOUR PATH";
  document.getElementById("modalTitle").textContent = currentScenario.title;
  document.getElementById("modalIntro").textContent = currentScenario.intro || currentScenario.description;
  document.getElementById("outcomeArea").hidden = true;
  document.getElementById("tryAgainBtn").hidden = true;
  const area = document.getElementById("choiceArea");
  area.hidden = false;
  area.innerHTML = currentScenario.choices ? currentScenario.choices.map((choice, index) =>
    `<button class="choice-button" data-choice="${index}"><span>${escapeHTML(choice.label)}</span><span>→</span></button>`).join("") :
    `<div class="outcome-area"><strong>Your world begins here</strong>${escapeHTML(currentScenario.customDescription || currentScenario.description)}<br><br>This is your custom thought experiment. Imagine the consequences, consider who might be affected, and decide what you would do next.</div>`;
  area.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => showOutcome(Number(button.dataset.choice))));
  showModal(modalBackdrop);
}

function showOutcome(index) {
  const choice = currentScenario.choices[index];
  if (!choice) return;
  document.getElementById("choiceArea").hidden = true;
  const outcome = document.getElementById("outcomeArea");
  outcome.innerHTML = `<strong>✦ One possible outcome</strong>${escapeHTML(choice.outcome)}<p style="margin:12px 0 0;color:#aeb5d9;font-size:.8rem">This is one imaginative possibility, not a prediction. Try another path and compare.</p>`;
  outcome.hidden = false;
  document.getElementById("tryAgainBtn").hidden = false;
}

function showModal(element) {
  element.classList.add("open");
  element.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const close = element.querySelector(".modal-close");
  if (close) close.focus();
}
function closeModal(element) {
  element.classList.remove("open");
  element.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".modal-backdrop.open")) document.body.style.overflow = "";
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.getElementById("filterRow").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderScenarios(button.dataset.filter);
});
document.getElementById("modalClose").addEventListener("click", () => closeModal(modalBackdrop));
document.getElementById("createClose").addEventListener("click", () => closeModal(createBackdrop));
[modalBackdrop, createBackdrop].forEach(backdrop => backdrop.addEventListener("click", event => {
  if (event.target === backdrop) closeModal(backdrop);
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") { closeModal(modalBackdrop); closeModal(createBackdrop); }
});
document.getElementById("tryAgainBtn").addEventListener("click", () => {
  document.getElementById("outcomeArea").hidden = true;
  document.getElementById("choiceArea").hidden = false;
  document.getElementById("tryAgainBtn").hidden = true;
});
document.getElementById("createBtn").addEventListener("click", () => {
  document.getElementById("createForm").reset();
  document.getElementById("createNote").textContent = "";
  showModal(createBackdrop);
});
document.getElementById("createForm").addEventListener("submit", event => {
  event.preventDefault();
  const question = document.getElementById("customQuestion").value.trim();
  const description = document.getElementById("customDescription").value.trim();
  const category = document.getElementById("customCategory").value;
  if (!question || !description) return;
  const labels = {future:"Future & tech",space:"Space",society:"Society",fantasy:"Wild ideas"};
  scenarioData.unshift({
    id:"custom-" + Date.now(), title:question.startsWith("What if") ? question : "What if " + question,
    category, tag:labels[category], icon:"💭", color:"#9b83ff", description,
    intro:description, customDescription:description, choices:null
  });
  renderScenarios(document.querySelector(".filter.active")?.dataset.filter || "all");
  closeModal(createBackdrop);
  document.getElementById("explore").scrollIntoView({behavior:"smooth"});
  showToast("Your scenario has been added to the world!");
});
document.getElementById("signinBtn").addEventListener("click", () => showToast("Sign-in is a demo feature in this frontend prototype."));
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const isOpen = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  document.querySelectorAll(".nav-link").forEach(item => item.classList.toggle("active", item === link));
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderScenarios();
