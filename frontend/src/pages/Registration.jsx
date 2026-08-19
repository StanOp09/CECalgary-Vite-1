import { useEffect, useRef, useState } from "react";
import NoSpecialEvents from "../components/layout/NoSpecialEvents";

const EVENT_DATE = new Date("2026-08-30T11:00:00");
const EVENT_EXPIRY = new Date("2026-08-30T14:00:00");
const NAV_H = 64; // px — matches h-16 in NavBar

const STYLES = `
  @keyframes float {
    0%,100% { transform: translateY(0px) rotate(0deg); opacity:.5; }
    50%     { transform: translateY(-18px) rotate(4deg); opacity:1; }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) rotate(0deg); opacity:.3; }
    50%     { transform: translateY(-12px) rotate(-3deg); opacity:.7; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 24px rgba(220,38,38,.4), 0 0 48px rgba(37,99,235,.2); }
    50%     { box-shadow: 0 0 48px rgba(220,38,38,.8), 0 0 90px rgba(37,99,235,.4); }
  }
  @keyframes slideUp {
    from { opacity:0; transform:translateY(48px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(.93); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes countFlip {
    from { transform:translateY(-14px); opacity:0; }
    to   { transform:translateY(0);     opacity:1; }
  }
  @keyframes borderPulse {
    0%,100% { border-color:rgba(245,158,11,.2); }
    50%     { border-color:rgba(245,158,11,.6); }
  }
  @keyframes bgDrift {
    0%,100% { background-position:0% 50%;   }
    50%     { background-position:100% 50%; }
  }
  @keyframes lineExpand {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes spinOnce {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  .ms-shimmer {
    background: linear-gradient(90deg,#dc2626 0%,#fff 25%,#2563eb 50%,#fff 75%,#dc2626 100%);
    background-size:200% auto;
    -webkit-background-clip:text; background-clip:text;
    -webkit-text-fill-color:transparent;
    animation:shimmer 4s linear infinite;
  }
  .ms-glow-btn    { animation:glowPulse 3s ease-in-out infinite; }
  .ms-slide-up    { animation:slideUp .8s cubic-bezier(.16,1,.3,1) both; }
  .ms-fade-in     { animation:fadeIn .9s ease both; }
  .ms-scale-in    { animation:scaleIn .7s cubic-bezier(.16,1,.3,1) both; }
  .ms-count-flip  { animation:countFlip .26s ease both; }
  .ms-border-pulse{ animation:borderPulse 2.2s ease-in-out infinite; }
  .ms-line-expand { animation:lineExpand .9s cubic-bezier(.16,1,.3,1) .25s both; }
  .ms-bg {
    background:linear-gradient(-45deg,#04000e,#060018,#08002a,#0c0018,#04000e);
    background-size:500% 500%;
    animation:bgDrift 14s ease infinite;
  }
  .ms-panel-bg {
    background:linear-gradient(180deg,#08000f 0%,#0a0016 60%,#060010 100%);
  }
`;

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      over: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function RegistrationPage() {
  if (Date.now() > EVENT_EXPIRY.getTime()) return <NoSpecialEvents />;
  return <MabuhayDayPage />;
}

function MabuhayDayPage() {
  const countdown = useCountdown(EVENT_DATE);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    registrationType: "self",
    householdCount: 2,
    attendeeNames: ["", "", "", "", ""],
    needsRide: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [particles] = useState(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      dur: (Math.random() * 6 + 4).toFixed(1),
      delay: (Math.random() * 6).toFixed(1),
      tone: ["red", "blue", "white"][Math.floor(Math.random() * 3)],
    })),
  );

  useEffect(() => {
    if (!BACKEND_URL) return;
    const ctrl = new AbortController();
    fetch(`${BACKEND_URL}/health`, { signal: ctrl.signal }).catch(() => {});
    return () => ctrl.abort();
  }, [BACKEND_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleTypeChange = (type) =>
    setFormData((p) => ({ ...p, registrationType: type }));

  const handleRideChange = (checked) =>
    setFormData((p) => ({ ...p, needsRide: checked }));

  const handleCountChange = (count) =>
    setFormData((p) => ({ ...p, householdCount: count }));

  const handleNameChange = (index, value) =>
    setFormData((p) => {
      const names = [...p.attendeeNames];
      names[index] = value;
      return { ...p, attendeeNames: names };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!BACKEND_URL) {
      alert("Backend not configured.");
      return;
    }
    setLoading(true);
    setFormError("");
    const isHousehold = formData.registrationType === "household";
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      attendees: isHousehold ? formData.householdCount : 1,
      registrationType: formData.registrationType,
      attendeeNames: isHousehold
        ? formData.attendeeNames.slice(0, formData.householdCount)
        : [],
      needsRide: formData.needsRide,
      source: "mabuhay-day",
    };
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed.");
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        registrationType: "self",
        householdCount: 2,
        attendeeNames: ["", "", "", "", ""],
        needsRide: false,
      });
    } catch (err) {
      if (err.name !== "AbortError")
        setFormError(err.message || "Could not register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormError("");
  };

  const formProps = {
    formData,
    onChange: handleChange,
    onTypeChange: handleTypeChange,
    onCountChange: handleCountChange,
    onNameChange: handleNameChange,
    onRideChange: handleRideChange,
    onSubmit: handleSubmit,
    loading,
    submitted,
    formError,
    onReset: resetForm,
    countdown,
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="bg-black text-white pt-16">
        {/* ── SPLIT LAYOUT (desktop lg+) ──────────────────────────────────────── */}
        <div className="hidden lg:flex items-start">
          {/* LEFT — sticky form panel */}
          <aside
            className="hidden lg:flex flex-col flex-shrink-0 w-[340px] xl:w-[380px] ms-panel-bg"
            style={{
              position: "sticky",
              top: `${NAV_H}px`,
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <FormPanel {...formProps} />
          </aside>

          {/* RIGHT — scrollable content */}
          <div className="flex-1 min-w-0 overflow-x-hidden ms-bg">
            {/* particles only on right side */}
            <div className="relative">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y * 2}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    background:
                      p.tone === "red"
                        ? "rgba(220,38,38,0.6)"
                        : p.tone === "blue"
                          ? "rgba(59,130,246,0.6)"
                          : "rgba(255,255,255,0.7)",
                    animation: `${p.id % 2 === 0 ? "float" : "floatB"} ${p.dur}s ease-in-out ${p.delay}s infinite`,
                    zIndex: 0,
                  }}
                />
              ))}
              <HeroContent />
            </div>

            <CardsSection />
            <DetailsBar />
            <TextBlock
              eyebrow="See It For Yourself"
              flag
              lines={["Many Hearts || One Community || One Day", "To Come Together"]}
              accentColor="rgba(220,38,38,.8)"
            />
            <VideoCard
              src="/Mabuhay_day_promovid.mp4"
              ring="hover:ring-red-500/50"
              autoplay
            />
            <TextBlock
              eyebrow="Real Testimonies"
              title="Bri's Testimony"
              text="Hear how God has moved in the life of one of our own."
              accentColor="rgba(59,130,246,.7)"
            />
            <VideoCard src="/bri-testimony.mp4" ring="hover:ring-blue-500/50" />
            <TextBlock
              title="Stanley's Testimony"
              text="Another testimony of faith from someone right here in our Calgary family."
              accentColor="rgba(59,130,246,.7)"
            />
            <VideoCard src="/stanley-testimony.mp4" ring="hover:ring-blue-500/50" />
            <TextBlock
              text="These are just a few of the testimonies waiting to be written on Mabuhay Day. Yours could be next."
              accentColor="rgba(220,38,38,.7)"
            />
            <ExpectSection />
            <RightFooterStrip />
          </div>
        </div>

        {/* ── MOBILE — form first, then content ───────────────────────────────── */}
        <div className="lg:hidden">
          <div
            className="border-b"
            style={{
              borderColor: "rgba(255,255,255,0.07)",
              background: "#08000f",
            }}
          >
            <div className="max-w-lg mx-auto">
              <FormPanel {...formProps} mobile />
            </div>
          </div>
          <div className="ms-bg overflow-x-hidden">
            <HeroContent mobile />
            <CardsSection />
            <DetailsBar />
            <TextBlock
              eyebrow="See It For Yourself"
              flag
              lines={["Many Hearts || One Community || One Day", "To Come Together"]}
              accentColor="rgba(220,38,38,.8)"
            />
            <VideoCard
              src="/Mabuhay_day_promovid.mp4"
              ring="hover:ring-red-500/50"
              autoplay
            />
            <TextBlock
              eyebrow="Real Testimonies"
              title="Bri's Testimony"
              text="Hear how God has moved in the life of one of our own."
              accentColor="rgba(59,130,246,.7)"
            />
            <VideoCard src="/bri-testimony.mp4" ring="hover:ring-blue-500/50" />
            <TextBlock
              title="Stanley's Testimony"
              text="Another testimony of faith from someone right here in our Calgary family."
              accentColor="rgba(59,130,246,.7)"
            />
            <VideoCard src="/stanley-testimony.mp4" ring="hover:ring-blue-500/50" />
            <TextBlock
              text="These are just a few of the testimonies waiting to be written on Mabuhay Day. Yours could be next."
              accentColor="rgba(220,38,38,.7)"
            />
            <ExpectSection />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Form panel (shared between desktop left and mobile bottom) ────────────────

function FormPanel({
  formData,
  onChange,
  onTypeChange,
  onCountChange,
  onNameChange,
  onRideChange,
  onSubmit,
  loading,
  submitted,
  formError,
  onReset,
  countdown,
  mobile,
}) {
  return (
    <div
      className={`flex flex-col h-full ${mobile ? "px-5 py-10" : "px-6 py-8"}`}
    >
      {/* Branding */}
      <div className="text-center mb-5">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase text-amber-400/70 mb-3">
          🇵🇭 Christ Embassy Calgary
        </p>
        <h2
          className="font-raleway font-black leading-none text-white"
          style={{ fontSize: mobile ? "2rem" : "1.75rem" }}
        >
          MABUHAY
          <br />
          <span className="ms-shimmer">DAY</span>
        </h2>
        <p className="mt-2 text-white/40 text-xs font-medium tracking-wider">
          Sunday · August 30, 2026 · 11 AM
        </p>
      </div>

      {/* Compact countdown */}
      <div className="mb-5">
        {countdown.over ? (
          <p className="text-center text-sm font-bold text-amber-300 animate-pulse py-2">
            ✨ Happening now!
          </p>
        ) : (
          <div className="flex justify-center gap-2">
            {[
              { label: "D", value: countdown.days, color: "rgba(220,38,38,.7)" },
              { label: "H", value: countdown.hours, color: "rgba(255,255,255,.6)" },
              { label: "M", value: countdown.minutes, color: "rgba(37,99,235,.7)" },
              { label: "S", value: countdown.seconds, color: "rgba(220,38,38,.7)" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${color}`,
                  }}
                >
                  <span
                    key={value}
                    className="ms-count-flip font-black text-base tabular-nums text-white"
                  >
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className="text-[8px] font-bold tracking-widest uppercase"
                  style={{ color }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
        <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/25">
          Register
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>

      {/* Success state */}
      {submitted ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(52,211,153,0.15)",
              border: "1px solid rgba(52,211,153,0.4)",
            }}
          >
            <svg
              className="w-8 h-8 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="font-raleway font-black text-xl text-white mb-1">
              You&apos;re Registered!
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              We&apos;ll be in touch. See you on
              <br />
              <span className="text-amber-400 font-semibold">
                Sunday, August 30th
              </span>
              .
            </p>
          </div>
          <p className="text-white/25 text-xs mt-2">
            Free entry · Bring a friend
          </p>
          <button
            onClick={onReset}
            className="mt-2 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition"
          >
            + Register another person
          </button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={onSubmit} className="flex flex-col gap-3 flex-1">
          {/* Text fields */}
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              placeholder: "First Last",
              icon: "👤",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "name@email.com",
              icon: "✉️",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              placeholder: "(403) 000-0000",
              icon: "📞",
            },
          ].map(({ label, name, type, placeholder, icon }) => (
            <div key={name}>
              <label
                className="block text-[11px] font-black tracking-widest uppercase mb-1.5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 text-xs select-none">
                  {icon}
                </span>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={onChange}
                  required
                  disabled={loading}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl text-base text-white placeholder-white/20
                             focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-transparent
                             disabled:opacity-40 transition"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Registration type toggle */}
          <div>
            <label
              className="block text-[11px] font-black tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Who are you registering?
            </label>
            <div className="flex gap-2">
              {[
                { value: "self", label: "Just me" },
                { value: "household", label: "Family / Friends" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onTypeChange(value)}
                  disabled={loading}
                  className={`flex-1 py-2 px-2 rounded-xl text-sm font-bold transition-all duration-200
                    ${
                      formData.registrationType === value
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-white/50 hover:text-white/75 hover:bg-white/5"
                    }`}
                  style={{
                    border:
                      formData.registrationType === value
                        ? "1px solid rgba(37,99,235,0.5)"
                        : "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Household count + names */}
          {formData.registrationType === "household" && (
            <>
              <div>
                <label
                  className="block text-[11px] font-black tracking-widest uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  How many people?
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onCountChange(n)}
                      disabled={loading}
                      className={`flex-1 h-9 rounded-xl text-sm font-black transition-all duration-200
                        ${
                          formData.householdCount === n
                            ? "bg-amber-400 text-black shadow-md shadow-amber-400/30"
                            : "text-white/50 hover:text-white/75 hover:bg-white/5"
                        }`}
                      style={{
                        border:
                          formData.householdCount === n
                            ? "none"
                            : "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      {n === 5 ? "5+" : n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label
                    className="block text-[11px] font-black tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Names
                  </label>
                  <span className="text-[9px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.25)" }}>
                    — optional
                  </span>
                </div>
                {Array.from({ length: formData.householdCount }, (_, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Person ${i + 1}`}
                    value={formData.attendeeNames[i]}
                    onChange={(e) => onNameChange(i, e.target.value)}
                    disabled={loading}
                    className="w-full px-3 py-2 rounded-xl text-base text-white placeholder-white/20
                               focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-transparent
                               disabled:opacity-40 transition"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Need a ride? */}
          <div>
            <label
              className="block text-[11px] font-black tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Need a Ride?
            </label>
            <button
              type="button"
              onClick={() => onRideChange(!formData.needsRide)}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-black text-sm transition-all duration-200 flex items-center justify-between disabled:opacity-40"
              style={
                formData.needsRide
                  ? { background: "rgba(37,99,235,0.25)", border: "2px solid rgba(37,99,235,0.7)", color: "#fff" }
                  : { background: "rgba(255,255,255,0.04)", border: "2px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
              }
            >
              <span>{formData.needsRide ? "Yes, I need a ride" : "No, I don't need a ride"}</span>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={
                  formData.needsRide
                    ? { background: "rgba(37,99,235,0.8)" }
                    : { background: "rgba(255,255,255,0.1)" }
                }
              >
                {formData.needsRide && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
            </button>

            {formData.needsRide && (
              <p className="mt-2 text-xs rounded-lg px-3 py-2" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "rgba(255,255,255,0.6)" }}>
                Kindly contact <span className="font-bold text-blue-300">587-200-7291</span> to arrange your ride.
              </p>
            )}
          </div>

          {formError && (
            <p className="text-xs font-semibold text-red-400 text-center px-1 -mb-1">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-auto w-full py-3 rounded-xl font-black text-white text-base
                       bg-gradient-to-r from-red-600 via-red-500 to-blue-600
                       hover:from-red-500 hover:via-red-400 hover:to-blue-500
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-200 hover:scale-[1.02] ms-glow-btn
                       shadow-lg shadow-red-500/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Registering…
              </span>
            ) : (
              "Reserve My Free Seat →"
            )}
          </button>

          <p
            className="text-center text-[10px]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Free entry · All are welcome
          </p>
        </form>
      )}
    </div>
  );
}

// ── Right-side sections ───────────────────────────────────────────────────────

function HeroContent({ mobile }) {
  return (
    <section
      className={`relative z-10 flex flex-col items-center justify-center text-center
                  ${mobile ? "px-5 pt-16 pb-12" : "px-8 pt-20 pb-16"} min-h-[60vh]`}
    >
      <p
        className="ms-fade-in text-[10px] font-black tracking-[0.5em] uppercase text-amber-400 mb-5"
        style={{ animationDelay: "0.05s" }}
      >
        Christ Embassy Calgary · Presents
      </p>

      <h1
        className="ms-slide-up font-raleway font-black tracking-tighter leading-none mb-6"
        style={{
          fontSize: "clamp(3.2rem, 12vw, 8rem)",
          animationDelay: "0.15s",
        }}
      >
        <span className="block text-white">MABUHAY</span>
        <span className="block ms-shimmer">DAY</span>
      </h1>

      <div
        className="ms-line-expand w-40 h-px mb-6"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(245,158,11,0.8),transparent)",
        }}
      />

      <p
        className="ms-fade-in text-white/50 text-base sm:text-lg max-w-sm leading-relaxed"
        style={{ animationDelay: "0.35s" }}
      >
        A joyful celebration of faith, culture & community.
        <br />
        <span className="text-white/75 font-medium">
          Sunday, August 30 · Calgary, AB · Free
        </span>
      </p>

      {/* Scroll hint on desktop (since form is on left) */}
      {!mobile && (
        <p
          className="ms-fade-in mt-8 text-white/20 text-xs font-medium tracking-widest uppercase"
          style={{ animationDelay: "0.6s" }}
        >
          ↓ Scroll to explore
        </p>
      )}
    </section>
  );
}

function CardsSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className="px-5 sm:px-8 py-12 sm:py-20">
      <div
        className={`text-center mb-10 transition-all duration-700 ${visible ? "ms-slide-up" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-amber-400 mb-2">
          The Event
        </p>
        <h2 className="font-raleway text-2xl sm:text-4xl font-black text-white">
          August 30 · Calgary
        </h2>
        <div
          className="mx-auto mt-3 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(245,158,11,.6),transparent)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-700 ${visible ? "ms-scale-in" : "opacity-0 scale-95"}`}
        >
          <div
            className="rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10
                        hover:ring-amber-500/50 hover:-translate-y-2 hover:scale-[1.01]
                        transition-all duration-500"
            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.7)" }}
          >
            <img
              src="/images/mabuhay-day-card.png"
              alt="Mabuhay Day"
              className="w-full h-auto object-cover"
              />
            </div>
          </div>
      </div>
    </section>
  );
}

// Renders a line of text, styling any "||" separators as a subtle divider.
function LineWithDividers({ line }) {
  const parts = line.split("||");
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <span className="mx-2 sm:mx-3 text-white/25 font-normal">||</span>}
      {part.trim()}
    </span>
  ));
}

function TextBlock({ eyebrow, title, text, lines, accentColor = "rgba(245,158,11,.7)", flag = false }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      ref={ref}
      className="px-5 sm:px-8 py-10 sm:py-14 max-w-3xl mx-auto w-full text-center"
    >
      <div
        className={`transition-all duration-700 ${visible ? "ms-slide-up" : "opacity-0 translate-y-8"}`}
      >
        {eyebrow && (
          <p
            className="text-[10px] font-black tracking-[0.4em] uppercase mb-2 flex items-center justify-center gap-2"
            style={{ color: accentColor }}
          >
            {flag && <span className="text-sm">🇵🇭</span>}
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="font-raleway text-2xl sm:text-3xl font-black text-white mb-3">
            {title}
          </h2>
        )}

        {lines ? (
          <div className="max-w-2xl mx-auto leading-relaxed">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${
                  i === 0
                    ? "font-raleway font-black text-xl sm:text-2xl text-white"
                    : "mt-2 font-raleway font-bold text-base sm:text-lg text-white/60"
                }`}
                style={{ transitionDelay: `${i * 0.18}s` }}
              >
                <LineWithDividers line={line} />
              </p>
            ))}
          </div>
        ) : (
          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

function VideoCard({ src, ring, autoplay = false }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className="px-5 sm:px-8 pb-6 max-w-3xl mx-auto w-full">
      <div
        className={`transition-all duration-700 ${visible ? "ms-scale-in" : "opacity-0 scale-95"}`}
      >
        <div
          className={`rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10 ${ring}
                      hover:-translate-y-1 transition-all duration-500 bg-black`}
          style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.7)" }}
        >
          <video
            controls
            preload="metadata"
            className="w-full aspect-video bg-black"
            {...(autoplay ? { autoPlay: true, muted: true, loop: true, playsInline: true } : {})}
          >
            <source src={src} />
          </video>
        </div>
      </div>
    </section>
  );
}

function DetailsBar() {
  const [ref, visible] = useScrollReveal();
  const items = [
    { label: "Date", value: "Sunday, Aug 30" },
    { label: "Time", value: "11 AM" },
    { label: "Location", value: "2925 10 Ave NE, Calgary" },
    { label: "Admission", value: "Free Entry" },
  ];
  return (
    <section
      ref={ref}
      className="px-5 sm:px-8 pb-12 sm:pb-16 max-w-3xl mx-auto w-full"
    >
      <div
        className={`rounded-2xl grid grid-cols-2 sm:grid-cols-4
                    divide-x divide-y sm:divide-y-0 transition-all duration-700
                    ${visible ? "ms-fade-in" : "opacity-0"}`}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          divideColor: "rgba(255,255,255,0.07)",
        }}
      >
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center py-5 px-3 text-center gap-1"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <span className="text-[11px] font-black tracking-widest uppercase text-amber-400/65">
              {label}
            </span>
            <span className="font-bold text-white text-base">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExpectSection() {
  const [ref, visible] = useScrollReveal();
  const items = [
    {
      title: "Warm Hospitality",
      desc: "A welcoming space, Filipino-style — full of warmth.",
      accent: "245,158,11",
    },
    {
      title: "Powerful Message",
      desc: "Real stories of faith from our own community.",
      accent: "59,130,246",
    },
    {
      title: "Vibrant Worship",
      desc: "Music and culture that moves the soul.",
      accent: "220,38,38",
    },
    {
      title: "Community & Fellowship",
      desc: "Come as a stranger. Leave as family.",
      accent: "245,158,11",
    },
  ];
  return (
    <section
      ref={ref}
      className="px-5 sm:px-8 pb-16 sm:pb-24 max-w-3xl mx-auto w-full"
    >
      <div
        className={`text-center mb-8 transition-all duration-700 ${visible ? "ms-slide-up" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-amber-400 mb-2">
          What to Expect
        </p>
        <h2 className="font-raleway text-2xl sm:text-3xl font-black text-white">
          You're Warmly Welcomed
        </h2>
        <div
          className="mx-auto mt-3 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(251,191,36,.6),transparent)",
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center
                        hover:-translate-y-1 transition-all duration-300
                        ${visible ? "ms-slide-up" : "opacity-0 translate-y-8"}`}
            style={{
              animationDelay: `${i * 0.1}s`,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: `2px solid rgba(${item.accent},.6)`,
            }}
          >
            <h3 className="font-raleway font-bold text-white text-xs sm:text-sm mb-1.5">
              {item.title}
            </h3>
            <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RightFooterStrip() {
  return (
    <div
      className="px-8 py-8 text-center"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <p className="text-white/20 text-xs tracking-widest uppercase font-semibold">
        Free entry · Maligayang Pagdating · Bring a friend
      </p>
    </div>
  );
}
