'use client';

import { useState } from 'react';

type Result={score:number;missing:string[];questions:string[];rewrite:string;signals:string[]};
const examples=[
 'Build a mobile app where users can book appointments with doctors.',
 'Add dark mode to the dashboard.',
 'Let customers cancel an order and get a refund.'
];

function buildRewrite(text:string){
 const s=text.toLowerCase();
 if(s.includes('appointment')||s.includes('doctor')) return 'As a patient, I want to view available doctor time slots and book an appointment so that I can reserve a consultation. The product should define booking windows, timezone handling, double-booking behavior, cancellation rules and a success metric such as completed bookings.';
 if(s.includes('dark mode')||s.includes('theme')) return 'Add a dark-mode option to the dashboard that lets a signed-in user switch between light and dark themes. The preference should persist across sessions, apply consistently to all dashboard components, remain accessible, and fall back safely if a theme-specific asset is unavailable.';
 if(s.includes('cancel')&&s.includes('refund')) return 'Allow a customer to cancel an eligible order and automatically initiate the appropriate refund. Define the cancellation window, partial-versus-full refund rules, payment-provider failures, order states that cannot be cancelled, refund status shown to the customer, and the expected refund completion time.';
 if(s.includes('login')||s.includes('auth')) return 'Allow users to sign in securely and maintain a session across supported devices. Define authentication methods, session expiry, failed-login behavior, authorization rules, recovery flows and measurable success criteria.';
 if(s.includes('notification')||s.includes('notify')) return 'Allow users to receive notifications for the specified event. Define the trigger, delivery channels, timing, user preferences, duplicate-prevention behavior, failure handling and a measurable delivery-success target.';
 const cleaned=text.trim().replace(/[.?!]+$/,'');
 return `Define the feature “${cleaned}” with an explicit user, expected outcome, acceptance criteria, constraints, edge cases and success metric before implementation.`;
}

function analyze(text:string):Result{
 const s=text.toLowerCase();
 const missing:string[]=[];
 if(!/user|customer|admin|doctor|student|employee|people/.test(s)) missing.push('Who is the user?');
 if(!/when|after|before|until|daily|weekly|real.?time|session|persist/.test(s)) missing.push('When should it happen?');
 if(!/if|unless|cannot|error|fail|edge|limit|only|except|double|eligible/.test(s)) missing.push('What happens in edge cases?');
 if(!/metric|success|rate|percent|goal|target|increase|reduce/.test(s)) missing.push('How will success be measured?');
 if(!/must|should|allow|prevent|require|permission|role|secure|persist/.test(s)) missing.push('What rules or constraints apply?');
 const score=Math.max(22,100-missing.length*15);
 const questions=missing.slice(0,4);
 const signals:string[]=[];
 if(/app|mobile|dashboard|web/.test(s)) signals.push('UI / product change');
 if(/book|appointment|cancel|refund|payment/.test(s)) signals.push('Business workflow');
 if(/user|customer|doctor|student/.test(s)) signals.push('User-facing behavior');
 if(!signals.length) signals.push('Feature requirement');
 return {score,missing,questions,rewrite:buildRewrite(text),signals};
}

export default function Home(){
 const [text,setText]=useState(examples[0]);
 const [result,setResult]=useState<Result>(()=>analyze(examples[0]));
 const [active,setActive]=useState<'analysis'|'questions'|'rewrite'>('analysis');
 const [busy,setBusy]=useState(false);
 const run=()=>{setBusy(true);setTimeout(()=>{setResult(analyze(text));setActive('analysis');setBusy(false)},450)};
 const choose=(e:string)=>{setText(e);setResult(analyze(e));setActive('analysis')};
 return <main className="app">
  <header><div className="brand"><div className="logo">S</div><div><b>SpecSense</b><span>AI Requirement Clarity Checker</span></div></div><div className="live"><i/> Demo ready</div></header>
  <section className="hero"><div><label>PRODUCT ENGINEERING TOOL</label><h1>Turn vague ideas into<br/><em>buildable requirements.</em></h1><p>Paste a feature request. SpecSense spots ambiguity, asks the questions an engineer should ask, and rewrites the idea into a clearer starting specification.</p></div><div className="scoreBig"><b>{result.score}</b><span>clarity<br/>score</span></div></section>
  <section className="workspace">
   <aside><label>TRY A SCENARIO</label>{examples.map((e,i)=><button key={e} className={text===e?'active':''} onClick={()=>choose(e)}><span>0{i+1}</span><span>{e}</span></button>)}<div className="how"><label>THE IDEA</label><p>Requirement → signals → missing details → clearer specification</p></div></aside>
   <div className="main"><div className="input card"><label>YOUR REQUIREMENT</label><textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Example: Add a feature where..."/><div className="bottom"><small>Nothing is sent anywhere · interview-safe demo</small><button onClick={run} disabled={busy}>{busy?'Checking…':'✦ Check clarity'}</button></div></div>
    <nav>{[['analysis','Clarity'],['questions','Questions'],['rewrite','Rewrite']].map(([k,l])=><button key={k} className={active===k?'on':''} onClick={()=>setActive(k as typeof active)}>{l}</button>)}</nav>
    {active==='analysis'&&<div className="results"><div className="card score"><div><label>CLARITY SCORE</label><strong>{result.score}<small>/100</small></strong></div><div className="bar"><span style={{width:`${result.score}%`}}/></div><p>{result.score>=75?'Good starting point — a few details would make this implementation-ready.':result.score>=50?'Promising idea, but important decisions are still undefined.':'Too vague to estimate reliably — clarify the basics first.'}</p></div><div className="grid"><div className="card"><label>SIGNALS DETECTED</label>{result.signals.map(x=><div className="row" key={x}>✓ <b>{x}</b></div>)}</div><div className="card"><label>MISSING DETAILS</label>{result.missing.length?result.missing.map((x,i)=><div className="row" key={x}><span className="num">{i+1}</span><b>{x}</b></div>):<div className="good">✓ Looks unusually specific.</div>}</div></div></div>}
    {active==='questions'&&<div className="card questions"><label>QUESTIONS AN ENGINEER SHOULD ASK</label>{result.questions.map((x,i)=><div className="question" key={x}><span>Q{i+1}</span><b>{x}</b></div>)}<p>These questions turn a vague ticket into something the engineering team can safely build.</p></div>}
    {active==='rewrite'&&<div className="card rewrite"><label>CLEARER STARTING SPEC</label><p>{result.rewrite}</p><button onClick={()=>navigator.clipboard?.writeText(result.rewrite)}>Copy specification</button><div className="tip"><b>Why this is better</b><span>The rewrite is tailored to the detected feature rather than using a generic sentence template.</span></div></div>}
   </div>
  </section>
  <footer><b>SpecSense v1.0</b><span>AI-assisted requirement clarification · Simple enough to demo in 60 seconds</span></footer>
 </main>
}
