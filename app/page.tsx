"use client";
import React, { useState } from "react";
interface Car {
id: string;
name: string;
category: "Éco & Compacte" | "Berline & Confort" | "SUV & Prestige";
tagline: string;
pricePerDay: number;
gearbox: "Automatique" | "Manuelle";
fuel: "Diesel" | "Essence" | "Hybride";
seats: number;
imageUrl: string;
isPopular?: boolean;
}
const CARS_DATABASE: Car[] = [
{
id: "clio-5",
name: "Renault Clio 5 Edition Noire",
category: "Éco & Compacte",
tagline: "Agilité urbaine, écran tactile & Bluetooth",
pricePerDay: 350,
gearbox: "Manuelle",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80",
isPopular: true,
},
{
id: "peugeot-208",
name: "Peugeot 208 GT Line",
category: "Éco & Compacte",
tagline: "Style dynamique, i-Cockpit 3D & éclairage LED",
pricePerDay: 380,
gearbox: "Automatique",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
},
{
id: "dacia-duster",
name: "Dacia Duster 4x2 Prestige",
category: "SUV & Prestige",
tagline: "Robuste, spacieux et idéal pour les longs trajets",
pricePerDay: 450,
gearbox: "Manuelle",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
},
{
id: "mercedes-cla",
name: "Mercedes-Benz Classe CLA AMG-Line",
category: "Berline & Confort",
tagline: "Élégance pure, intérieur cuir & sonorisation Burmester",
pricePerDay: 900,
gearbox: "Automatique",
fuel: "Hybride",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
isPopular: true,
},
{
id: "audi-a3",
name: "Audi A3 Berline S-Line",
category: "Berline & Confort",
tagline: "Finition premium allemande, virtual cockpit",
pricePerDay: 850,
gearbox: "Automatique",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=900&q=80",
},
{
id: "range-evoque",
name: "Range Rover Evoque First Edition",
category: "SUV & Prestige",
tagline: "Prestige absolu, toit panoramique & confort souverain",
pricePerDay: 1300,
gearbox: "Automatique",
fuel: "Hybride",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
}
];
export default function HomePage() {
const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
const [phoneNumber] = useState<string>("212661741201"); // Remplacez par votre numéro WhatsApp sans '+'
const categories = ["Toutes", "Éco & Compacte", "Berline & Confort", "SUV & Prestige"];
const filteredCars =
selectedCategory === "Toutes"
? CARS_DATABASE
: CARS_DATABASE.filter((car) => car.category === selectedCategory);
const getWhatsAppLink = (carName?: string) => {
const text = carName
? ⁠Bonjour Berik Rent, je souhaite réserver le véhicule : ${carName}. Quelles sont les disponibilités ?⁠
: ⁠Bonjour Berik Rent, je souhaite obtenir des informations sur la location de véhicules.⁠;
return ⁠https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}⁠;
};
return (
<main style={{ backgroundColor: "#0b0c10", color: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
{/* Barre de navigation supérieure */}
<header
style={{
borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
padding: "20px 32px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
backgroundColor: "rgba(11, 12, 16, 0.95)",
position: "sticky",
top: 0,
zIndex: 50,
backdropFilter: "blur(8px)",
}}
>
<div>
<span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "3px", color: "#d4af37" }}>
BERIK RENT
</span>
<span style={{ display: "block", fontSize: "10px", letterSpacing: "1.5px", color: "#94a3b8", textTransform: "uppercase" }}>
Prestige Car Rental • Rabat
</span>
</div>
<a
href={getWhatsAppLink()}
target="_blank"
rel="noopener noreferrer"
style={{
backgroundColor: "#d4af37",
color: "#0b0c10",
fontWeight: "700",
fontSize: "13px",
textTransform: "uppercase",
letterSpacing: "1px",
padding: "10px 20px",
borderRadius: "6px",
textDecoration: "none",
display: "inline-block",
transition: "all 0.3s ease",
}}
>
Contact Conciergerie
</a>
</header>
{/* Hero Header */}
<section
style={{
padding: "80px 24px 60px",
textAlign: "center",
maxWidth: "900px",
margin: "0 auto",
}}
>
<div
style={{
display: "inline-block",
border: "1px solid rgba(212, 175, 55, 0.35)",
padding: "6px 16px",
borderRadius: "50px",
fontSize: "12px",
letterSpacing: "2px",
textTransform: "uppercase",
color: "#d4af37",
marginBottom: "24px",
backgroundColor: "rgba(212, 175, 55, 0.05)",
}}
>
Expérience Automobile Exclusive
</div>
<h1
style={{
fontSize: "clamp(34px, 5vw, 56px)",
fontWeight: "800",
letterSpacing: "-0.5px",
lineHeight: 1.15,
marginBottom: "20px",
background: "linear-gradient(180deg, #ffffff 40%, #94a3b8 100%)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
}}
>
Louez l’Excellence à Rabat
</h1>
<p
style={{
fontSize: "16px",
color: "#94a3b8",
lineHeight: 1.6,
maxWidth: "640px",
margin: "0 auto 36px",
}}
>
Service sur-mesure, livraison prioritaire à l’Aéroport Rabat-Salé et en gares. Flotte méticuleusement entretenue et désinfectée.
</p>
{/* Filtres de catégorie */}
<div
style={{
display: "flex",
justifyContent: "center",
flexWrap: "wrap",
gap: "10px",
marginTop: "16px",
}}
>
{categories.map((cat) => {
const isSelected = selectedCategory === cat;
return (
<button
key={cat}
onClick={() => setSelectedCategory(cat)}
style={{
padding: "9px 18px",
fontSize: "13px",
borderRadius: "30px",
border: isSelected ? "1px solid #d4af37" : "1px solid rgba(148, 163, 184, 0.2)",
backgroundColor: isSelected ? "#d4af37" : "rgba(255, 255, 255, 0.03)",
color: isSelected ? "#0b0c10" : "#cbd5e1",
fontWeight: isSelected ? "700" : "500",
cursor: "pointer",
transition: "all 0.2s ease",
}}
>
{cat}
</button>
);
})}
</div>
</section>
{/* Grille des véhicules /}
<section
style={{
maxWidth: "1200px",
margin: "0 auto",
padding: "0 24px 80px",
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
gap: "28px",
}}
>
{filteredCars.map((car) => (
<div
key={car.id}
style={{
backgroundColor: "#13161c",
borderRadius: "14px",
border: car.isPopular ? "1px solid rgba(212, 175, 55, 0.5)" : "1px solid rgba(255, 255, 255, 0.07)",
overflow: "hidden",
display: "flex",
flexDirection: "column",
boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
transition: "transform 0.3s ease, border-color 0.3s ease",
}}
>
{/ Image véhicule */}
<div style={{ position: "relative", height: "200px", backgroundColor: "#1e232d" }}>
<img
src={car.imageUrl}
alt={car.name}
style={{
width: "100%",
height: "100%",
objectFit: "cover",
}}
/>
{car.isPopular && (
<div
style={{
position: "absolute",
top: "14px",
right: "14px",
backgroundColor: "#d4af37",
color: "#0b0c10",
fontWeight: "800",
fontSize: "11px",
textTransform: "uppercase",
letterSpacing: "1px",
padding: "4px 10px",
borderRadius: "4px",
}}
>
Très Demandé
</div>
)}
</div>
{/* Fiche descriptive */}
<div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
<div style={{ fontSize: "12px", color: "#d4af37", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
{car.category}
</div>
<h3 style={{ fontSize: "19px", fontWeight: "700", color: "#ffffff", marginBottom: "6px" }}>
{car.name}
</h3>
<p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "18px", minHeight: "36px" }}>
{car.tagline}
</p>
{/* Spécifications badges */}
<div
style={{
display: "flex",
gap: "8px",
flexWrap: "wrap",
marginBottom: "22px",
paddingBottom: "18px",
borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
}}
>
<span style={{ fontSize: "12px", backgroundColor: "#1b202a", color: "#cbd5e1", padding: "4px 10px", borderRadius: "6px" }}>
⚙️ {car.gearbox}
</span>
<span style={{ fontSize: "12px", backgroundColor: "#1b202a", color: "#cbd5e1", padding: "4px 10px", borderRadius: "6px" }}>
⛽ {car.fuel}
</span>
<span style={{ fontSize: "12px", backgroundColor: "#1b202a", color: "#cbd5e1", padding: "4px 10px", borderRadius: "6px" }}>
👤 {car.seats} Places
</span>
</div>
{/* Prix & Bouton WhatsApp */}
<div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
<div>
<span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
Tarif journalier
</span>
<div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
<span style={{ fontSize: "22px", fontWeight: "800", color: "#d4af37" }}>
{car.pricePerDay}
</span>
<span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>
MAD / jour
</span>
</div>
</div>
<a
href={getWhatsAppLink(car.name)}
target="_blank"
rel="noopener noreferrer"
style={{
backgroundColor: "transparent",
color: "#d4af37",
border: "1px solid #d4af37",
padding: "9px 16px",
borderRadius: "8px",
fontWeight: "700",
fontSize: "13px",
textDecoration: "none",
transition: "all 0.2s ease",
}}
>
Réserver
</a>
</div>
</div>
</div>
))}
</section>
{/* Avantages & Services */}
<section
style={{
borderTop: "1px solid rgba(212, 175, 55, 0.15)",
backgroundColor: "#0d0f14",
padding: "60px 24px",
}}
>
<div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
<h2 style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc", marginBottom: "40px", letterSpacing: "1px" }}>
Pourquoi Choisir BERIK RENT ?
</h2>
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
gap: "30px",
textAlign: "left",
}}
>
<div style={{ padding: "20px", borderLeft: "2px solid #d4af37" }}>
<div style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
Livraison Immédiate
</div>
<p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
Mise à disposition express à l’Aéroport Rabat-Salé, aux gares Agdal & Ville, ou à votre hôtel.
</p>
</div>
<div style={{ padding: "20px", borderLeft: "2px solid #d4af37" }}>
<div style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
Véhicules Récents
</div>
<p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
Parc automobile entretenu rigoureusement avec assurance tous risques et assistance 24/7.
</p>
</div>
<div style={{ padding: "20px", borderLeft: "2px solid #d4af37" }}>
<div style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
Transparence Totale
</div>
<p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
Aucun frais dissimulé, tarifs dégressifs selon la durée et restitution simplifiée de caution.
</p>
</div>
</div>
</div>
</section>
{/* Pied de page */}
<footer
style={{
borderTop: "1px solid rgba(255, 255, 255, 0.05)",
padding: "24px",
textAlign: "center",
fontSize: "12px",
color: "#64748b",
}}
>
© {new Date().getFullYear()} BERIK RENT AUTO • Rabat, Maroc • Tous droits réservés.
</footer>
</main>
);
}