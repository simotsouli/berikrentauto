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
  carName: string;
  clientName: string;
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
  const [adminTab, setAdminTab] = useState<"cars" | "bookings" | "settings">("cars");

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
  const [clientPhone, setClientPhone] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Sauvegarde locale dans le navigateur
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

    const newBooking: Booking = {
      id: Date.now().toString(),
      carName: bookingCar.name,
      clientName,
      clientPhone,
      startDate: startDate || "Aujourd'hui",
      endDate: endDate || "A definir",
      days,
      totalPrice: total,
      status: "En attente",
    };

    saveBookings([newBooking, ...bookings]);

    const msg = `Bonjour Berik Rent, je souhaite reserver :
- Vehicule : ${bookingCar.name}
- Ville : ${city}
- Du : ${newBooking.startDate} au ${newBooking.endDate} (${days} jours)
- Total estime : ${total} MAD
- Client : ${clientName} (${clientPhone})`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setBookingCar(null);
    setClientName("");
    setClientPhone("");
  };

  const updateBookingStatus = (id: string, status: "En attente" | "En cours" | "Terminee") => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    saveBookings(updated);
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
  };

  const totalRevenue = bookings
    .filter((b) => b.status === "En cours" || b.status === "Terminee")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div style={{ backgroundColor: "#0b0b0b", color: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "80px" }}>
      {/* Header avec bouton Espace Gerant bien visible */}
      <header style={{ borderBottom: "1px solid #262626", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "#0b0b0b", zIndex: 40 }}>
        <div>
          <span style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "2px", color: "#d4af37" }}>BERIK RENT</span>
          <span style={{ fontSize: "10px", color: "#a3a3a3", display: "block", letterSpacing: "1px" }}>LUXURY CARS · {city.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
            ⚙️ Espace Gerant
          </button>
        </div>
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
          href={`https://wa.me/${phoneNumber}`}
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

      {/* Bouton Flottant Espace Gerant (toujours visible en bas a droite sur telephone) */}
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
        ⚙️ Gerer ma Location
      </button>

      {/* Fenetre Reservation Client */}
      {bookingCar && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", zIndex: 100 }}>
          <div style={{ backgroundColor: "#171717", border: "1px solid #d4af37", borderRadius: "12px", padding: "20px", width: "100%", maxWidth: "400px" }}>
            <h3 style={{ margin: "0 0 6px", color: "#d4af37", fontSize: "18px" }}>Reserver : {bookingCar.name}</h3>
            <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#9ca3af" }}>Tarif : {bookingCar.pricePerDay} MAD / jour</p>

            <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Votre Nom complet</label>
            <input
              type="text"
              placeholder="Ex: Karim Alami"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "12px", color: "#ccc", display: "block", marginBottom: "4px" }}>Votre Telephone</label>
            <input
              type="tel"
              placeholder="Ex: 06 12 34 56 78"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#0b0b0b", color: "#fff", boxSizing: "border-box" }}
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
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px", overflowX: "auto" }}>
                  <button
                    onClick={() => setAdminTab("cars")}
                    style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "cars" ? "#d4af37" : "#262626", color: adminTab === "cars" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
                  >
                    🚗 Mes Voitures ({cars.length})
                  </button>
                  <button
                    onClick={() => setAdminTab("bookings")}
                    style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "bookings" ? "#d4af37" : "#262626", color: adminTab === "bookings" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
                  >
                    📅 Locations ({bookings.length})
                  </button>
                  <button
                    onClick={() => setAdminTab("settings")}
                    style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: adminTab === "settings" ? "#d4af37" : "#262626", color: adminTab === "settings" ? "#000" : "#fff", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
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

                {/* ONGLET 2 : SUIVI DES RESERVATIONS */}
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
                            <strong style={{ color: "#d4af37", fontSize: "14px" }}>{b.carName}</strong>
                            <span style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>{b.totalPrice} MAD ({b.days}j)</span>
                          </div>
                          <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#ccc" }}>
                            Client : {b.clientName} ({b.clientPhone})<br />
                            Dates : du {b.startDate} au {b.endDate}
                          </p>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button
                              onClick={() => updateBookingStatus(b.id, "En cours")}
                              style={{ flex: 1, padding: "6px", fontSize: "11px", borderRadius: "6px", border: "none", backgroundColor: b.status === "En cours" ? "#16a34a" : "#262626", color: "#fff", cursor: "pointer" }}
                            >
                              En cours
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b.id, "Terminee")}
                              style={{ flex: 1, padding: "6px", fontSize: "11px", borderRadius: "6px", border: "none", backgroundColor: b.status === "Terminee" ? "#2563eb" : "#262626", color: "#fff", cursor: "pointer" }}
                            >
                              Terminee
                            </button>
                            <button
                              onClick={() => deleteBooking(b.id)}
                              style={{ padding: "6px 10px", fontSize: "11px", borderRadius: "6px", border: "none", backgroundColor: "#333", color: "#f87171", cursor: "pointer" }}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* ONGLET 3 : REGLAGES VILLE & WHATSAPP */}
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
