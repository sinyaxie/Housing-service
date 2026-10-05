// Msingi wa pamoja: Firebase, na vitu vidogo vinavyotumika kwenye kurasa zote.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export * from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
export * from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 1) WEKA CONFIG YAKO YA FIREBASE HAPA (angalia SETUP.md hatua ya 4)
const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_APP_ID"
};

export const configured = !firebaseConfig.apiKey.startsWith("PASTE");
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const TYPES = ["Chumba kimoja", "Self-contained", "Master", "Chumba cha pamoja", "Apartment"];
export const CHUO = [
  ["UDSM", "University of Dar es Salaam"],
  ["MUHAS", "Muhimbili University of Health and Allied Sciences"],
  ["ARU", "Ardhi University"],
  ["IFM", "Institute of Finance Management"],
  ["DIT", "Dar es Salaam Institute of Technology"],
  ["CBE", "College of Business Education"],
  ["OUT", "Open University of Tanzania"],
  ["TIA", "Tanzania Institute of Accountancy"],
  ["NIT", "National Institute of Transport"],
  ["ISW", "Institute of Social Work"],
  ["DUCE", "Dar es Salaam University College of Education"],
  ["SJUIT", "St. Joseph University in Tanzania"],
  ["TUDARCO", "Tumaini University Dar es Salaam College"],
  ["HKMU", "Hubert Kairuki Memorial University"],
  ["Chuo kingine", "Chuo kingine Dar es Salaam"]
];
export const FEATS =["Maji", "Umeme wa LUKU", "Choo ndani", "Jiko", "Wifi", "Usalama", "Uzio", "Parking"];

export const $ = (id) => document.getElementById(id);

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const money = (n) => "TSh " + Number(n).toLocaleString("en-US");

// 0712 345 678 -> 255712345678 (kwa WhatsApp)
export function waNumber(p) {
  let d = String(p || "").replace(/\D/g, "");
  if (d.startsWith("0")) d = "255" + d.slice(1);
  else if (d.length === 9) d = "255" + d;
  return d;
}

// Punguza ukubwa wa picha kabla ya kuhifadhi (inafanya mradi ufanye kazi bila Firebase Storage).
export function compress(file, maxW, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, maxW / img.width);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s);
      c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Picha moja haisomeki. Jaribu picha nyingine."));
    img.src = url;
  });
}

export function authError(e) {
  const m = {
    "auth/invalid-email": "Barua pepe haijaandikwa vizuri.",
    "auth/invalid-credential": "Barua pepe au password si sahihi.",
    "auth/user-not-found": "Barua pepe hii haijasajiliwa.",
    "auth/wrong-password": "Password si sahihi.",
    "auth/email-already-in-use": "Barua pepe hii tayari imesajiliwa. Jaribu kuingia.",
    "auth/weak-password": "Password iwe na angalau herufi 6.",
    "auth/too-many-requests": "Umejaribu mara nyingi. Subiri kidogo kisha jaribu tena."
  };
  return m[e.code] || e.message || "Kuna tatizo. Jaribu tena.";
}

export function say(id, text, ok) {
  const n = $(id);
  if (!n) return;
  n.textContent = text || "";
  n.className = "msg" + (text ? (ok ? " ok" : " err") : "");
}

export function needConfig() {
  const n = $("config-warning");
  if (n && !configured) n.hidden = false;
  return configured;
}
