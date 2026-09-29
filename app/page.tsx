export default function Home() {
  return (
    <div style={{background:'#080808', color:'white', minHeight:'100vh', fontFamily:'system-ui'}}>
      <nav style={{padding:'18px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #1a1a1a', position:'sticky', top:0, background:'#080808'}}>
        <b style={{color:'#D4AF37', letterSpacing:'2px'}}>BERIK RENT</b>
        <span style={{fontSize:'10px', color:'#666', letterSpacing:'1px'}}>RABAT • SIDI YAHYA</span>
      </nav>

      <div style={{padding:'50px 20px 20px', textAlign:'center'}}>
        <h1 style={{fontSize:'42px', fontWeight:'900', lineHeight:'0.95', margin:0}}>Louez<br/><span style={{color:'#D4AF37'}}>l'Excellence</span></h1>
        <p style={{color:'#888', marginTop:'15px', fontSize:'14px'}}>Service premium à Rabat - Livraison aéroport & gare</p>
        
        <a href="https://wa.me/212661741201?text=Salam%20BERIK%20RENT%2C%20je%20veux%20louer%20une%20voiture" style={{display:'block', background:'#D4AF37', color:'black', padding:'18px', borderRadius:'100px', fontWeight:'900', marginTop:'30px', textDecoration:'none', fontSize:'16px'}}>
          📱 Réserver sur WhatsApp
        </a>
        <p style={{fontSize:'11px', color:'#555', marginTop:'10px'}}>+212 661-741201 - Réponse immédiate</p>
      </div>

      <div style={{padding:'20px', display:'grid', gap:'12px'}}>
        {[
          {name:'Dacia Logan', price:'250 DH / jour', desc:'Économique • Clim • 5 places'},
          {name:'Renault Clio 5', price:'350 DH / jour', desc:'La plus demandée • GPS • Bluetooth'},
          {name:'Peugeot 208', price:'350 DH / jour', desc:'Look sport • Confort premium'},
          {name:'Dacia Duster', price:'450 DH / jour', desc:'SUV • Idéal familles & voyages'},
        ].map(car => (
          <div key={car.name} style={{background:'#131313', padding:'18px', borderRadius:'16px', border:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <b style={{fontSize:'15px'}}>{car.name}</b>
              <p style={{color:'#777', fontSize:'12px', margin:'4px 0 0'}}>{car.desc}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <b style={{color:'#D4AF37', fontSize:'14px'}}>{car.price}</b>
            </div>
          </div>
        ))}
      </div>

      <div style={{margin:'20px', background:'#D4AF37', color:'black', padding:'20px', borderRadius:'16px', textAlign:'center'}}>
        <b style={{fontSize:'14px'}}>Livraison gratuite à Rabat</b>
        <p style={{fontSize:'12px', marginTop:'5px'}}>Aéroport Rabat-Salé, Agdal, Hay Riad, Témara</p>
      </div>

      <p style={{textAlign:'center', color:'#333', fontSize:'10px', padding:'30px', letterSpacing:'1px'}}>© 2026 BERIK RENT AUTO - SIDI YAHYA DES ZAËR<br/>Location de voitures à Rabat</p>
    </div>
  )
}