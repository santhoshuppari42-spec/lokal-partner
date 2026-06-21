
      <div style={s.nav}>
        <div style={s.navBrand}>🛒 <span style={s.navBrandText}>Lokál</span></div>
        <div style={s.navLoc}>📍 {user.area}</div>
        <div style={s.navUser}>
          <div style={s.navAvatar}>{user.name[0]}</div>
          <button style={s.navLogout} onClick={onLogout}>Logout</button>
        </div>
      </div>

      {tab==="home" && <>
        <div style={s.searchWrap}>
          <div style={s.searchBox}>
            <span style={{fontSize:16}}>🔍</span>
            <input style={s.searchInp} placeholder="Search anything..." value={search} onChange={e=>setSearch(e.target.value)} />
            {search && <button style={s.clearSearch} onClick={()=>setSearch("")}>✕</button>}
          </div>
        </div>

        {!search && (
          <div style={s.heroBanner}>
            <div style={s.heroTitle}>Hi {user.name.split(" ")[0]}! 👋</div>
            <div style={s.heroSub}>What do you need today?</div>
            <div style={s.heroMeta}>Shops near <b>{user.area}</b> will respond instantly</div>
          </div>
        )}

        <div style={s.section}>
          <div style={s.sectionTitle}>{search?`"${search}"`:"Browse Categories"}</div>
          <div style={s.catGrid}>
            {filteredCats.map(c=>(
              <div key={c.id} style={s.catCard} onClick={()=>{setActiveCategory(c.id);setShowReqModal(true);}}>
                <div style={s.catIcon}>{c.icon}</div>
                <div style={s.catLabel}>{c.label}</div>
                <div style={s.catPost}>Post →</div>
              </div>
            ))}
          </div>
        </div>

        {myRequests.length>0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>📋 My Requests</div>
            {myRequests.map(req=>{
              const c=CATEGORIES.find(x=>x.id===req.category);
              return (
                <div key={req.id} style={s.reqRow} onClick={()=>openBidsFor(req)}>
                  <div style={s.reqRowIcon}>{c?.icon}</div>
                  <div style={{flex:1}}>
                    <div style={s.reqRowItem}>{req.item}</div>
                    <div style={s.reqRowMeta}>{c?.label} · {new Date(req.created_at).toLocaleDateString()}</div>
                  </div>
                  <div style={s.reqRowBadge}>View Bids</div>
                </div>
              );
            })}
          </div>
        )}
      </>}

      {tab==="profile" && (
        <div style={s.section}>
          <div style={s.profileCard}>
            <div style={s.profileAvatar}>{user.name[0]}</div>
            <div style={s.profileName}>{user.name}</div>
            <div style={s.profileMeta}>📧 {user.email}</div>
            <div style={s.profileMeta}>📞 {user.phone}</div>
            <div style={s.profileMeta}>📍 {user.area}, {user.city}</div>
          </div>
          <button style={{...s.btn,background:"#EF4444"}} onClick={onLogout}>🚪 Logout</button>
        </div>
      )}

      <div style={s.bottomNav}>
        {[{key:"home",icon:"🏠",label:"Home"},{key:"profile",icon:"👤",label:"Profile"}].map(t=>(
          <button key={t.key} style={s.bottomBtn} onClick={()=>setTab(t.key)}>
            <span style={s.bottomIcon}>{t.icon}</span>
            <span style={s.bottomLabel}>{t.label}</span>
          </button>
        ))}
      </div>
      <div style={{height:70}}/>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(null);
  if(screen==="splash")  return <SplashScreen onLogin={()=>setScreen("login")} onSignup={()=>setScreen("signup")} />;
  if(screen==="login")   return <LoginScreen onSuccess={u=>{setUser(u);setScreen("home");}} onSignup={()=>setScreen("signup")} onBack={()=>setScreen("splash")} />;
  if(screen==="signup")  return <SignupScreen onSuccess={u=>{setUser(u);setScreen("home");}} onLogin={()=>setScreen("login")} onBack={()=>setScreen("splash")} />;
  if(screen==="home")    return <HomeScreen user={user} onLogout={()=>setScreen("splash")} />;
  return null;
}

const s = {
  root:{fontFamily:"'Inter',system-ui,sans-serif",background:"#F8F9FB",minHeight:"100vh"},
  splash:{position:"relative",minHeight:"100vh",fontFamily:"'Inter',system-ui,sans-serif",overflow:"hidden",background:"#1E1B4B"},
  splashBg:{position:"absolute",inset:0,background:"linear-gradient(135deg,#1E1B4B 0%,#4F46E5 60%,#7C3AED 100%)"},
  splashContent:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:24,textAlign:"center"},
  splashLogo:{fontSize:64,marginBottom:8},
  splashBrand:{fontWeight:900,fontSize:48,color:"#fff",letterSpacing:"-2px",marginBottom:6},
  splashTagline:{color:"rgba(255,255,255,0.8)",fontSize:18,lineHeight:1.5,marginBottom:36},
  splashActions:{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:320,marginBottom:28},
  splashSignup:{background:"#fff",color:"#4F46E5",border:"none",padding:"15px",borderRadius:12,fontSize:16,fontWeight:900,cursor:"pointer"},
  splashLogin:{background:"rgba(255,255,255,0.15)",color:"#fff",border:"2px solid rgba(255,255,255,0.4)",padding:"15px",borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer"},
  splashSeller:{color:"rgba(255,255,255,0.5)",fontSize:13},
  splashSellerLink:{color:"rgba(255,255,255,0.8)",fontWeight:700},
  authPage:{fontFamily:"'Inter',system-ui,sans-serif",background:"#F8F9FB",minHeight:"100vh"},
  authNav:{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"},
  authNavBrand:{fontSize:18,letterSpacing:"-0.3px"},
  backBtn:{background:"none",border:"none",fontSize:20,color:"#374151",cursor:"pointer",width:32,fontWeight:700},
  stepCounter:{fontSize:13,fontWeight:700,color:"#9CA3AF"},
  progressBar:{height:3,background:"#E5E7EB"},
  progressFill:{height:3,background:"#4F46E5",transition:"width 0.3s"},
  authBody:{padding:"28px 20px"},
  authTitle:{fontWeight:900,fontSize:26,margin:"0 0 6px",letterSpacing:"-0.5px"},
  authSub:{color:"#6B7280",fontSize:14,marginBottom:22},
  authCard:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:22,marginBottom:16},
  lbl:{display:"block",fontWeight:700,fontSize:13,color:"#374151",marginBottom:5},
  inp:{width:"100%",boxSizing:"border-box",border:"1.5px solid #E5E7EB",borderRadius:8,padding:"11px 12px",fontSize:14,marginBottom:14,outline:"none",color:"#111",fontFamily:"inherit"},
  btn:{width:"100%",background:"#4F46E5",color:"#fff",border:"none",padding:"13px",borderRadius:10,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"inherit"},
  eyeBtn:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,marginTop:-7},
  errMsg:{color:"#EF4444",fontSize:13,marginBottom:12,fontWeight:600,background:"#FEF2F2",padding:"8px 12px",borderRadius:8},
  savingMsg:{color:"#4F46E5",fontSize:13,fontWeight:600,background:"#EEF2FF",padding:"8px 12px",borderRadius:8,marginBottom:12},
  switchRow:{textAlign:"center",fontSize:14,color:"#6B7280"},
  switchBtn:{background:"none",border:"none",color:"#4F46E5",fontWeight:700,cursor:"pointer",fontSize:14},
  otpSentBox:{background:"#D1FAE5",color:"#065F46",fontWeight:700,fontSize:13,padding:"10px 12px",borderRadius:8,marginBottom:16},
  otpRow:{display:"flex",gap:8,justifyContent:"center",marginBottom:16},
  otpBox:{width:42,height:48,textAlign:"center",fontSize:20,fontWeight:800,border:"2px solid #E5E7EB",borderRadius:8,outline:"none",fontFamily:"inherit"},
  gpsBtn:{width:"100%",background:"#4F46E5",color:"#fff",border:"none",padding:"12px",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",marginBottom:12,fontFamily:"inherit"},
  orDivider:{textAlign:"center",color:"#9CA3AF",fontSize:12,marginBottom:12},
  cityRow:{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8},
  cBtn:{border:"1.5px solid #E5E7EB",background:"#fff",borderRadius:8,padding:"7px 12px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
  cBtnA:{border:"1.5px solid #4F46E5",background:"#EEF2FF",color:"#4F46E5"},
  drop:{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:8,zIndex:99,boxShadow:"0 4px 16px rgba(0,0,0,0.12)",maxHeight:180,overflowY:"auto"},
  dItem:{padding:"10px 14px",fontSize:13,cursor:"pointer",borderBottom:"1px solid #F3F4F6"},
  nav:{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:50},
  navBrand:{display:"flex",alignItems:"center",gap:5,fontWeight:900,fontSize:20,color:"#4F46E5",flexShrink:0},
  navBrandText:{letterSpacing:"-0.5px"},
  navLoc:{flex:1,textAlign:"center",fontSize:12,fontWeight:700,color:"#4F46E5",background:"#EEF2FF",padding:"5px 12px",borderRadius:20},
  navUser:{display:"flex",alignItems:"center",gap:8},
  navAvatar:{width:30,height:30,borderRadius:"50%",background:"#4F46E5",color:"#fff",fontWeight:900,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"},
  navLogout:{background:"none",border:"1px solid #E5E7EB",color:"#9CA3AF",fontSize:11,padding:"4px 8px",borderRadius:6,cursor:"pointer"},
  searchWrap:{padding:"10px 14px",background:"#fff",borderBottom:"1px solid #F3F4F6"},
  searchBox:{display:"flex",alignItems:"center",gap:8,background:"#F3F4F6",borderRadius:12,padding:"10px 14px"},
  searchInp:{flex:1,background:"none",border:"none",outline:"none",fontSize:14,color:"#111",fontFamily:"inherit"},
  clearSearch:{background:"none",border:"none",color:"#9CA3AF",cursor:"pointer",fontSize:16},
  heroBanner:{background:"linear-gradient(135deg,#4F46E5,#7C3AED)",padding:"22px 20px"},
  heroTitle:{color:"#fff",fontWeight:900,fontSize:22,marginBottom:4},
  heroSub:{color:"rgba(255,255,255,0.9)",fontSize:15,marginBottom:4},
  heroMeta:{color:"rgba(255,255,255,0.7)",fontSize:12},
  section:{padding:"16px"},
  sectionTitle:{fontWeight:900,fontSize:16,marginBottom:12},
  catGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10},
  catCard:{background:"#fff",borderRadius:14,padding:"14px 10px",border:"1px solid #E5E7EB",cursor:"pointer",textAlign:"center"},
  catIcon:{fontSize:26,marginBottom:6},
  catLabel:{fontWeight:700,fontSize:12,marginBottom:6},
  catPost:{background:"#EEF2FF",color:"#4F46E5",fontSize:10,fontWeight:800,padding:"4px 8px",borderRadius:6},
  reqRow:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:8,cursor:"pointer"},
  reqRowIcon:{fontSize:22},
  reqRowItem:{fontWeight:800,fontSize:13,marginBottom:2},
  reqRowMeta:{fontSize:11,color:"#9CA3AF"},
  reqRowBadge:{background:"#EEF2FF",color:"#4F46E5",fontSize:11,fontWeight:800,padding:"4px 10px",borderRadius:20,whiteSpace:"nowrap"},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:100,display:"flex",alignItems:"flex-end"},
  modal:{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxHeight:"90vh",overflowY:"auto",padding:"20px 18px 36px"},
  modalTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14},
  modalTitle:{fontWeight:900,fontSize:17},
  modalClose:{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#9CA3AF"},
  subChips:{display:"flex",flexWrap:"wrap",gap:7},
  chip:{border:"1.5px solid #E5E7EB",background:"#fff",borderRadius:8,padding:"6px 11px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
  chipA:{border:"1.5px solid #4F46E5",background:"#EEF2FF",color:"#4F46E5"},
  subNav:{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"11px 14px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:10},
  subNavTitle:{fontWeight:900,fontSize:15},
  subNavSub:{fontSize:11,color:"#6B7280",marginTop:2},
  bidsPage:{padding:14},
  reqSummary:{background:"#EEF2FF",border:"1.5px solid #C7D2FE",borderRadius:12,padding:"12px 14px",marginBottom:14},
  reqSumLabel:{fontSize:10,fontWeight:800,color:"#4F46E5",letterSpacing:"0.5px",marginBottom:4},
  reqSumItem:{fontWeight:900,fontSize:16,marginBottom:3},
  reqSumDesc:{fontSize:13,color:"#374151",marginBottom:3},
  reqSumBudget:{fontSize:13,color:"#059669",fontWeight:700},
  bidsLabel:{fontWeight:800,fontSize:14,marginBottom:10},
  emptyMini:{color:"#9CA3AF",fontSize:13,textAlign:"center",padding:20},
  bidCard:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,padding:14,marginBottom:10},
  bidHead:{display:"flex",alignItems:"center",gap:10,marginBottom:10},
  bidShopAv:{width:38,height:38,borderRadius:10,background:"#4F46E5",color:"#fff",fontWeight:900,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  bidShopName:{fontWeight:800,fontSize:14,marginBottom:2},
  bidShopMeta:{fontSize:12,color:"#9CA3AF"},
  avail:{background:"#D1FAE5",color:"#059669",fontSize:11,fontWeight:800,padding:"4px 9px",borderRadius:20,flexShrink:0},
  unavail:{background:"#FEE2E2",color:"#DC2626",fontSize:11,fontWeight:800,padding:"4px 9px",borderRadius:20,flexShrink:0},
  bidPriceRow:{display:"flex",alignItems:"center",gap:10,marginBottom:5},
  bidPrice:{fontWeight:900,fontSize:20},
  delivBadge:{background:"#D1FAE5",color:"#059669",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20},
  pickBadge:{background:"#F3F4F6",color:"#6B7280",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20},
  bidEta:{fontSize:12,color:"#F59E0B",fontWeight:700,marginBottom:5},
  bidNote:{fontSize:12,color:"#6B7280",fontStyle:"italic",marginBottom:4,lineHeight:1.4},
  bidTime:{fontSize:11,color:"#D1D5DB",marginBottom:10},
  bidBtns:{display:"flex",gap:8},
  chatBidBtn:{flex:1,background:"#EEF2FF",color:"#4F46E5",border:"none",padding:"9px",borderRadius:8,fontWeight:800,cursor:"pointer",fontSize:13},
  orderNowBtn:{flex:1,background:"#4F46E5",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontWeight:800,cursor:"pointer",fontSize:13},
  waitingPill:{background:"#FFFBEB",border:"1px solid #FCD34D",borderRadius:20,padding:"9px 16px",fontSize:13,color:"#92400E",fontWeight:600,textAlign:"center"},
  chatFull:{fontFamily:"'Inter',system-ui,sans-serif",display:"flex",flexDirection:"column",height:"100vh",background:"#F0F4FF"},
  chatNav:{background:"#4F46E5",padding:"12px 14px",display:"flex",alignItems:"center",gap:10},
  chatAvatar:{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.2)",color:"#fff",fontWeight:900,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  chatShopName:{fontWeight:800,fontSize:15,color:"#fff"},
  chatShopSub:{fontSize:11,color:"rgba(255,255,255,0.7)"},
  chatRating:{color:"#fff",fontSize:13,fontWeight:700},
  chatMessages:{flex:1,overflowY:"auto",padding:"16px 14px"},
  bubbleU:{background:"#4F46E5",color:"#fff",padding:"10px 14px",borderRadius:"16px 16px 4px 16px",maxWidth:260,fontSize:14,lineHeight:1.5},
  bubbleS:{background:"#fff",color:"#111",padding:"10px 14px",borderRadius:"16px 16px 16px 4px",maxWidth:260,fontSize:14,lineHeight:1.5,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"},
  chatInputWrap:{background:"#fff",borderTop:"1px solid #E5E7EB",padding:"10px 14px",display:"flex",gap:8,alignItems:"center"},
  chatField:{flex:1,border:"1.5px solid #E5E7EB",borderRadius:22,padding:"10px 14px",fontSize:14,outline:"none",fontFamily:"inherit"},
  sendBtn:{background:"#4F46E5",color:"#fff",border:"none",width:40,height:40,borderRadius:"50%",fontWeight:900,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"},
  bottomNav:{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #E5E7EB",display:"flex",zIndex:50},
  bottomBtn:{flex:1,background:"none",border:"none",padding:"8px 0 6px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2},
  bottomIcon:{fontSize:22},
  bottomLabel:{fontSize:10,fontWeight:700,color:"#9CA3AF"},
  profileCard:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:24,textAlign:"center",marginBottom:16},
  profileAvatar:{width:64,height:64,borderRadius:"50%",background:"#4F46E5",color:"#fff",fontWeight:900,fontSize:28,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"},
  profileName:{fontWeight:900,fontSize:20,marginBottom:6},
  profileMeta:{fontSize:13,color:"#6B7280",marginBottom:4},
};
  const [otp, setOtp] = useState("");
  const [done, setDone] = useState(false);
  const [loc, setLoc] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submitToDatabase = async (location) => {
    setSaving(true); setError("");
    try {
      await db.insert("shops", {
        name: form.name, owner: form.owner, phone: form.phone, email: form.email,
        password: form.pass, city: location.city, area: location.area,
        lat: location.lat, lng: location.lng, category: form.category,
        gst: form.gst || null, aadhaar: form.aadhaar || null, status: "pending",
      });
      setLoc(location);
      setDone(true);
    } catch(e) {
      setError("Could not submit: " + e.message);
    }
    setSaving(false);
  };

  if(done) return (
    <div style={s.authPage}>
      <div style={s.authNav}><div style={{width:32}}/><div style={s.authBrand}>🏪 <b>Lokál Partner</b></div><div style={{width:32}}/></div>
      <div style={s.authBody}>
        <div style={s.successCard}>
          <div style={s.successIcon}>🎉</div>
          <h2 style={s.successTitle}>Application Submitted!</h2>
          <div style={s.pendingBox}>
            <div style={s.pendingTitle}>⏳ Awaiting Admin Approval</div>
            <p style={s.pendingText}><b>{form.name}</b> at <b>{loc?.area}, {loc?.city}</b> is saved in our system and waiting for review.</p>
            <p style={s.pendingText}>You'll be able to login once approved. Try logging in to check status!</p>
          </div>
          <button style={{...s.primaryBtn,background:"#F59E0B"}} onClick={onLogin}>Go to Login →</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.authPage}>
      <div style={s.authNav}>
        <button style={s.backBtn} onClick={step===1?onBack:()=>setStep(step-1)}>←</button>
        <div style={s.authBrand}>🏪 <b>Lokál Partner</b></div>
        <div style={s.stepBadge}>Step {step}/4</div>
      </div>
      <div style={s.progressBar}><div style={{...s.progressFill,width:`${(step/4)*100}%`,background:"#F59E0B"}}/></div>
      <div style={s.authBody}>
        {step===1 && <>
          <h2 style={s.authTitle}>Create Shop Account</h2>
          <p style={s.authSub}>Basic information about you and your shop</p>
          <div style={s.card}>
            <label style={s.lbl}>Shop Name *</label>
            <input style={s.inp} placeholder="e.g. Sri Sai Mobile Store" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            <label style={s.lbl}>Owner Name *</label>
            <input style={s.inp} placeholder="Your full name" value={form.owner} onChange={e=>setForm(f=>({...f,owner:e.target.value}))} />
            <label style={s.lbl}>Phone Number *</label>
            <input style={s.inp} placeholder="+91 9876543210" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
            <label style={s.lbl}>Email *</label>
            <input style={s.inp} placeholder="shop@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
            <label style={s.lbl}>Password *</label>
            <input style={s.inp} type="password" placeholder="Min 6 characters" value={form.pass} onChange={e=>setForm(f=>({...f,pass:e.target.value}))} />
            <label style={s.lbl}>Confirm Password *</label>
            <input style={s.inp} type="password" placeholder="Repeat password" value={form.confirm} onChange={e=>setForm(f=>({...f,confirm:e.target.value}))} />
            {error && <div style={s.errBox}>❌ {error}</div>}
            <button style={{...s.primaryBtn,background:"#F59E0B",opacity:(form.name&&form.owner&&form.phone&&form.email&&form.pass&&form.confirm)?1:0.45}}
              onClick={()=>{
                if(form.pass!==form.confirm){setError("Passwords don't match");return;}
                setError(""); setStep(2);
              }}>Next: Verify Phone →</button>
          </div>
          <div style={s.switchRow}>Already registered? <button style={s.switchBtn} onClick={onLogin}>Login</button></div>
        </>}

        {step===2 && <>
          <h2 style={s.authTitle}>Verify Phone 📲</h2>
          <p style={s.authSub}>OTP sent to <b>{form.phone}</b></p>
          <div style={s.card}>
            <div style={s.otpSent}>📲 OTP sent successfully! (demo — any 4+ digits work)</div>
            <label style={s.lbl}>Enter OTP</label>
            <div style={s.otpRow}>
              {[0,1,2,3,4,5].map(i=>(
                <input key={i} style={s.otpBox} maxLength={1} value={otp[i]||""} onChange={e=>{
                  const arr=otp.split(""); arr[i]=e.target.value; setOtp(arr.join(""));
                  if(e.target.value&&e.target.nextSibling) e.target.nextSibling.focus();
                }}/>
              ))}
            </div>
            <button style={{...s.primaryBtn,background:"#F59E0B",opacity:otp.length>=4?1:0.45}}
              onClick={()=>{if(otp.length>=4)setStep(3);}}>Verify & Continue →</button>
          </div>
        </>}

        {step===3 && <>
          <h2 style={s.authTitle}>Shop Details 🏪</h2>
          <p style={s.authSub}>Tell us what your shop sells</p>
          <div style={s.card}>
            <label style={s.lbl}>Shop Category *</label>
            <div style={s.catChips}>
              {CATEGORIES.map(c=>(
                <button key={c.id} style={{...s.catChip,...(form.category===c.id?s.catChipA:{})}} onClick={()=>setForm(f=>({...f,category:c.id}))}>{c.icon} {c.label}</button>
              ))}
            </div>
            <div style={{marginTop:16}}>
              <label style={s.lbl}>GST Number <span style={s.optional}>(Recommended)</span></label>
              <input style={s.inp} placeholder="e.g. 36AABCU9603R1ZX" value={form.gst} onChange={e=>setForm(f=>({...f,gst:e.target.value}))} />
              <label style={s.lbl}>Aadhaar Number <span style={s.optional}>(For verification)</span></label>
              <input style={s.inp} placeholder="XXXX XXXX XXXX" maxLength={14} value={form.aadhaar} onChange={e=>setForm(f=>({...f,aadhaar:e.target.value}))} />
              <div style={s.privacyNote}>🔒 Your Aadhaar is only used for identity verification. Never shown publicly.</div>
            </div>
            <button style={{...s.primaryBtn,background:"#F59E0B",opacity:form.category?1:0.45}} onClick={()=>{if(form.category)setStep(4);}}>Next: Set Shop Location →</button>
          </div>
        </>}

        {step===4 && <>
          <h2 style={s.authTitle}>Shop Location 📍</h2>
          <p style={s.authSub}>Customers near your shop will find you</p>
          <div style={s.card}>
            {error && <div style={s.errBox}>❌ {error}</div>}
            {saving && <div style={s.savingMsg}>💾 Saving to database...</div>}
            <LocationPicker onDone={submitToDatabase} />
          </div>
        </>}
      </div>
    </div>
  );
}

function Dashboard({ shop, onLogout }) {
  const [tab, setTab] = useState("requests");
  const [myShop, setMyShop] = useState(shop);
  const [requests, setRequests] = useState([]);
  const [myBids, setMyBids] = useState({});
  const [prices, setPrices] = useState({});
  const [notes, setNotes] = useState({});
  const [deliveryOpt, setDeliveryOpt] = useState({});
  const [chatReq, setChatReq] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const [chatMsg, setChatMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2500); };

  async function loadData() {
    setLoading(true);
    try {
      const freshShopArr = await db.select("shops", `id=eq.${myShop.id}`);
      if(freshShopArr && freshShopArr[0]) setMyShop(freshShopArr[0]);
      const reqs = await db.select("requests", `category=eq.${myShop.category}&status=eq.open&order=created_at.desc`);
      setRequests(reqs||[]);
      if(reqs && reqs.length){
        const ids = reqs.map(r=>r.id).join(",");
        const bids = await db.select("bids", `shop_id=eq.${myShop.id}&request_id=in.(${ids})`);
        const map = {};
        (bids||[]).forEach(b=>{ map[b.request_id] = b; });
        setMyBids(map);
      }
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  useEffect(()=>{ loadData(); }, []);

  useEffect(()=>{
    if(!chatReq) return;
    (async () => {
      try {
                const data = await db.select("messages", `request_id=eq.${chatReq.id}&shop_id=eq.${myShop.id}&order=created_at.asc`);
        setChatLog(data||[]);
      } catch(e) { console.error(e); }
    })();
  }, [chatReq]);

  const sendBid = async (req, available) => {
    try {
      await db.insert("bids", {
        request_id: req.id, shop_id: myShop.id, available,
        price: available ? (prices[req.id]||null) : null,
        delivery: deliveryOpt[req.id]==="pickup" ? false : true,
        eta: available ? "Today" : null,
        note: notes[req.id]||null,
      });
      showToast(available ? "✅ Quote sent!" : "❌ Marked unavailable");
      loadData();
    } catch(e) { showToast("❌ "+e.message); }
  };

  const sendChat = async () => {
    if(!chatMsg.trim())return;
    try {
      await db.insert("messages", {
        request_id: chatReq.id, shop_id: myShop.id, sender: "shop", text: chatMsg,
      });
      setChatLog(p=>[...p,{sender:"shop",text:chatMsg}]);
      setChatMsg("");
    } catch(e) { console.error(e); }
  };

  const toggleOpen = async () => {
    const newState = !myShop.is_open;
    try {
      await db.update("shops", `id=eq.${myShop.id}`, { is_open: newState });
      setMyShop(p=>({...p, is_open:newState}));
    } catch(e) { console.error(e); }
  };

  const cat = CATEGORIES.find(c=>c.id===myShop.category);
  const isPending = myShop.status === "pending";
  const isRejected = myShop.status === "rejected";
  const isSuspended = myShop.status === "suspended";

  if(chatReq) return (
    <div style={s.chatFull}>
      <div style={s.chatNav}>
        <button style={s.backBtn} onClick={()=>setChatReq(null)}>←</button>
        <div style={{flex:1}}>
          <div style={s.chatCustName}>Customer Request</div>
          <div style={s.chatCustSub}>{chatReq.item}</div>
        </div>
      </div>
      <div style={s.chatMessages}>
        {chatLog.length===0 && <div style={s.emptyMini}>No messages yet. Say hello!</div>}
        {chatLog.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.sender==="shop"?"flex-end":"flex-start",marginBottom:10}}>
            <div style={m.sender==="shop"?s.bubbleShop:s.bubbleCust}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={s.chatInputWrap}>
        <input style={s.chatField} placeholder="Reply to customer..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} />
        <button style={{...s.sendBtn,background:"#F59E0B"}} onClick={sendChat}>➤</button>
      </div>
    </div>
  );

  return (
    <div style={s.root}>
      {toast && <div style={s.toast}>{toast}</div>}
      <div style={s.nav}>
        <div style={s.navShop}>
          <div style={s.navShopAv}>{myShop.name[0]}</div>
          <div>
            <div style={s.navShopName}>{myShop.name}</div>
            <div style={s.navShopArea}>📍 {myShop.area}, {myShop.city}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {!isPending && !isRejected && !isSuspended && (
            <button style={{...s.toggleBtn,background:myShop.is_open?"#10B981":"#EF4444"}} onClick={toggleOpen}>
              {myShop.is_open?"🟢 Open":"🔴 Closed"}
            </button>
          )}
          <button style={s.refreshBtn} onClick={loadData}>🔄</button>
          <button style={s.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </div>

      {isPending && (
        <div style={s.pendingBanner}>
          ⏳ Your shop is <b>pending admin approval</b>. You can preview your dashboard but customers won't see your shop until approved. Refresh to check status.
        </div>
      )}
      {isRejected && (
        <div style={{...s.pendingBanner,background:"#FEE2E2",color:"#991B1B"}}>
          ❌ Your shop application was <b>rejected</b>. Contact support for details.
        </div>
      )}
      {isSuspended && (
        <div style={{...s.pendingBanner,background:"#FEE2E2",color:"#991B1B"}}>
          ⛔ Your shop has been <b>suspended</b> by admin. Contact support.
        </div>
      )}

      <div style={s.tabs}>
        {[{k:"requests",l:"📥 Requests"},{k:"profile",l:"🏪 Shop"}].map(t=>(
          <button key={t.k} style={{...s.tab,...(tab===t.k?s.tabA:{})}} onClick={()=>setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tab==="requests" && (
        <div style={s.body}>
          <div style={s.sectionHead}>
            <div style={s.sectionTitle}>Customer Requests Near You</div>
            <div style={s.catTag}>{cat?.icon} {cat?.label}</div>
          </div>
          {loading && <div style={s.loadingBox}>🔄 Loading live requests...</div>}
          {!loading && requests.length===0 && (
            <div style={s.emptyState}>
              <div style={{fontSize:40,marginBottom:10}}>📭</div>
              <div style={s.emptyTitle}>No requests yet</div>
              <div style={s.emptySub}>When customers post a "{cat?.label}" request, it'll show here live!</div>
            </div>
          )}
          {requests.map(req=>{
            const existingBid = myBids[req.id];
            return (
              <div key={req.id} style={s.reqCard}>
                <div style={s.reqTop}>
                  <div style={s.reqAvatar}>👤</div>
                  <div style={{flex:1}}>
                    <div style={s.reqItem}>{req.item}</div>
                    <div style={s.reqMeta}>📍 {req.area} · 🕐 {new Date(req.created_at).toLocaleTimeString()}</div>
                    {req.description && <div style={s.reqDesc}>"{req.description}"</div>}
                    {req.budget && <div style={s.reqBudget}>💰 Budget: {req.budget}</div>}
                  </div>
                </div>

                {!existingBid ? (
                  <div style={s.replySection}>
                    <div style={s.replyRow}>
                      <input style={s.priceInp} placeholder="Your price e.g. ₹950"
                        value={prices[req.id]||""} onChange={e=>setPrices(p=>({...p,[req.id]:e.target.value}))} />
                      <select style={s.selectInp} value={deliveryOpt[req.id]||"delivery"} onChange={e=>setDeliveryOpt(p=>({...p,[req.id]:e.target.value}))}>
                        <option value="delivery">🛵 Delivery</option>
                        <option value="pickup">🏪 Pickup only</option>
                      </select>
                    </div>
                    <input style={{...s.priceInp,width:"100%",boxSizing:"border-box",marginTop:8}}
                      placeholder="Note to customer e.g. Available in blue, size M"
                      value={notes[req.id]||""} onChange={e=>setNotes(p=>({...p,[req.id]:e.target.value}))} />
                    <div style={s.replyBtns}>
                      <button style={s.availBtn} onClick={()=>sendBid(req, true)}>✅ Available — Send Quote</button>
                      <button style={s.notAvailBtn} onClick={()=>sendBid(req, false)}>❌ Not Available</button>
                    </div>
                  </div>
                ) : (
                  <div style={s.repliedRow}>
                    {existingBid.available ? <>
                      <div style={s.quoteSentBadge}>✅ Quote Sent — {existingBid.price||"Price shared"}</div>
                      <button style={s.chatNowBtn} onClick={()=>setChatReq(req)}>💬 Chat</button>
                    </> : <div style={s.notAvailBadge}>❌ Marked Unavailable</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
            )}

      {tab==="profile" && (
        <div style={s.body}>
          <div style={s.profileCard}>
            <div style={s.profileAv}>{myShop.name[0]}</div>
            <div style={s.profileName}>{myShop.name}</div>
            <div style={s.profileRating}>⭐ {myShop.rating||0} · {myShop.reviews||0} reviews</div>
            <div style={{...s.profileBadge,
              background: myShop.status==="approved"?"#D1FAE5":myShop.status==="pending"?"#FEF3C7":"#FEE2E2",
              color: myShop.status==="approved"?"#065F46":myShop.status==="pending"?"#92400E":"#991B1B"}}>
              {myShop.status==="approved"?"✅ Verified Shop":myShop.status==="pending"?"⏳ Pending Approval":myShop.status==="rejected"?"❌ Rejected":"⛔ Suspended"}
            </div>
          </div>
          <div style={s.profileDetails}>
            {[
              {label:"Owner",val:myShop.owner},
              {label:"Phone",val:myShop.phone},
              {label:"Email",val:myShop.email},
              {label:"Category",val:cat?.icon+" "+cat?.label},
              {label:"Location",val:myShop.area+", "+myShop.city},
              {label:"Subscription",val:myShop.subscription||"Free"},
            ].map((d,i)=>(
              <div key={i} style={s.detailRow}><span style={s.detailLabel}>{d.label}</span><span style={s.detailVal}>{d.val}</span></div>
            ))}
          </div>
          <button style={{...s.primaryBtn,background:"#EF4444"}} onClick={onLogout}>🚪 Logout</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [shop, setShop] = useState(null);
  if(screen==="splash")    return <Splash onLogin={()=>setScreen("login")} onRegister={()=>setScreen("register")} />;
  if(screen==="login")     return <Login onSuccess={sh=>{setShop(sh);setScreen("dashboard");}} onRegister={()=>setScreen("register")} onBack={()=>setScreen("splash")} />;
  if(screen==="register")  return <Register onBack={()=>setScreen("splash")} onLogin={()=>setScreen("login")} />;
  if(screen==="dashboard") return <Dashboard shop={shop} onLogout={()=>setScreen("splash")} />;
  return null;
}

const s = {
  root:{fontFamily:"'Inter',system-ui,sans-serif",background:"#F8F9FB",minHeight:"100vh"},
  splash:{fontFamily:"'Inter',system-ui,sans-serif",minHeight:"100vh",background:"#0F172A",display:"flex",flexDirection:"column"},
  splashTop:{flex:1,padding:"48px 24px 24px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},
  splashLogo:{fontSize:52,marginBottom:8},
  splashBrand:{fontWeight:900,fontSize:32,color:"#fff",letterSpacing:"-1px",marginBottom:4},
  partnerBadge:{background:"#F59E0B",color:"#fff",fontSize:14,fontWeight:800,padding:"2px 10px",borderRadius:20,marginLeft:8},
  splashTag:{color:"#4ADE80",fontSize:12,fontWeight:700,marginBottom:12},
  splashDesc:{color:"rgba(255,255,255,0.7)",fontSize:15,lineHeight:1.7,maxWidth:320,marginBottom:28},
  splashBtns:{padding:"24px",display:"flex",flexDirection:"column",gap:10},
  registerBtn:{background:"#F59E0B",color:"#fff",border:"none",padding:"15px",borderRadius:12,fontSize:16,fontWeight:900,cursor:"pointer"},
  loginBtn:{background:"rgba(255,255,255,0.08)",color:"#fff",border:"2px solid rgba(255,255,255,0.2)",padding:"14px",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer"},
  splashFooter:{textAlign:"center",paddingBottom:24,fontSize:13,color:"rgba(255,255,255,0.4)"},
  customerLink:{color:"#F59E0B",fontWeight:700},
  authPage:{fontFamily:"'Inter',system-ui,sans-serif",background:"#F8F9FB",minHeight:"100vh"},
  authNav:{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"},
  authBrand:{fontSize:17,fontWeight:700,color:"#0F172A"},
  backBtn:{background:"none",border:"none",fontSize:20,color:"#374151",cursor:"pointer",width:32,fontWeight:700},
  stepBadge:{fontSize:12,fontWeight:700,color:"#F59E0B",background:"#FFF7ED",padding:"3px 10px",borderRadius:20},
  progressBar:{height:3,background:"#E5E7EB"},
  progressFill:{height:3,transition:"width 0.3s"},
  authBody:{padding:"24px 18px"},
  authTitle:{fontWeight:900,fontSize:24,margin:"0 0 4px",letterSpacing:"-0.5px"},
  authSub:{color:"#6B7280",fontSize:14,marginBottom:20},
  card:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:20,marginBottom:14},
  lbl:{display:"block",fontWeight:700,fontSize:13,color:"#374151",marginBottom:5},
  inp:{width:"100%",boxSizing:"border-box",border:"1.5px solid #E5E7EB",borderRadius:8,padding:"10px 12px",fontSize:14,marginBottom:12,outline:"none",color:"#111",fontFamily:"inherit"},
  primaryBtn:{width:"100%",border:"none",padding:"13px",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",color:"#fff",fontFamily:"inherit"},
  eyeBtn:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,marginTop:-7},
  errBox:{color:"#EF4444",fontSize:13,fontWeight:600,background:"#FEF2F2",padding:"8px 12px",borderRadius:8,marginBottom:12},
  savingMsg:{color:"#4F46E5",fontSize:13,fontWeight:600,background:"#EEF2FF",padding:"8px 12px",borderRadius:8,marginBottom:12},
  demoBox:{background:"#F8F9FB",border:"1px solid #E5E7EB",borderRadius:10,padding:"10px 12px",marginTop:10},
  demoTitle:{fontSize:11,fontWeight:700,color:"#9CA3AF",marginBottom:8,textTransform:"uppercase"},
  demoRow:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",cursor:"pointer",fontSize:12,color:"#374151"},
  useBtn:{color:"#F59E0B",fontWeight:700,fontSize:12},
  switchRow:{textAlign:"center",fontSize:14,color:"#6B7280",marginTop:8},
  switchBtn:{background:"none",border:"none",color:"#F59E0B",fontWeight:700,cursor:"pointer",fontSize:14},
  otpSent:{background:"#D1FAE5",color:"#065F46",fontWeight:700,fontSize:13,padding:"10px 12px",borderRadius:8,marginBottom:16},
  otpRow:{display:"flex",gap:8,justifyContent:"center",marginBottom:16},
  otpBox:{width:42,height:48,textAlign:"center",fontSize:20,fontWeight:800,border:"2px solid #E5E7EB",borderRadius:8,outline:"none",fontFamily:"inherit"},
  catChips:{display:"flex",flexWrap:"wrap",gap:8},
  catChip:{border:"1.5px solid #E5E7EB",background:"#fff",borderRadius:8,padding:"7px 11px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
  catChipA:{border:"1.5px solid #F59E0B",background:"#FFF7ED",color:"#92400E"},
  optional:{color:"#9CA3AF",fontWeight:400,fontSize:11},
  privacyNote:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:8,padding:"9px 11px",fontSize:12,color:"#065F46",lineHeight:1.5,marginBottom:4},
  gpsBtn:{width:"100%",background:"#F59E0B",color:"#fff",border:"none",padding:"12px",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",marginBottom:12,fontFamily:"inherit"},
  orDiv:{textAlign:"center",color:"#9CA3AF",fontSize:12,marginBottom:12},
  cityRow:{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8},
  cBtn:{border:"1.5px solid #E5E7EB",background:"#fff",borderRadius:8,padding:"7px 12px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
  cBtnA:{border:"1.5px solid #F59E0B",background:"#FFF7ED",color:"#92400E"},
  drop:{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #E5E7EB",borderRadius:8,zIndex:99,boxShadow:"0 4px 16px rgba(0,0,0,0.12)",maxHeight:180,overflowY:"auto"},
  dItem:{padding:"10px 14px",fontSize:13,cursor:"pointer",borderBottom:"1px solid #F3F4F6"},
  confirmBtn:{width:"100%",background:"#10B981",color:"#fff",border:"none",padding:"12px",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",marginTop:10,fontFamily:"inherit"},
  successCard:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:24,textAlign:"center"},
  successIcon:{fontSize:52,marginBottom:10},
  successTitle:{fontWeight:900,fontSize:22,margin:"0 0 16px"},
  pendingBox:{background:"#FFFBEB",border:"1.5px solid #FCD34D",borderRadius:12,padding:14,marginBottom:14,textAlign:"left"},
  pendingTitle:{fontWeight:800,color:"#92400E",marginBottom:6,fontSize:14},
  pendingText:{fontSize:13,color:"#78350F",margin:"0 0 4px",lineHeight:1.6},
  nav:{background:"#0F172A",padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},
  navShop:{display:"flex",alignItems:"center",gap:10},
  navShopAv:{width:36,height:36,borderRadius:10,background:"#F59E0B",color:"#fff",fontWeight:900,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  navShopName:{fontWeight:800,fontSize:14,color:"#fff"},
  navShopArea:{fontSize:11,color:"rgba(255,255,255,0.5)"},
  toggleBtn:{border:"none",padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:800,cursor:"pointer",color:"#fff"},
  refreshBtn:{background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",fontSize:13,padding:"5px 10px",borderRadius:8,cursor:"pointer"},
  logoutBtn:{background:"rgba(255,255,255,0.1)",border:"none",color:"rgba(255,255,255,0.7)",fontSize:11,padding:"5px 10px",borderRadius:8,cursor:"pointer"},
  pendingBanner:{background:"#FFFBEB",borderBottom:"1px solid #FCD34D",padding:"10px 14px",fontSize:13,color:"#92400E"},
  toast:{position:"fixed",top:16,right:16,zIndex:999,background:"#111",color:"#fff",fontWeight:700,fontSize:13,padding:"10px 18px",borderRadius:10,boxShadow:"0 4px 16px rgba(0,0,0,0.2)"},
  tabs:{display:"flex",background:"#fff",borderBottom:"1px solid #E5E7EB"},
  tab:{flex:1,border:"none",background:"none",padding:"11px 8px",fontSize:13,fontWeight:700,cursor:"pointer",color:"#9CA3AF",borderBottom:"2px solid transparent"},
  tabA:{color:"#F59E0B",borderBottom:"2px solid #F59E0B"},
  body:{padding:"14px"},
  sectionHead:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12},
  sectionTitle:{fontWeight:900,fontSize:16},
  catTag:{background:"#FFF7ED",color:"#92400E",fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20},
  loadingBox:{textAlign:"center",color:"#9CA3AF",padding:30,fontSize:13},
  emptyMini:{color:"#9CA3AF",fontSize:13,textAlign:"center",padding:20},
  reqCard:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,padding:14,marginBottom:12},
  reqTop:{display:"flex",gap:10,marginBottom:12},
  reqAvatar:{width:38,height:38,borderRadius:10,background:"#7C3AED",color:"#fff",fontWeight:900,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  reqItem:{fontWeight:800,fontSize:14,marginBottom:3},
  reqMeta:{fontSize:12,color:"#9CA3AF",marginBottom:3},
  reqDesc:{fontSize:12,color:"#6B7280",fontStyle:"italic",marginBottom:3},
  reqBudget:{fontSize:12,color:"#059669",fontWeight:700},
  replySection:{borderTop:"1px solid #F3F4F6",paddingTop:12},
  replyRow:{display:"flex",gap:8},
  priceInp:{flex:1,border:"1.5px solid #E5E7EB",borderRadius:8,padding:"9px 11px",fontSize:13,outline:"none",fontFamily:"inherit"},
  selectInp:{border:"1.5px solid #E5E7EB",borderRadius:8,padding:"9px 11px",fontSize:13,outline:"none",width:140,fontFamily:"inherit"},
  replyBtns:{display:"flex",gap:8,marginTop:10},
  availBtn:{flex:1,background:"#10B981",color:"#fff",border:"none",padding:"10px",borderRadius:8,fontWeight:800,cursor:"pointer",fontSize:13,fontFamily:"inherit"},
  notAvailBtn:{flex:1,background:"#FEE2E2",color:"#DC2626",border:"none",padding:"10px",borderRadius:8,fontWeight:800,cursor:"pointer",fontSize:13,fontFamily:"inherit"},
  repliedRow:{borderTop:"1px solid #F3F4F6",paddingTop:10,display:"flex",gap:8,alignItems:"center"},
  quoteSentBadge:{background:"#D1FAE5",color:"#059669",fontSize:12,fontWeight:800,padding:"8px 12px",borderRadius:8,flex:1},
  chatNowBtn:{background:"#FFF7ED",color:"#92400E",border:"1px solid #FCD34D",padding:"8px 14px",borderRadius:8,fontWeight:800,cursor:"pointer",fontSize:12,whiteSpace:"nowrap",fontFamily:"inherit"},
  notAvailBadge:{background:"#FEE2E2",color:"#DC2626",fontSize:12,fontWeight:800,padding:"8px 12px",borderRadius:8,flex:1,textAlign:"center"},
  emptyState:{textAlign:"center",padding:"40px 20px"},
  emptyTitle:{fontWeight:800,fontSize:18,marginBottom:6},
  emptySub:{color:"#9CA3AF",fontSize:14},
  profileCard:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:24,textAlign:"center",marginBottom:14},
  profileAv:{width:60,height:60,borderRadius:"50%",background:"#F59E0B",color:"#fff",fontWeight:900,fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"},
  profileName:{fontWeight:900,fontSize:20,marginBottom:4},
  profileRating:{fontSize:13,color:"#6B7280",marginBottom:10},
  profileBadge:{fontSize:12,fontWeight:700,padding:"5px 14px",borderRadius:20,display:"inline-block"},
  profileDetails:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,overflow:"hidden",marginBottom:14},
  detailRow:{display:"flex",justifyContent:"space-between",padding:"12px 14px",borderBottom:"1px solid #F3F4F6"},
  detailLabel:{fontSize:13,color:"#9CA3AF"},
  detailVal:{fontSize:13,fontWeight:700,color:"#111"},
  chatFull:{fontFamily:"'Inter',system-ui,sans-serif",display:"flex",flexDirection:"column",height:"100vh",background:"#F8F9FB"},
  chatNav:{background:"#0F172A",padding:"12px 14px",display:"flex",alignItems:"center",gap:10},
  chatCustName:{fontWeight:800,fontSize:14,color:"#fff"},
  chatCustSub:{fontSize:11,color:"rgba(255,255,255,0.6)"},
  chatMessages:{flex:1,overflowY:"auto",padding:"14px"},
  bubbleShop:{background:"#F59E0B",color:"#fff",padding:"10px 14px",borderRadius:"16px 16px 4px 16px",maxWidth:260,fontSize:13,lineHeight:1.5},
  bubbleCust:{background:"#fff",color:"#111",padding:"10px 14px",borderRadius:"16px 16px 16px 4px",maxWidth:260,fontSize:13,lineHeight:1.5,border:"1px solid #E5E7EB"},
  chatInputWrap:{background:"#fff",borderTop:"1px solid #E5E7EB",padding:"10px 14px",display:"flex",gap:8,alignItems:"center"},
  chatField:{flex:1,border:"1.5px solid #E5E7EB",borderRadius:22,padding:"10px 14px",fontSize:14,outline:"none",fontFamily:"inherit"},
  sendBtn:{width:40,height:40,borderRadius:"50%",border:"none",color:"#fff",fontWeight:900,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"},
};
