import Link from "next/link";
import SiteHead from "../components/SiteHead";
import SiteNav from "../components/SiteNav";
import { phases, currentStatus, updatedAt } from "../data/research";

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

const gates = [
  { gate: "Gate 0", title: "観測項目と基準の定義", desc: "対象の生育段階と判定基準を定め、人による観測記録を比較の基準にする。初年度は観測を省略しないベースラインを設ける。" },
  { gate: "Gate 1", title: "画像・センサーによる観測評価", desc: "照明、天候、生育段階による認識精度と欠測を評価する。位置・日時・区画と画像を対応付け、再検証できる記録を残す。" },
  { gate: "Gate 2", title: "移動基盤と安全性の検証", desc: "圃場条件から機体・センサーの要件を導出する。シミュレーションと監視付きの小区画実験で、走行・境界保持・安全停止の成立性を確認する。" },
  { gate: "Gate 3", title: "育種評価への有効性", desc: "観測頻度と精度が選抜判断や評価工数に及ぼす効果を比較する。データ取得量の削減はベースライン取得後に検討し、検証前に効果を断定しない。" },
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
    desc: "対象機体・運用に適用される農林水産省の安全性確保ガイドラインや関連規格について、適用範囲と版を確認し、危険源・保護方策・検証証跡を整理する。",
  },
  {
    key: "無人夜間は最終状態",
    desc: "最初から無人運用を目指さない。監視付き・立入制限・小区画から始め、計測データに基づいて段階的に自律度を上げる。",
  },
];

const hypotheses = [
  "小豆の出芽・開花・成熟を、画像とセンサーからどの程度の精度で観測できるか",
  "人の観測記録に対して、観測頻度を増やすことで生育段階の判定時期をどこまで精密化できるか",
  "夜間照明・朝露・遮蔽・天候の違いが、認識精度と欠測にどう影響するか",
  "稠密な観測が育種選抜の判断や記録工数にどのように寄与するか",
];

const s = {
  page: {
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Georgia', 'Hiragino Mincho ProN', serif",
    minHeight: "100vh",
    lineHeight: 1.8,
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
      <SiteHead title="研究ロードマップ — Florigen AI" description="生育観測・記録から育種評価、農業Physical AIへ。現在の研究方針と検証段階を示すロードマップ。" path="/roadmap" />

      <div style={s.page}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::selection { background: #4a7c59; color: #e8f0e8; }
          @media (max-width: 640px) {
            .main { padding: 160px 24px 60px !important; }

            .footer-inner { padding: 40px 24px !important; flex-direction: column; gap: 16px; }
          }
        `}</style>

        {/* Nav */}
        <SiteNav roadmap />

        <main id="main-content" tabIndex={-1} style={s.main} className="main">
          <div style={s.pageLabel}>— ROADMAP</div>
          <h1 style={s.pageTitle}>研究開発ロードマップ</h1>
          <p style={s.pageDesc}>
            生育観測・記録を入口に、稠密な圃場データが育種選抜に与える効果を研究します。
            以下は検証計画であり、実装済みの機能や実証成果を示すものではありません。
          </p>
          <div style={s.meta}>更新日: <time dateTime={updatedAt}>{updatedAt}</time></div>

          {/* Phases */}
          <div style={{ ...s.sectionLabel, marginTop: "0" }}>— DEVELOPMENT PHASES</div>
          {phases.map((p) => (
            <div key={`Phase ${p.num}`} style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.gateNum}>{`Phase ${p.num}`}</span>
                <span style={s.cardTitle}>{p.title}</span>
                <span style={s.statusBadge}>{p.status}</span>
              </div>
              <p style={s.cardDesc}>{p.desc}</p>
            </div>
          ))}

          {/* Gates */}
          <div style={s.sectionLabel}>— VALIDATION GATES</div>
          <p style={s.sectionDesc}>
            観測基準、評価方法、移動時の安全性を順に具体化します。
            実機調達と実圃場検証は、必要な条件と協力体制を確認してから進めます。
          </p>
          {gates.map((g) => (
            <div key={g.gate} style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.gateNum}>{g.gate}</span>
                <span style={s.cardTitle}>{g.title}</span>
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
            各段階の時期は研究計画・協力体制・検証結果に応じて具体化します。
          </p>

          <div style={{ marginTop: "64px" }}>
            <Link href="/" style={s.backLink}>← トップページへ戻る</Link>
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
