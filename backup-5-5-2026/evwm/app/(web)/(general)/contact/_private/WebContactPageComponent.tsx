"use client";

import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Sparkles,
  MessageSquare,
  Zap,
  ShieldCheck,
  Send
} from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Textarea } from "@/shadcn/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion";
import Link from "next/link";

const faqs = [
  { q: "Response time?", a: "We usually respond within 24 hours on business days." },
  { q: "Custom features?", a: "Yes, we’re happy to discuss and build custom features for you." },
  { q: "Team location?", a: "We are a remote-first team with our HQ in Tbilisi, Georgia." },
];

const steps = [
  { icon: MessageSquare, title: "Initial Inquiry", desc: "Reach out via form or email with your project details." },
  { icon: Zap, title: "Discovery Call", desc: "A 15-min chat to align on goals and technical requirements." },
  { icon: ShieldCheck, title: "Secure Onboarding", desc: "Get set up on our platform with dedicated support." },
];

export default function WebContactPageComponent() {
  return (
    <main className="flex flex-col bg-white dark:bg-transparent overflow-hidden">
      <ContactHero />
      <div className="max-w-8xl mx-auto px-6 space-y-32 py-20">
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <ContactInfo />
          <ContactForm />
        </section>
        <ProcessTimeline />
        <ContactFAQ />
        <ContactLocation />
        <NewsletterCTA />
        <ContactSocial />
      </div>
    </main>
  );
}

function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden px-6 bg-white dark:bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-250 h-125 bg-[#a78bfa]/10 dark:bg-[#7c3aed]/10 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-purple-700 dark:text-[#a78bfa] uppercase bg-purple-100/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 rounded-full backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Get in touch
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black tracking-tighter text-purple-800 dark:text-white">
          Let’s <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-700 to-purple-400 dark:from-[#7c3aed] dark:to-[#c084fc]">Talk.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 max-w-xl mx-auto text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Questions, partnerships, or just a friendly hello — our team is ready to bring your ideas to life.
        </motion.p>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-4xl font-bold text-purple-800 dark:text-white tracking-tight">Contact Information</h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">Prefer direct communication? Reach us through these channels.</p>
      </div>
      <div className="grid gap-6">
        {[
          { icon: Mail, label: "Email us at", value: "connect@eventverse.com" },
          { icon: Phone, label: "Call us at", value: "+995 574 04 33 08" },
        ].map((item, i) => (
          <div key={i} className="group flex items-center gap-5 p-4 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 transition-colors hover:bg-purple-100/80 dark:hover:bg-white/10">
            <div className="h-14 w-14 rounded-xl bg-purple-100/60 dark:bg-[#7c3aed]/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <item.icon className="text-purple-700 dark:text-[#a78bfa] w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-700/60 dark:text-[#a78bfa]/60">{item.label}</p>
              <p className="text-xl text-purple-800 dark:text-white font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <Card className="rounded-[2.5rem] border border-purple-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-2xl shadow-2xl p-2">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl text-purple-800 dark:text-white">Send a Message</CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">Average response time: 2 hours</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-purple-700 dark:text-zinc-300 ml-1">First Name</Label>
              <Input className="h-12 rounded-xl bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-purple-800 dark:text-white focus:ring-purple-700 dark:focus:ring-[#7c3aed]" />
            </div>
            <div className="space-y-2">
              <Label className="text-purple-700 dark:text-zinc-300 ml-1">Last Name</Label>
              <Input className="h-12 rounded-xl bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-purple-800 dark:text-white focus:ring-purple-700 dark:focus:ring-[#7c3aed]" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-purple-700 dark:text-zinc-300 ml-1">Email Address</Label>
            <Input className="h-12 rounded-xl bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-purple-800 dark:text-white focus:ring-purple-700 dark:focus:ring-[#7c3aed]" />
          </div>
          <div className="space-y-2">
            <Label className="text-purple-700 dark:text-zinc-300 ml-1">Message</Label>
            <Textarea className="min-h-32 rounded-xl bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-purple-800 dark:text-white focus:ring-purple-700 dark:focus:ring-[#7c3aed]" />
          </div>
          <Button className="w-full h-14 rounded-2xl bg-purple-700 hover:bg-purple-800 dark:bg-[#7c3aed] dark:hover:bg-[#6d28d9] text-white font-bold text-lg transition-all hover:shadow-[0_0_30px_-5px_#7c3aed]">
            Send Message <Send className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
 

function ProcessTimeline() {
  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-purple-800 dark:text-white">How we work</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Transparent process from start to finish</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative p-8 rounded-3xl bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10">
            <div className="mb-6 h-12 w-12 rounded-full bg-purple-700 dark:bg-[#7c3aed] flex items-center justify-center text-white font-bold">
              <step.icon size={20} />
            </div>
            <h3 className="text-xl font-bold text-purple-800 dark:text-white mb-2">{step.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
            {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-purple-200/60 dark:bg-white/10" />}
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactFAQ() {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl font-bold text-purple-800 dark:text-white tracking-tight">Common Questions</h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">Everything you need to know before getting started.</p>
        <Button variant="link" className="text-purple-700 dark:text-[#a78bfa] p-0 mt-4 h-auto">Visit Help Center →</Button>
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="rounded-2xl border border-purple-200/60 dark:border-white/10 bg-purple-50/60 dark:bg-white/5 px-4 overflow-hidden">
            <AccordionTrigger className="text-purple-800 dark:text-white hover:no-underline py-5">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-600 dark:text-zinc-400 pb-5 leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function ContactLocation() {
  return (
    <section className="overflow-hidden rounded-[3rem] border border-purple-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl grid md:grid-cols-2">
      <div className="p-12 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-purple-800 dark:text-white">Our Presence</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Visit us at our global headquarters for a coffee and a chat about your next big event.</p>
        </div>
        <div className="space-y-6">
          {[
            { icon: MapPin, text: "123 EventVerse HQ, Tbilisi, Georgia" },
            { icon: Clock, text: "Mon – Fri, 9:00 AM – 6:00 PM (GET)" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
              <item.icon className="text-purple-700 dark:text-[#7c3aed] w-5 h-5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-75 bg-linear-to-br from-purple-100/60 to-purple-200/60 dark:from-[#7c3aed]/40 dark:to-[#4f46e5]/40 flex items-center justify-center border-l border-purple-200/60 dark:border-white/10">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full bg-purple-100/60 dark:bg-white/10 backdrop-blur-md mb-4">
             <MapPin className="text-purple-700 dark:text-white w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-purple-800 dark:text-white">Interactive Map</h3>
          <p className="text-zinc-600 dark:text-white/60 text-sm">Loading visual coordinates...</p>
        </div>
      </div>
    </section>
  );
}

function NewsletterCTA() {
  return (
    <div className="rounded-[3rem] p-12 bg-linear-to-r from-purple-100/60 to-transparent dark:from-[#7c3aed]/20 dark:to-transparent border border-purple-200/60 dark:border-[#7c3aed]/30 flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-transparent">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold text-purple-800 dark:text-white">Stay in the loop</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Get the latest event trends and platform updates delivered to your inbox.</p>
      </div>
      <div className="flex w-full max-w-sm gap-2">
        <Input className="bg-purple-50/60 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 text-purple-800 dark:text-white rounded-xl" placeholder="Enter email" />
        <Button className="bg-purple-700 hover:bg-purple-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-xl font-bold px-6">Join</Button>
      </div>
    </div>
  );
}

const socials = [
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
];

export function ContactSocial() {
  return (
    <section className="flex flex-col items-center gap-8 pt-10 border-t border-purple-200/40 dark:border-white/5 bg-white dark:bg-transparent">
      <div className="flex justify-center gap-4">
        {socials.map(({ icon: Icon, href }, index) => (
          <Link key={index} href={href} className="h-14 w-14 rounded-2xl flex items-center justify-center bg-purple-50/60 dark:bg-white/5 text-purple-700 dark:text-zinc-400 border border-purple-200/60 dark:border-white/10 hover:bg-purple-700 hover:text-white dark:hover:bg-[#7c3aed] dark:hover:text-white transition-all duration-300 group">
            <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
          </Link>
        ))}
      </div>
      <p className="text-zinc-600 dark:text-zinc-500 text-sm">© 2024 EventVerse. All rights reserved.</p>
    </section>
  );
}