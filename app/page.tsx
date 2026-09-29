"use client";
import React, { useState, useEffect } from "react";
// ==========================================
// TYPES DE DONNEES
// ==========================================
interface Car {
id: string;
name: string;
category: string;
tagline: string;
pricePerDay: number;
gearbox: string;
fuel: string;
seats: number;
imageUrl: string;
available: boolean;
}
interface Rental {
id: string;
invoiceNumber: string;
carId: string;
carName: string;
clientName: string;
clientCin: string;
clientPhone: string;
startDate: string;
endDate: string;
pickupLocation: string;
days: number;
pricePerDay: number;
totalPrice: number;
paymentMethod: string;
status: "En attente" | "En cours" | "Terminée";
}
interface AgencySettings {
city: string;
whatsapp: string;
adminPin: string;
agencyAddress: string;
agencyIce: string;
}
// ==========================================
// DONNEES PAR DEFAUT
// ==========================================
const DEFAULT_SETTINGS: AgencySettings = {
city: "Salé",
whatsapp: "212600000000",
adminPin: "1234",
agencyAddress: "Avenue Mohammed V, Salé - Maroc",
agencyIce: "001234567000089",
};
const DEFAULT_CARS: Car[] = [
{
id: "clio5",
name: "Renault Clio 5",
category: "Éco Chic",
tagline: "Élégante, économique et idéale pour la ville",
pricePerDay: 280,
gearbox: "Manuelle",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
available: true,
},
{
id: "peugeot208",
name: "Peugeot 208 GT Line",
category: "Éco Chic",
tagline: "i-Cockpit 3D, toit panoramique et style sportif",
pricePerDay: 350,
gearbox: "Automatique",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
available: true,
},
{
id: "duster",
name: "Dacia Duster Prestige",
category: "SUV Confort",
tagline: "Spacieux, robuste et parfait pour les longs trajets",
pricePerDay: 400,
gearbox: "Manuelle",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
available: true,
},
{
id: "golf8",
name: "Volkswagen Golf 8 R-Line",
category: "Berline Premium",
tagline: "Finition raffinée, technologie digitale et dynamisme",
pricePerDay: 650,
gearbox: "Automatique",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
available: true,
},
{
id: "c-class",
name: "Mercedes-Benz Classe C AMG",
category: "Prestige & Affaires",
tagline: "Le luxe et le confort absolu pour vos séjours VIP",
pricePerDay: 1100,
gearbox: "Automatique",
fuel: "Diesel",
seats: 5,
imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
available: true,
},
];
export default function Home() {
// Etats principaux
const [cars, setCars] = useState<Car[]>(DEFAULT_CARS);
const [rentals, setRentals] = useState<Rental[]>([]);
const [settings, setSettings] = useState<AgencySettings>(DEFAULT_SETTINGS);
const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
// Etats du calculateur de reservation (Client)
const [bookingCar, setBookingCar] = useState<Car | null>(null);
const [clientName, setClientName] = useState<string>("");
const [clientCin, setClientCin] = useState<string>("");
const [clientPhone, setClientPhone] = useState<string>("");
const [startDate, setStartDate] = useState<string>("");
const [endDate, setEndDate] = useState<string>("");
const [pickupLocation, setPickupLocation] = useState<string>("Aéroport Rabat-Salé");
// Etats du mode Gerant (Admin)
const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
const [pinInput, setPinInput] = useState<string>("");
const [adminTab, setAdminTab] = useState<"flotte" | "locations" | "facture" | "reglages">("flotte");
// Formulaire d'ajout de voiture (Admin)
const [newCarName, setNewCarName] = useState<string>("");
const [newCarCategory, setNewCarCategory] = useState<string>("Éco Chic");
const [newCarTagline, setNewCarTagline] = useState<string>("");
const [newCarPrice, setNewCarPrice] = useState<string>("300");
const [newCarGearbox, setNewCarGearbox] = useState<string>("Automatique");
const [newCarFuel, setNewCarFuel] = useState<string>("Diesel");
const [newCarImage, setNewCarImage] = useState<string>("");
// Formulaire de creation manuelle de facture (Admin)
const [invClientName, setInvClientName] = useState<string>("");
const [invClientCin, setInvClientCin] = useState<string>("");
const [invClientPhone, setInvClientPhone] = useState<string>("");
const [invCarName, setInvCarName] = useState<string>("Renault Clio 5");
const [invStartDate, setInvStartDate] = useState<string>("");
const [invEndDate, setInvEndDate] = useState<string>("");
const [invPricePerDay, setInvPricePerDay] = useState<string>("280");
const [invPaymentMethod, setInvPaymentMethod] = useState<string>("Espèces");
// Facture selectionnee pour apercu/telechargement
const [previewInvoice, setPreviewInvoice] = useState<Rental | null>(null);
// Chargement initial + Script jsPDF pour generation PDF directe sur mobile/PC
useEffect(() => {
const savedCars = localStorage.getItem("berik_cars");
const savedRentals = localStorage.getItem("berik_rentals");
const savedSettings = localStorage.getItem("berik_settings");
if (savedCars) {
try {
setCars(JSON.parse(savedCars));
} catch (e) {
console.error(e);
}
}
if (savedRentals) {
try {
setRentals(JSON.parse(savedRentals));
} catch (e) {
console.error(e);
}
}
if (savedSettings) {
try {
setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
} catch (e) {
console.error(e);
}
}
const today = new Date();
const threeDaysLater = new Date();
threeDaysLater.setDate(today.getDate() + 3);
const tStr = today.toISOString().split("T")[0];
const eStr = threeDaysLater.toISOString().split("T")[0];
setStartDate(tStr);
setEndDate(eStr);
setInvStartDate(tStr);
setInvEndDate(eStr);
// Chargement automatique de jsPDF via CDN sans modifier package.json
if (typeof window !== "undefined" && !(window as unknown as Record<string, unknown>).jspdf) {
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
script.async = true;
document.body.appendChild(script);
}
}, []);
// Fonctions de sauvegarde
const saveCars = (updated: Car[]) => {
setCars(updated);
localStorage.setItem("berik_cars", JSON.stringify(updated));
};
const saveRentals = (updated: Rental[]) => {
setRentals(updated);
localStorage.setItem("berik_rentals", JSON.stringify(updated));
};
const saveSettings = (updated: AgencySettings) => {
setSettings(updated);
localStorage.setItem("berik_settings", JSON.stringify(updated));
};
// Calcul du nombre de jours
const calculateDaysBetween = (sDate: string, eDate: string) => {
if (!sDate || !eDate) return 1;
const start = new Date(sDate);
const end = new Date(eDate);
const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
return diff > 0 ? diff : 1;
};
const daysCount = calculateDaysBetween(startDate, endDate);
const totalBookingPrice = bookingCar ? daysCount * bookingCar.pricePerDay : 0;
// ==========================================
// GENERATEUR DE FACTURE PDF OFFICIELLE
// ==========================================
const downloadPdfInvoice = (rental: Rental) => {
const win = window as unknown as {
jspdf?: {
jsPDF: new () => {
setFillColor: (r: number, g: number, b: number) => void;
rect: (x: number, y: number, w: number, h: number, style?: string) => void;
setTextColor: (r: number, g: number, b: number) => void;
setFontSize: (size: number) => void;
setFont: (fontName: string, fontStyle?: string) => void;
text: (text: string, x: number, y: number, options?: { align?: string }) => void;
setDrawColor: (r: number, g: number, b: number) => void;
line: (x1: number, y1: number, x2: number, y2: number) => void;
save: (filename: string) => void;
};
};
};
if (win.jspdf && win.jspdf.jsPDF) {
const doc = new win.jspdf.jsPDF();
// En-tete Noir & Or Luxe
doc.setFillColor(15, 17, 25);
doc.rect(0, 0, 210, 45, "F");
doc.setTextColor(212, 175, 55);
doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.text("BERIK RENT AUTO", 15, 22);
doc.setTextColor(220, 220, 220);
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text(⁠Location de Voitures de Prestige - ${settings.city}, Maroc⁠, 15, 30);
doc.text(⁠Tel / WhatsApp : +${settings.whatsapp} | ICE : ${settings.agencyIce}⁠, 15, 36);
// Titre Facture a droite
doc.setTextColor(212, 175, 55);
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("FACTURE", 195, 22, { align: "right" });
doc.setTextColor(255, 255, 255);
doc.setFontSize(10);
doc.text(⁠N° : ${rental.invoiceNumber}⁠, 195, 30, { align: "right" });
doc.text(⁠Date : ${new Date().toLocaleDateString("fr-FR")}⁠, 195, 36, { align: "right" });
// Bloc Informations Client
doc.setFillColor(245, 245, 245);
doc.rect(15, 55, 180, 38, "F");
doc.setTextColor(20, 20, 20);
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text("FACTURE A L'ATTENTION DU CLIENT :", 20, 64);
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text(⁠Nom & Prenom : ${rental.clientName}⁠, 20, 72);
doc.text(⁠CIN / Passeport : ${rental.clientCin || "Non renseigne"}⁠, 20, 79);
doc.text(⁠Telephone : ${rental.clientPhone}⁠, 20, 86);
doc.text(⁠Lieu de livraison : ${rental.pickupLocation}⁠, 115, 72);
doc.text(⁠Mode de reglement : ${rental.paymentMethod || "Especes"}⁠, 115, 79);
doc.text(⁠Statut : ${rental.status}⁠, 115, 86);
// Tableau des prestations
doc.setFillColor(212, 175, 55);
doc.rect(15, 105, 180, 10, "F");
doc.setTextColor(0, 0, 0);
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("VEHICULE & PERIODE DE LOCATION", 20, 111.5);
doc.text("JOURS", 125, 111.5);
doc.text("PRIX / J", 150, 111.5);
doc.text("TOTAL TTC", 190, 111.5, { align: "right" });
// Ligne du vehicule
doc.setTextColor(20, 20, 20);
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text(rental.carName, 20, 125);
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.text(⁠Du ${rental.startDate} au ${rental.endDate}⁠, 20, 132);
doc.text("Assurance tous risques & assistance 24h/24 incluses", 20, 138);
doc.setFontSize(10);
doc.text(⁠${rental.days} j⁠, 125, 128);
doc.text(⁠${rental.pricePerDay} MAD⁠, 150, 128);
doc.setFont("helvetica", "bold");
doc.text(⁠${rental.totalPrice} MAD⁠, 190, 128, { align: "right" });
doc.setDrawColor(200, 200, 200);
doc.line(15, 145, 195, 145);
// Total TTC Encadre
const htPrice = Math.round(rental.totalPrice / 1.2);
const tvaPrice = rental.totalPrice - htPrice;
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text("Montant HT :", 130, 156);
doc.text(⁠${htPrice} MAD⁠, 190, 156, { align: "right" });
doc.text("TVA (20% incluse) :", 130, 163);
doc.text(⁠${tvaPrice} MAD⁠, 190, 163, { align: "right" });
doc.setFillColor(15, 17, 25);
doc.rect(125, 170, 70, 14, "F");
doc.setTextColor(212, 175, 55);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("NET A PAYER :", 130, 179);
doc.text(⁠${rental.totalPrice} MAD⁠, 190, 179, { align: "right" });
// Signatures
doc.setTextColor(60, 60, 60);
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Cachet & Signature Berik Rent :", 20, 215);
doc.text("Signature du Client (Lu et approuve) :", 120, 215);
doc.setDrawColor(180, 180, 180);
doc.rect(20, 220, 70, 30);
doc.rect(120, 220, 70, 30);
// Pied de page
doc.setFont("helvetica", "normal");
doc.setFontSize(8);
doc.setTextColor(120, 120, 120);
doc.text(
⁠Merci pour votre confiance. BERIK RENT AUTO - ${settings.agencyAddress} - Tel: +${settings.whatsapp}⁠,
105,
280,
{ align: "center" }
);
const cleanClientName = rental.clientName.replace(/[^a-zA-Z0-9]/g, "_");
doc.save(⁠Facture_BerikRent_${cleanClientName}_${rental.invoiceNumber}.pdf⁠);
} else {
// Solution de secours : impression native si jsPDF n'est pas encore charge
window.print();
}
};
// Confirmer une reservation client depuis le site
const handleConfirmBooking = (e: React.FormEvent) => {
e.preventDefault();
if (!bookingCar) return;
const invoiceNum = ⁠FAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}⁠;
const newRental: Rental = {
id: Date.now().toString(),
invoiceNumber: invoiceNum,
carId: bookingCar.id,
carName: bookingCar.name,
clientName: clientName || "Client Web",
clientCin: clientCin || "À présenter",
clientPhone: clientPhone || "Non renseigné",
startDate,
endDate,
pickupLocation,
days: daysCount,
pricePerDay: bookingCar.pricePerDay,
totalPrice: totalBookingPrice,
paymentMethod: "Espèces / À la livraison",
status: "En attente",
};
saveRentals([newRental, ...rentals]);
const message =
⁠Bonjour Berik Rent (${settings.city}),\n\n⁠ +
⁠Je souhaite réserver un véhicule :\n⁠ +
⁠📄 *Réf* : ${invoiceNum}\n⁠ +
⁠🚗 *Véhicule* : ${bookingCar.name}\n⁠ +
⁠📅 *Du* : ${startDate} *au* ${endDate} (${daysCount} jours)\n⁠ +
⁠📍 *Livraison* : ${pickupLocation}\n⁠ +
⁠💰 *Total estimé* : ${totalBookingPrice} MAD\n⁠ +
⁠👤 *Nom* : ${clientName}\n⁠ +
⁠🪪 *CIN/Passeport* : ${clientCin || "À présenter"}\n⁠ +
⁠📞 *Téléphone* : ${clientPhone}\n\n⁠ +
⁠Merci de me confirmer la disponibilité.⁠;
const waUrl = ⁠https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}⁠;
window.open(waUrl, "_blank");
setBookingCar(null);
};
// Creer une facture manuelle depuis l'Espace Gerant
const handleCreateManualInvoice = (e: React.FormEvent) => {
e.preventDefault();
if (!invClientName) return;
const dCount = calculateDaysBetween(invStartDate, invEndDate);
const pDay = Number(invPricePerDay) || 300;
const tot = dCount * pDay;
const invoiceNum = ⁠FAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}⁠;
const manualRental: Rental = {
id: Date.now().toString(),
invoiceNumber: invoiceNum,
carId: "manual",
carName: invCarName,
clientName: invClientName,
clientCin: invClientCin || "Non renseigné",
clientPhone: invClientPhone || "Non renseigné",
startDate: invStartDate,
endDate: invEndDate,
pickupLocation: ⁠Agence ${settings.city}⁠,
days: dCount,
pricePerDay: pDay,
totalPrice: tot,
paymentMethod: invPaymentMethod,
status: "En cours",
};
saveRentals([manualRental, ...rentals]);
setPreviewInvoice(manualRental);
downloadPdfInvoice(manualRental);
setInvClientName("");
setInvClientCin("");
setInvClientPhone("");
};
// Actions Admin : Flotte
const toggleCarAvailability = (id: string) => {
const updated = cars.map((c) => (c.id === id ? { ...c, available: !c.available } : c));
saveCars(updated);
};
const updateCarPrice = (id: string, newPrice: number) => {
if (isNaN(newPrice) || newPrice <= 0) return;
const updated = cars.map((c) => (c.id === id ? { ...c, pricePerDay: newPrice } : c));
saveCars(updated);
};
const deleteCar = (id: string) => {
const updated = cars.filter((c) => c.id !== id);
saveCars(updated);
};
const handleAddCar = (e: React.FormEvent) => {
e.preventDefault();
if (!newCarName) return;
const added: Car = {
id: Date.now().toString(),
name: newCarName,
category: newCarCategory,
tagline: newCarTagline || "Véhicule tout confort entretenu avec soin",
pricePerDay: Number(newCarPrice) || 300,
gearbox: newCarGearbox,
fuel: newCarFuel,
seats: 5,
imageUrl:
newCarImage ||
"https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
available: true,
};
saveCars([added, ...cars]);
setNewCarName("");
setNewCarTagline("");
setNewCarImage("");
};
// Actions Admin : Locations
const updateRentalStatus = (id: string, status: "En attente" | "En cours" | "Terminée") => {
const rental = rentals.find((r) => r.id === id);
const updatedRentals = rentals.map((r) => (r.id === id ? { ...r, status } : r));
saveRentals(updatedRentals);
if (rental) {
if (status === "En cours") {
saveCars(cars.map((c) => (c.id === rental.carId ? { ...c, available: false } : c)));
} else if (status === "Terminée") {
saveCars(cars.map((c) => (c.id === rental.carId ? { ...c, available: true } : c)));
}
}
};
const deleteRental = (id: string) => {
saveRentals(rentals.filter((r) => r.id !== id));
};
// Connexion Admin
const handleAdminLogin = (e: React.FormEvent) => {
e.preventDefault();
if (pinInput === settings.adminPin) {
setIsAuthenticated(true);
setPinInput("");
} else {
alert("Code PIN incorrect (Code par défaut : 1234)");
}
};
const categories = ["Toutes", "Éco Chic", "SUV Confort", "Berline Premium", "Prestige & Affaires"];
const filteredCars =
selectedCategory === "Toutes" ? cars : cars.filter((car) => car.category === selectedCategory);
const totalRevenue = rentals
.filter((r) => r.status === "En cours" || r.status === "Terminée")
.reduce((acc, curr) => acc + curr.totalPrice, 0);
const availableCount = cars.filter((c) => c.available).length;
return (
<div style={{ backgroundColor: "#090a0f", color: "#f3f4f6", minHeight: "100vh", fontFamily: "system-ui, sans-serif", paddingBottom: "80px" }}>
{/* BARRE DE NAVIGATION */}
<header
style={{
borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
padding: "16px 20px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
position: "sticky",
top: 0,
backgroundColor: "rgba(9, 10, 15, 0.95)",
backdropFilter: "blur(10px)",
zIndex: 40,
}}
>
<div>
<span style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "3px", color: "#d4af37" }}>
BERIK RENT
</span>
<span style={{ fontSize: "11px", color: "#9ca3af", display: "block", letterSpacing: "1.5px", textTransform: "uppercase" }}>
Luxury Cars · {settings.city}
</span>
</div>
<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
<button
onClick={() => setIsAdminOpen(!isAdminOpen)}
style={{
backgroundColor: isAdminOpen ? "#d4af37" : "#171923",
color: isAdminOpen ? "#000" : "#d4af37",
border: "1px solid #d4af37",
padding: "8px 14px",
borderRadius: "20px",
fontSize: "12px",
fontWeight: "bold",
cursor: "pointer",
}}
>
{isAdminOpen ? "✕ Fermer Gérant" : "⚙️ Espace Gérant"}
</button>
</div>
</header>
{/* ==========================================
ESPACE GERANT (TABLEAU DE BORD ADMIN)
========================================== /}
{isAdminOpen && (
<section style={{ maxWidth: "1050px", margin: "20px auto", padding: "20px", backgroundColor: "#12141d", borderRadius: "16px", border: "1px solid #d4af37" }}>
{!isAuthenticated ? (
<form onSubmit={handleAdminLogin} style={{ maxWidth: "360px", margin: "20px auto", textAlign: "center" }}>
<h2 style={{ color: "#d4af37", marginBottom: "8px", fontSize: "20px" }}>Accès Gérant Berik Rent</h2>
<p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "20px" }}>
Entrez votre code PIN pour gérer vos voitures, réservations et factures PDF (Par défaut : <b>1234</b>).
</p>
<input
type="password"
placeholder="Code PIN (1234)"
value={pinInput}
onChange={(e) => setPinInput(e.target.value)}
style={{
width: "100%",
padding: "12px",
borderRadius: "8px",
border: "1px solid #333",
backgroundColor: "#090a0f",
color: "#fff",
fontSize: "16px",
textAlign: "center",
marginBottom: "14px",
boxSizing: "border-box",
}}
/>
<button
type="submit"
style={{
width: "100%",
padding: "12px",
backgroundColor: "#d4af37",
color: "#000",
border: "none",
borderRadius: "8px",
fontWeight: "bold",
cursor: "pointer",
}}
>
Déverrouiller
</button>
</form>
) : (
<div>
{/ En-tete et statistiques */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
<h2 style={{ margin: 0, color: "#d4af37", fontSize: "20px" }}>Tableau de Bord & Facturation</h2>
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
<div style={{ backgroundColor: "#1a1d29", padding: "8px 14px", borderRadius: "10px", fontSize: "12px" }}>
🚗 Dispo : <b style={{ color: "#22c55e" }}>{availableCount}/{cars.length}</b>
</div>
<div style={{ backgroundColor: "#1a1d29", padding: "8px 14px", borderRadius: "10px", fontSize: "12px" }}>
📋 Dossiers : <b style={{ color: "#d4af37" }}>{rentals.length}</b>
</div>
<div style={{ backgroundColor: "#1a1d29", padding: "8px 14px", borderRadius: "10px", fontSize: "12px" }}>
💰 CA : <b style={{ color: "#d4af37" }}>{totalRevenue} MAD</b>
</div>
</div>
</div>
{/* Onglets Admin */}
<div style={{ display: "flex", gap: "8px", marginBottom: "20px", borderBottom: "1px solid #262936", paddingBottom: "12px", overflowX: "auto" }}>
<button
onClick={() => setAdminTab("flotte")}
style={{
padding: "10px 14px",
borderRadius: "8px",
border: "none",
backgroundColor: adminTab === "flotte" ? "#d4af37" : "#1f2230",
color: adminTab === "flotte" ? "#000" : "#fff",
fontWeight: "bold",
fontSize: "12px",
cursor: "pointer",
whiteSpace: "nowrap",
}}
>
🚘 Voitures ({cars.length})
</button>
<button
onClick={() => setAdminTab("locations")}
style={{
padding: "10px 14px",
borderRadius: "8px",
border: "none",
backgroundColor: adminTab === "locations" ? "#d4af37" : "#1f2230",
color: adminTab === "locations" ? "#000" : "#fff",
fontWeight: "bold",
fontSize: "12px",
cursor: "pointer",
whiteSpace: "nowrap",
}}
>
📅 Locations & Factures ({rentals.length})
</button>
<button
onClick={() => setAdminTab("facture")}
style={{
padding: "10px 14px",
borderRadius: "8px",
border: "none",
backgroundColor: adminTab === "facture" ? "#d4af37" : "#1f2230",
color: adminTab === "facture" ? "#000" : "#fff",
fontWeight: "bold",
fontSize: "12px",
cursor: "pointer",
whiteSpace: "nowrap",
}}
>
📄 Créer Facture PDF Client
</button>
<button
onClick={() => setAdminTab("reglages")}
style={{
padding: "10px 14px",
borderRadius: "8px",
border: "none",
backgroundColor: adminTab === "reglages" ? "#d4af37" : "#1f2230",
color: adminTab === "reglages" ? "#000" : "#fff",
fontWeight: "bold",
fontSize: "12px",
cursor: "pointer",
whiteSpace: "nowrap",
}}
>
⚙️ Agence & Ville
</button>
</div>
{/* ONGLET 1 : GESTION DE LA FLOTTE */}
{adminTab === "flotte" && (
<div>
<form
onSubmit={handleAddCar}
style={{
backgroundColor: "#181b26",
padding: "16px",
borderRadius: "12px",
marginBottom: "20px",
border: "1px solid #2a2e3f",
}}
>
<h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "15px", color: "#d4af37" }}>
+ Ajouter une nouvelle voiture
</h3>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
<input
type="text"
placeholder="Modèle (ex: Range Rover)"
value={newCarName}
onChange={(e) => setNewCarName(e.target.value)}
required
style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff" }}
/>
<select
value={newCarCategory}
onChange={(e) => setNewCarCategory(e.target.value)}
style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff" }}
>
<option value="Éco Chic">Éco Chic</option>
<option value="SUV Confort">SUV Confort</option>
<option value="Berline Premium">Berline Premium</option>
<option value="Prestige & Affaires">Prestige & Affaires</option>
</select>
<input
type="number"
placeholder="Prix/jour (MAD)"
value={newCarPrice}
onChange={(e) => setNewCarPrice(e.target.value)}
required
style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff" }}
/>
<select
value={newCarGearbox}
onChange={(e) => setNewCarGearbox(e.target.value)}
style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff" }}
>
<option value="Automatique">Automatique</option>
<option value="Manuelle">Manuelle</option>
</select>
<input
type="url"
placeholder="Lien photo (https://...)"
value={newCarImage}
onChange={(e) => setNewCarImage(e.target.value)}
style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff" }}
/>
<button
type="submit"
style={{
backgroundColor: "#d4af37",
color: "#000",
fontWeight: "bold",
border: "none",
borderRadius: "6px",
padding: "10px",
cursor: "pointer",
}}
>
Ajouter
</button>
</div>
</form>
<div style={{ display: "grid", gap: "10px" }}>
{cars.map((car) => (
<div
key={car.id}
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexWrap: "wrap",
gap: "10px",
backgroundColor: "#181b26",
padding: "12px 16px",
borderRadius: "10px",
border: "1px solid #262936",
}}
>
<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
<img
src={car.imageUrl}
alt={car.name}
style={{ width: "56px", height: "40px", objectFit: "cover", borderRadius: "6px" }}
/>
<div>
<div style={{ fontWeight: "bold", fontSize: "14px" }}>{car.name}</div>
<div style={{ fontSize: "11px", color: "#9ca3af" }}>
{car.category} · {car.gearbox}
</div>
</div>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
<input
type="number"
value={car.pricePerDay}
onChange={(e) => updateCarPrice(car.id, Number(e.target.value))}
style={{
width: "70px",
padding: "6px",
borderRadius: "6px",
border: "1px solid #444",
backgroundColor: "#090a0f",
color: "#d4af37",
fontWeight: "bold",
textAlign: "center",
}}
/>
<button
onClick={() => toggleCarAvailability(car.id)}
style={{
padding: "6px 12px",
borderRadius: "6px",
border: "none",
backgroundColor: car.available ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
color: car.available ? "#4ade80" : "#f87171",
fontWeight: "bold",
fontSize: "11px",
cursor: "pointer",
}}
>
{car.available ? "🟢 Dispo" : "🔴 Louée"}
</button>
<button
onClick={() => deleteCar(car.id)}
style={{
padding: "6px 10px",
borderRadius: "6px",
border: "1px solid #ef4444",
backgroundColor: "transparent",
color: "#ef4444",
fontSize: "11px",
cursor: "pointer",
}}
>
✕
</button>
</div>
</div>
))}
</div>
</div>
)}
{/* ONGLET 2 : SUIVI DES LOCATIONS & TELECHARGEMENT FACTURES */}
{adminTab === "locations" && (
<div>
{rentals.length === 0 ? (
<div style={{ textAlign: "center", padding: "30px", color: "#9ca3af" }}>
<p>Aucune réservation enregistrée pour le moment.</p>
<button
onClick={() => setAdminTab("facture")}
style={{
backgroundColor: "#d4af37",
color: "#000",
border: "none",
padding: "10px 18px",
borderRadius: "8px",
fontWeight: "bold",
cursor: "pointer",
}}
>
+ Créer une Facture PDF maintenant
</button>
</div>
) : (
<div style={{ display: "grid", gap: "12px" }}>
{rentals.map((rental) => (
<div
key={rental.id}
style={{
backgroundColor: "#181b26",
padding: "16px",
borderRadius: "10px",
border: "1px solid #2a2e3f",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexWrap: "wrap",
gap: "12px",
}}
>
<div>
<div style={{ fontSize: "11px", color: "#9ca3af" }}>Réf : {rental.invoiceNumber}</div>
<div style={{ fontSize: "16px", fontWeight: "bold", color: "#d4af37" }}>
{rental.carName} — {rental.totalPrice} MAD ({rental.days} j)
</div>
<div style={{ fontSize: "13px", color: "#e5e7eb", marginTop: "4px" }}>
👤 Client : <b>{rental.clientName}</b> · CIN : {rental.clientCin} · 📞 {rental.clientPhone}
</div>
<div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
📅 Du <b>{rental.startDate}</b> au <b>{rental.endDate}</b>
</div>
</div>
<div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
{/* BOUTON GENERER FACTURE PDF */}
<button
onClick={() => {
setPreviewInvoice(rental);
downloadPdfInvoice(rental);
}}
style={{
padding: "8px 14px",
borderRadius: "6px",
backgroundColor: "#d4af37",
color: "#000",
border: "none",
fontWeight: "bold",
fontSize: "12px",
cursor: "pointer",
}}
>
📄 Facture PDF
</button>
<select
value={rental.status}
onChange={(e) =>
updateRentalStatus(
rental.id,
e.target.value as "En attente" | "En cours" | "Terminée"
)
}
style={{
padding: "8px 10px",
borderRadius: "6px",
backgroundColor: "#090a0f",
color: "#fff",
border: "1px solid #444",
fontSize: "12px",
}}
>
<option value="En attente">⏳ En attente</option>
<option value="En cours">🚗 En cours</option>
<option value="Terminée">✅ Terminée</option>
</select>
<button
onClick={() => deleteRental(rental.id)}
style={{
padding: "8px 10px",
borderRadius: "6px",
border: "1px solid #ef4444",
backgroundColor: "transparent",
color: "#ef4444",
fontSize: "12px",
cursor: "pointer",
}}
>
✕
</button>
</div>
</div>
))}
</div>
)}
</div>
)}
{/* ONGLET 3 : CREER UNE FACTURE PDF AU NOM DU CLIENT */}
{adminTab === "facture" && (
<form
onSubmit={handleCreateManualInvoice}
style={{
backgroundColor: "#181b26",
padding: "20px",
borderRadius: "12px",
border: "1px solid #2a2e3f",
maxWidth: "650px",
}}
>
<h3 style={{ marginTop: 0, color: "#d4af37", fontSize: "18px", marginBottom: "6px" }}>
📄 Générer une Facture PDF au nom du client
</h3>
<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: 0, marginBottom: "18px" }}>
Remplissez les informations ci-dessous pour télécharger immédiatement la facture officielle en PDF avec le nom du client, le détail du véhicule et le montant TTC.
</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "16px" }}>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Nom & Prénom du Client *
</label>
<input
type="text"
required
placeholder="Ex: Youssef El Amrani"
value={invClientName}
onChange={(e) => setInvClientName(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
N° CIN ou Passeport
</label>
<input
type="text"
placeholder="Ex: AB123456"
value={invClientCin}
onChange={(e) => setInvClientCin(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Téléphone du Client
</label>
<input
type="tel"
placeholder="Ex: 06 61 23 45 67"
value={invClientPhone}
onChange={(e) => setInvClientPhone(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Véhicule loué
</label>
<select
value={invCarName}
onChange={(e) => {
setInvCarName(e.target.value);
const found = cars.find((c) => c.name === e.target.value);
if (found) setInvPricePerDay(found.pricePerDay.toString());
}}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
>
{cars.map((c) => (
<option key={c.id} value={c.name}>
{c.name} ({c.pricePerDay} MAD/j)
</option>
))}
</select>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Date de début
</label>
<input
type="date"
required
value={invStartDate}
onChange={(e) => setInvStartDate(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Date de retour
</label>
<input
type="date"
required
value={invEndDate}
onChange={(e) => setInvEndDate(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Prix par jour appliqué (MAD)
</label>
<input
type="number"
required
value={invPricePerDay}
onChange={(e) => setInvPricePerDay(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#ccc", marginBottom: "4px" }}>
Mode de paiement
</label>
<select
value={invPaymentMethod}
onChange={(e) => setInvPaymentMethod(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
>
<option value="Espèces">Espèces</option>
<option value="Carte Bancaire">Carte Bancaire</option>
<option value="Virement">Virement</option>
<option value="Chèque">Chèque</option>
</select>
</div>
</div>
<div style={{ backgroundColor: "#090a0f", padding: "14px", borderRadius: "8px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(212,175,55,0.3)" }}>
<span style={{ fontSize: "13px", color: "#9ca3af" }}>
Durée : <b>{calculateDaysBetween(invStartDate, invEndDate)} jour(s)</b>
</span>
<span style={{ fontSize: "18px", fontWeight: "bold", color: "#d4af37" }}>
Total TTC : {calculateDaysBetween(invStartDate, invEndDate) * (Number(invPricePerDay) || 0)} MAD
</span>
</div>
<button
type="submit"
style={{
width: "100%",
padding: "14px",
backgroundColor: "#d4af37",
color: "#000",
fontWeight: "900",
border: "none",
borderRadius: "8px",
fontSize: "14px",
cursor: "pointer",
}}
>
📥 Générer & Télécharger la Facture PDF
</button>
</form>
)}
{/* ONGLET 4 : REGLAGES DE L'AGENCE */}
{adminTab === "reglages" && (
<div style={{ maxWidth: "500px", backgroundColor: "#181b26", padding: "20px", borderRadius: "12px" }}>
<h3 style={{ marginTop: 0, color: "#d4af37", fontSize: "16px" }}>Paramètres de l'agence & Facturation</h3>
<div style={{ display: "grid", gap: "12px" }}>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
Ville de l'agence :
</label>
<input
type="text"
value={settings.city}
onChange={(e) => saveSettings({ ...settings, city: e.target.value })}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
Adresse affichée sur la facture PDF :
</label>
<input
type="text"
value={settings.agencyAddress}
onChange={(e) => saveSettings({ ...settings, agencyAddress: e.target.value })}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
Numéro ICE / RC (affiché sur la facture) :
</label>
<input
type="text"
value={settings.agencyIce}
onChange={(e) => saveSettings({ ...settings, agencyIce: e.target.value })}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
Numéro WhatsApp (avec 212, sans +) :
</label>
<input
type="text"
value={settings.whatsapp}
onChange={(e) => saveSettings({ ...settings, whatsapp: e.target.value })}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
Code PIN Gérant :
</label>
<input
type="text"
value={settings.adminPin}
onChange={(e) => saveSettings({ ...settings, adminPin: e.target.value })}
style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
</div>
</div>
)}
</div>
)}
</section>
)}
{/* ==========================================
APERÇU DE FACTURE A L'ECRAN
========================================== */}
{previewInvoice && (
<div
style={{
position: "fixed",
inset: 0,
backgroundColor: "rgba(0,0,0,0.85)",
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "16px",
zIndex: 150,
}}
>
<div
style={{
backgroundColor: "#ffffff",
color: "#111827",
borderRadius: "12px",
maxWidth: "520px",
width: "100%",
padding: "24px",
maxHeight: "90vh",
overflowY: "auto",
}}
>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #d4af37", paddingBottom: "14px", marginBottom: "16px" }}>
<div>
<h3 style={{ margin: 0, fontSize: "20px", fontWeight: "900", color: "#090a0f" }}>BERIK RENT AUTO</h3>
<p style={{ margin: "2px 0 0", fontSize: "11px", color: "#4b5563" }}>{settings.agencyAddress}</p>
<p style={{ margin: "2px 0 0", fontSize: "11px", color: "#4b5563" }}>Tél : +{settings.whatsapp} | ICE : {settings.agencyIce}</p>
</div>
<div style={{ textAlign: "right" }}>
<span style={{ backgroundColor: "#d4af37", color: "#000", fontWeight: "bold", fontSize: "11px", padding: "4px 8px", borderRadius: "4px" }}>
FACTURE OFFICIELLE
</span>
<p style={{ margin: "6px 0 0", fontSize: "12px", fontWeight: "bold" }}>{previewInvoice.invoiceNumber}</p>
</div>
</div>
<div style={{ backgroundColor: "#f3f4f6", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
<div><b>Client :</b> {previewInvoice.clientName}</div>
<div><b>CIN / Passeport :</b> {previewInvoice.clientCin}</div>
<div><b>Téléphone :</b> {previewInvoice.clientPhone}</div>
</div>
<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "16px" }}>
<thead>
<tr style={{ backgroundColor: "#111827", color: "#d4af37", textAlign: "left" }}>
<th style={{ padding: "8px" }}>Véhicule & Période</th>
<th style={{ padding: "8px" }}>Jours</th>
<th style={{ padding: "8px", textAlign: "right" }}>Total TTC</th>
</tr>
</thead>
<tbody>
<tr style={{ borderBottom: "1px solid #e5e7eb" }}>
<td style={{ padding: "10px 8px" }}>
<b>{previewInvoice.carName}</b>
<div style={{ fontSize: "11px", color: "#6b7280" }}>
Du {previewInvoice.startDate} au {previewInvoice.endDate}
</div>
</td>
<td style={{ padding: "10px 8px" }}>{previewInvoice.days} j</td>
<td style={{ padding: "10px 8px", textAlign: "right", fontWeight: "bold" }}>
{previewInvoice.totalPrice} MAD
</td>
</tr>
</tbody>
</table>
<div style={{ display: "flex", gap: "10px" }}>
<button
onClick={() => downloadPdfInvoice(previewInvoice)}
style={{
flex: 2,
padding: "12px",
backgroundColor: "#d4af37",
color: "#000",
border: "none",
borderRadius: "8px",
fontWeight: "bold",
cursor: "pointer",
}}
>
📥 Télécharger le fichier PDF
</button>
<button
onClick={() => setPreviewInvoice(null)}
style={{
flex: 1,
padding: "12px",
backgroundColor: "#1f2937",
color: "#fff",
border: "none",
borderRadius: "8px",
cursor: "pointer",
}}
>
Fermer
</button>
</div>
</div>
</div>
)}
{/* BANNIERE D'ACCUEIL LUXURY */}
<section style={{ textAlign: "center", padding: "60px 20px 40px", borderBottom: "1px solid #181a24" }}>
<div
style={{
display: "inline-block",
padding: "6px 14px",
borderRadius: "20px",
border: "1px solid rgba(212, 175, 55, 0.4)",
color: "#d4af37",
fontSize: "11px",
letterSpacing: "2px",
textTransform: "uppercase",
marginBottom: "14px",
}}
>
Service Conciergerie & Location VIP
</div>
<h1 style={{ fontSize: "clamp(26px, 5vw, 44px)", fontWeight: "900", margin: "0 0 14px", color: "#ffffff" }}>
Louez l'Excellence à <span style={{ color: "#d4af37" }}>{settings.city}</span>
</h1>
<p style={{ color: "#9ca3af", maxWidth: "600px", margin: "0 auto 24px", fontSize: "14px", lineHeight: "1.6" }}>
Sélectionnez votre véhicule, choisissez vos dates de location et recevez votre voiture directement à l'aéroport, en gare ou à votre domicile.
</p>
</section>
{/* FILTRES DE CATEGORIES */}
<div style={{ maxWidth: "1050px", margin: "24px auto 10px", padding: "0 20px", display: "flex", gap: "8px", overflowX: "auto" }}>
{categories.map((cat) => (
<button
key={cat}
onClick={() => setSelectedCategory(cat)}
style={{
padding: "8px 16px",
borderRadius: "24px",
border: selectedCategory === cat ? "1px solid #d4af37" : "1px solid #262936",
backgroundColor: selectedCategory === cat ? "#d4af37" : "#12141d",
color: selectedCategory === cat ? "#000" : "#e5e7eb",
cursor: "pointer",
fontSize: "12px",
fontWeight: "bold",
whiteSpace: "nowrap",
}}
>
{cat}
</button>
))}
</div>
{/* CATALOGUE DES VOITURES */}
<main
style={{
maxWidth: "1050px",
margin: "0 auto",
padding: "20px",
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
gap: "22px",
}}
>
{filteredCars.map((car) => (
<div
key={car.id}
style={{
backgroundColor: "#12141d",
borderRadius: "14px",
border: car.available ? "1px solid rgba(212, 175, 55, 0.25)" : "1px solid #262936",
overflow: "hidden",
display: "flex",
flexDirection: "column",
opacity: car.available ? 1 : 0.75,
}}
>
<div style={{ height: "190px", position: "relative", overflow: "hidden" }}>
<img src={car.imageUrl} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
<span
style={{
position: "absolute",
top: "12px",
right: "12px",
padding: "5px 12px",
borderRadius: "20px",
fontSize: "11px",
fontWeight: "bold",
backgroundColor: car.available ? "rgba(22, 163, 74, 0.95)" : "rgba(220, 38, 38, 0.95)",
color: "#fff",
}}
>
{car.available ? "✓ Disponible" : "Louée"}
</span>
</div>
<div style={{ padding: "18px", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
<div>
<span style={{ fontSize: "11px", color: "#d4af37", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
{car.category}
</span>
<h3 style={{ margin: "6px 0", fontSize: "18px", color: "#ffffff" }}>{car.name}</h3>
<p style={{ margin: "0 0 14px", fontSize: "12px", color: "#9ca3af" }}>{car.tagline}</p>
<div style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#cbd5e1", marginBottom: "16px", flexWrap: "wrap" }}>
<span style={{ backgroundColor: "#1a1d29", padding: "4px 8px", borderRadius: "6px" }}>⚙️ {car.gearbox}</span>
<span style={{ backgroundColor: "#1a1d29", padding: "4px 8px", borderRadius: "6px" }}>⛽ {car.fuel}</span>
<span style={{ backgroundColor: "#1a1d29", padding: "4px 8px", borderRadius: "6px" }}>👥 {car.seats} pl.</span>
</div>
</div>
<div style={{ borderTop: "1px solid #1f2230", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div>
<span style={{ fontSize: "20px", fontWeight: "900", color: "#d4af37" }}>{car.pricePerDay}</span>
<span style={{ fontSize: "12px", color: "#9ca3af" }}> MAD / jour</span>
</div>
<button
onClick={() => car.available && setBookingCar(car)}
disabled={!car.available}
style={{
backgroundColor: car.available ? "#d4af37" : "#262936",
color: car.available ? "#000" : "#6b7280",
padding: "9px 16px",
borderRadius: "8px",
border: "none",
fontWeight: "bold",
fontSize: "12px",
cursor: car.available ? "pointer" : "not-allowed",
}}
>
{car.available ? "Réserver" : "Indisponible"}
</button>
</div>
</div>
</div>
))}
</main>
{/* BOUTON FLOTTANT GERANT EN BAS A DROITE (MOBILE) */}
<button
onClick={() => setIsAdminOpen(true)}
style={{
position: "fixed",
bottom: "20px",
right: "20px",
backgroundColor: "#d4af37",
color: "#000",
border: "2px solid #090a0f",
padding: "12px 18px",
borderRadius: "30px",
fontWeight: "900",
fontSize: "13px",
boxShadow: "0 4px 16px rgba(0,0,0,0.7)",
cursor: "pointer",
zIndex: 50,
}}
>
⚙️ Gérant & Factures PDF
</button>
{/* FENETRE DE RESERVATION CLIENT */}
{bookingCar && (
<div
style={{
position: "fixed",
inset: 0,
backgroundColor: "rgba(0, 0, 0, 0.85)",
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "16px",
zIndex: 100,
}}
>
<div
style={{
backgroundColor: "#12141d",
border: "1px solid #d4af37",
borderRadius: "16px",
maxWidth: "440px",
width: "100%",
padding: "22px",
maxHeight: "90vh",
overflowY: "auto",
}}
>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
<h3 style={{ margin: 0, color: "#d4af37", fontSize: "18px" }}>Réserver {bookingCar.name}</h3>
<button
onClick={() => setBookingCar(null)}
style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "18px", cursor: "pointer" }}
>
✕
</button>
</div>
<form onSubmit={handleConfirmBooking} style={{ display: "grid", gap: "12px" }}>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Votre Nom complet *</label>
<input
type="text"
required
placeholder="Ex: Karim Bennani"
value={clientName}
onChange={(e) => setClientName(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Téléphone *</label>
<input
type="tel"
required
placeholder="06 61 00 00 00"
value={clientPhone}
onChange={(e) => setClientPhone(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>N° CIN / Passeport</label>
<input
type="text"
placeholder="Ex: AB123456"
value={clientCin}
onChange={(e) => setClientCin(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
</div>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Date de départ</label>
<input
type="date"
required
value={startDate}
onChange={(e) => setStartDate(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Date de retour</label>
<input
type="date"
required
value={endDate}
onChange={(e) => setEndDate(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
/>
</div>
</div>
<div>
<label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Lieu de livraison</label>
<select
value={pickupLocation}
onChange={(e) => setPickupLocation(e.target.value)}
style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#090a0f", color: "#fff", boxSizing: "border-box" }}
>
<option value={⁠Agence Berik Rent (${settings.city})⁠}>Agence Berik Rent ({settings.city})</option>
<option value="Aéroport Rabat-Salé">Aéroport Rabat-Salé</option>
<option value="Gare Ferroviaire">Gare Ferroviaire</option>
<option value="Livraison à domicile / Hôtel">Livraison à domicile / Hôtel</option>
</select>
</div>
<div style={{ backgroundColor: "#1a1d29", padding: "12px", borderRadius: "10px", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
<span>Durée :</span>
<b>{daysCount} jour(s)</b>
</div>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "#d4af37", fontWeight: "bold" }}>
<span>Total estimé :</span>
<span>{totalBookingPrice} MAD</span>
</div>
</div>
<button
type="submit"
style={{
width: "100%",
padding: "13px",
backgroundColor: "#25D366",
color: "#fff",
fontWeight: "bold",
border: "none",
borderRadius: "8px",
fontSize: "14px",
cursor: "pointer",
}}
>
Confirmer & Envoyer sur WhatsApp
</button>
</form>
</div>
</div>
)}
{/* PIED DE PAGE */}
<footer style={{ borderTop: "1px solid #181a24", padding: "35px 20px", textAlign: "center", color: "#6b7280", fontSize: "12px", marginTop: "40px" }}>
<p style={{ margin: "0 0 6px", color: "#d4af37", fontWeight: "bold" }}>BERIK RENT AUTO · {settings.city.toUpperCase()}</p>
<p style={{ margin: 0 }}>{settings.agencyAddress}</p>
</footer>
</div>
);
}