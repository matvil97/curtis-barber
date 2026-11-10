"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { salon, serviceCategories, serviceCount, type Service } from "@/data/site";
import { ArrowUpRight, ClockIcon, SearchIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { Accent, SectionHeading } from "./ui/SectionHeading";

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <m.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1], delay: Math.min(index, 8) * 0.035 }}
      className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-line py-4 last:border-b-0 sm:grid-cols-[1fr_auto_auto]"
    >
      <div className="min-w-0">
        <h3 className="m-0 text-[16px] leading-snug font-bold sm:text-[17px]">{service.name}</h3>
        {service.description && <p className="m-0 mt-1 text-sm leading-snug text-taupe">{service.description}</p>}
        <p className="m-0 mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-taupe sm:hidden">
          <ClockIcon />
          <span className="sr-only">Durée : </span>
          {service.duration}
        </p>
      </div>
      <p className="m-0 hidden items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-[13px] font-semibold whitespace-nowrap text-ink-soft sm:inline-flex">
        <ClockIcon />
        <span className="sr-only">Durée : </span>
        {service.duration}
      </p>
      <div className="flex items-center gap-3">
        <p className="m-0 font-display text-[18px] font-extrabold whitespace-nowrap tracking-[-0.02em]">
          <span className="sr-only">Prix : </span>
          {service.price}
        </p>
        <a
          href={salon.planityUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Réserver : ${service.name}`}
          className="cb-btn inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white group-hover:bg-violet"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </m.li>
  );
}

export function Services() {
  const [active, setActive] = useState(serviceCategories[0].id);
  const [query, setQuery] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const searchId = useId();

  const q = normalize(query.trim());
  const results = useMemo(
    () =>
      q
        ? serviceCategories.flatMap((c) =>
            c.services.filter((sv) => normalize(`${sv.name} ${sv.description ?? ""} ${c.label}`).includes(q)),
          )
        : null,
    [q],
  );
  const category = serviceCategories.find((c) => c.id === active)!;
  const list = results ?? category.services;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = serviceCategories.findIndex((c) => c.id === active);
    const n = serviceCategories.length;
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(serviceCategories[next].id);
    setQuery("");
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="prestations" aria-labelledby="prestations-title" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-7 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-8 pb-10">
        <SectionHeading index="01" eyebrow="Prestations" id="prestations-title">
          La carte, <Accent>sans détour.</Accent>
        </SectionHeading>
        <div className="flex w-full max-w-[360px] flex-col gap-2">
          <label htmlFor={searchId} className="text-sm font-semibold text-ink-soft">
            Rechercher parmi les {serviceCount} prestations
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex. taper, retwist, knotless…"
              className="min-h-12 w-full rounded-full border border-line bg-white py-3 pr-4 pl-11 text-[16px] text-ink placeholder:text-taupe focus:border-violet"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="grid gap-5 lg:grid-cols-[340px_1fr] lg:items-start">
        {/* Catégories : bento sur desktop, rangée défilante sur mobile */}
        <div
          role="tablist"
          aria-label="Catégories de prestations"
          onKeyDown={onKeyDown}
          className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 py-1 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0"
        >
          {serviceCategories.map((c, i) => {
            const selected = !results && c.id === active;
            const from = Math.min(...c.services.map((x) => x.from));
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls="prestations-panel"
                tabIndex={c.id === active ? 0 : -1}
                onClick={() => {
                  setActive(c.id);
                  setQuery("");
                }}
                className={`flex min-h-[92px] min-w-[150px] shrink-0 snap-start cursor-pointer flex-col justify-between gap-3 rounded-[22px] border p-4 text-left transition-[background-color,border-color,color,box-shadow] duration-300 lg:min-w-0 ${
                  selected
                    ? "border-violet bg-violet text-white shadow-[0_16px_34px_-16px_rgb(109_40_217/0.8)]"
                    : "border-line bg-white text-ink hover:border-violet-200"
                }`}
              >
                <span className="font-display text-[17px] leading-tight font-extrabold tracking-[-0.02em]">{c.label}</span>
                <span className={`flex items-baseline justify-between gap-2 text-[13px] font-semibold ${selected ? "text-violet-soft" : "text-taupe"}`}>
                  <span>{c.services.length} presta.</span>
                  <span>dès {from} €</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="prestations-panel"
          role={results ? "region" : "tabpanel"}
          aria-labelledby={results ? undefined : `tab-${active}`}
          aria-label={results ? "Résultats de recherche" : undefined}
          tabIndex={0}
          className="min-h-[420px] rounded-[28px] border border-line bg-white p-5 sm:p-8"
        >
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
            <p className="m-0 font-display text-[24px] font-extrabold tracking-[-0.03em]">
              {results ? `« ${query.trim()} »` : category.label}
            </p>
            <p className="m-0 text-sm font-semibold text-taupe" aria-live="polite">
              {list.length} prestation{list.length > 1 ? "s" : ""}
            </p>
          </div>
          {list.length ? (
            <ul className="m-0 list-none p-0">
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((sv, i) => (
                  <ServiceRow key={`${results ? "r" : active}-${sv.name}`} service={sv} index={i} />
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <p className="mt-6 text-taupe">
              Aucune prestation ne correspond. Essaie un autre mot, ou pose la question à l&apos;assistant.
            </p>
          )}
        </div>
      </Reveal>
      <p className="mt-5 mb-0 text-sm text-taupe">Tarifs et durées indiqués sur Planity. Paiement sur place.</p>
    </section>
  );
}
