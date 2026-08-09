import Head from "next/head";

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
    phase: "Phase 1",
    period: "2026年5月 〜 2027年4月",
    theme: "技術基盤構築（シミュレーション）",
    status: "current",
    desc: "実機を購入する前に、シミュレーション環境で走行・認識・安全停止の成立性を検証する段階。十勝アズキの栽培条件（条間・畝高・生育ステージ）から機体要件を導出し、Isaac Sim上のデジタルツインで夜間認識・自己位置推定・境界保持・安全停止を再現可能な証跡付きで確認する。",
  },
  {
    phase: "Phase 2",
    period: "2027年5月 〜 2027年12月",
    theme: "プロトタイプ実機検証（監視付き）",
    status: "future",
    desc: "シミュレーション検証を通過した構成で実機を調達し、立入管理した小区画・目視監視・物理E-stopのもとで段階検証を行う。作物損傷・除草効果・停止性能・監視工数を計測し、無人夜間運用へ移行できるかを判断する。",
  },
];

const gates = [
  {
    gate: "Gate 0",
    title: "Geometry & ODD",
    period: "2026年8〜9月",
    status: "current",
    desc: "対象作物・生育期・条間・畝高・傾斜・夜間照明・最高速度・監視方式を運行設計領域（ODD）として固定する。機体外形＋安全余白＋工具幅が栽培幾何の中で成立するかを判定し、走行方式と候補機を絞り込む。成立しなければ機体前提を撤回する。",
  },
  {
    gate: "Gate 1",
    title: "Digital Twin v0",
    period: "2026年9〜10月",
    status: "future",
    desc: "候補機のパラメトリックなロボットモデル（URDF/Xacro）を作成し、シミュレータ上で速度指令・座標変換・オドメトリ・緊急停止・10分間の連続走行を、記録データ（rosbag）付きで再現可能な形で確認する。",
  },
  {
    gate: "Gate 2",
    title: "Simulation Evidence",
    period: "2026年10月 〜 2027年2月",
    status: "future",
    desc: "20以上の乱数シード×夜間条件で境界逸脱ゼロ・経路完遂率95%以上を確認する。通信断・GNSS欠測・センサー停止・低電圧といった異常を意図的に注入し、安全停止への遷移を反復検証する。",
  },
  {
    gate: "Gate 3",
    title: "Procurement & Bench",
    period: "2027年2〜5月",
    status: "future",
    desc: "協力圃場の確保と、機体・計算機・センサーの実測評価。積載・重心・消費電力・発熱・低温耐性・保証・納期を確認し、購入可否を決定する。候補は固定せず、検証を通過した構成だけを採用する。",
  },
  {
    gate: "Gate 4",
    title: "Supervised Field PoC",
    period: "2027年5〜12月",
    status: "future",
    desc: "立入管理した小区画で、目視監視下の停止・復帰・境界保持・作物損傷・除草効果・監視工数・10a当たりコストを計測する。無人夜間運用への移行可否をここで判断する。",
  },
];

const principles = [
  {
    key: "実機より先にシミュレーション",
    desc: "機体名を先に決めない。栽培幾何から機体要件を導出し、デジタルツイン上で成立性を確認してから調達する。採用理由だけでなく不採用条件も記録する。",
  },
  {
    key: "安全停止はAIから独立",
    desc: "物理E-stop・通信監視・ジオフェンス・低電圧停止などの安全停止系は、認識AIやLLMから独立させる。AIを安全停止の唯一の根拠にしない。",
  },
  {
    key: "公的ガイドラインを設計入力に",
    desc: "農林水産省『農業機械の自動走行に関する安全性確保ガイドライン』（2026年版）とISO 18497:2024を設計の前提とし、危険源・保護方策・検証証跡を整理する。",
  },
  {
    key: "無人夜間は最終状態",
    desc: "最初から無人運用を目指さない。監視付き・立入制限・小区画から始め、計測データに基づいて段階的に自律度を上げる。",
  },
];

const hypotheses = [
  "週1回・深夜2〜4時の高頻度走行により、広葉雑草を大型化する前に継続的に抑制できるか",
  "夜間LED照明により、逆光・影・日照変動を抑えた安定した作物・雑草認識が可能か",
  "朝露・水滴・グレア条件下での誤認識リスクをどこまでシミュレーションで事前評価できるか",
  "受動型の平鍬アタッチメントで、畝間の除草として実用に足る効果が得られるか",
];

const currentStatus = [
  "研究開発用ワークステーションの構築完了（Ubuntu 24.04 / ROS 2 Jazzy / Isaac Sim / ローカルAI実行環境）",
  "ROS 2の基礎検証完了（トピック通信・独自パッケージ作成）",
  "作物・雑草認識モデルの検討（YOLO系セグメンテーションを実行系、大規模基盤モデルをアノテーション支援に位置付け）",
  "Gate 0（栽培幾何と機体要件の突き合わせ）を実施中",
];

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
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "140px 48px 80px",
  },
  pageLabel: {
    fontSize: "11px",
    letterSpacing: "0.25em",
    color: COLORS.green,
    fontFamily: "'Courier New', monospace",
    marginBottom: "16px",
  },
  pageTitle: {
    fontSize: "clamp(24px, 4vw, 40px)",
    fontWeight: "400",
    color: COLORS.text,
    marginBottom: "16px",
    letterSpacing: "-0.01em",
  },
  pageDesc: {
    fontSize: "15px",
    color: COLORS.textMuted,
    maxWidth: "620px",
    lineHeight: 1.9,
    marginBottom: "12px",
  },
  meta: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.1em",
    color: COLORS.green,
    marginBottom: "64px",
  },
  sectionLabel: {
    fontSize: "10px",
    letterSpacing: "0.3em",
    color: COLORS.green,
    fontFamily: "'Courier New', monospace",
    marginBottom: "16px",
    textTransform: "uppercase",
    marginTop: "72px",
  },
  sectionDesc: {
    fontSize: "14px",
    color: COLORS.textMuted,
    maxWidth: "620px",
    lineHeight: 1.9,
    marginBottom: "32px",
  },
  card: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "2px",
    padding: "28px 32px",
    marginBottom: "1px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "8px",
  },
  gateNum: {
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    color: COLORS.greenBright,
    letterSpacing: "0.1em",
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: "16px",
    color: COLORS.text,
    fontWeight: "400",
  },
  cardPeriod: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    color: COLORS.green,
    letterSpacing: "0.1em",
    marginLeft: "auto",
  },
  cardDesc: {
    fontSize: "13px",
    color: COLORS.textMuted,
    lineHeight: 1.8,
  },
  statusBadge: {
    fontSize: "10px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.15em",
    color: COLORS.greenBright,
    border: `1px solid ${COLORS.green}`,
    borderRadius: "2px",
    padding: "2px 8px",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px",
    fontSize: "14px",
    color: COLORS.textMuted,
    lineHeight: 1.8,
  },
  listDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: COLORS.green,
    marginTop: "10px",
    flexShrink: 0,
  },
  note: {
    fontSize: "12px",
    color: COLORS.textMuted,
    borderLeft: `2px solid ${COLORS.green}`,
    paddingLeft: "20px",
    marginTop: "72px",
    lineHeight: 1.9,
    maxWidth: "620px",
  },
  backLink: {
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
    margin: "80px auto 0",
    padding: "48px 48px 64px",
    borderTop: `1px solid ${COLORS.border}`,
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
};

export default function RoadmapPage() {
  return (
    <>
      <Head>
        <title>Roadmap — Florigen AI</title>
        <meta
          name="description"
          content="Florigen AI 研究開発ロードマップ（公開版）"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/florigen-app-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <div style={s.page}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::selection { background: #4a7c59; color: #e8f0e8; }
          @media (max-width: 640px) {
            .main { padding: 120px 24px 60px !important; }
            .nav { padding: 16px 24px !important; }
            .nav-links { display: none !important; }
            .footer-inner { padding: 40px 24px !important; flex-direction: column; gap: 16px; }
          }
        `}</style>

        {/* Nav */}
        <nav style={s.nav} className="nav">
          <a href="/">
            <img
              src="/florigen-wordmark-dark-bg.svg"
              alt="FLORIGEN AI"
              style={{ height: "18px", display: "block" }}
            />
          </a>
          <div style={s.navLinks} className="nav-links">
            <a href="/#status" style={s.navLink}>Status</a>
            <a href="/#mission" style={s.navLink}>Mission</a>
            <a href="/roadmap" style={{ ...s.navLink, color: COLORS.greenBright }}>Roadmap</a>
            <a href="/#research" style={s.navLink}>Research</a>
            <a href="/#about" style={s.navLink}>About</a>
          </div>
        </nav>

        <main style={s.main} className="main">
          <div style={s.pageLabel}>— ROADMAP</div>
          <h1 style={s.pageTitle}>研究開発ロードマップ</h1>
          <p style={s.pageDesc}>
            Florigen AIの技術開発は、段階的な検証ゲートを通過しながら進めます。
            シミュレーションでの成立性確認を先行させ、実機調達・実圃場検証は
            証跡が揃った段階でのみ着手します。
          </p>
          <div style={s.meta}>公開版 v1.0 — 2026年8月時点</div>

          {/* Phases */}
          <div style={{ ...s.sectionLabel, marginTop: "0" }}>— DEVELOPMENT PHASES</div>
          {phases.map((p) => (
            <div key={p.phase} style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.gateNum}>{p.phase}</span>
                <span style={s.cardTitle}>{p.theme}</span>
                {p.status === "current" && <span style={s.statusBadge}>IN PROGRESS</span>}
                <span style={s.cardPeriod}>{p.period}</span>
              </div>
              <p style={s.cardDesc}>{p.desc}</p>
            </div>
          ))}

          {/* Gates */}
          <div style={s.sectionLabel}>— VALIDATION GATES</div>
          <p style={s.sectionDesc}>
            各ゲートには通過条件を事前に定義し、条件を満たさない限り次の段階へ進みません。
            機体・計算機などのハードウェアは、ゲートを通過した構成のみを採用します。
          </p>
          {gates.map((g) => (
            <div key={g.gate} style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.gateNum}>{g.gate}</span>
                <span style={s.cardTitle}>{g.title}</span>
                {g.status === "current" && <span style={s.statusBadge}>IN PROGRESS</span>}
                <span style={s.cardPeriod}>{g.period}</span>
              </div>
              <p style={s.cardDesc}>{g.desc}</p>
            </div>
          ))}

          {/* Principles */}
          <div style={s.sectionLabel}>— ENGINEERING PRINCIPLES</div>
          {principles.map((p) => (
            <div key={p.key} style={s.card}>
              <div style={{ ...s.cardTitle, marginBottom: "8px", color: COLORS.greenBright, fontSize: "14px", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>
                {p.key}
              </div>
              <p style={s.cardDesc}>{p.desc}</p>
            </div>
          ))}

          {/* Hypotheses */}
          <div style={s.sectionLabel}>— HYPOTHESES TO VALIDATE</div>
          <p style={s.sectionDesc}>
            以下は現時点の仮説であり、シミュレーションと圃場での検証を通じて反証・修正されうるものです。
            現場の知見によるご指摘を歓迎します。
          </p>
          <div style={s.card}>
            {hypotheses.map((h) => (
              <div key={h} style={s.listItem}>
                <div style={s.listDot} />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div style={s.sectionLabel}>— CURRENT STATUS</div>
          <div style={s.card}>
            {currentStatus.map((item) => (
              <div key={item} style={s.listItem}>
                <div style={s.listDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p style={s.note}>
            本ロードマップは検証結果・現場からのフィードバックに応じて更新されます。
            時期はいずれも目標であり、各ゲートの通過状況により変動します。
          </p>

          <div style={{ marginTop: "64px" }}>
            <a href="/" style={s.backLink}>← トップページへ戻る</a>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${COLORS.border}` }}>
          <div style={s.footer} className="footer-inner">
            <div style={s.footerLogo}>FLORIGEN AI</div>
            <div style={s.footerNote}>Research & Development Project — in development</div>
          </div>
        </footer>
      </div>
    </>
  );
}
