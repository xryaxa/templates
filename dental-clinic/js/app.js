/* Renders the page from window.CLINIC + window.I18N. No build step needed. */
(function () {
  "use strict";

  const C = window.CLINIC;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const ICONS = {
    tooth: '<path d="M7 3C4.5 3 3 5 3 7.5c0 2 .8 3.5 1.5 5 .8 1.8 1 4 1.5 6 .3 1.3.8 2.5 1.8 2.5 1.4 0 1.6-2.2 2-4 .3-1.3.8-2 2.2-2s1.9.7 2.2 2c.4 1.8.6 4 2 4 1 0 1.5-1.2 1.8-2.5.5-2 .7-4.2 1.5-6 .7-1.5 1.5-3 1.5-5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z"/>',
    implant: '<path d="M6 3h12c0 3-2 5-6 5S6 6 6 3Z"/><path d="M9 11h6M9.5 14h5M10 17h4M11 20h2M12 8v13"/>',
    braces: '<rect x="3" y="8" width="4" height="8" rx="1.5"/><rect x="10" y="8" width="4" height="8" rx="1.5"/><rect x="17" y="8" width="4" height="8" rx="1.5"/><path d="M1 12h22"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3Z"/><path d="m9 12 2 2 4-4"/>',
    child: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z"/>',
    xray: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8c0 2 1 3 1 6M16 8c0 2-1 3-1 6M12 7v10M9 10h6M9.5 13h5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    pin: '<path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3Z"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 3 2.5 5 6 5"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.tooth}</svg>`;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---- Language ------------------------------------------------------
  function pickLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (C.languages.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem("lang");
      if (C.languages.includes(saved)) return saved;
    } catch (e) {}
    return C.defaultLang;
  }
  let lang = pickLang();

  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  const L = (v) => (v && typeof v === "object" ? v[lang] ?? v[C.defaultLang] ?? "" : v ?? "");
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), C);

  // ---- Theme ---------------------------------------------------------
  function applyTheme() {
    const r = document.documentElement.style;
    r.setProperty("--primary", C.theme.primary);
    r.setProperty("--primary-dark", C.theme.primaryDark);
    r.setProperty("--accent", C.theme.accent);
    $('meta[name="theme-color"]').setAttribute("content", C.theme.primary);
  }

  // ---- Static bits (don't depend on language) -------------------------
  function renderStatic() {
    const logo = C.logoImage
      ? `<img src="${esc(C.logoImage)}" alt="${esc(C.name)}" />`
      : `<span class="logo__mark">${icon("tooth")}</span><span>${esc(C.logoText)}<b>${esc(C.logoAccent)}</b></span>`;
    $$("[data-logo]").forEach((el) => (el.innerHTML = logo));
    $$("[data-phone]").forEach((el) => (el.textContent = C.phone));
    $$("[data-phone-link]").forEach((el) => (el.href = "tel:" + C.phoneRaw));
    $$("[data-email-link]").forEach((el) => {
      el.href = "mailto:" + C.email;
      el.textContent = C.email;
    });
    $$("[data-map-link]").forEach((el) => (el.href = C.mapLink));
    $("[data-map]").src = C.mapEmbed;
    $("[data-year]").textContent = new Date().getFullYear();
    $("[data-name]").textContent = C.name;

    $("[data-socials]").innerHTML = Object.entries(C.socials)
      .filter(([, url]) => url)
      .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${k}">${icon(k)}</a>`)
      .join("");

    $("[data-lang-switch]").innerHTML = C.languages
      .map((l) => `<button type="button" data-lang="${l}">${l.toUpperCase()}</button>`)
      .join("");
  }

  // ---- Everything that changes with the language ----------------------
  function render() {
    document.documentElement.lang = lang;
    document.title = L(C.seo.title);
    $('meta[name="description"]').setAttribute("content", L(C.seo.description));

    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-c]").forEach((el) => {
      const v = L(get(el.dataset.c));
      if (el.hasAttribute("data-html")) el.innerHTML = v; // only for trusted config text (hero title)
      else el.textContent = v;
    });
    $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));

    const waUrl = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t("wa.greeting"))}`;
    $$("[data-wa-link]").forEach((el) => (el.href = waUrl));

    $("[data-stats]").innerHTML = C.stats
      .map((s) => `<li><strong>${esc(s.value)}</strong><span>${esc(L(s.label))}</span></li>`)
      .join("");

    $("[data-hero-visual]").innerHTML = C.hero.image
      ? `<img class="hero__img" src="${esc(C.hero.image)}" alt="${esc(C.name)}" />${heroCard()}`
      : `<div class="hero__art">
           <div class="hero__blob"></div>
           <div class="hero__tooth">${icon("tooth")}</div>
           <div class="chip chip--a">${icon("shield")}<span>${esc(L(C.features[2]?.title))}</span></div>
           <div class="chip chip--b">${icon("sparkle")}<span>${esc(L(C.features[0]?.title))}</span></div>
         </div>${heroCard()}`;

    $("[data-services]").innerHTML = C.services
      .map(
        (s) => `<article class="service">
          <div class="service__icon">${icon(s.icon)}</div>
          <h3>${esc(L(s.name))}</h3>
          <p>${esc(L(s.desc))}</p>
          <div class="service__price">${priceLabel(s.price)}</div>
        </article>`
      )
      .join("");

    $("[data-features]").innerHTML = C.features
      .map(
        (f, i) => `<div class="feature">
          <span class="feature__num">0${i + 1}</span>
          <h3>${esc(L(f.title))}</h3>
          <p>${esc(L(f.text))}</p>
        </div>`
      )
      .join("");

    $("[data-doctors]").innerHTML = C.doctors
      .map((d) => {
        const initials = d.name.replace(/^Dr\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
        const photo = d.photo
          ? `<img src="${esc(d.photo)}" alt="${esc(d.name)}" loading="lazy" />`
          : `<span class="doctor__initials">${esc(initials)}</span>`;
        return `<article class="doctor">
          <div class="doctor__photo">${photo}</div>
          <h3>${esc(d.name)}</h3>
          <p class="doctor__role">${esc(L(d.role))}</p>
          <p class="doctor__exp">${esc(d.exp)} ${esc(t("doctors.exp"))}</p>
        </article>`;
      })
      .join("");

    $("[data-reviews]").innerHTML = C.reviews
      .map(
        (r) => `<figure class="review">
          <div class="stars" aria-label="${r.rating}/5">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
          <blockquote>“${esc(L(r.text))}”</blockquote>
          <figcaption><strong>${esc(r.name)}</strong><span>${esc(r.source)}</span></figcaption>
        </figure>`
      )
      .join("");

    $("[data-faq]").innerHTML = C.faq
      .map(
        (f) => `<details class="faq__item">
          <summary>${esc(L(f.q))}<span class="faq__plus" aria-hidden="true"></span></summary>
          <p>${esc(L(f.a))}</p>
        </details>`
      )
      .join("");

    $("[data-hours]").innerHTML = C.hours
      .map(
        (h) => `<div><dt>${esc(L(h.days))}</dt><dd class="${h.time ? "" : "closed"}">${esc(h.time || t("contact.closed"))}</dd></div>`
      )
      .join("");

    const select = $("[data-service-select]");
    const current = select.selectedIndex;
    select.innerHTML =
      `<option value="">${esc(t("form.service.any"))}</option>` +
      C.services.map((s) => `<option>${esc(L(s.name))}</option>`).join("");
    if (current > 0) select.selectedIndex = current;

    renderSchema();
  }

  function heroCard() {
    return `<div class="hero__card">
      <span class="pulse"></span>
      <div><strong>${esc(t("hero.card.title"))}</strong><span>${esc(t("hero.card.text"))}</span></div>
    </div>`;
  }

  function priceLabel(price) {
    const amount = `${price} ${C.currency}`;
    // "from 40 ₼" (ru/en) vs "40 ₼-dan başlayaraq" (az)
    return lang === "az"
      ? `<strong>${esc(amount)}</strong> <span>${esc(t("services.from"))}</span>`
      : `<span>${esc(t("services.from"))}</span> <strong>${esc(amount)}</strong>`;
  }

  // ---- Structured data for Google (local business rich results) -------
  function renderSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: C.name,
      telephone: C.phoneRaw,
      email: C.email,
      url: location.origin + location.pathname,
      address: { "@type": "PostalAddress", streetAddress: L(C.address), addressLocality: "Baku", addressCountry: "AZ" },
      geo: { "@type": "GeoCoordinates", latitude: C.geo.lat, longitude: C.geo.lng },
      sameAs: Object.values(C.socials).filter(Boolean),
      priceRange: "$$",
    };
    schema.openingHoursSpecification = C.hours
      .filter((h) => h.time && h.schemaDays)
      .map((h) => {
        const [opens, closes] = h.time.split(/\s*[–-]\s*/);
        return { "@type": "OpeningHoursSpecification", dayOfWeek: h.schemaDays, opens, closes };
      });
    let tag = $("#ld-json");
    if (!tag) {
      tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "ld-json";
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(schema);
  }

  // ---- Interactions ---------------------------------------------------
  function bindEvents() {
    $("[data-lang-switch]").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn) return;
      lang = btn.dataset.lang;
      try { localStorage.setItem("lang", lang); } catch (err) {}
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
      render();
    });

    const burger = $("#burger");
    const nav = $("#nav");
    const closeNav = () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };
    burger.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));

    const header = $(".header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Booking form → prefilled WhatsApp message (no backend required)
    const form = $("#bookForm");
    const dateInput = form.elements.date;
    dateInput.min = new Date().toISOString().slice(0, 10);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const err = $("#formError");
      if (!d.name.trim() || d.phone.replace(/\D/g, "").length < 7) {
        err.hidden = false;
        return;
      }
      err.hidden = true;
      const lines = [
        t("wa.greeting"),
        "",
        `${t("wa.name")}: ${d.name.trim()}`,
        `${t("wa.phone")}: ${d.phone.trim()}`,
        `${t("wa.service")}: ${d.service || t("form.service.any")}`,
      ];
      if (d.date) lines.push(`${t("wa.date")}: ${d.date.split("-").reverse().join(".")}`);
      if (d.message.trim()) lines.push(`${t("wa.message")}: ${d.message.trim()}`);
      window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    });

    // Reveal-on-scroll
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("is-in"), io.unobserve(en.target))),
        { threshold: 0.12 }
      );
      $$(".section__head, .services, .features, .doctors, .reviews, .faq, .book, .contact").forEach((el) => {
        el.classList.add("reveal");
        io.observe(el);
      });
    }
  }

  applyTheme();
  renderStatic();
  render();
  bindEvents();
})();
