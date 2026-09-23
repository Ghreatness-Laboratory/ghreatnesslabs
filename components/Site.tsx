'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { nav, services } from '@/components/data';

export { services };

const primaryNav = [['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact'], ['/projects', 'Assets']];
const drawerNav = nav.filter(([href]) => !primaryNav.some(([primaryHref]) => primaryHref === href));

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const onScroll = () => setSmall(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return <header className={`fixed top-0 z-50 w-full border-b transition-all ${small ? 'border-white/10 bg-navy/95 shadow-2xl' : 'border-transparent bg-navy/75'} backdrop-blur-md`}>
    <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 ${small ? 'h-16' : 'h-[72px]'}`}>
      <Link href="/" className="focus-ring text-base font-black tracking-[.2em] text-white sm:text-lg">TASOL<span className="text-cyan">.</span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
        {primaryNav.map(([href, label]) => <Link key={href} href={href} className={`nav-link ${path === href ? 'text-cyan' : 'text-white/80'}`}>{label}</Link>)}
      </nav>
      <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:border-cyan hover:text-cyan active:scale-95">
        <span aria-hidden>☰</span>
      </button>
    </div>
    <AnimatePresence>
      {open && <>
        <motion.button aria-label="Close navigation menu" className="fixed inset-0 cursor-default bg-ink/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
        <motion.aside aria-label="Navigation menu" className="fixed right-0 top-0 flex h-dvh w-[min(88vw,390px)] flex-col bg-navy px-6 pb-8 pt-5 shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 280 }}>
          <div className="flex items-center justify-between"><b className="tracking-[.2em] text-white">TASOL<span className="text-cyan">.</span></b><button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="focus-ring grid min-h-11 min-w-11 place-items-center rounded-full border border-white/20 text-xl text-white">×</button></div>
          <p className="mt-10 text-xs font-bold uppercase tracking-[.22em] text-cyan">Explore TASOL</p>
          <nav className="mt-4 grid" aria-label="Drawer navigation">
            {[...primaryNav, ...drawerNav, ['/contact', 'Request a Quote']].map(([href, label], index) => <motion.div key={`${href}-${label}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .08 + index * .045 }}><Link href={href} onClick={() => setOpen(false)} className={`focus-ring block min-h-12 border-b border-white/10 py-3 text-lg font-semibold ${path === href ? 'text-cyan' : 'text-white'}`}>{label}</Link></motion.div>)}
          </nav>
          <Link href="/contact" onClick={() => setOpen(false)} className="focus-ring mt-auto flex min-h-12 items-center justify-center rounded bg-cyan px-5 font-bold text-navy transition hover:bg-white active:scale-[.98]">Request a Quote</Link>
        </motion.aside>
      </>}
    </AnimatePresence>
  </header>;
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: .5, ease: 'easeOut' }} className={className}>{children}</motion.div>; }

export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) { return <div className="max-w-2xl"><p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.19em] text-cyan sm:text-xs">◆ TASOL MARINE SERVICES LTD ◆ {eyebrow}</p><h2 className="text-3xl font-black leading-[1.05] tracking-[-.035em] text-navy sm:text-4xl md:text-5xl">{title}</h2>{copy && <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{copy}</p>}</div>; }

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0); const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true });
  useEffect(() => { if (!inView) return; const started = performance.now(); const frame = (now: number) => { const progress = Math.min((now - started) / 850, 1); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(frame); }; requestAnimationFrame(frame); }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function Chatbot() { const [open, setOpen] = useState(false); const [question, setQuestion] = useState(''); const [reply, setReply] = useState('Welcome to TASOL. How can we support your operation?'); async function ask(e: React.FormEvent) { e.preventDefault(); if (!question) return; const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ question }) }); setReply((await response.json()).answer); setQuestion(''); } return <><button aria-label="Open TASOL assistant" onClick={() => setOpen(!open)} className="focus-ring fixed bottom-4 right-4 z-40 grid min-h-12 min-w-12 place-items-center rounded-full bg-cyan text-lg text-navy shadow-xl transition hover:scale-105 active:scale-95">◌</button>{open && <section className="fixed bottom-20 right-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white p-5 shadow-2xl"><b className="text-navy">TASOL Operations Desk</b><p className="mt-3 min-h-12 text-sm text-slate-600">{reply}</p><form onSubmit={ask} className="mt-4 flex gap-2"><input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about services..." className="focus-ring min-h-11 min-w-0 flex-1 rounded border p-2 text-sm"/><button className="focus-ring min-h-11 min-w-11 rounded bg-navy text-white">→</button></form></section>}</>; }
export function Footer() { return <footer className="bg-ink px-5 py-12 text-white sm:px-6"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4"><div><b className="text-xl tracking-widest">TASOL<span className="text-cyan">.</span></b><p className="mt-3 text-sm leading-6 text-slate-400">Marine, energy and technical services built for complex operations across West Africa.</p></div><div><b>Company</b><p className="mt-3 text-sm leading-7 text-slate-400">About Us<br/>Leadership<br/>HSE</p></div><div><b>Services</b><p className="mt-3 text-sm leading-7 text-slate-400">Marine & Maritime<br/>Engineering & Subsea<br/>Supply Chain</p></div><div><b>Headquarters</b><p className="mt-3 text-sm leading-7 text-slate-400">Lagos, Nigeria<br/>+234 (0) 1 700 2480<br/>operations@tasolmarine.com</p></div></div><p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-slate-500">© 2026 TASOL Marine Services Ltd. All rights reserved.</p></footer>; }
export function Marquee({ label = 'Partners & Clients' }: { label?: string }) { const logos = ['NOGIC JQS', 'Chevron', 'TotalEnergies', 'NLNG', 'NIMASA', 'Shell']; return <section className="overflow-hidden bg-slate-50 py-8 sm:py-10"><p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Trusted by {label}</p><div className="marquee"><div className="marquee-track">{[...logos, ...logos].map((logo, index) => <div aria-hidden={index >= logos.length} key={`${logo}-${index}`} className="grid h-14 w-32 shrink-0 place-items-center rounded bg-white text-xs font-bold text-slate-400 shadow-sm sm:h-16 sm:w-40">{logo}</div>)}</div></div></section>; }
export function QuoteForm({ full = false }: { full?: boolean }) { const [sent, setSent] = useState(false); async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const form = Object.fromEntries(new FormData(e.currentTarget)); await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); setSent(true); } return <form onSubmit={submit} className="grid gap-3 rounded-2xl bg-white p-4 shadow-xl sm:p-5 md:grid-cols-2">{['fullName','email','company','phone'].map(x => <input required key={x} name={x} placeholder={x === 'fullName' ? 'Full name' : x === 'email' ? 'Official email' : x === 'company' ? 'Company / organization' : 'Phone number'} type={x === 'email' ? 'email' : 'text'} className="focus-ring min-h-12 rounded border border-slate-200 px-3"/>)}<select required name="service" className="focus-ring min-h-12 rounded border border-slate-200 px-3"><option value="">Service category</option>{services.map(service => <option key={service[0]}>{service[1]}</option>)}</select><textarea required name="message" placeholder={full ? 'Project scope & timeline' : 'How can we help?'} className="focus-ring min-h-28 rounded border border-slate-200 p-3 md:col-span-2"/><button className="focus-ring min-h-12 rounded bg-cyan px-5 font-bold text-navy transition hover:bg-navy hover:text-white active:scale-[.98]">{sent ? 'Request received — thank you' : 'Request Technical Support →'}</button></form>; }
