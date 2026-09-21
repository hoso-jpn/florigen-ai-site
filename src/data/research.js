// Public research outline. Status describes work in progress, not validated results.
export const updatedAt = "2026-09-21";

export const phases = [
  { num: "01", title: "生育観測・記録の基盤", en: "Observation Baseline", status: "準備・整備中", desc: "小豆の出芽・開花・成熟を対象に、観測項目、画像取得条件、人による記録との比較方法を定める。公開データ解析とローカルAIの実行環境を整備する。" },
  { num: "02", title: "圃場での稠密な観測", en: "Dense Field Observation", status: "研究構想", desc: "センサーと移動基盤を組み合わせ、同じ区画を継続的に観測する。欠測、認識精度、記録に必要な工数を評価する。" },
  { num: "03", title: "育種選抜への有効性評価", en: "Breeding Evaluation", status: "研究構想", desc: "観測頻度と記録精度が、生育評価や育種選抜にどのように寄与するかを、人による観測を基準に検証する。" },
  { num: "04", title: "農業Physical AIへの統合", en: "Autonomous Field Intelligence", status: "長期構想", desc: "観測・認識・記録を基盤として、移動・判断・作業を統合する。除草などの圃場管理への展開は、安全性と実証結果を踏まえて検討する。" },
];

export const currentStatus = [
  "小豆の生育段階を自動観測・記録する研究計画の具体化",
  "作物ゲノム・形質データを扱う再現可能な解析コードの整備",
  "ローカルAI・エッジAIの実行環境と検証手順の整備",
  "センサー構成・移動基盤・観測精度の評価方法の検討",
];

export const publicProjects = [
  { name: "adzuki-snp-pipeline", description: "小豆のシーケンスデータからSNP解析へつなぐパイプライン。" },
  { name: "adzuki-gwas-analysis", description: "小豆の遺伝子型・形質データを用いたGWAS解析。" },
  { name: "genomic-prediction-resnet-hybrid", description: "ゲノム予測モデルの比較と再現性を検証する研究コード。" },
];
