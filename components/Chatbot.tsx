"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { answer, greeting, quickReplies, type BotReply } from "@/lib/chatbot";
import { ChatIcon, CloseIcon, SendIcon } from "./ui/Icons";

type Message = { id: number; from: "bot" | "user"; text: string; reply?: BotReply };

/** Assistant de démonstration (réponses par mots-clés, sans IA ni serveur). */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: greeting.text }]);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const inputId = useId();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const close = () => {
    setOpen(false);
    // Le bouton réapparaît au rendu suivant : on lui rend le focus ensuite.
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const reply = answer(value);
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", text: reply.text, reply }]);
      setTyping(false);
    }, 550);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="cb-msg fixed right-3 bottom-[84px] z-40 flex h-[min(560px,calc(100dvh-110px))] w-[min(390px,calc(100vw-24px))] flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_30px_80px_-20px_rgb(18_16_20/0.45)] md:right-6 md:bottom-24"
        >
          <div className="flex items-center gap-3 bg-violet px-5 py-4 text-white">
            <span aria-hidden="true" className="relative inline-flex size-10 items-center justify-center rounded-full bg-white/15 font-display font-extrabold">
              C.
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-violet bg-[#4ade80]" />
            </span>
            <div className="min-w-0 flex-1">
              <p id={titleId} className="m-0 font-display text-[17px] leading-tight font-extrabold">
                Assistant Curtis
              </p>
              <p className="m-0 text-[12px] text-violet-soft">Réponses automatiques · démo</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Fermer l'assistant"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white hover:bg-white/20"
            >
              <CloseIcon />
            </button>
          </div>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-paper px-4 py-5" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`cb-msg flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-[20px] px-4 py-3 text-[15px] leading-snug whitespace-pre-line ${
                    msg.from === "user" ? "rounded-br-md bg-ink text-white" : "rounded-bl-md border border-line bg-white text-ink"
                  }`}
                >
                  <span className="sr-only">{msg.from === "user" ? "Vous : " : "Assistant : "}</span>
                  {msg.text}
                  {msg.reply?.services && (
                    <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
                      {msg.reply.services.map((sv) => (
                        <li key={sv.name} className="flex items-baseline justify-between gap-3 rounded-xl bg-cream px-3 py-2 text-[14px]">
                          <span className="font-semibold">{sv.name}</span>
                          <span className="font-bold whitespace-nowrap text-violet">{sv.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {msg.reply?.links && (
                    <span className="mt-3 flex flex-wrap gap-2">
                      {msg.reply.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          onClick={() => l.href.startsWith("#") && setOpen(false)}
                          className="inline-flex min-h-11 items-center rounded-full bg-violet px-4 text-[14px] font-bold text-white no-underline hover:bg-violet-deep"
                        >
                          {l.label}
                        </a>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <span className="cb-typing rounded-[20px] rounded-bl-md border border-line bg-white px-4 py-3 text-[20px] leading-none text-violet">
                  <span>•</span>
                  <span>•</span>
                  <span>•</span>
                  <span className="sr-only">L&apos;assistant écrit…</span>
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-white px-3 pt-3 pb-3">
            <div className="-mx-3 mb-3 flex gap-2 overflow-x-auto px-3 pb-1">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  type="button"
                  onClick={() => send(qr)}
                  className="min-h-11 shrink-0 cursor-pointer rounded-full border border-violet-200 bg-violet-soft px-4 text-[14px] font-semibold text-violet-deep hover:border-violet"
                >
                  {qr}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor={inputId} className="sr-only">
                Votre question
              </label>
              <input
                ref={inputRef}
                id={inputId}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pose ta question…"
                autoComplete="off"
                className="min-h-12 flex-1 rounded-full border border-line bg-paper px-4 text-[16px] text-ink placeholder:text-taupe focus:border-violet"
              />
              <button
                type="submit"
                aria-label="Envoyer"
                disabled={!input.trim() || typing}
                className="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-violet text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant : une question ?"}
        className="cb-btn fixed right-4 bottom-[84px] z-40 inline-flex h-14 cursor-pointer items-center gap-2 rounded-full border-0 bg-ink pr-5 pl-4 font-bold text-white shadow-[0_16px_40px_-12px_rgb(109_40_217/0.7)] md:right-6 md:bottom-6"
        style={open ? { display: "none" } : undefined}
      >
        <ChatIcon />
        <span className="hidden sm:inline">Une question ?</span>
      </button>
    </>
  );
}
