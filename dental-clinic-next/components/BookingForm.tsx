"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import type { Dict } from "@/lib/i18n";

type Props = {
  dict: Dict;
  services: string[];
  whatsapp: string;
};

/** Booking form → opens WhatsApp with a prefilled message. No backend required. */
export function BookingForm({ dict: t, services, whatsapp }: Props) {
  const [error, setError] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!d.name.trim() || d.phone.replace(/\D/g, "").length < 7) {
      setError(true);
      return;
    }
    setError(false);
    const lines = [
      t["wa.greeting"],
      "",
      `${t["wa.name"]}: ${d.name.trim()}`,
      `${t["wa.phone"]}: ${d.phone.trim()}`,
      `${t["wa.service"]}: ${d.service || t["form.service.any"]}`,
    ];
    if (d.date) lines.push(`${t["wa.date"]}: ${d.date.split("-").reverse().join(".")}`);
    if (d.message.trim()) lines.push(`${t["wa.message"]}: ${d.message.trim()}`);
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <label className="field">
        <span>{t["form.name"]}</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label className="field">
        <span>{t["form.phone"]}</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="+994 __ ___ __ __" required />
      </label>
      <label className="field">
        <span>{t["form.service"]}</span>
        <select name="service" defaultValue="">
          <option value="">{t["form.service.any"]}</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="field">
        <span>{t["form.date"]}</span>
        <input name="date" type="date" ref={setMinToToday} />
      </label>
      <label className="field field--full">
        <span>{t["form.message"]}</span>
        <textarea name="message" rows={3} />
      </label>
      {error && <p className="form__error" role="alert">{t["form.error"]}</p>}
      <button type="submit" className="btn btn--wa btn--lg field--full">
        <Icon name="whatsapp" />
        <span>{t["form.submit"]}</span>
      </button>
      <p className="form__privacy field--full">{t["form.privacy"]}</p>
    </form>
  );
}

// Set in the browser, so the pre-rendered HTML doesn't bake in the build date
function setMinToToday(el: HTMLInputElement | null) {
  if (el) el.min = new Date().toISOString().slice(0, 10);
}
