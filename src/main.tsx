import React,{useState} from 'react';
import{createRoot}from'react-dom/client';
import'./style.css';

type Card={q:string,a:string,topic:string};
const cards:Card[]=[
{topic:'Azure',q:'Τι κάνει ένα Azure NSG;',a:'Φιλτράρει inbound/outbound network traffic σε subnet ή network interface με security rules.'},
{topic:'Azure',q:'VNet και Subnet: ποια η σχέση;',a:'Το VNet είναι το ιδιωτικό δίκτυο στο Azure και χωρίζεται σε ένα ή περισσότερα subnets.'},
{topic:'Kubernetes',q:'Deployment vs StatefulSet;',a:'Deployment για συνήθως stateless workloads. StatefulSet όταν χρειάζεσαι stable identity/storage και ordered lifecycle.'},
{topic:'Kubernetes',q:'Τι κάνει ένα Service;',a:'Δίνει σταθερό network endpoint και routing προς ένα σύνολο Pods.'},
{topic:'Terraform',q:'terraform plan vs apply;',a:'plan δείχνει τις προτεινόμενες αλλαγές. apply τις εκτελεί.'},
{topic:'Terraform',q:'Γιατί κρατάμε Terraform state;',a:'Για να αντιστοιχίζει το configuration στους πραγματικούς resources και να υπολογίζει τις αλλαγές.'},
{topic:'Docker',q:'Στο ports: 8080:80 ποιο είναι το host port;',a:'8080 είναι το host port και 80 το container port.'},
{topic:'Cloud',q:'Public vs private subnet;',a:'Public συνήθως έχει route προς Internet Gateway/public ingress. Private δεν εκθέτει άμεσα workloads στο Internet.'},
];
const lessons=[
{topic:'Azure',title:'VNet → Subnet → NSG',body:'Σκέψου το VNet ως το ιδιωτικό address space της εφαρμογής. Τα subnets χωρίζουν workloads σε λογικά τμήματα. Τα NSGs εφαρμόζουν allow/deny rules σε traffic. Σχεδίαζε πρώτα address ranges ώστε να μην επικαλύπτονται με άλλα δίκτυα που θα συνδεθούν αργότερα.'},
{topic:'Kubernetes',title:'Deployment, Pod και Service',body:'Το Pod είναι η μικρότερη deployable μονάδα. Το Deployment δηλώνει το επιθυμητό state για replicas και updates. Επειδή τα Pods είναι εφήμερα, ένα Service παρέχει σταθερό endpoint και βρίσκει τα κατάλληλα Pods μέσω labels.'},
{topic:'Terraform',title:'Safe Terraform workflow',body:'Συνήθης ροή: fmt → validate → plan → review → apply. Το state χρειάζεται προστασία και, σε ομάδα, remote backend και locking. Μην αποθηκεύεις secrets απευθείας σε configuration ή version control.'}
];
function App(){
 const [screen,setScreen]=useState<'home'|'cards'|'lesson'|'quiz'>('home'); const [i,setI]=useState(0); const [show,setShow]=useState(false); const [mins,setMins]=useState(45);
 const [done,setDone]=useState(()=>Number(localStorage.getItem('done')||0));
 const complete=()=>{let n=done+1;setDone(n);localStorage.setItem('done',String(n));};
 if(screen==='cards'){let c=cards[i%cards.length];return <main><button className="back" onClick={()=>setScreen('home')}>← Dashboard</button><p className="eyebrow">{c.topic} · FLASHCARD {i%cards.length+1}/{cards.length}</p><section className="card big" onClick={()=>setShow(!show)}><h2>{c.q}</h2>{show?<p>{c.a}</p>:<small>Tap για απάντηση</small>}</section><div className="row"><button onClick={()=>{setShow(false);setI(i+1)}}>Ξανά</button><button className="primary" onClick={()=>{complete();setShow(false);setI(i+1)}}>Το ξέρω ✓</button></div></main>}
 if(screen==='lesson'){let l=lessons[i%lessons.length];return <main><button className="back" onClick={()=>setScreen('home')}>← Dashboard</button><p className="eyebrow">{l.topic} · OFFLINE LESSON</p><section className="card"><h1>{l.title}</h1><p className="lesson">{l.body}</p></section><button className="primary full" onClick={()=>{complete();setI(i+1);setScreen('home')}}>Ολοκλήρωση ✓</button></main>}
 if(screen==='quiz'){let c=cards[(i+3)%cards.length];return <main><button className="back" onClick={()=>setScreen('home')}>← Dashboard</button><p className="eyebrow">QUICK RECALL</p><section className="card"><h2>{c.q}</h2><textarea placeholder="Πες την απάντηση με δικά σου λόγια…"/><details><summary>Έλεγχος απάντησης</summary><p>{c.a}</p></details></section><button className="primary full" onClick={()=>{complete();setI(i+1);setScreen('home')}}>Επόμενο ✓</button></main>}
 return <main><header><div><p className="eyebrow">COMMUTE MODE</p><h1>☁️ Cloud Ride</h1></div><div className="streak">{done}<small> mastered</small></div></header><section className="hero"><span>ΣΗΜΕΡΙΝΗ ΔΙΑΔΡΟΜΗ</span><h2>Έχω {mins} λεπτά</h2><input type="range" min="15" max="90" step="15" value={mins} onChange={e=>setMins(+e.target.value)}/><div className="plan"><b>{Math.round(mins*.35)}′</b> lesson <b>{Math.round(mins*.25)}′</b> flashcards <b>{Math.round(mins*.2)}′</b> recall <b>{Math.round(mins*.2)}′</b> relax</div></section><h3>Offline εργαλεία</h3><div className="grid"><button className="tile" onClick={()=>setScreen('lesson')}>📖<b>Mini lesson</b><small>Azure · K8s · Terraform</small></button><button className="tile" onClick={()=>setScreen('cards')}>🧠<b>Flashcards</b><small>{cards.length} διαθέσιμες</small></button><button className="tile" onClick={()=>setScreen('quiz')}>⚡<b>Quick recall</b><small>Active learning</small></button><button className="tile dim">🎧<b>Audio queue</b><small>έρχεται στο v2</small></button></div><footer>Offline-first · Progress αποθηκεύεται στη συσκευή</footer></main>
}
createRoot(document.getElementById('root')!).render(<App/>);
