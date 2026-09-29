"use client";

import React, { useState } from "react";

// Configuration de la ville et du service
const CITY = "Fés";
const PHONE_NUMBER = "212661741201"; // Remplacez par votre numéro WhatsApp

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
}

const CARS_DATABASE: Car[] = [
  {
    id: "clio5",
    name: "Renault Clio 5",
    category: "Éco Chic",
    tagline: "Élégante et idéale pour la ville",
    pricePerDay: 280,
    gearbox: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
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
  },
  {
    id: "golf8",
    name: "Volkswagen Golf 8",
    category: "Berline Premium",
    tagline: "Finition raffinée, technologie et dynamisme",
    pricePerDay: 600,
    gearbox: "Automatique",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "c-class",
    name: "Mercedes-Benz Classe C",
    category: "Prestige & Affaires",
    tagline: "Le luxe et le confort absolu pour vos séjours",
    pricePerDay: 1100,
    gearbox: "Automatique",
    fuel: "Diesel",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");

  const categories = ["Toutes", "Éco Chic", "SUV Confort", "Berline Premium", "Prestige & Affaires"];

  const filteredCars =
    selectedCategory === "Toutes"
      ? CARS_DATABASE
      : CARS_DATABASE.filter((car) => car.category === selectedCategory);

  const createWhatsAppLink = (carName?: string) => {
    let msg = `Bonjour Berik Rent, je souhaite me renseigner pour une location de voiture a ${CITY}.`;
    if (carName) {
      msg = `Bonjour Berik Rent, je souhaite reserver le vehicule : ${carName} a ${CITY}. Est-il disponible ?`;
    }
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div style={{ backgroundColor: "#0b0b0b", color: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #262626", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "3px", color: "#d4af37" }}>BERIK RENT</span>
          <span style={{ fontSize: "11px", color: "#a3a3a3", display: "block", letterSpacing: "1px" }}>PREMIUM CARS · {CITY.toUpperCase()}</span>
        </div>
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#d4af37", color: "#000", padding: "8px 16px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold", fontSize: "13px" }}
        >
          Contact Direct
        </a>
      </header>

      {/* Hero Banner */}
      <section style={{ textAlign: "center", padding: "60px 20px 40px", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ color: "#d4af37", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
          Location Automobile de Prestige
        </p>
        <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 16px", color: "#ffffff" }}>
          Excellence & Mobilité à {CITY}
        </h1>
        <p style={{ color: "#9ca3af", maxWidth: "600px", margin: "0 auto 24px", fontSize: "14px", lineHeight: "1.6" }}>
          Des véhicules impeccables livrés à l'aéroport, en gare ou directement à votre adresse avec un service VIP sur mesure.
        </p>
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", backgroundColor: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}
        >
          Réserver via WhatsApp
        </a>
      </section>

      {/* Filtres */}
      <div style={{ maxWidth: "1000px", margin: "30px auto 10px", padding: "0 20px", display: "flex", gap: "8px", overflowX: "auto" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
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

      {/* Flotte de véhicules */}
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {filteredCars.map((car) => (
          <div
            key={car.id}
            style={{
              backgroundColor: "#141414",
              borderRadius: "12px",
              border: "1px solid #262626",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "180px", overflow: "hidden" }}>
              <img
                src={car.imageUrl}
                alt={car.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "16px", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#d4af37", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
                  {car.category}
                </span>
                <h3 style={{ margin: "6px 0 4px", fontSize: "18px", color: "#ffffff" }}>{car.name}</h3>
                <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#9ca3af" }}>{car.tagline}</p>
                <div style={{ display: "flex", gap: "10px", fontSize: "12px", color: "#a3a3a3", marginBottom: "16px" }}>
                  <span>⚙️ {car.gearbox}</span>
                  <span>⛽ {car.fuel}</span>
                  <span>👥 {car.seats} places</span>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #262626", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "20px", fontWeight: "800", color: "#d4af37" }}>{car.pricePerDay}</span>
                  <span style={{ fontSize: "12px", color: "#737373" }}> MAD / jour</span>
                </div>
                <a
                  href={createWhatsAppLink(car.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "#d4af37",
                    color: "#000",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  Louer
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "40px 20px", textAlign: "center", color: "#737373", fontSize: "12px", marginTop: "40px" }}>
        <p style={{ margin: "0 0 8px" }}>© {new Date().getFullYear()} BERIK RENT AUTO · {CITY}, Maroc.</p>
        <p style={{ margin: 0 }}>Livraison personnalisée à domicile, aéroport & gares ferroviaires.</p>
      </footer>
    </div>
  );
}
