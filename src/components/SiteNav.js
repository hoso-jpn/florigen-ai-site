import Image from "next/image";
import Link from "next/link";
import styles from "./SiteNav.module.css";

const links = [
  ["/#status", "Status"],
  ["/#mission", "Mission"],
  ["/roadmap", "Roadmap"],
  ["/#research", "Research"],
  ["/#about", "About"],
];

export default function SiteNav({ roadmap = false }) {
  return (
    <>
      <a className="skip-link" href="#main-content">本文へスキップ</a>
      <nav className={styles.nav} aria-label="メインナビゲーション">
        <Link href="/" aria-label="Florigen AI トップページ">
          <Image src="/florigen-wordmark-dark-bg.svg" alt="FLORIGEN AI" width={1154} height={233} unoptimized className={styles.logo} />
        </Link>
        <div className={styles.links}>
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={roadmap && href === "/roadmap" ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
