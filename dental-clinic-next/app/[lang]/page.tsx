import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { clinic as C } from "@/lib/clinic.config";
import { getDict, hasLocale, type Locale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getDict(lang);
  const waLink = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t["wa.greeting"])}`;
  const tel = `tel:${C.phoneRaw}`;

  const logo = C.logoImage ? (
    <Image src={C.logoImage} alt={C.name} width={160} height={40} style={{ height: 40, width: "auto" }} />
  ) : (
    <>
      <span className="logo__mark"><Icon name="tooth" /></span>
      <span>{C.logoText}<b>{C.logoAccent}</b></span>
    </>
  );

  const heroCard = (
    <div className="hero__card">
      <span className="pulse" />
      <div>
        <strong>{t["hero.card.title"]}</strong>
        <span>{t["hero.card.text"]}</span>
      </div>
    </div>
  );

  return (
    <>
      <JsonLd lang={lang} />
      <Header
        lang={lang} logo={logo} phone={C.phone} phoneRaw={C.phoneRaw}
        dict={{
          "nav.services": t["nav.services"], "nav.about": t["nav.about"], "nav.doctors": t["nav.doctors"],
          "nav.reviews": t["nav.reviews"], "nav.contact": t["nav.contact"], "cta.book": t["cta.book"],
        }}
      />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__content">
              <span className="badge"><span className="badge__dot" />{t["hero.badge"]}</span>
              {/* Title comes from the trusted config and may contain a <span> highlight */}
              <h1 className="hero__title" dangerouslySetInnerHTML={{ __html: C.hero.title[lang] }} />
              <p className="hero__subtitle">{C.hero.subtitle[lang]}</p>
              <div className="hero__ctas">
                <a href="#book" className="btn btn--primary btn--lg">{t["cta.book"]}</a>
                <a href={waLink} className="btn btn--wa btn--lg" target="_blank" rel="noopener">
                  <Icon name="whatsapp" /><span>{t["cta.whatsapp"]}</span>
                </a>
              </div>
              <ul className="stats">
                {C.stats.map((s) => (
                  <li key={s.value}><strong>{s.value}</strong><span>{s.label[lang]}</span></li>
                ))}
              </ul>
            </div>

            <div className="hero__visual">
              {C.hero.image ? (
                <Image className="hero__img" src={C.hero.image} alt={C.name} fill priority sizes="(max-width: 880px) 100vw, 45vw" />
              ) : (
                <div className="hero__art">
                  <div className="hero__blob" />
                  <div className="hero__tooth"><Icon name="tooth" /></div>
                  {C.features[2] && <div className="chip chip--a"><Icon name="shield" /><span>{C.features[2].title[lang]}</span></div>}
                  {C.features[0] && <div className="chip chip--b"><Icon name="sparkle" /><span>{C.features[0].title[lang]}</span></div>}
                </div>
              )}
              {heroCard}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services">
          <div className="container">
            <SectionHead kicker={t["services.kicker"]} title={t["services.title"]} />
            <div className="services">
              {C.services.map((s) => (
                <article className="service" key={s.name.en}>
                  <div className="service__icon"><Icon name={s.icon} /></div>
                  <h3>{s.name[lang]}</h3>
                  <p>{s.desc[lang]}</p>
                  <div className="service__price">
                    <Price lang={lang} amount={`${s.price} ${C.currency}`} from={t["services.from"]} />
                  </div>
                </article>
              ))}
            </div>
            <p className="note">{t["services.note"]}</p>
          </div>
        </section>

        {/* Why us */}
        <section className="section section--tint" id="about">
          <div className="container">
            <SectionHead kicker={t["about.kicker"]} title={t["about.title"]} />
            <div className="features">
              {C.features.map((f, i) => (
                <div className="feature" key={f.title.en}>
                  <span className="feature__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{f.title[lang]}</h3>
                  <p>{f.text[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors */}
        <section className="section" id="doctors">
          <div className="container">
            <SectionHead kicker={t["doctors.kicker"]} title={t["doctors.title"]} />
            <div className="doctors">
              {C.doctors.map((d) => (
                <article className="doctor" key={d.name}>
                  <div className="doctor__photo">
                    {d.photo ? (
                      <Image src={d.photo} alt={d.name} fill sizes="(max-width: 1080px) 50vw, 25vw" />
                    ) : (
                      <span className="doctor__initials">{initials(d.name)}</span>
                    )}
                  </div>
                  <h3>{d.name}</h3>
                  <p className="doctor__role">{d.role[lang]}</p>
                  <p className="doctor__exp">{d.exp} {t["doctors.exp"]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section section--tint" id="reviews">
          <div className="container">
            <SectionHead kicker={t["reviews.kicker"]} title={t["reviews.title"]} />
            <div className="reviews">
              {C.reviews.map((r) => (
                <figure className="review" key={r.name}>
                  <div className="stars" aria-label={`${r.rating}/5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  <blockquote>“{r.text[lang]}”</blockquote>
                  <figcaption><strong>{r.name}</strong><span>{r.source}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container container--narrow">
            <SectionHead kicker={t["faq.kicker"]} title={t["faq.title"]} />
            <div className="faq">
              {C.faq.map((f) => (
                <details className="faq__item" key={f.q.en}>
                  <summary>{f.q[lang]}<span className="faq__plus" aria-hidden="true" /></summary>
                  <p>{f.a[lang]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="section section--dark" id="book">
          <div className="container book">
            <div className="book__intro">
              <span className="kicker kicker--light">{t["book.kicker"]}</span>
              <h2>{t["book.title"]}</h2>
              <p>{t["book.text"]}</p>
              <div className="book__alt">
                <a className="btn btn--light" href={tel}><Icon name="phone" /><span>{C.phone}</span></a>
              </div>
            </div>
            <BookingForm dict={t} services={C.services.map((s) => s.name[lang])} whatsapp={C.whatsapp} />
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container">
            <SectionHead kicker={t["contact.kicker"]} title={t["contact.title"]} />
            <div className="contact">
              <div className="contact__info">
                <div className="contact__block">
                  <h3>{t["contact.address"]}</h3>
                  <p>{C.address[lang]}</p>
                  <p className="muted">{C.landmark[lang]}</p>
                  <a className="link" href={C.mapLink} target="_blank" rel="noopener">{t["contact.route"]}</a>
                </div>
                <div className="contact__block">
                  <h3>{t["contact.hours"]}</h3>
                  <dl className="hours">
                    {C.hours.map((h) => (
                      <div key={h.days.en}>
                        <dt>{h.days[lang]}</dt>
                        <dd className={h.time ? undefined : "closed"}>{h.time ?? t["contact.closed"]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="contact__block">
                  <h3>{t["nav.contact"]}</h3>
                  <p><a className="link" href={tel}>{C.phone}</a></p>
                  <p><a className="link" href={`mailto:${C.email}`}>{C.email}</a></p>
                  <div className="socials">
                    {(Object.entries(C.socials) as [keyof typeof C.socials, string][])
                      .filter(([, url]) => url)
                      .map(([k, url]) => (
                        <a key={k} href={url} target="_blank" rel="noopener" aria-label={k}><Icon name={k} /></a>
                      ))}
                  </div>
                </div>
              </div>
              <div className="contact__map">
                <iframe src={C.mapEmbed} title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <a href="#top" className="logo logo--light">{logo}</a>
          <p>© {C.name}. {t["footer.rights"]}</p>
        </div>
      </footer>

      {/* Floating WhatsApp + mobile call bar */}
      <a className="wa-float" href={waLink} target="_blank" rel="noopener" aria-label="WhatsApp">
        <Icon name="whatsapp" />
      </a>
      <div className="mobile-bar">
        <a className="btn btn--light" href={tel}><Icon name="phone" /><span>{t["cta.call"]}</span></a>
        <a href="#book" className="btn btn--primary">{t["cta.book"]}</a>
      </div>

      <Reveal />
    </>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="section__head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </header>
  );
}

/** "from 40 ₼" (ru/en) vs "40 ₼ başlayaraq" (az) */
function Price({ lang, amount, from }: { lang: Locale; amount: string; from: string }) {
  return lang === "az"
    ? <><strong>{amount}</strong> <span>{from}</span></>
    : <><span>{from}</span> <strong>{amount}</strong></>;
}

function initials(name: string) {
  return name.replace(/^Dr\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
}

/** Structured data so Google can show the clinic as a local business. */
function JsonLd({ lang }: { lang: Locale }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: C.name,
    url: `${C.siteUrl}/${lang}`,
    telephone: C.phoneRaw,
    email: C.email,
    priceRange: "$$",
    address: { "@type": "PostalAddress", streetAddress: C.address[lang], addressLocality: "Baku", addressCountry: "AZ" },
    geo: { "@type": "GeoCoordinates", latitude: C.geo.lat, longitude: C.geo.lng },
    sameAs: Object.values(C.socials).filter(Boolean),
    openingHoursSpecification: C.hours
      .filter((h) => h.time && h.schemaDays)
      .map((h) => {
        const [opens, closes] = h.time!.split(/\s*[–-]\s*/);
        return { "@type": "OpeningHoursSpecification", dayOfWeek: h.schemaDays, opens, closes };
      }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
