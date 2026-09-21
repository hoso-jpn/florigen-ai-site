import Image from "next/image";
import Link from "next/link";
import SiteHead from "../components/SiteHead";
import SiteNav from "../components/SiteNav";
import { phases, currentStatus, publicProjects, updatedAt } from "../data/research";

const COLORS = {
  bg: "#0a0f0a",
  bgCard: "#0f1a0f",
  green: "#79ae86",
  greenLight: "#6aad7a",
  greenBright: "#8fd4a0",
  text: "#e8f0e8",
  textMuted: "#9db59d",
  border: "#1e3020",
  accent: "#c8e6c9",
};

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

function Section({ children, style, className, id }) {
  return <section id={id} className={className} style={style}>{children}</section>;
}

const s = {
  page: {
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Georgia', 'Hiragino Mincho ProN', serif",
    minHeight: "100vh",
    lineHeight: 1.8,
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
      <SiteHead
        title="Florigen AI — 農業Physical AIと育種研究"
        description="小豆の生育観測・記録を入口に、Offline-firstな農業Physical AIと再現可能なゲノム解析を研究する個人プロジェクト。"
      />

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
            .phase-card { flex-direction: column; gap: 12px !important; padding: 24px !important; }
            .about-block, .status-block { padding: 24px !important; }
            .hero { padding: 160px 24px 60px !important; }
            .hero-logo { height: 76px !important; margin-bottom: 28px !important; }
            .section { padding: 0 24px !important; }
            .footer-inner { padding: 40px 24px !important; flex-direction: column; gap: 16px; }

          }
        `}</style>

        {/* Nav */}
        <SiteNav />

        <main id="main-content" tabIndex={-1}>

          {/* Hero */}
          <div style={s.hero} className="hero">
            <Image
              width={1158}
              height={870}
              unoptimized
              preload
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
              最初の目標は、小豆の生育段階を自動で観測・記録し、育種家の日々の観察を支えることです。
            </p>
          </div>

          {/* Current Status */}
          <Section id="status" style={{ ...s.section, marginBottom: "80px" }} className="section">
            <div style={s.sectionLabel}>— CURRENT STATUS</div>
            <h2 style={s.sectionTitle}>現在の研究・開発状況</h2>
            <p style={s.phaseDesc}>更新日: <time dateTime={updatedAt}>{updatedAt}</time></p>
            <div style={s.statusBlock} className="status-block">
              <p style={{ fontSize: "14px", color: COLORS.textMuted, lineHeight: 1.9, marginBottom: "20px" }}>
                Florigen AIは個人の研究・技術検証プロジェクトです。現在は研究計画と解析基盤の整備を進めています。
              </p>
              {currentStatus.map((item) => (
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
            <h2 style={s.sectionTitle}>育種家の観察を、継続的な記録へ</h2>
            <p style={s.sectionDesc}>
              最初の研究テーマは、小豆の出芽期・開花始まり・開花期・成熟期・完熟期の観測と記録です。
              人による観測を基準に、画像やセンサーから生育段階をどこまで捉えられるかを検証します。
            </p>
            <p style={{ ...s.sectionDesc, marginBottom: "0" }}>
              観測頻度・精度・欠測・記録工数を評価し、稠密な圃場データが育種選抜に与える効果を調べます。
              自律移動や除草への展開は、この観測基盤を踏まえた長期的な構想です。
            </p>
          </Section>

          {/* Roadmap */}
          <Section id="roadmap" style={{ ...s.section, marginBottom: "80px" }} className="section">
            <div style={s.sectionLabel}>— ROADMAP</div>
            {phases.map((phase) => (
              <div key={phase.num} style={s.card} className="phase-card">
                <div style={s.phaseNum}>Phase {phase.num}</div>
                <div>
                  <div style={s.phaseTitle}>{phase.title}</div>
                  <div style={s.phaseEn}>{phase.en}</div>
                  <p style={s.phaseDesc}>{phase.status}</p>
                  <div style={s.phaseDesc}>{phase.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "32px" }}>
              <Link href="/roadmap" style={s.link}>詳細ロードマップを見る →</Link>
            </div>
          </Section>

          {/* Research Areas */}
          <Section id="research" style={{ ...s.section, marginBottom: "80px" }} className="section">
            <div style={s.sectionLabel}>— RESEARCH AREAS</div>
            <p style={s.sectionDesc}>
              Florigen AIは植物遺伝学から農業ロボティクスまでを横断します。
              研究から実装までを一貫して扱い、農業現場で利用可能な知能システムの構築を目指します。
            </p>
            <h2 style={s.sectionTitle}>公開している研究コード</h2>
            <p style={s.phaseDesc}>各リポジトリのREADMEで、実装状況・再現手順・制約を確認できます。</p>
            <div style={s.links}>
              {publicProjects.map((project) => (
                <article key={project.name} style={{ width: "100%", minWidth: 0 }}>
                  <a href={`https://github.com/hoso-jpn/${project.name}`} style={{ ...s.link, overflowWrap: "anywhere" }} target="_blank" rel="noreferrer">{project.name} ↗</a>
                  <p style={s.phaseDesc}>{project.description}</p>
                </article>
              ))}
            </div>
            <p style={{ ...s.phaseDesc, marginTop: "24px" }}>
              再現可能なコード・公開データの解析・技術文書を共有します。
              顧客データ・独自のSNPパネル・事業上の機密情報は公開対象に含めません。
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
              生育観測・記録と育種評価をつなぐ研究計画を具体化しています。
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
            <div style={s.aboutBlock} className="about-block">
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
                <a href="https://blog.florigen.ai/" style={s.link} target="_blank" rel="noreferrer">Blog</a>
              </div>
            </div>
          </Section>

        </main>

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
