"use client";

import React, { useState, useEffect } from "react";

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

interface Booking {
  id: string;
  invoiceNumber: string;
  carName: string;
  pricePerDay: number;
  clientName: string;
  clientCin: string;
  clientPhone: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
  status: "En attente" | "En cours" | "Terminee";
}

const DEFAULT_CARS: Car[] = [
  {
    id: "clio5",
    name: "Renault Clio 5",
    category: "Eco Chic",
    tagline: "Elegante et ideale pour la ville",
    pricePerDay: 280,
    gearbox: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: "duster",
    name: "Dacia Duster Prestige",
    category: "SUV Confort",
    tagline: "Spacieux, haut sur route et polyvalent",
    pricePerDay: 400,
    gearbox: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: "golf8",
    name: "Volkswagen Golf 8",
    category: "Berline Premium",
    tagline: "Finition raffinee, technologie et dynamisme",
    pricePerDay: 600,
    gearbox: "Automatique",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: "c-class",
    name: "Mercedes-Benz Classe C",
    category: "Prestige & Affaires",
    tagline: "Le luxe et le confort absolu pour vos sejours",
    pricePerDay: 1100,
    gearbox: "Automatique",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
];

export default function Home() {
  const [city, setCity] = useState<string>("Sale");
  const [phoneNumber, setPhoneNumber] = useState<string>("212600000000");
  const [cars, setCars] = useState<Car[]>(DEFAULT_CARS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");

  // Espace Gerant (Admin)
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [adminTab, setAdminTab] = useState<"cars" | "bookings" | "invoice" | "settings">("cars");

  // Formulaire ajout voiture
  const [newCarName, setNewCarName] = useState<string>("");
  const [newCarCategory, setNewCarCategory] = useState<string>("Eco Chic");
  const [newCarPrice, setNewCarPrice] = useState<string>("300");
  const [newCarGearbox, setNewCarGearbox] = useState<string>("Manuelle");
  const [newCarFuel, setNewCarFuel] = useState<string>("Diesel");
  const [newCarImage, setNewCarImage] = useState<string>("");

  // Modal Reservation Client
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const [clientCin, setClientCin] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Formulaire Facture PDF Directe (dans Admin)
  const [invClientName, setInvClientName] = useState<string>("");
  const [invClientCin, setInvClientCin] = useState<string>("");
  const [invClientPhone, setInvClientPhone] = useState<string>("");
  const [invCarName, setInvCarName] = useState<string>("Renault Clio 5");
  const [invPricePerDay, setInvPricePerDay] = useState<string>("280");
  const [invDays, setInvDays] = useState<string>("3");
  const [invStartDate, setInvStartDate] = useState<string>("2025-05-01");
  const [invEndDate, setInvEndDate] = useState<string>("2025-05-04");

  useEffect(() => {
    const savedCars = localStorage.getItem("berik_cars");
    const savedBookings = localStorage.getItem("berik_bookings");
    const savedCity = localStorage.getItem("berik_city");
    const savedPhone = localStorage.getItem("berik_phone");

    if (savedCars) setCars(JSON.parse(savedCars));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedCity) setCity(savedCity);
    if (savedPhone) setPhoneNumber(savedPhone);
  }, []);

  const saveCars = (updated: Car[]) => {
    setCars(updated);
    localStorage.setItem("berik_cars", JSON.stringify(updated));
  };

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem("berik_bookings", JSON.stringify(updated));
  };

  const saveSettings = (newCity: string, newPhone: string) => {
    setCity(newCity);
    setPhoneNumber(newPhone);
    localStorage.setItem("berik_city", newCity);
    localStorage.setItem("berik_phone", newPhone);
  };

  const categories = ["Toutes", "Eco Chic", "SUV Confort", "Berline Premium", "Prestige & Affaires"];

  const filteredCars =
    selectedCategory === "Toutes"
      ? cars
      : cars.filter((car) => car.category === selectedCategory);

  const handleAdminLogin = () => {
    if (pinInput === "1234") {
      setIsAuthenticated(true);
      setPinInput("");
    } else {
      alert("Code PIN incorrect (Code par defaut : 1234)");
    }
  };

  const toggleCarAvailability = (id: string) => {
    const updated = cars.map((c) => (c.id === id ? { ...c, available: !c.available } : c));
    saveCars(updated);
  };

  const updateCarPrice = (id: string, price: number) => {
    const updated = cars.map((c) => (c.id === id ? { ...c, pricePerDay: price } : c));
    saveCars(updated);
  };

  const deleteCar = (id: string) => {
    const updated = cars.filter((c) => c.id !== id);
    saveCars(updated);
  };

  const handleAddCar = () => {
    if (!newCarName) return;
    const newCar: Car = {
      id: Date.now().toString(),
      name: newCarName,
      category: newCarCategory,
      tagline: "Vehicule tout confort disponible immediatement",
      pricePerDay: Number(newCarPrice) || 300,
      gearbox: newCarGearbox,
      fuel: newCarFuel,
      seats: 5,
      imageUrl:
        newCarImage ||
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      available: true,
    };
    saveCars([newCar, ...cars]);
    setNewCarName("");
    setNewCarImage("");
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    const diff = Math.ceil((e - s) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  const confirmBooking = () => {
    if (!bookingCar || !clientName || !clientPhone) {
      alert("Veuillez remplir votre nom et telephone.");
      return;
    }
    const days = calculateDays();
    const total = days * bookingCar.pricePerDay;
    const invNum = "BR-" + Math.floor(1000 + Math.random() * 9000);

    const newBooking: Booking = {
      id: Date.now().toString(),
      invoiceNumber: invNum,
      carName: bookingCar.name,
      pricePerDay: bookingCar.pricePerDay,
      clientName: clientName,
      clientCin: clientCin || "Non renseigne",
      clientPhone: clientPhone,
      startDate: startDate || "Aujourd'hui",
      endDate: endDate || "A definir",
      days: days,
      totalPrice: total,
      status: "En attente",
    };

    saveBookings([newBooking, ...bookings]);

    const msg =
      "Bonjour Berik Rent, je souhaite reserver :\n" +
      "- Vehicule : " + bookingCar.name + "\n" +
      "- Ville : " + city + "\n" +
      "- Du : " + newBooking.startDate + " au " + newBooking.endDate + " (" + days + " jours)\n" +
      "- Total estime : " + total + " MAD\n" +
      "- Client : " + clientName + " (" + clientPhone + ")";

    window.open("https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(msg), "_blank");
    setBookingCar(null);
    setClientName("");
    setClientCin("");
    setClientPhone("");
  };

  const updateBookingStatus = (id: string, status: "En attente" | "En cours" | "Terminee") => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: status } : b));
    saveBookings(updated);
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
  };

  // Generateur de Facture PDF via jsPDF (charge automatiquement)
  const downloadInvoicePDF = (booking: Booking) => {
    const generate = (jsPDFConstructor: any) => {
      const doc = new jsPDFConstructor();

      // Bandeau En-tete Noir & Or
      doc.setFillColor(15, 15, 15);
      doc.rect(0, 0, 210, 42, "F");

      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("BERIK RENT AUTO", 15, 20);

      doc.setTextColor(230, 230, 230);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Location de Voitures de Prestige - " + city + ", Maroc", 15, 28);
      doc.text("Tel / WhatsApp : +" + phoneNumber, 15, 34);

      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("FACTURE", 160, 20);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("N° : " + booking.invoiceNumber, 160, 28);
      doc.text("Date : " + new Date().toLocaleDateString("fr-FR"), 160, 34);

      // Bloc Informations Client
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("FACTURE AU NOM DE :", 15, 58);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Nom du Client : " + booking.clientName, 15, 66);
      doc.text("CIN / Passeport : " + (booking.clientCin || "-"), 15, 73);
      doc.text("Telephone : " + booking.clientPhone, 15, 80);

      // Tableau Details de la Location
      doc.setFillColor(212, 175, 55);
      doc.rect(15, 92, 180, 10, "F");
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Vehicule Loue", 20, 98.5);
      doc.text("Periode", 85, 98.5);
      doc.text("Jours", 135, 98.5);
      doc.text("Prix/J", 155, 98.5);
      doc.text("Total TTC", 175, 98.5);

      doc.setFillColor(245, 245, 245);
      doc.rect(15, 102, 180, 14, "F");
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "normal");
      doc.text(booking.carName, 20, 110.5);
      doc.text(booking.startDate + " > " + booking.endDate, 85, 110.5);
      doc.text(String(booking.days), 138, 110.5);
      doc.text(booking.pricePerDay + " DH", 155, 110.5);
      doc.setFont("helvetica", "bold");
      doc.text(booking.totalPrice + " MAD", 173, 110.5);

      // Calculs HT / TVA / TTC
      const ht = Math.round(booking.totalPrice / 1.2);
      const tva = booking.totalPrice - ht;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Montant Hors Taxes (HT) : " + ht + " MAD", 125, 132);
      doc.text("TVA (20%) : " + tva + " MAD", 125, 139);

      doc.setFillColor(15, 15, 15);
      doc.rect(120, 145, 75, 12, "F");
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("NET A PAYER : " + booking.totalPrice + " MAD", 125, 153);

      // Signatures
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Cachet et Signature Agence :", 20, 185);
      doc.text("Signature du Client :", 130, 185);

      doc.setDrawColor(180, 180, 180);
      doc.rect(20, 190, 65, 30);
      doc.rect(130, 190, 65, 30);

      // Pied de page
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("Merci de votre confiance - BERIK RENT AUTO " + city + " - Location de Voitures.", 105, 275, { align: "center" });

      const cleanName = booking.clientName.replace(/\s+/g, "_");
      doc.save("Facture_BerikRent_" + cleanName + ".pdf");
    };

    const win = window as any;
    if (win.jspdf && win.jspdf.jsPDF) {
      generate(win.jspdf.jsPDF);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => {
        if (win.jspdf && win.jspdf.jsPDF) {
          generate(win.jspdf.jsPDF);
        }
      };
      document.body.appendChild(script);
    }
  };

  const handleDirectInvoice = () => {
    if (!invClientName) {
      alert("Veuillez entrer le nom du client.");
      return;
    }
    const daysNum = Number(invDays) || 1;
    const priceNum = Number(invPricePerDay) || 300;
    const customBooking: Booking = {
      id: Date.now().toString(),
      invoiceNumber: "BR-" + Math.floor(1000 + Math.random() * 9000),
      carName: invCarName,
      pricePerDay: priceNum,
      clientName: invClientName,
      clientCin: invClientCin || "-",
      clientPhone: invClientPhone || "-",
      startDate: invStartDate,
      endDate: invEndDate,
      days: daysNum,
      totalPrice: daysNum * priceNum,
      status: "En cours",
    };
    saveBookings([customBooking, ...bookings]);
    downloadInvoicePDF(customBooking);
  };

  const totalRevenue = bookings
    .filter((b) => b.status === "En cours" || b.status === "Terminee")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div style={{ backgroundColor: "#0b0b0b", color: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "80px" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #262626", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "#0b0b0b", zIndex: 40 }}>
        <div>
          <span style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "2px", color: "#d4af37" }}>BERIK RENT</span>
          <span style={{ fontSize: "10px", color: "#a3a3a3", display: "block", letterSpacing: "1px" }}>LUXURY CARS · {city.toUpperCase()}</span>
        </div>
        <button
          onClick={() => setIsAdminOpen(true)}
          style={{
            backgroundColor: "#1f1f1f",
            color: "#d4af37",
            border: "1px solid #d4af37",
            padding: "8px 12px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ⚙️ Espace Gerant & PDF
        </button>
      </header>

      {/* Hero Banner */}
      <section style={{ textAlign: "center", padding: "50px 20px 35px", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ color: "#d4af37", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
          Service VIP & Livraison 24/7
        </p>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 12px", color: "#ffffff" }}>
          Location de Prestige a {city}
        </h1>
        <p style={{ color: "#9ca3af", maxWidth: "550px", margin: "0 auto 22px", fontSize: "13px", lineHeight: "1.6" }}>
          Reservez votre vehicule en ligne en quelques secondes. Livraison rapide a l'aeroport, a la gare ou a votre domicile.
        </p>
        <a
          href={"https://wa.me/" + phoneNumber}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", backgroundColor: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "13px" }}
        >
          Contact WhatsApp Direct
        </a>
      </section>

      {/* Filtres */}
      <div style={{ maxWidth: "1000px", margin: "25px auto 10px", padding: "0 16px", display: "flex", gap: "8px", overflowX: "auto" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: selectedCategory === cat ? "1px solid #d4af37" : "1px solid #333",
              backgroundColor: selectedCategory === cat ? "#d4af37" : "#171717",
              color: selectedCategory === cat ? "#000" : "#fff",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalogue des voitures */}
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {filteredCars.map((car) => (
          <div
            key={car.id}
            style={{
              backgroundColor: "#141414",
              borderRadius: "12px",
              border: car.available ? "1px solid #262626" : "1px solid #7f1d1d",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              opacity: car.available ? 1 : 0.75,
            }}
          >
            <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
              <img src={car.imageUrl} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: car.available ? "#16a34a" : "#dc2626",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: "bold",
                  padding: "4px 10px",
                  borderRadius: "12px",
                }}
              >
                {car.available ? "Disponible" : "En Location"}
              </span>
            </div>
            <div style={{ padding: "16px", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#d4af37", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
                  {car.category}
                </span>
                <h3 style={{ margin: "6px 0 4px", fontSize: "18px", color: "#ffffff" }}>{car.name}</h3>
                <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#9ca3af" }}>{car.tagline}</p>
                <div style={{ display: "flex", gap: "10px", fontSize: "12px", color: "#a3a3a3", marginBottom: "16px" }}>
                  <span>⚙️ {car.gearbox}</span>
                  <span>⛽ {car.fuel}</span>
                  <span>👥 {car.seats} pl.</span>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #262626", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "20px", fontWeight: "800", color: "#d4af37" }}>{car.pricePerDay}</span>
                  <span style={{ fontSize: "12px", color: "#737373" }}> MAD / jour</span>
                </div>
                <button
                  onClick={() => car.available && setBookingCar(car)}
                  disabled={!car.available}
                  style={{
                    backgroundColor: car.available ? "#d4af37" : "#333",
                    color: car.available ? "#000" : "#888",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                    cursor: car.available ? "pointer" : "not-allowed",
                  }}
                >
                  {car.available ? "Reserver" : "Indisponible"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bouton Flottant Espace Gerant */}
      <button
        onClick={() => setIsAdminOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#d4af37",
          color: "#000",
          border: "2px solid #000",
          padding: "12px 18px",
          borderRadius: "30px",
          fontWeight: "900",
          fontSize: "13px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        ⚙️ Gerant & Factures PDF
      </button>

      {/* Fenetre Reservation Client */}
      {bookingCar && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", zIndex: 100 }}>
          <div style={{ backgroundColor: "#171717", border: "1px solid #d4af37", borderRadius: "12px", padding: "20px", width: "100%", maxWidth: "400px" }}>
            <h3 style={{ margin: "0 0 6px", color: "#d4af37", fontSize: "18px" }}>Reserver : {bookingCar.name}</h3>
            <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#9ca3af" }}>Tarif : {bookingCar.pricePerDay} MAD / jour</p>

            <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Votre Nom complet</label>
            <input
              type="text"
              placeholder="Ex: Karim Alami"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>N° CIN ou Passeport (Optionnel)</label>
            <input
              type="text"
              placeholder="Ex: AB123456"
              value={clientCin}
              onChange={(e) => setClientCin(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Votre Telephone</label>
            <input
              type="tel"
              placeholder="Ex: 06 12 34 56 78"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", color: "#ccc", display: "block", marginBottom: "4px" }}>Date de debut</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#ccc", display: "block", marginBottom: "4px" }}>Date de retour</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ backgroundColor: "#0b0b0b", padding: "12px", borderRadius: "8px", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", color: "#a3a3a3" }}>Total ({calculateDays()} j.) :</span>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#d4af37" }}>{calculateDays() * bookingCar.pricePerDay} MAD</span>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setBookingCar(null)}
                style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #444", backgroundColor: "transparent", color: "#fff", cursor: "pointer" }}
              >
                Annuler
              </button>
              <button
                onClick={confirmBooking}
                style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#25D366", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
              >
                Confirmer sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Espace Gerant (Tableau de bord Admin) */}
      {isAdminOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.92)", zIndex: 200, overflowY: "auto", padding: "16px" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", backgroundColor: "#141414", border: "1px solid #d4af37", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #262626", paddingBottom: "12px", marginBottom: "16px" }}>
              <h2 style={{ margin: 0, color: "#d4af37", fontSize: "18px" }}>⚙️ Espace Gerant - Berik Rent</h2>
              <button
                onClick={() => setIsAdminOpen(false)}
                style={{ backgroundColor: "#262626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
              >
                Fermer ✕
              </button>
            </div>

            {!isAuthenticated ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontSize: "14px", color: "#ccc", marginBottom: "12px" }}>Entrez votre code PIN Gerant (par defaut : 1234)</p>
                <input
                  type="password"
                  placeholder="Code PIN (1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid #444", backgroundColor: "#0b0b0b", color: "#fff", textAlign: "center", fontSize: "16px", marginBottom: "12px", width: "180px" }}
                />
                <br />
                <button
                  onClick={handleAdminLogin}
                  style={{ backgroundColor: "#d4af37", color: "#000", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Debloquer l'Espace Gerant
                </button>
              </div>
            ) : (
              <div>
                {/* Onglets Admin */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                  <button
                    onClick={() => setAdminTab("cars")}
                    style={{ padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "cars" ? "#d4af37" : "#262626", color: adminTab === "cars" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
                  >
                    🚗 Voitures ({cars.length})
                  </button>
                  <button
                    onClick={() => setAdminTab("bookings")}
                    style={{ padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "bookings" ? "#d4af37" : "#262626", color: adminTab === "bookings" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
                  >
                    📅 Locations ({bookings.length})
                  </button>
                  <button
                    onClick={() => setAdminTab("invoice")}
                    style={{ padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "invoice" ? "#d4af37" : "#262626", color: adminTab === "invoice" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
                  >
                    📄 Creer Facture PDF
                  </button>
                  <button
                    onClick={() => setAdminTab("settings")}
                    style={{ padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "settings" ? "#d4af37" : "#262626", color: adminTab === "settings" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
                  >
                    ⚙️ Ville & WhatsApp
                  </button>
                </div>

                {/* ONGLET 1 : GESTION DES VOITURES */}
                {adminTab === "cars" && (
                  <div>
                    <div style={{ backgroundColor: "#1f1f1f", padding: "14px", borderRadius: "8px", marginBottom: "20px" }}>
                      <h4 style={{ margin: "0 0 10px", color: "#d4af37", fontSize: "14px" }}>+ Ajouter une nouvelle voiture</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                        <input
                          type="text"
                          placeholder="Modele (ex: Peugeot 208)"
                          value={newCarName}
                          onChange={(e) => setNewCarName(e.target.value)}
                          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff" }}
                        />
                        <input
                          type="number"
                          placeholder="Prix/jour (ex: 300)"
                          value={newCarPrice}
                          onChange={(e) => setNewCarPrice(e.target.value)}
                          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff" }}
                        />
                        <select
                          value={newCarCategory}
                          onChange={(e) => setNewCarCategory(e.target.value)}
                          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff" }}
                        >
                          <option value="Eco Chic">Eco Chic</option>
                          <option value="SUV Confort">SUV Confort</option>
                          <option value="Berline Premium">Berline Premium</option>
                          <option value="Prestige & Affaires">Prestige & Affaires</option>
                        </select>
                        <select
                          value={newCarGearbox}
                          onChange={(e) => setNewCarGearbox(e.target.value)}
                          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff" }}
                        >
                          <option value="Manuelle">Manuelle</option>
                          <option value="Automatique">Automatique</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="Lien photo URL (optionnel)"
                        value={newCarImage}
                        onChange={(e) => setNewCarImage(e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", marginBottom: "8px", boxSizing: "border-box" }}
                      />
                      <button
                        onClick={handleAddCar}
                        style={{ width: "100%", padding: "10px", backgroundColor: "#d4af37", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
                      >
                        Ajouter au catalogue
                      </button>
                    </div>

                    {cars.map((car) => (
                      <div key={car.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#0b0b0b", padding: "12px", borderRadius: "8px", marginBottom: "8px", border: "1px solid #262626", flexWrap: "wrap", gap: "8px" }}>
                        <div>
                          <strong style={{ fontSize: "14px", color: "#fff", display: "block" }}>{car.name}</strong>
                          <span style={{ fontSize: "11px", color: "#888" }}>{car.category} · {car.gearbox}</span>
                        </div>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <input
                            type="number"
                            value={car.pricePerDay}
                            onChange={(e) => updateCarPrice(car.id, Number(e.target.value))}
                            style={{ width: "65px", padding: "6px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#171717", color: "#d4af37", fontWeight: "bold" }}
                          />
                          <button
                            onClick={() => toggleCarAvailability(car.id)}
                            style={{
                              padding: "6px 10px",
                              borderRadius: "6px",
                              border: "none",
                              backgroundColor: car.available ? "#16a34a" : "#dc2626",
                              color: "#fff",
                              fontSize: "11px",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            {car.available ? "Dispo" : "Louee"}
                          </button>
                          <button
                            onClick={() => deleteCar(car.id)}
                            style={{ padding: "6px 10px", borderRadius: "6px", border: "none", backgroundColor: "#333", color: "#f87171", fontSize: "11px", cursor: "pointer" }}
                          >
                            Suppr.
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ONGLET 2 : SUIVI DES RESERVATIONS & FACTURES PDF */}
                {adminTab === "bookings" && (
                  <div>
                    <div style={{ backgroundColor: "#1f1f1f", padding: "12px", borderRadius: "8px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13px", color: "#ccc" }}>Chiffre d'affaires confirme :</span>
                      <strong style={{ fontSize: "18px", color: "#d4af37" }}>{totalRevenue} MAD</strong>
                    </div>

                    {bookings.length === 0 ? (
                      <p style={{ textAlign: "center", color: "#777", fontSize: "13px", padding: "20px" }}>Aucune reservation enregistree pour le moment.</p>
                    ) : (
                      bookings.map((b) => (
                        <div key={b.id} style={{ backgroundColor: "#0b0b0b", padding: "12px", borderRadius: "8px", marginBottom: "10px", border: "1px solid #262626" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <strong style={{ color: "#d4af37", fontSize: "14px" }}>{b.carName} ({b.invoiceNumber})</strong>
                            <span style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>{b.totalPrice} MAD ({b.days}j)</span>
                          </div>
                          <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#ccc" }}>
                            Client : <strong>{b.clientName}</strong> (CIN: {b.clientCin}) · Tel : {b.clientPhone}<br />
                            Dates : du {b.startDate} au {b.endDate}
                          </p>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            <button
                              onClick={() => downloadInvoicePDF(b)}
                              style={{ flex: 2, padding: "8px", fontSize: "12px", borderRadius: "6px", border: "none", backgroundColor: "#d4af37", color: "#000", fontWeight: "bold", cursor: "pointer" }}
                            >
                              📄 Telecharger Facture PDF
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b.id, "En cours")}
                              style={{ flex: 1, padding: "8px", fontSize: "11px", borderRadius: "6px", border: "none", backgroundColor: b.status === "En cours" ? "#16a34a" : "#262626", color: "#fff", cursor: "pointer" }}
                            >
                              En cours
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b.id, "Terminee")}
                              style={{ flex: 1, padding: "8px", fontSize: "11px", borderRadius: "6px", border: "none", backgroundColor: b.status === "Terminee" ? "#2563eb" : "#262626", color: "#fff", cursor: "pointer" }}
                            >
                              Terminee
                            </button>
                            <button
                              onClick={() => deleteBooking(b.id)}
                              style={{ padding: "8px 10px", fontSize: "11px", borderRadius: "6px", border: "none", backgroundColor: "#333", color: "#f87171", cursor: "pointer" }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* ONGLET 3 : CREER UNE FACTURE PDF AU NOM DU CLIENT */}
                {adminTab === "invoice" && (
                  <div style={{ backgroundColor: "#1f1f1f", padding: "16px", borderRadius: "8px" }}>
                    <h4 style={{ margin: "0 0 12px", color: "#d4af37", fontSize: "15px" }}>📄 Generer une Facture PDF au nom du Client</h4>

                    <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Nom complet du Client</label>
                    <input
                      type="text"
                      placeholder="Ex: Mohammed Berrada"
                      value={invClientName}
                      onChange={(e) => setInvClientName(e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", marginBottom: "10px", boxSizing: "border-box" }}
                    />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
                      <div>
                        <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>N° CIN / Passeport</label>
                        <input
                          type="text"
                          placeholder="Ex: A123456"
                          value={invClientCin}
                          onChange={(e) => setInvClientCin(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Telephone Client</label>
                        <input
                          type="text"
                          placeholder="Ex: 0661234567"
                          value={invClientPhone}
                          onChange={(e) => setInvClientPhone(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Vehicule loue</label>
                    <select
                      value={invCarName}
                      onChange={(e) => {
                        setInvCarName(e.target.value);
                        const found = cars.find((c) => c.name === e.target.value);
                        if (found) setInvPricePerDay(String(found.pricePerDay));
                      }}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", marginBottom: "10px", boxSizing: "border-box" }}
                    >
                      {cars.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.pricePerDay} MAD/j)
                        </option>
                      ))}
                    </select>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
                      <div>
                        <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Prix / jour (MAD)</label>
                        <input
                          type="number"
                          value={invPricePerDay}
                          onChange={(e) => setInvPricePerDay(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Nombre de jours</label>
                        <input
                          type="number"
                          value={invDays}
                          onChange={(e) => setInvDays(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
                      <div>
                        <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Date de depart</label>
                        <input
                          type="date"
                          value={invStartDate}
                          onChange={(e) => setInvStartDate(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Date de retour</label>
                        <input
                          type="date"
                          value={invEndDate}
                          onChange={(e) => setInvEndDate(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div style={{ backgroundColor: "#0b0b0b", padding: "12px", borderRadius: "8px", marginBottom: "14px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "#ccc" }}>Total Facture TTC :</span>
                      <strong style={{ fontSize: "16px", color: "#d4af37" }}>{(Number(invDays) || 1) * (Number(invPricePerDay) || 0)} MAD</strong>
                    </div>

                    <button
                      onClick={handleDirectInvoice}
                      style={{ width: "100%", padding: "12px", backgroundColor: "#d4af37", color: "#000", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}
                    >
                      📥 Telecharger la Facture PDF au nom du Client
                    </button>
                  </div>
                )}

                {/* ONGLET 4 : REGLAGES VILLE & WHATSAPP */}
                {adminTab === "settings" && (
                  <div style={{ backgroundColor: "#1f1f1f", padding: "16px", borderRadius: "8px" }}>
                    <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "6px" }}>Ville affichee sur le site</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => saveSettings(e.target.value, phoneNumber)}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", marginBottom: "14px", boxSizing: "border-box" }}
                    />

                    <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "6px" }}>Numero WhatsApp (avec 212, sans +)</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => saveSettings(city, e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", marginBottom: "10px", boxSizing: "border-box" }}
                    />
                    <p style={{ fontSize: "11px", color: "#16a34a", margin: 0 }}>✓ Vos modifications sont enregistrees automatiquement.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "35px 20px", textAlign: "center", color: "#737373", fontSize: "12px", marginTop: "40px" }}>
        <p style={{ margin: "0 0 8px" }}>© {new Date().getFullYear()} BERIK RENT AUTO · {city}, Maroc.</p>
      </footer>
    </div>
  );
}
