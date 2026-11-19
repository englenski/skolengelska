/* School Talk – app */
(function () {
  "use strict";

  /* ---------- Hjälpfunktioner ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $("#app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("schooltalk." + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("schooltalk." + k, JSON.stringify(v)); } catch (e) { /* ignorera */ } }
  };
  const themeById = (id) => THEMES.find((t) => t.id === id);
  const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" fill="currentColor"/></svg>';
  const ICON_STOP = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>';

  /* ---------- Tal (Web Speech API) ---------- */
  const synth = window.speechSynthesis;
  const Speech = {
    voices: [],
    voice: null,
    supported: !!(synth && window.SpeechSynthesisUtterance),
    token: 0,
    loadVoices() {
      if (!this.supported) return;
      const all = synth.getVoices();
      const gb = all.filter((v) => /^en[-_]GB/i.test(v.lang));
      const en = all.filter((v) => /^en/i.test(v.lang));
      this.voices = gb.length ? gb : en;
      this.hasGB = gb.length > 0;
      const saved = store.get("voice", null);
      const pref = ["Daniel (Enhanced)", "Daniel (Förbättrad)", "Kate (Enhanced)", "Kate (Förbättrad)", "Serena (Enhanced)", "Serena (Förbättrad)", "Google UK English Female", "Google UK English Male", "Sonia", "Libby", "Ryan", "Daniel", "Kate", "Serena", "Arthur", "Martha", "Hazel", "George", "Susan"];
      let pick = this.voices.find((v) => v.name === saved);
      if (!pick) { for (const p of pref) { pick = this.voices.find((v) => v.name.includes(p)); if (pick) break; } }
      this.voice = pick || this.voices[0] || null;
      renderVoicePanel();
    },
    rate(slow) { return slow ? 0.62 : 0.92; },
    cancel() { this.token++; if (this.supported && (synth.speaking || synth.pending)) { synth.cancel(); this.justCancelled = true; } },
    /* Läser upp en text. Returnerar ett Promise som löses när uppläsningen är klar. */
    say(text, opts = {}) {
      const slow = opts.slow !== undefined ? opts.slow : Settings.slow;
      if (!opts.keep) this.cancel();
      const my = this.token;
      return new Promise((resolve) => {
        if (!this.supported) { setTimeout(resolve, 600); return; }
        const u = new SpeechSynthesisUtterance(text);
        u.lang = (this.voice && this.voice.lang) || "en-GB";
        if (this.voice) u.voice = this.voice;
        u.rate = this.rate(slow);
        u.pitch = 1;
        let done = false;
        const finish = () => { if (!done) { done = true; resolve(my === Speech.token); } };
        u.onend = finish;
        u.onerror = finish;
        // Säkerhetsnät om onend aldrig kommer
        const words = text.split(/\s+/).length;
        setTimeout(finish, (words * (slow ? 900 : 600)) + 4000);
        // iOS/Safari tappar ibland en replik som startas direkt efter cancel(), därför en kort paus
        if (Speech.justCancelled) { Speech.justCancelled = false; setTimeout(() => { if (my === Speech.token) synth.speak(u); else finish(); }, 80); }
        else synth.speak(u);
      });
    },
    async sequence(items, onItem, opts = {}) {
      this.cancel();
      const my = this.token;
      for (let i = 0; i < items.length; i++) {
        if (my !== this.token) return false;
        onItem && onItem(i);
        await this.say(items[i], { keep: true, slow: opts.slow });
        if (my !== this.token) return false;
        await wait(opts.gap || 450);
      }
      return my === this.token;
    }
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // iOS kräver att talet "låses upp" av en användarinteraktion första gången
  if (Speech.supported) {
    const unlock = () => {
      try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; synth.speak(u); } catch (e) { /* ignorera */ }
      document.removeEventListener("touchend", unlock, true);
      document.removeEventListener("click", unlock, true);
    };
    document.addEventListener("touchend", unlock, true);
    document.addEventListener("click", unlock, true);
  }

  /* Mobil: rubrikraden glider undan men reglagen (Långsamt, Svensk) stannar kvar överst */
  const header = document.querySelector(".site-header"), toolbarEl = document.querySelector(".toolbar");
  const setHeaderOffset = () => document.documentElement.style.setProperty("--hdr-offset", (header.offsetHeight - toolbarEl.offsetHeight) + "px");
  setHeaderOffset();
  window.addEventListener("resize", setHeaderOffset);
  new ResizeObserver(setHeaderOffset).observe(toolbarEl);

  /* ---------- Inställningar ---------- */
  const Settings = {
    slow: store.get("slow", false),
    sv: store.get("sv", true)
  };
  const optSlow = $("#opt-slow");
  const optSv = $("#opt-sv");
  optSlow.checked = Settings.slow;
  optSv.checked = Settings.sv;
  const applySv = () => document.body.classList.toggle("hide-sv", !Settings.sv);
  applySv();
  optSlow.addEventListener("change", () => { Settings.slow = optSlow.checked; store.set("slow", Settings.slow); });
  optSv.addEventListener("change", () => {
    Settings.sv = optSv.checked; store.set("sv", Settings.sv);
    document.querySelectorAll(".sv.revealed").forEach((el) => el.classList.remove("revealed"));
    applySv();
  });
  // Klick på dold översättning visar just den
  document.addEventListener("click", (e) => {
    const sv = e.target.closest(".sv");
    if (sv && document.body.classList.contains("hide-sv")) sv.classList.toggle("revealed");
  });

  const voiceBtn = $("#voice-btn"), voicePanel = $("#voice-panel"), voiceSelect = $("#voice-select"), voiceNote = $("#voice-note");
  voiceBtn.addEventListener("click", () => {
    const open = voicePanel.hidden;
    voicePanel.hidden = !open;
    voiceBtn.setAttribute("aria-expanded", String(open));
  });
  voiceSelect.addEventListener("change", () => {
    Speech.voice = Speech.voices.find((v) => v.name === voiceSelect.value) || Speech.voice;
    store.set("voice", Speech.voice && Speech.voice.name);
  });
  $("#voice-test").addEventListener("click", () => Speech.say("Hello! Welcome to School Talk. Let's practise some English."));
  function renderVoicePanel() {
    if (!Speech.supported) {
      voiceSelect.innerHTML = "<option>Ingen röst</option>";
      voiceNote.textContent = "Den här webbläsaren kan inte läsa upp text. Prova Chrome, Edge eller Safari.";
      return;
    }
    voiceSelect.innerHTML = Speech.voices.map((v) => `<option value="${esc(v.name)}"${Speech.voice && v.name === Speech.voice.name ? " selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("") || "<option>Inga engelska röster hittades</option>";
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    voiceNote.textContent = ios
      ? "iPhone/iPad: de bästa brittiska rösterna är Daniel, Kate eller Serena i förbättrad kvalitet. Hämta dem under Inställningar → Hjälpmedel → Uppläst innehåll → Röster → Engelska. Ladda sedan om sidan. Kontrollera också att telefonen inte står på ljudlöst om du inte hör något."
      : Speech.hasGB
      ? "Rösterna kommer från din webbläsare och dator, så utbudet varierar mellan enheter."
      : "Ingen brittisk röst hittades, så en annan engelsk röst används. På Chromebook: kontrollera att datorn är ansluten till internet (Googles brittiska röster hämtas därifrån), eller lägg till Engelska (Storbritannien) under Inställningar → Tillgänglighet → Text-till-tal. På andra datorer: använd Chrome eller Edge.";
    const banner = $("#voice-banner");
    if (banner) banner.hidden = Speech.hasGB;
  }
  if (Speech.supported) {
    Speech.loadVoices();
    if (typeof synth.onvoiceschanged !== "undefined") synth.onvoiceschanged = () => Speech.loadVoices();
    setTimeout(() => Speech.loadVoices(), 800);
  } else {
    renderVoicePanel();
  }

  /* ---------- Gemensamma byggstenar ---------- */
  // Uppspelningsknappar. data-say innehåller texten.
  const playBtns = (text, label = "Lyssna") =>
    `<button class="icon-btn" type="button" data-say="${esc(text)}" title="${label}" aria-label="${label}">${ICON_PLAY}</button>` +
    `<button class="icon-btn slow" type="button" data-say="${esc(text)}" data-slow="1" title="Lyssna långsamt" aria-label="Lyssna långsamt">🐢</button>`;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-say]");
    if (!b) return;
    clearPlaying();
    Speech.say(b.dataset.say, b.dataset.slow ? { slow: true } : {});
  });
  const clearPlaying = () => document.querySelectorAll(".line.playing").forEach((el) => el.classList.remove("playing"));

  const svSpan = (text) => `<span class="sv" lang="sv">${esc(text)}</span>`;
  const enSpan = (text) => `<span class="en" lang="en">${esc(text)}</span>`;

  const themeChips = (base, current, extra = "") =>
    `<div class="chips">${THEMES.map((t) => `<a class="chip${t.id === current ? " active" : ""}" href="#/${base}/${t.id}">${t.icon} ${esc(t.sv)}</a>`).join("")}${extra}</div>`;

  const voiceBanner = () => `<div class="banner" id="voice-banner"${Speech.hasGB !== false ? " hidden" : ""}>Ingen brittisk röst hittades i den här webbläsaren. Uppläsningen fungerar ändå, men med en annan engelsk röst. Klicka på <strong>Röst</strong> uppe till höger för tips.</div>`;

  /* ---------- Sidor ---------- */
  function pageHome() {
    app.innerHTML = `
      <section class="hero">
        <h1>School Talk</h1>
        <p>Träna engelskan du behöver i skolan: i klassrummet, på mattelektionen, med föräldrar och med kollegor. Lyssna, säg efter och våga prata.</p>
      </section>
      <div class="grid sections">
        <a class="tile" href="#/dialoger"><span class="t-icon">🎧</span><strong>Dialoger</strong><span class="small">Lyssna på hela samtal eller rad för rad.</span></a>
        <a class="tile" href="#/rollspel"><span class="t-icon">🎭</span><strong>Rollspel</strong><span class="small">Välj roll och säg dina repliker högt.</span></a>
        <a class="tile" href="#/fraser"><span class="t-icon">🗣️</span><strong>Fraser</strong><span class="small">Korta fraser att lyssna på och säga efter.</span></a>
        <a class="tile" href="#/trana"><span class="t-icon">✏️</span><strong>Träna</strong><span class="small">Matcha, välj, bygg meningar och skriv.</span></a>
        <a class="tile" href="#/ord"><span class="t-icon">📚</span><strong>Ord</strong><span class="small">Skolord och matteord med uttal.</span></a>
        <a class="tile" href="#/grammatik"><span class="t-icon">🧩</span><strong>Grammatik</strong><span class="small">Korta regler, exempel och övningar.</span></a>
      </div>
      <div class="howto">
        <div><strong>▶ Lyssna</strong><br>Allt läses upp med en brittisk röst. Tryck på 🐢 för att höra det långsamt.</div>
        <div><strong>🐢 Långsamt</strong><br>Slå på Långsamt i listen högst upp så går all uppläsning lugnare.</div>
        <div><strong>Svenska</strong><br>Stäng av Svensk översättning för att utmana dig. Klicka på en suddig rad för att se just den.</div>
      </div>
      <h2>Teman</h2>
      <div class="grid themes">
        ${THEMES.map((t) => `<a class="tile" href="#/tema/${t.id}"><span class="t-icon">${t.icon}</span><strong>${esc(t.sv)}</strong><span class="small" lang="en">${esc(t.en)}</span></a>`).join("")}
      </div>`;
  }

  function pageTheme(id) {
    const t = themeById(id);
    if (!t) return pageHome();
    app.innerHTML = `
      <a class="back" href="#/">← Alla teman</a>
      <h1>${t.icon} ${esc(t.sv)}</h1>
      <p class="lead" lang="en">${esc(t.en)}</p>
      <div class="grid sections">
        <a class="tile" href="#/dialoger/${t.id}"><span class="t-icon">🎧</span><strong>Dialoger</strong><span class="small">${t.dialogues.length} samtal</span></a>
        <a class="tile" href="#/rollspel/${t.id}"><span class="t-icon">🎭</span><strong>Rollspel</strong><span class="small">Säg din roll högt</span></a>
        <a class="tile" href="#/fraser/${t.id}"><span class="t-icon">🗣️</span><strong>Fraser</strong><span class="small">${t.phrases.length} fraser</span></a>
        <a class="tile" href="#/trana/${t.id}"><span class="t-icon">✏️</span><strong>Träna</strong><span class="small">Fyra övningstyper</span></a>
      </div>`;
  }

  /* Dialoger */
  function pageDialogues(id) {
    const t = themeById(id) || THEMES[0];
    app.innerHTML = `
      <h1>Dialoger</h1>
      <p class="lead">Lyssna på hela samtalet eller tryck på en rad för att höra just den. Prova "Bara lyssna" för att träna hörförståelse.</p>
      ${voiceBanner()}
      ${themeChips("dialoger", t.id)}
      ${t.dialogues.map((d, di) => dialogueCard(d, di)).join("")}`;
    app.querySelectorAll("[data-dialog]").forEach((card) => {
      const d = t.dialogues[+card.dataset.dialog];
      const lines = [...card.querySelectorAll(".line")];
      const run = (slow) => {
        Speech.sequence(d.lines.map((l) => l[1]), (i) => {
          clearPlaying();
          lines[i].classList.add("playing");
          lines[i].scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, { slow }).then(() => clearPlaying());
      };
      card.querySelector("[data-act=all]").addEventListener("click", () => run(Settings.slow));
      card.querySelector("[data-act=allslow]").addEventListener("click", () => run(true));
      card.querySelector("[data-act=stop]").addEventListener("click", () => { Speech.cancel(); clearPlaying(); });
      card.querySelector("[data-act=hide]").addEventListener("change", (e) => card.classList.toggle("hidden-en", e.target.checked));
    });
  }
  function dialogueCard(d, di) {
    const keys = Object.keys(d.roles);
    return `
      <section class="card" data-dialog="${di}">
        <div class="dialog-head">
          <div><h2>${esc(d.title)}</h2><span class="en-title" lang="en">${esc(d.en)}</span></div>
          <div class="btn-row">
            <button class="btn" type="button" data-act="all">${ICON_PLAY.replace("<svg", '<svg width="14" height="14"')} Spela hela</button>
            <button class="btn ghost" type="button" data-act="allslow">🐢 Långsamt</button>
            <button class="btn ghost" type="button" data-act="stop">${ICON_STOP.replace("<svg", '<svg width="14" height="14"')} Stopp</button>
          </div>
        </div>
        <label class="muted" style="display:inline-flex;gap:6px;align-items:center;font-size:.92rem;cursor:pointer;margin-bottom:6px"><input type="checkbox" data-act="hide"> Bara lyssna (dölj engelskan)</label>
        ${d.lines.map((l) => `
          <div class="line">
            <div class="who ${keys.indexOf(l[0]) === 1 ? "r1" : ""}">${esc(d.roles[l[0]])}</div>
            <div class="txt">${enSpan(l[1])}${svSpan(l[2])}</div>
            <div class="acts">${playBtns(l[1])}</div>
          </div>`).join("")}
      </section>`;
  }

  /* Rollspel */
  function pageRoleplay(id, di, role) {
    const t = themeById(id) || THEMES[0];
    const d = di !== undefined ? t.dialogues[+di] : null;
    if (d && role && d.roles[role]) return runRoleplay(t, +di, role);
    app.innerHTML = `
      <h1>Rollspel</h1>
      <p class="lead">Välj ett samtal och en roll. Datorn säger sina repliker. När det är din tur ser du vad du ska säga på svenska. Säg det högt på engelska och visa sedan facit.</p>
      ${voiceBanner()}
      ${themeChips("rollspel", t.id)}
      ${t.dialogues.map((dd, i) => `
        <section class="card">
          <h2>${esc(dd.title)}</h2>
          <span class="muted" lang="en">${esc(dd.en)}</span>
          <div class="role-pick">
            ${Object.entries(dd.roles).map(([k, name]) => `<a class="btn ${Object.keys(dd.roles)[0] === k ? "" : "secondary"}" href="#/rollspel/${t.id}/${i}/${k}">Jag är ${esc(name.toLowerCase())}</a>`).join("")}
          </div>
        </section>`).join("")}`;
  }

  function runRoleplay(t, di, role) {
    const d = t.dialogues[di];
    let idx = 0;
    const other = Object.keys(d.roles).find((k) => k !== role);
    app.innerHTML = `
      <a class="back" href="#/rollspel/${t.id}">← Tillbaka till rollspel</a>
      <h1>${esc(d.title)}</h1>
      <p class="lead">Du är <strong>${esc(d.roles[role].toLowerCase())}</strong>. Datorn är ${esc(d.roles[other].toLowerCase())}.</p>
      <div class="chat" id="chat"></div>
      <div id="turn"></div>
      <div class="btn-row" style="margin-top:16px">
        <a class="btn ghost small" href="#/rollspel/${t.id}/${di}/${role}" id="restart">↺ Börja om</a>
        <a class="btn ghost small" href="#/rollspel/${t.id}/${di}/${other}">⇄ Byt roll</a>
      </div>`;
    const chat = $("#chat"), turn = $("#turn");
    $("#restart").addEventListener("click", (e) => { e.preventDefault(); Speech.cancel(); runRoleplay(t, di, role); });

    const addBubble = (l, me) => {
      const div = document.createElement("div");
      div.className = "bubble" + (me ? " me" : "");
      div.innerHTML = `<div class="who">${me ? "Du" : esc(d.roles[l[0]])}</div><div class="b-row"><div class="txt">${enSpan(l[1])}${svSpan(l[2])}</div>${playBtns(l[1]).replace(/icon-btn/g, "icon-btn").replace('class="icon-btn slow"', 'class="icon-btn slow" style="width:32px;height:32px"').replace('class="icon-btn"', 'class="icon-btn" style="width:32px;height:32px"')}</div>`;
      chat.appendChild(div);
      div.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };

    const step = async () => {
      if (idx >= d.lines.length) {
        turn.innerHTML = `<div class="turn-card"><h3>Bra jobbat! 🎉</h3><div class="prompt">Samtalet är slut.</div><div class="btn-row"><button class="btn" type="button" id="again">Gör igen</button><a class="btn secondary" href="#/rollspel/${t.id}/${di}/${other}">Byt roll</a></div></div>`;
        $("#again").addEventListener("click", () => runRoleplay(t, di, role));
        return;
      }
      const l = d.lines[idx];
      if (l[0] !== role) {
        turn.innerHTML = `<div class="turn-card"><h3>${esc(d.roles[l[0]])} pratar …</h3><div class="hint">Lyssna.</div></div>`;
        addBubble(l, false);
        const my = Speech.token + 1;
        await Speech.say(l[1]);
        if (Speech.token !== my) return; // avbrutet
        await wait(350);
        if (Speech.token !== my) return;
        idx++;
        step();
      } else {
        turn.innerHTML = `
          <div class="turn-card">
            <h3>Din tur! Säg på engelska:</h3>
            <div class="prompt" lang="sv">${esc(l[2])}</div>
            <div class="hint">Säg repliken högt. Tryck sedan på Visa facit.</div>
            <div class="btn-row">
              <button class="btn" type="button" id="reveal">Visa och lyssna på facit</button>
              <button class="btn ghost small" type="button" id="hint" style="color:#fff;border-color:#44557d">Ledtråd</button>
            </div>
          </div>`;
        $("#hint").addEventListener("click", (e) => {
          const words = l[1].split(" ");
          e.target.outerHTML = `<span class="hint" style="margin:0">Börjar med: <strong lang="en">${esc(words.slice(0, Math.min(2, words.length)).join(" "))} …</strong></span>`;
        });
        $("#reveal").addEventListener("click", () => {
          turn.innerHTML = `
            <div class="turn-card">
              <h3>Facit</h3>
              <div class="answer"><div style="flex:1">${enSpan(l[1])}</div>${playBtns(l[1])}</div>
              <div class="hint">Lät det likadant? Säg den gärna en gång till tillsammans med rösten.</div>
              <div class="btn-row"><button class="btn" type="button" id="next">Fortsätt ▶</button></div>
            </div>`;
          Speech.say(l[1]);
          $("#next").addEventListener("click", () => { addBubble(l, true); idx++; step(); });
        });
      }
    };
    step();
  }

  /* Fraser */
  function pagePhrases(id) {
    const t = themeById(id) || THEMES[0];
    app.innerHTML = `
      <h1>Fraser</h1>
      <p class="lead">Lyssna och säg efter. Starta "Lyssna och säg efter" så läses varje fras upp och sedan får du en paus att säga den själv.</p>
      ${voiceBanner()}
      ${themeChips("fraser", t.id)}
      <section class="card">
        <div class="repeat-box">
          <button class="btn" type="button" id="rep-start">${ICON_PLAY.replace("<svg", '<svg width="14" height="14"')} Lyssna och säg efter</button>
          <button class="btn ghost" type="button" id="rep-stop" disabled>${ICON_STOP.replace("<svg", '<svg width="14" height="14"')} Stopp</button>
          <span class="status" id="rep-status">Tryck på start när du är redo.</span>
          <div class="progress"><div id="rep-bar"></div></div>
        </div>
      </section>
      <section class="card phrase-list">
        <h2>${t.icon} ${esc(t.sv)}</h2>
        ${t.phrases.map((p) => `
          <div class="line">
            <div class="txt">${enSpan(p[0])}${svSpan(p[1])}</div>
            <div class="acts">${playBtns(p[0])}</div>
          </div>`).join("")}
      </section>`;
    const lines = [...app.querySelectorAll(".phrase-list .line")];
    const startBtn = $("#rep-start"), stopBtn = $("#rep-stop"), status = $("#rep-status"), bar = $("#rep-bar");
    let running = false;
    const stop = () => { running = false; Speech.cancel(); clearPlaying(); startBtn.disabled = false; stopBtn.disabled = true; status.textContent = "Stoppad."; bar.style.width = "0"; };
    stopBtn.addEventListener("click", stop);
    startBtn.addEventListener("click", async () => {
      Speech.cancel();
      running = true; startBtn.disabled = true; stopBtn.disabled = false;
      const my = Speech.token;
      for (let i = 0; i < t.phrases.length; i++) {
        if (!running || my !== Speech.token) return;
        clearPlaying();
        lines[i].classList.add("playing");
        lines[i].scrollIntoView({ block: "nearest", behavior: "smooth" });
        status.textContent = `Lyssna (${i + 1}/${t.phrases.length})`;
        status.classList.remove("your-turn");
        await Speech.say(t.phrases[i][0], { keep: true });
        if (!running || my !== Speech.token) return;
        status.textContent = "Din tur – säg efter!";
        status.classList.add("your-turn");
        const words = t.phrases[i][0].split(/\s+/).length;
        const ms = Math.max(2200, words * (Settings.slow ? 850 : 650) + 900);
        const t0 = performance.now();
        await new Promise((res) => {
          const tick = () => {
            if (!running) return res();
            const p = Math.min(1, (performance.now() - t0) / ms);
            bar.style.width = (p * 100) + "%";
            if (p < 1) requestAnimationFrame(tick); else res();
          };
          tick();
        });
        bar.style.width = "0";
      }
      if (running) { running = false; clearPlaying(); startBtn.disabled = false; stopBtn.disabled = true; status.classList.remove("your-turn"); status.textContent = "Klart! Bra jobbat. 🎉"; }
    });
  }

  /* Ord */
  function pageWords(listId) {
    const key = WORDS[listId] ? listId : "skolord";
    const list = WORDS[key];
    app.innerHTML = `
      <h1>Ord</h1>
      <p class="lead">Skolord och matteord med uttal. Tryck på ▶ för att höra ordet, eller 🐢 för att höra det långsamt.</p>
      ${voiceBanner()}
      <div class="chips">${Object.entries(WORDS).map(([k, w]) => `<a class="chip${k === key ? " active" : ""}" href="#/ord/${k}">${w.icon} ${esc(w.sv)}</a>`).join("")}</div>
      <div class="word-tools">
        <input class="search" type="search" id="word-search" placeholder="Sök på engelska eller svenska" aria-label="Sök ord">
        <a class="btn secondary small" href="#/trana/${key}">✏️ Träna på de här orden</a>
      </div>
      <div id="word-groups">
        ${list.groups.map((g) => `
          <section class="word-group">
            <h2 class="group-title">${esc(g.title)}</h2>
            <div class="word-grid">
              ${g.items.map((w) => `
                <div class="word" data-search="${esc((w[0] + " " + w[1]).toLowerCase())}">
                  <div class="txt">${enSpan(w[0])}${svSpan(w[1])}${w[2] ? `<span class="sym">${esc(w[2])}</span>` : ""}</div>
                  <div class="acts">${playBtns(w[0])}</div>
                </div>`).join("")}
            </div>
          </section>`).join("")}
      </div>`;
    $("#word-search").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      app.querySelectorAll(".word-group").forEach((g) => {
        let any = false;
        g.querySelectorAll(".word").forEach((w) => { const show = !q || w.dataset.search.includes(q); w.hidden = !show; if (show) any = true; });
        g.hidden = !any;
      });
    });
  }

  /* ---------- Grammatik ---------- */
  function pageGrammar(id) {
    const g = GRAMMAR.find((x) => x.id === id) || GRAMMAR[0];
    app.innerHTML = `
      <h1>Grammatik</h1>
      <p class="lead">Den grammatik som oftast behövs när man pratar engelska i skolan. Läs regeln, lyssna på exemplen och testa dig själv.</p>
      ${voiceBanner()}
      <div class="chips">${GRAMMAR.map((x) => `<a class="chip${x.id === g.id ? " active" : ""}" href="#/grammatik/${x.id}">${x.icon} ${esc(x.sv)}</a>`).join("")}</div>
      <section class="card rule-card">
        <div class="q-label" lang="en">${esc(g.en)}</div>
        <h2>${g.icon} ${esc(g.sv)}</h2>
        <ul class="rules">${g.rule.map((r) => `<li>${r}</li>`).join("")}</ul>
      </section>
      <section class="card">
        <h2>Exempel</h2>
        ${g.examples.map((e) => `
          <div class="line">
            <div class="txt">${enSpan(e[0])}${svSpan(e[1])}</div>
            <div class="acts">${playBtns(e[0])}</div>
          </div>`).join("")}
      </section>
      <section class="card" id="gquiz"></section>`;
    grammarQuiz($("#gquiz"), g);
  }
  function grammarQuiz(box, g) {
    const qs = shuffle(g.quiz);
    let n = 0, right = 0;
    const full = (q) => q[0].replace("___", q[1]);
    const next = () => {
      if (n >= qs.length) {
        const pct = Math.round(100 * right / qs.length);
        const msg = pct === 100 ? "Perfekt! 🎉" : pct >= 70 ? "Bra jobbat! 👏" : "Läs regeln en gång till och försök igen! 💪";
        const idx = GRAMMAR.indexOf(g), nxt = GRAMMAR[(idx + 1) % GRAMMAR.length];
        box.innerHTML = `<h2>Öva</h2><div class="result-box"><div class="big">${right} / ${qs.length}</div><p class="status">${msg}</p><div class="btn-row" style="justify-content:center"><button class="btn" type="button" id="gagain">Gör igen</button><a class="btn secondary" href="#/grammatik/${nxt.id}">Nästa: ${esc(nxt.sv)} ▶</a></div></div>`;
        $("#gagain", box).addEventListener("click", () => grammarQuiz(box, g));
        return;
      }
      const q = qs[n];
      const opts = shuffle([q[1], ...q[2]]);
      const parts = q[0].split("___").map(esc);
      box.innerHTML = `
        <div class="dialog-head"><h2>Öva</h2><span class="score">${right} / ${qs.length} rätt</span></div>
        <div class="q-label">Fråga ${n + 1} av ${qs.length} · Välj det som passar</div>
        <div class="q-prompt gap-sentence" lang="en">${parts.join('<span class="gap" id="gap">&nbsp;?&nbsp;</span>')}</div>
        ${svSpan(q[3])}
        <div class="options gap-options">${opts.map((o, i) => `<button class="option" type="button" data-i="${i}" lang="en">${esc(o)}</button>`).join("")}</div>
        <div class="feedback" id="gfb"></div>
        <div id="gnx"></div>
        <p class="kbd-hint">Tips: tryck 1–${opts.length} på tangentbordet för att svara och Enter för nästa.</p>`;
      const fb = $("#gfb", box), gap = $("#gap", box);
      box.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => {
        const chosen = opts[+b.dataset.i];
        box.querySelectorAll(".option").forEach((x) => { x.disabled = true; if (opts[+x.dataset.i] === q[1]) x.classList.add("correct"); });
        gap.textContent = q[1];
        gap.classList.add("filled");
        if (chosen === q[1]) { right++; fb.className = "feedback ok"; fb.textContent = "Rätt! 👍"; }
        else { b.classList.add("wrong"); gap.classList.add("was-wrong"); fb.className = "feedback bad"; fb.textContent = `Inte riktigt. Rätt svar är "${q[1]}".`; }
        Speech.say(full(q));
        $("#gnx", box).innerHTML = `<div class="btn-row"><button class="btn" type="button" id="gnext">Nästa ▶</button>${playBtns(full(q))}</div>`;
        $("#gnext", box).addEventListener("click", () => { n++; next(); });
        $("#gnext", box).focus();
      }));
    };
    next();
  }

  /* ---------- Träna ---------- */
  const EXERCISES = [
    { id: "matcha", label: "Matcha" },
    { id: "valj", label: "Välj rätt svar" },
    { id: "bygg", label: "Bygg meningar" },
    { id: "skriv", label: "Lyssna och skriv" }
  ];
  function sourceItems(src) {
    const t = themeById(src);
    if (t) return t.phrases.map((p) => ({ en: p[0], sv: p[1] }));
    const w = WORDS[src];
    if (w) return w.groups.flatMap((g) => g.items.map((i) => ({ en: i[0], sv: i[1] })));
    return [];
  }
  const isWordSource = (src) => !!WORDS[src];

  function pagePractice(src, ex) {
    src = (themeById(src) || WORDS[src]) ? src : THEMES[0].id;
    if (!EXERCISES.find((e) => e.id === ex)) ex = "matcha";
    if (ex === "bygg" && isWordSource(src)) ex = "matcha";
    app.innerHTML = `
      <h1>Träna</h1>
      <p class="lead">Välj tema och övning. Svaren läses upp så att du hör uttalet.</p>
      ${voiceBanner()}
      <div class="practice-top">
        <label for="src" class="muted" style="font-weight:700">Tema:</label>
        <select id="src" class="source-select">
          <optgroup label="Teman">${THEMES.map((t) => `<option value="${t.id}"${t.id === src ? " selected" : ""}>${t.icon} ${esc(t.sv)}</option>`).join("")}</optgroup>
          <optgroup label="Ordlistor">${Object.entries(WORDS).map(([k, w]) => `<option value="${k}"${k === src ? " selected" : ""}>${w.icon} ${esc(w.sv)}</option>`).join("")}</optgroup>
        </select>
        <span class="score" id="score" hidden></span>
      </div>
      <div class="tabs" role="tablist">
        ${EXERCISES.map((e) => `<button class="tab${e.id === ex ? " active" : ""}" role="tab" type="button" data-ex="${e.id}"${e.id === "bygg" && isWordSource(src) ? ' disabled title="Bygg meningar finns för teman med fraser"' : ""}>${e.label}</button>`).join("")}
      </div>
      <section class="card" id="exercise"></section>`;
    $("#src").addEventListener("change", (e) => { location.hash = `#/trana/${e.target.value}/${ex}`; });
    app.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => { location.hash = `#/trana/${src}/${b.dataset.ex}`; }));
    const box = $("#exercise");
    const items = sourceItems(src);
    ({ matcha: exMatch, valj: exChoice, bygg: exBuild, skriv: exWrite })[ex](box, items, src, ex);
  }

  const scoreEl = () => $("#score");
  function setScore(right, total) { const s = scoreEl(); if (!s) return; s.hidden = false; s.textContent = `${right} / ${total} rätt`; }
  function resultScreen(box, right, total, again) {
    const pct = total ? Math.round(100 * right / total) : 0;
    const msg = pct === 100 ? "Perfekt! 🎉" : pct >= 70 ? "Bra jobbat! 👏" : "Fortsätt öva, det går framåt! 💪";
    box.innerHTML = `<div class="result-box"><div class="big">${right} / ${total}</div><p class="status">${msg}</p><button class="btn" type="button" id="again">Ny omgång</button></div>`;
    $("#again").addEventListener("click", again);
  }

  /* Matcha */
  function exMatch(box, items) {
    const round = shuffle(items).slice(0, 6);
    const left = shuffle(round.map((it, i) => ({ ...it, i })));
    const right = shuffle(round.map((it, i) => ({ ...it, i })));
    let selected = null, matched = 0, tries = 0;
    box.innerHTML = `
      <div class="q-label">Matcha engelska och svenska</div>
      <p class="muted">Tryck på en engelsk fras (du hör den), och sedan på rätt översättning.</p>
      <div class="match">
        <div class="col">${left.map((it) => `<button class="option" type="button" data-side="en" data-i="${it.i}" lang="en">${esc(it.en)}</button>`).join("")}</div>
        <div class="col">${right.map((it) => `<button class="option" type="button" data-side="sv" data-i="${it.i}" lang="sv">${esc(it.sv)}</button>`).join("")}</div>
      </div>
      <div class="feedback" id="fb"></div>`;
    const fb = $("#fb", box);
    setScore(0, round.length);
    box.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => {
      if (b.classList.contains("done")) return;
      if (b.dataset.side === "en") {
        box.querySelectorAll('[data-side="en"].selected').forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
        selected = b;
        Speech.say(round[+b.dataset.i].en);
        return;
      }
      if (!selected) { fb.className = "feedback"; fb.textContent = "Välj först en engelsk fras till vänster."; return; }
      tries++;
      if (selected.dataset.i === b.dataset.i) {
        selected.classList.remove("selected");
        selected.classList.add("done"); b.classList.add("done");
        selected.disabled = true; b.disabled = true;
        selected = null; matched++;
        fb.className = "feedback ok"; fb.textContent = "Rätt!";
        setScore(matched, round.length);
        if (matched === round.length) {
          setTimeout(() => {
            fb.innerHTML = `Alla matchade på ${tries} försök. <button class="btn small" type="button" id="again" style="margin-left:8px">Ny omgång</button>`;
            $("#again", box).addEventListener("click", () => exMatch(box, items));
          }, 400);
        }
      } else {
        b.classList.add("shake");
        setTimeout(() => b.classList.remove("shake"), 350);
        fb.className = "feedback bad"; fb.textContent = "Inte riktigt, försök igen.";
      }
    }));
  }

  /* Välj rätt svar */
  function exChoice(box, items) {
    const qs = shuffle(items).slice(0, Math.min(8, items.length));
    let n = 0, right = 0;
    const next = () => {
      if (n >= qs.length) return resultScreen(box, right, qs.length, () => exChoice(box, items));
      const q = qs[n];
      const toSv = n % 2 === 0; // varannan fråga: engelska → svenska, varannan svenska → engelska
      const wrong = shuffle(items.filter((x) => x !== q)).slice(0, 3);
      const opts = shuffle([q, ...wrong]);
      box.innerHTML = `
        <div class="q-label">Fråga ${n + 1} av ${qs.length} · ${toSv ? "Vad betyder det?" : "Hur säger man det på engelska?"}</div>
        ${toSv
          ? `<div class="big-play"><div class="q-prompt" lang="en">${esc(q.en)}</div>${playBtns(q.en)}</div>`
          : `<div class="q-prompt" lang="sv">${esc(q.sv)}</div>`}
        <div class="options">${opts.map((o, i) => `<button class="option" type="button" data-i="${i}" lang="${toSv ? "sv" : "en"}">${esc(toSv ? o.sv : o.en)}</button>`).join("")}</div>
        <div class="feedback" id="fb"></div>
        <div id="nx"></div>
        <p class="kbd-hint">Tips: tryck 1–4 på tangentbordet för att svara och Enter för nästa.</p>`;
      if (toSv) Speech.say(q.en);
      const fb = $("#fb", box);
      box.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => {
        const chosen = opts[+b.dataset.i];
        box.querySelectorAll(".option").forEach((x) => { x.disabled = true; if (opts[+x.dataset.i] === q) x.classList.add("correct"); });
        if (chosen === q) { right++; fb.className = "feedback ok"; fb.textContent = "Rätt! 👍"; }
        else { b.classList.add("wrong"); fb.className = "feedback bad"; fb.textContent = "Inte riktigt. Rätt svar är markerat i grönt."; }
        setScore(right, qs.length);
        Speech.say(q.en);
        $("#nx", box).innerHTML = `<button class="btn" type="button" id="next">Nästa ▶</button>`;
        $("#next", box).addEventListener("click", () => { n++; next(); });
        $("#next", box).focus();
      }));
    };
    setScore(0, qs.length);
    next();
  }

  /* Bygg meningar */
  function exBuild(box, items) {
    const qs = shuffle(items).slice(0, Math.min(8, items.length));
    let n = 0, right = 0;
    const next = () => {
      if (n >= qs.length) return resultScreen(box, right, qs.length, () => exBuild(box, items));
      const q = qs[n];
      const words = q.en.split(" ").map((w, i) => ({ w, i }));
      let pool = shuffle(words);
      if (pool.length > 1 && pool.every((p, i) => p.i === i)) pool = pool.reverse();
      let answer = [];
      let checked = false;
      box.innerHTML = `
        <div class="q-label">Mening ${n + 1} av ${qs.length} · Bygg meningen på engelska</div>
        <div class="q-prompt" lang="sv">${esc(q.sv)}</div>
        <div class="build-answer" id="ans" aria-label="Din mening"></div>
        <div class="build-pool" id="pool"></div>
        <div class="feedback" id="fb"></div>
        <div class="btn-row" id="acts">
          <button class="btn" type="button" id="check">Kontrollera</button>
          <button class="btn ghost" type="button" id="reset">Börja om</button>
          <button class="btn ghost" type="button" id="show">Visa facit</button>
        </div>`;
      const ans = $("#ans", box), poolEl = $("#pool", box), fb = $("#fb", box);
      const draw = () => {
        ans.innerHTML = answer.map((p, k) => `<button class="word-chip" type="button" data-k="${k}" lang="en">${esc(p.w)}</button>`).join("");
        poolEl.innerHTML = pool.map((p, k) => `<button class="word-chip" type="button" data-k="${k}" lang="en">${esc(p.w)}</button>`).join("");
        ans.className = "build-answer";
        ans.querySelectorAll(".word-chip").forEach((b) => b.addEventListener("click", () => { if (checked) return; pool.push(answer.splice(+b.dataset.k, 1)[0]); draw(); }));
        poolEl.querySelectorAll(".word-chip").forEach((b) => b.addEventListener("click", () => { if (checked) return; answer.push(pool.splice(+b.dataset.k, 1)[0]); draw(); }));
      };
      draw();
      const finish = (ok) => {
        checked = true;
        if (ok) right++;
        setScore(right, qs.length);
        ans.className = "build-answer " + (ok ? "ok" : "bad");
        fb.className = "feedback " + (ok ? "ok" : "bad");
        fb.innerHTML = ok ? "Rätt! 🎉" : `Facit: <span lang="en">${esc(q.en)}</span>`;
        Speech.say(q.en);
        $("#acts", box).innerHTML = `<button class="btn" type="button" id="next">Nästa ▶</button>${playBtns(q.en)}`;
        $("#next", box).addEventListener("click", () => { n++; next(); });
      };
      $("#check", box).addEventListener("click", () => {
        if (pool.length) { fb.className = "feedback bad"; fb.textContent = "Använd alla ordbitar först."; return; }
        const built = answer.map((p) => p.w).join(" ");
        if (built === q.en) finish(true);
        else { fb.className = "feedback bad"; fb.textContent = "Inte riktigt. Flytta ordbitarna och försök igen, eller visa facit."; ans.className = "build-answer bad"; }
      });
      $("#reset", box).addEventListener("click", () => { pool = shuffle(words); answer = []; fb.textContent = ""; draw(); });
      $("#show", box).addEventListener("click", () => finish(false));
    };
    setScore(0, qs.length);
    next();
  }

  /* Lyssna och skriv */
  const norm = (s) => s.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:"“”()\-–—]/g, " ").replace(/\s+/g, " ").trim();
  function exWrite(box, items) {
    const qs = shuffle(items).slice(0, Math.min(8, items.length));
    let n = 0, right = 0;
    const next = () => {
      if (n >= qs.length) return resultScreen(box, right, qs.length, () => exWrite(box, items));
      const q = qs[n];
      const wc = q.en.split(/\s+/).length;
      box.innerHTML = `
        <div class="q-label">${n + 1} av ${qs.length} · Lyssna och skriv det du hör</div>
        <div class="big-play">
          <button class="icon-btn" type="button" data-say="${esc(q.en)}" aria-label="Lyssna">${ICON_PLAY}</button>
          <button class="icon-btn slow" type="button" data-say="${esc(q.en)}" data-slow="1" aria-label="Lyssna långsamt">🐢</button>
          <span class="muted">${wc} ${wc === 1 ? "ord" : "ord"} · lyssna så många gånger du vill</span>
        </div>
        <input class="write-input" id="inp" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" lang="en" placeholder="Skriv på engelska …" aria-label="Ditt svar">
        <div class="feedback" id="fb"></div>
        <div id="sol"></div>
        <div class="btn-row" id="acts">
          <button class="btn" type="button" id="check">Kontrollera</button>
          <button class="btn ghost" type="button" id="show">Visa svar</button>
        </div>`;
      const inp = $("#inp", box), fb = $("#fb", box);
      Speech.say(q.en);
      setTimeout(() => inp.focus(), 50);
      const finish = (ok) => {
        if (ok) right++;
        setScore(right, qs.length);
        inp.disabled = true;
        fb.className = "feedback " + (ok ? "ok" : "bad");
        fb.textContent = ok ? "Rätt! 🎉" : "Här är rätt svar:";
        $("#sol", box).innerHTML = `<div class="solution">${enSpan(q.en)}${svSpan(q.sv)}</div>`;
        $("#acts", box).innerHTML = `<button class="btn" type="button" id="next">Nästa ▶</button>`;
        $("#next", box).addEventListener("click", () => { n++; next(); });
        $("#next", box).focus();
      };
      let attempts = 0;
      const check = () => {
        const v = inp.value;
        if (!v.trim()) { fb.className = "feedback bad"; fb.textContent = "Skriv något först."; return; }
        if (norm(v) === norm(q.en)) return finish(true);
        attempts++;
        const target = norm(q.en).split(" "), got = norm(v).split(" ");
        const ok = target.filter((w, i) => got[i] === w).length;
        fb.className = "feedback bad";
        fb.textContent = attempts < 2 ? `Nästan! ${ok} av ${target.length} ord stämmer. Lyssna igen och försök en gång till.` : `${ok} av ${target.length} ord stämmer. Försök igen eller visa svaret.`;
      };
      $("#check", box).addEventListener("click", check);
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      $("#show", box).addEventListener("click", () => finish(false));
    };
    setScore(0, qs.length);
    next();
  }

  /* Tangentbord: siffertangenterna 1–4 väljer svar i flervalsfrågor */
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    const n = parseInt(e.key, 10);
    if (!(n >= 1 && n <= 4)) return;
    const opts = [...app.querySelectorAll(".options .option")];
    const o = opts[n - 1];
    if (o && !o.disabled) { e.preventDefault(); o.click(); }
  });

  /* ---------- Router ---------- */
  function route() {
    Speech.cancel();
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    const [page, a, b, c] = parts;
    document.querySelectorAll(".main-nav a").forEach((el) => el.classList.toggle("active", el.dataset.nav === page));
    switch (page) {
      case "dialoger": pageDialogues(a); break;
      case "rollspel": pageRoleplay(a, b, c); break;
      case "fraser": pagePhrases(a); break;
      case "trana": pagePractice(a, b); break;
      case "ord": pageWords(a); break;
      case "grammatik": pageGrammar(a); break;
      case "tema": pageTheme(a); break;
      default: pageHome();
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
