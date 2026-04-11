/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LanguagePicker } from "@/app/utils/languagePicker";

type ServiceItem = {
  title: string;
  desc: string;
};

type CaseItem = {
  title: string;
  result: string;
  desc: string;
  image: string;
  url: string;
  badge: string;
};

type FaqItem = {
  q: string;
  a: string;
};

export default function OneDevLanding() {
  const t = useTranslations("OneDev");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const services = t.raw("services.items") as ServiceItem[];
  const problems = t.raw("problems.items") as string[];
  const process = t.raw("process.items") as string[];
  const stack = t.raw("stack.items") as string[];
  const cases = t.raw("cases.items") as CaseItem[];
  const faq = t.raw("faq.items") as FaqItem[];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 15% 30%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(800px 500px at 82% 32%, rgba(255,255,255,0.08), transparent 58%), radial-gradient(900px 700px at 50% 100%, rgba(255,179,71,0.09), transparent 60%)",
          }}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0B]/60 backdrop-blur-xl">
        <Container>
          <div className="flex items-center justify-between py-4">
            <a
              href="#top"
              className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90"
            >
              ONEDEV.WORK
            </a>

            <nav className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.18em] text-white/60 md:flex">
              <a href="#services" className="transition hover:text-white">
                {t("nav.services")}
              </a>
              <a href="#approach" className="transition hover:text-white">
                {t("nav.approach")}
              </a>
              <a href="#cases" className="transition hover:text-white">
                {t("nav.cases")}
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
            </nav>

            <a
              href="#contact"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 text-sm text-white transition hover:bg-white/10"
            >
              {t("nav.cta")}
            </a>
          </div>
        </Container>
      </header>

      <main id="top" className="relative z-10 scroll-mt-20">
        <section className="pt-14 md:pt-20 ">
          <Container>
            <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <Reveal className="flex flex-col" delay={0.05}>
                <div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/72">
                    <span className="h-2 w-2 rounded-full bg-[#ffb347]" />
                    {t("hero.badge")}
                  </div>

                  <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                    {t("hero.title")}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-xl">
                    {t("hero.subtitle")}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#ffb347] px-6 text-sm font-semibold text-black transition hover:-translate-y-px"
                    >
                      {t("hero.ctaPrimary")}
                    </a>
                    <a
                      href="#services"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 text-sm text-white transition hover:bg-white/10"
                    >
                      {t("hero.ctaSecondary")}
                    </a>
                  </div>
                </div>

                <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
                  <StaggerItem className="h-full">
                    <Stat
                      k={t("hero.stats.format.k")}
                      v={t("hero.stats.format.v")}
                      d={t("hero.stats.format.d")}
                    />
                  </StaggerItem>
                  <StaggerItem className="h-full">
                    <Stat
                      k={t("hero.stats.focus.k")}
                      v={t("hero.stats.focus.v")}
                      d={t("hero.stats.focus.d")}
                    />
                  </StaggerItem>
                  <StaggerItem className="h-full">
                    <Stat
                      k={t("hero.stats.approach.k")}
                      v={t("hero.stats.approach.v")}
                      d={t("hero.stats.approach.d")}
                    />
                  </StaggerItem>
                </Stagger>
              </Reveal>

              <Card className="overflow-hidden p-0">
                <div className="relative h-full min-h-[520px] overflow-hidden bg-black/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                  <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#ffb347]/10 blur-3xl" />
                  <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-white/6 blur-3xl" />

                  <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                          {t("preview.title")}
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                          live flow
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <PreviewRow
                          title={t("preview.items.landing.title")}
                          value={t("preview.items.landing.value")}
                        />
                        <PreviewRow
                          title={t("preview.items.crm.title")}
                          value={t("preview.items.crm.value")}
                        />
                        <PreviewRow
                          title={t("preview.items.booking.title")}
                          value={t("preview.items.booking.value")}
                        />
                        <PreviewRow
                          title={t("preview.items.integrations.title")}
                          value={t("preview.items.integrations.value")}
                        />
                      </div>
                    </motion.div>

                    <div className="mt-4 grid gap-3 md:grid-cols-12">
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.08,
                          ease: "easeOut",
                        }}
                        className="md:col-span-7 rounded-[24px] border border-white/10 bg-black/25 p-4 backdrop-blur-md"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                              dashboard
                            </div>
                            <div className="mt-1 text-base font-semibold tracking-tight text-white">
                              OneDev Control Panel
                            </div>
                          </div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/55">
                            business mode
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <MotionKpi value="12" label="leads" delay={0} />
                          <MotionKpi value="7" label="rent" delay={0.08} />
                          <MotionKpi value="4" label="tasks" delay={0.16} />
                        </div>

                        <div className="mt-4 space-y-2">
                          <LiveEvent
                            delay={0.1}
                            title="New booking request"
                            meta="Mini2Go • today 14:30"
                            status="pending"
                          />
                          <LiveEvent
                            delay={0.22}
                            title="Lead moved to CRM"
                            meta="Car2Drive • client approved"
                            status="synced"
                          />
                          <LiveEvent
                            delay={0.34}
                            title="Payment notification"
                            meta="Booking flow • Stripe event"
                            status="done"
                          />
                        </div>
                      </motion.div>

                      <div className="md:col-span-5 grid gap-3">
                        <motion.div
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.14,
                            ease: "easeOut",
                          }}
                        >
                          <OverlayMetric
                            title={t("metrics.onePerson.title")}
                            value={t("metrics.onePerson.value")}
                            note={t("metrics.onePerson.note")}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.22,
                            ease: "easeOut",
                          }}
                        >
                          <OverlayMetric
                            title={t("metrics.noFluff.title")}
                            value={t("metrics.noFluff.value")}
                            note={t("metrics.noFluff.note")}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: "easeOut",
                          }}
                          className="grid gap-3 sm:grid-cols-2 md:grid-cols-1"
                        >
                          <OverlayMetric
                            title={t("metrics.logic.title")}
                            value={t("metrics.logic.value")}
                            note={t("metrics.logic.note")}
                          />
                          <OverlayMetric
                            title={t("metrics.growth.title")}
                            value={t("metrics.growth.value")}
                            note={t("metrics.growth.note")}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <section id="services" className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <div className="grid max-w-6xl gap-8 md:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    {t("services.eyebrow")}
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                    {t("services.title")}
                  </h2>
                  <p className="mt-4 max-w-md leading-7 text-white/68">
                    {t("services.desc")}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>

                <Stagger className="grid gap-4 sm:grid-cols-2">
                  {services.map((item) => (
                    <StaggerItem key={item.title} className="h-full">
                      <Card className="flex h-full flex-col p-6 hover:-translate-y-1">
                        <div className="text-base font-semibold tracking-tight">
                          {item.title}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-white/65">
                          {item.desc}
                        </div>
                      </Card>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="approach" className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-7">
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    {t("problems.eyebrow")}
                  </div>
                  <Stagger className="mt-5 space-y-3">
                    {problems.map((item) => (
                      <StaggerItem key={item}>
                        <div className="flex gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-4">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#ffb347]" />
                          <span className="text-white/78 md:text-[15px]">
                            {item}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </Card>

                <Card className="p-7">
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    {t("benefits.eyebrow")}
                  </div>
                  <Stagger className="mt-5 grid gap-3 sm:grid-cols-2">
                    <StaggerItem className="h-full">
                      <Mini
                        title={t("benefits.items.direct.title")}
                        desc={t("benefits.items.direct.desc")}
                      />
                    </StaggerItem>
                    <StaggerItem className="h-full">
                      <Mini
                        title={t("benefits.items.whole.title")}
                        desc={t("benefits.items.whole.desc")}
                      />
                    </StaggerItem>
                    <StaggerItem className="h-full">
                      <Mini
                        title={t("benefits.items.flex.title")}
                        desc={t("benefits.items.flex.desc")}
                      />
                    </StaggerItem>
                    <StaggerItem className="h-full">
                      <Mini
                        title={t("benefits.items.business.title")}
                        desc={t("benefits.items.business.desc")}
                      />
                    </StaggerItem>
                  </Stagger>
                </Card>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="cases" className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    {t("cases.eyebrow")}
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                    {t("cases.title")}
                  </h2>
                </div>
              </div>

              <Stagger className="mt-8 grid auto-rows-fr gap-4 lg:grid-cols-2">
                {cases.map((item) => (
                  <StaggerItem key={item.title} className="h-full">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/4 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20"
                    >
                      <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-[220px] w-full object-cover transition duration-500 hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/82 backdrop-blur">
                          {item.badge}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="text-lg font-semibold tracking-tight">
                          {item.title}
                        </div>

                        <div className="mt-5 text-2xl font-semibold tracking-tight text-[#ffb347]">
                          {item.result}
                        </div>

                        <div className="mt-3 text-base leading-6 text-white/65">
                          {item.desc}
                        </div>

                        <div className="mt-auto pt-4 text-xs uppercase tracking-[0.18em] text-white/40">
                          {t("cases.openProject")}
                        </div>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </Container>
        </section>

        <section className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <Card className="p-7 md:p-10">
                <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                      {t("process.eyebrow")}
                    </div>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                      {t("process.title")}
                    </h2>
                  </div>
                  <Stagger className="space-y-3">
                    {process.map((item, i) => (
                      <StaggerItem key={item}>
                        <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/4 p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffb347] text-sm font-semibold text-black">
                            {i + 1}
                          </div>
                          <div className="pt-1 text-base leading-6 text-white/78">
                            {item}
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    {t("format.eyebrow")}
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                    {t("format.title")}
                  </h2>
                  <p className="mt-4 max-w-md leading-7 text-white/66">
                    {t("format.desc")}
                  </p>
                </div>

                <Stagger className="grid gap-4 md:grid-cols-2">
                  <StaggerItem className="h-full">
                    <Card className="flex h-full flex-col p-7 hover:-translate-y-1">
                      <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                        {t("format.forWhom.title")}
                      </div>
                      <div className="mt-4 space-y-2 text-sm leading-6 text-white/68">
                        <p>{t("format.forWhom.items.0")}</p>
                        <p>{t("format.forWhom.items.1")}</p>
                        <p>{t("format.forWhom.items.2")}</p>
                        <p>{t("format.forWhom.items.3")}</p>
                        <p>{t("format.forWhom.items.4")}</p>
                      </div>
                    </Card>
                  </StaggerItem>

                  <StaggerItem className="h-full">
                    <Card className="flex h-full flex-col p-7 hover:-translate-y-1">
                      <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                        {t("format.output.title")}
                      </div>
                      <div className="mt-4 space-y-2 text-sm leading-6 text-white/68">
                        <p>{t("format.output.items.0")}</p>
                        <p>{t("format.output.items.1")}</p>
                        <p>{t("format.output.items.2")}</p>
                        <p>{t("format.output.items.3")}</p>
                        <p>{t("format.output.items.4")}</p>
                      </div>
                    </Card>
                  </StaggerItem>
                </Stagger>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="pricing" className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    {t("pricing.eyebrow")}
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                    {t("pricing.title")}
                  </h2>
                  <p className="mt-4 max-w-md text-white/66 leading-7">
                    {t("pricing.desc")}
                  </p>
                </div>

                <Stagger className="grid gap-4 md:grid-cols-2">
                  <StaggerItem className="h-full">
                    <Card className="flex h-full flex-col p-7 hover:-translate-y-1">
                      <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                        {t("pricing.landing.title")}
                      </div>
                      <div className="mt-4 text-4xl font-semibold tracking-tight">
                        {t("pricing.landing.price")}
                      </div>
                      <div className="mt-4 space-y-2 text-sm leading-6 text-white/68">
                        <p>{t("pricing.landing.items.0")}</p>
                        <p>{t("pricing.landing.items.1")}</p>
                        <p>{t("pricing.landing.items.2")}</p>
                      </div>
                    </Card>
                  </StaggerItem>

                  <StaggerItem className="h-full">
                    <Card className="flex h-full flex-col p-7 hover:-translate-y-1">
                      <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                        {t("pricing.system.title")}
                      </div>
                      <div className="mt-4 text-4xl font-semibold tracking-tight">
                        {t("pricing.system.price")}
                      </div>
                      <div className="mt-4 space-y-2 text-sm leading-6 text-white/68">
                        <p>{t("pricing.system.items.0")}</p>
                        <p>{t("pricing.system.items.1")}</p>
                        <p>{t("pricing.system.items.2")}</p>
                      </div>
                    </Card>
                  </StaggerItem>
                </Stagger>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="faq" className="pt-20 md:pt-28">
          <Container>
            <Reveal>
              <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                    FAQ
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    {t("faq.title")}
                  </h2>
                  <p className="mt-4 max-w-md leading-7 text-white/66">
                    {t("faq.desc")}
                  </p>
                </div>

                <Stagger className="space-y-3">
                  {faq.map((it, idx) => {
                    const open = faqOpen === idx;

                    return (
                      <StaggerItem key={`${it.q}-${idx}`}>
                        <Card className="overflow-hidden">
                          <button
                            className="flex w-full items-center justify-between px-5 py-4 text-left"
                            onClick={() => setFaqOpen(open ? null : idx)}
                            type="button"
                          >
                            <span className="text-sm md:text-lg">{it.q}</span>
                            <span
                              className={[
                                "grid h-7 w-7 place-items-center rounded-full border",
                                "transition-transform duration-200",
                                open ? "rotate-45" : "rotate-0",
                                "border-white/10 bg-white/5 text-[#ffb347]",
                              ].join(" ")}
                              aria-hidden="true"
                            >
                              +
                            </span>
                          </button>

                          {open && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-base leading-relaxed text-white/70">
                                {it.a}
                              </div>
                            </motion.div>
                          )}
                        </Card>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="contact" className="pb-20 pt-20 md:pb-24 md:pt-28">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">
                      {t("contact.eyebrow")}
                    </div>
                    <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                      {t("contact.title")}
                    </h2>
                    <p className="mt-4 max-w-2xl leading-7 text-white/66">
                      {t("contact.desc")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                    <a
                      href="https://t.me/Parmegano"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#ffb347] px-6 text-sm font-semibold text-black transition hover:-translate-y-px"
                    >
                      {t("contact.telegram")}
                    </a>
                    <a
                      href="mailto:megadoze33@gmail.com"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 text-sm text-white transition hover:bg-white/10"
                    >
                      {t("contact.email")}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <Container>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-white/45">{t("footer.copy")}</div>
            <div className="flex items-center gap-3">
              <LanguagePicker />
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>
  );
}

function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "h-full rounded-[28px] border border-white/10 bg-white/4 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function Stat({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
        {k}
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight">{v}</div>
      <div className="mt-1 text-sm text-white/55">{d}</div>
    </div>
  );
}

function OverlayMetric({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/28 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1">
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">
        {title}
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-sm text-white/60">{note}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/72 transition duration-300 hover:bg-white/10">
      {children}
    </span>
  );
}

function Mini({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/4 p-4 transition duration-300 hover:-translate-y-1">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/64">{desc}</div>
    </div>
  );
}

function PreviewRow({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
    >
      <div className="text-sm text-white/82">{title}</div>
      <div className="text-right text-xs uppercase tracking-[0.16em] text-white/48">
        {value}
      </div>
    </motion.div>
  );
}

function MotionKpi({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-3 sm:min-w-0"
    >
      <div className="text-xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 break-words text-[10px] uppercase tracking-[0.12em] text-white/45">
        {label}
      </div>
    </motion.div>
  );
}

function LiveEvent({
  title,
  meta,
  status,
  delay,
}: {
  title: string;
  meta: string;
  status: string;
  delay: number;
}) {
  const statusTone = useMemo(() => {
    if (status === "done") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    }
    if (status === "synced") {
      return "border-sky-400/20 bg-sky-400/10 text-sky-300";
    }
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/4 px-3 py-3"
    >
      <div>
        <div className="text-sm font-medium text-white/88">{title}</div>
        <div className="mt-1 text-xs text-white/48">{meta}</div>
      </div>
      <div
        className={[
          "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]",
          statusTone,
        ].join(" ")}
      >
        {status}
      </div>
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -120px 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
