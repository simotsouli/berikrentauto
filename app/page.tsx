export default function Home() {
  return (
    <div style={{background:'#0a0a0a', color:'white', minHeight:'100vh', fontFamily:'sans-serif'}}>
      <nav style={{padding:'20px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222'}}>
        <b style={{color:'#D4AF37', fontSize:'20px'}}>BERIK RENT</b>
        <span style={{fontSize:'12px'}}>RABAT - SIDI YAHYA</span>
      </nav>
      
      <div style={{padding:'40px 20px', textAlign:'center'}}>
        <h1 style={{fontSize:'38px', fontWeight:'900', lineHeight:'1.1'}}>Louez <span style={{color:'#D4AF37'}}>l'Excellence</span><br/>à Rabat</h1>
        <p style={{color:'#888', marginTop:'15px'}}>Dacia, Clio, 208... Livraison aéroport</p>
        
        <a href="https://wa.me/212600000000" style={{display:'block', background:'#D4AF37', color:'black', padding:'18px', borderRadius:'30px', fontWeight:'bold', marginTop:'30px', textDecoration:'none'}}>
          Réserver sur WhatsApp
        </a>
      </div>

      <div style={{padding:'20px', display:'grid', gap:'15px'}}>
        <div style={{background:'#171717', padding:'20px', borderRadius:'15px', border:'1px solid #222'}}>
          <h3>Dacia Logan - 250 DH/j</h3>
          <p style={{color:'#888', fontSize:'13px'}}>Idéale ville, clim, économique</p>
        </div>
        <div style={{background:'#171717', padding:'20px', borderRadius:'15px', border:'1px solid #222'}}>
          <h3>Renault Clio 5 - 350 DH/j</h3>
          <p style={{color:'#888', fontSize:'13px'}}>Confort + GPS + Bluetooth</p>
        </div>
        <div style={{background:'#171717', padding:'20px', borderRadius:'15px', border:'1px solid #222'}}>
          <h3>Peugeot 208 - 350 DH/j</h3>
          <p style={{color:'#888', fontSize:'13px'}}>Sport, automatique dispo</p>
        </div>
      </div>

      <p style={{textAlign:'center', color:'#444', fontSize:'11px', padding:'30px'}}>© 2026 BERIK RENT AUTO - Sidi Yahya des Zaër</p>
    </div>
  )
}