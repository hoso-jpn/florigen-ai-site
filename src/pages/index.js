import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0f0a",
  bgCard: "#0f1a0f",
  green: "#4a7c59",
  greenLight: "#6aad7a",
  greenBright: "#8fd4a0",
  text: "#e8f0e8",
  textMuted: "#7a9a7a",
  border: "#1e3020",
  accent: "#c8e6c9",
};

const phases = [
  {
    num: "01",
    title: "自律移動型ロボット除草機",
    en: "Robotic Weeding",
    desc: "中耕除草・畦間除草を支援する自律移動ロボットの実装。圃場を理解する知能体の基盤を構築する。",
  },
  {
    num: "02",
    title: "圃場マッピング",
    en: "Field Mapping",
    desc: "雑草分布・生育状態・土壌サンプリング地点・作業履歴を記録する圃場情報基盤。",
  },
  {
    num: "03",
    title: "圃場意思決定支援",
    en: "Field Decision Support",
    desc: "センシングデータと作業履歴をもとに、施肥・防除・土壌管理の判断を支援する。",
  },
  {
    num: "04",
    title: "Autonomous Field Intelligence",
    en: "Full Integration",
    desc: "複数のロボット・センサー・ローカルAIが協調し、農地を継続的に観察・理解・管理するインフラへ。",
  },
];

const principles = [
  {
    key: "Offline-first",
    desc: "農地では常時クラウド接続を前提にできない。通信環境に依存しない現場完結型のシステムを重視する。",
  },
  {
    key: "Local Intelligence",
    desc: "ローカルAI・エッジコンピューティング・ローカルLLMを活用し、圃場で完結する知能の実現を目指す。",
  },
  {
    key: "Orchestration",
    desc: "センシング・認識・判断・移動・記録を個別機能ではなく協調して動作するシステムとして設計する。",
  },
  {
    key: "Physical AI",
    desc: "AIを予測モデルで終わらせない。実世界を観察し、移動し、行動する知能として実装する。",
  },
];

const researchAreas = [
  "Plant Genetics", "Bioinformatics", "GWAS",
  "Genomic Prediction", "Agricultural AI", "Edge AI",
  "Robotics", "Local LLM", "Physical AI",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Section({ children, style, className, id }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

const s = {
  page: {
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Georgia', 'Hiragino Mincho ProN', serif",
    minHeight: "100vh",
    lineHeight: 1.8,
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 48px",
    background: "rgba(10,15,10,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  logo: {
    fontSize: "15px",
    letterSpacing: "0.2em",
    color: COLORS.greenBright,
    fontFamily: "'Courier New', monospace",
    fontWeight: "700",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    fontSize: "12px",
    letterSpacing: "0.15em",
  },
  navLink: {
    color: COLORS.textMuted,
    textDecoration: "none",
  },
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "120px 48px 80px",
    maxWidth: "900px",
    margin: "0 auto",
    position: "relative",
  },
  heroLogo: {
    height: "112px",
    width: "auto",
    display: "block",
    marginBottom: "40px",
  },
  heroLabel: {
    fontSize: "11px",
    letterSpacing: "0.25em",
    color: COLORS.green,
    fontFamily: "'Courier New', monospace",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 56px)",
    fontWeight: "400",
    lineHeight: 1.25,
    color: COLORS.text,
    marginBottom: "24px",
    letterSpacing: "-0.02em",
  },
  heroAccent: {
    color: COLORS.greenBright,
    fontStyle: "italic",
  },
  heroDesc: {
    fontSize: "16px",
    color: COLORS.textMuted,
    maxWidth: "580px",
    lineHeight: 1.9,
    marginBottom: "16px",
  },
  divider: {
    width: "48px",
    height: "1px",
    background: COLORS.green,
    margin: "64px 0",
  },
  section: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 48px",
  },
  sectionLabel: {
    fontSize: "10px",
    letterSpacing: "0.3em",
    color: COLORS.green,
    fontFamily: "'Courier New', monospace",
    marginBottom: "16px",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "clamp(20px, 3vw, 32px)",
    fontWeight: "400",
    color: COLORS.text,
    marginBottom: "16px",
    letterSpacing: "-0.01em",
  },
  sectionDesc: {
    fontSize: "15px",
    color: COLORS.textMuted,
    maxWidth: "560px",
    lineHeight: 1.9,
    marginBottom: "48px",
  },
  card: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "2px",
    padding: "28px 32px",
    marginBottom: "1px",
    display: "flex",
    gap: "32px",
    alignItems: "flex-start",
  },
  phaseNum: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    color: COLORS.green,
    letterSpacing: "0.1em",
    minWidth: "32px",
    paddingTop: "4px",
  },
  phaseTitle: {
    fontSize: "16px",
    color: COLORS.text,
    marginBottom: "4px",
    fontWeight: "400",
  },
  phaseEn: {
    fontSize: "11px",
    color: COLORS.green,
    letterSpacing: "0.15em",
    fontFamily: "'Courier New', monospace",
    marginBottom: "10px",
  },
  phaseDesc: {
    fontSize: "13px",
    color: COLORS.textMuted,
    lineHeight: 1.8,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1px",
    marginBottom: "1px",
  },
  principleCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "2px",
    padding: "28px 28px",
  },
  principleKey: {
    fontSize: "13px",
    color: COLORS.greenBright,
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.1em",
    marginBottom: "12px",
    fontWeight: "700",
  },
  principleDesc: {
    fontSize: "13px",
    color: COLORS.textMuted,
    lineHeight: 1.8,
  },
  tagCloud: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "24px",
  },
  tag: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.1em",
    color: COLORS.green,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "2px",
    padding: "6px 14px",
    background: COLORS.bgCard,
  },
  missionBlock: {
    borderLeft: `2px solid ${COLORS.green}`,
    paddingLeft: "28px",
    margin: "32px 0",
  },
  missionText: {
    fontSize: "22px",
    color: COLORS.text,
    fontStyle: "italic",
    lineHeight: 1.6,
    letterSpacing: "-0.01em",
  },
  statusBlock: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "2px",
    padding: "28px 32px",
  },
  statusItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px",
    fontSize: "14px",
    color: COLORS.textMuted,
    lineHeight: 1.7,
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: COLORS.green,
    marginTop: "8px",
    flexShrink: 0,
  },
  aboutBlock: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "2px",
    padding: "40px 40px",
  },
  aboutName: {
    fontSize: "18px",
    color: COLORS.text,
    marginBottom: "4px",
  },
  aboutRole: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.2em",
    color: COLORS.green,
    marginBottom: "20px",
  },
  aboutDesc: {
    fontSize: "14px",
    color: COLORS.textMuted,
    lineHeight: 1.9,
    maxWidth: "520px",
  },
  links: {
    display: "flex",
    gap: "24px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  link: {
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.15em",
    color: COLORS.greenBright,
    textDecoration: "none",
    borderBottom: `1px solid ${COLORS.green}`,
    paddingBottom: "2px",
  },
  footer: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 48px 64px",
    borderTop: `1px solid ${COLORS.border}`,
    marginTop: "80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLogo: {
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.2em",
    color: COLORS.green,
  },
  footerNote: {
    fontSize: "11px",
    color: COLORS.textMuted,
    letterSpacing: "0.05em",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: COLORS.greenBright,
    display: "inline-block",
    animation: "pulse 2s infinite",
  },
};

export default function FlorigenSite() {
  return (
    <>
      <Head>
        <title>Florigen AI — Agriculture Physical AI</title>
        <meta
          name="description"
          content="オフライン環境でも動作する農業Physical AIの研究開発プロジェクト。中耕除草・畦間除草を支援する自律移動ロボットの実装から始まる。"
        />
        <meta property="og:title" content="Florigen AI" />
        <meta
          property="og:description"
          content="圃場を移動し、観察し、理解し、行動するPhysical AIをつくる"
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/florigen-app-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <div style={s.page}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::selection { background: #4a7c59; color: #e8f0e8; }
          @media (max-width: 640px) {
            .grid2 { grid-template-columns: 1fr !important; }
            .hero { padding: 100px 24px 60px !important; }
            .hero-logo { height: 76px !important; margin-bottom: 28px !important; }
            .section { padding: 0 24px !important; }
            .nav { padding: 16px 24px !important; }
            .footer-inner { padding: 40px 24px !important; flex-direction: column; gap: 16px; }
            .nav-links { display: none !important; }
          }
        `}</style>

        {/* Nav */}
        <nav style={s.nav} className="nav">
          <img
            src="/florigen-wordmark-dark-bg.svg"
            alt="FLORIGEN AI"
            style={{ height: "18px", display: "block" }}
          />
          <div style={s.navLinks} className="nav-links">
            <a href="#status" style={s.navLink}>Status</a>
            <a href="#mission" style={s.navLink}>Mission</a>
            <a href="#roadmap" style={s.navLink}>Roadmap</a>
            <a href="#research" style={s.navLink}>Research</a>
            <a href="#about" style={s.navLink}>About</a>
          </div>
        </nav>

        {/* Hero */}
        <div style={s.hero} className="hero">
          <img
            src="/florigen-logo-hero-dark-bg.svg"
            alt="Florigen AI"
            style={s.heroLogo}
            className="hero-logo"
          />
          <div style={s.heroLabel}>
            <span style={s.dot} />
            RESEARCH & DEVELOPMENT PROJECT
          </div>
          <h1 style={s.heroTitle}>
            圃場を移動し、観察し、<br />
            理解し、行動する<br />
            <span style={s.heroAccent}>Physical AI</span>をつくる
          </h1>
          <p style={s.heroDesc}>
            Florigen AIは、オフライン環境でも動作する農業Physical AIの研究開発プロジェクトです。
          </p>
          <p style={s.heroDesc}>
            最初の目標は、中耕除草・畦間除草を支援する自律移動ロボットの実装から始まります。
          </p>
        </div>

        {/* Current Status */}
        <Section id="status" style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— CURRENT STATUS</div>
          <h2 style={s.sectionTitle}>現在の開発状況</h2>
          <div style={s.statusBlock}>
            <p style={{ fontSize: "14px", color: COLORS.textMuted, lineHeight: 1.9, marginBottom: "20px" }}>
              Florigen AIは現在、構想設計・技術検証・プロトタイピングの準備段階にあります。
            </p>
            {[
              "圃場移動ロボットのシミュレーション環境設計（ROS2 / Isaac Sim）",
              "作物・雑草認識モデルの検討（YOLO系モデル / エッジAI）",
              "ローカルAI実行環境の構築",
              "作物ゲノム・形質データを扱う解析基盤の整備（GitHub公開中）",
            ].map((item) => (
              <div key={item} style={s.statusItem}>
                <div style={s.statusDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div style={s.divider} />
        </Section>

        {/* Mission */}
        <Section id="mission" style={{ ...s.section }} className="section">
          <div style={s.sectionLabel}>— MISSION</div>
          <div style={s.missionBlock}>
            <div style={s.missionText}>
              人間が寝ている間に<br />農地を管理するAIインフラを構築する
            </div>
          </div>
          <p style={{ ...s.sectionDesc, marginBottom: "0" }}>
            農業現場では、人手不足・熟練技術の継承・雑草管理・圃場記録・不安定な通信環境といった課題が存在します。
            Florigen AIは、クラウド接続を前提としないOffline-firstな設計思想に基づき、
            ローカルAI・センシング・ロボティクスを統合したPhysical AIの実現を目指します。
          </p>
          <div style={s.divider} />
        </Section>

        {/* Technical Principles */}
        <Section style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— TECHNICAL PRINCIPLES</div>
          <div style={s.grid2} className="grid2">
            {principles.map((p) => (
              <div key={p.key} style={s.principleCard}>
                <div style={s.principleKey}>{p.key}</div>
                <div style={s.principleDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* First Goal */}
        <Section style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— FIRST GOAL</div>
          <h2 style={s.sectionTitle}>圃場を移動できる知能体をつくる</h2>
          <p style={s.sectionDesc}>
            最初の研究開発テーマは、中耕除草・畦間除草を支援する自律移動型ロボットです。
            除草は、圃場を移動するPhysical AIを実装するための最初の入口です。
          </p>
          <p style={{ ...s.sectionDesc, marginBottom: "0" }}>
            圃場を移動することで、作物・雑草の識別、雑草発生マッピング、
            生育状態の観察、圃場情報の記録を実現し、
            将来的な施肥判断・防除判断・圃場管理の基盤となります。
          </p>
        </Section>

        {/* Roadmap */}
        <Section id="roadmap" style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— ROADMAP</div>
          {phases.map((phase) => (
            <div key={phase.num} style={s.card}>
              <div style={s.phaseNum}>Phase {phase.num}</div>
              <div>
                <div style={s.phaseTitle}>{phase.title}</div>
                <div style={s.phaseEn}>{phase.en}</div>
                <div style={s.phaseDesc}>{phase.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "32px" }}>
            <a href="/roadmap" style={s.link}>詳細ロードマップを見る →</a>
          </div>
        </Section>

        {/* Research Areas */}
        <Section id="research" style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— RESEARCH AREAS</div>
          <p style={s.sectionDesc}>
            Florigen AIは植物遺伝学から農業ロボティクスまでを横断します。
            研究から実装までを一貫して扱い、農業現場で利用可能な知能システムの構築を目指します。
          </p>
          <div style={s.tagCloud}>
            {researchAreas.map((a) => (
              <div key={a} style={s.tag}>{a}</div>
            ))}
          </div>
          <div style={s.divider} />
        </Section>

        {/* Research Collaboration */}
        <Section style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— RESEARCH COLLABORATION</div>
          <h2 style={s.sectionTitle}>共同研究・技術検証に向けた準備を進めています</h2>
          <p style={s.sectionDesc}>
            Florigen AIは研究開発プロジェクトです。
            大学・研究機関・公設試験場・農業関連企業との共同研究・技術検証を見据え、
            圃場移動ロボット・雑草認識・圃場マッピングの実装を進めています。
          </p>
        </Section>

        {/* Why Florigen */}
        <Section style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— WHY FLORIGEN?</div>
          <p style={{ ...s.sectionDesc, maxWidth: "640px" }}>
            Florigenは植物の開花を制御する全身性シグナルとして知られています。
            植物体内で情報を伝達し、発生と成長を調整するその仕組みに着想を得て、
            Florigen AIという名前を選びました。
          </p>
          <p style={{ ...s.sectionDesc, maxWidth: "640px" }}>
            植物・環境・機械・AIが協調する新しい農業インフラを構想しています。
          </p>
        </Section>

        {/* About */}
        <Section id="about" style={{ ...s.section, marginBottom: "80px" }} className="section">
          <div style={s.sectionLabel}>— ABOUT</div>
          <div style={s.aboutBlock}>
            <div style={s.aboutName}>Yusuke Hosokawa</div>
            <div style={s.aboutRole}>FLORIGEN AI — INITIATOR</div>
            <p style={s.aboutDesc}>
              北海道立総合研究機構において、作物研究および農業データ解析に6年間従事。
              Plant Genetics・Bioinformatics・Genomic Prediction・Agricultural AIを専門領域とし、
              現在はAIエンジニアとして実務経験を積みながら、
              農業向けOffline-first Physical AIの研究開発に取り組んでいます。
            </p>
            <div style={s.links}>
              <a href="https://github.com/hoso-jpn" style={s.link} target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://researchmap.jp/hosokawa-yusuke" style={s.link} target="_blank" rel="noreferrer">researchmap</a>
              <a href="https://lapras.com/public/CEV7BBV" style={s.link} target="_blank" rel="noreferrer">LAPRAS</a>
              <a href="https://philosophizing-with-ai.vercel.app/" style={s.link} target="_blank" rel="noreferrer">Essays</a>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: "80px" }}>
          <div style={{ ...s.footer }} className="footer-inner">
            <div style={s.footerLogo}>FLORIGEN AI</div>
            <div style={s.footerNote}>Research & Development Project — in development</div>
          </div>
        </footer>
      </div>
    </>
  );
}
