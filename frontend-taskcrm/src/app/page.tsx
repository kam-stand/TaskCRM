"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            src="/crm.png"
            alt="TaskCRM Logo"
            width={150}
            height={150}
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>Welcome to TaskCRM</h1>
        <p className={styles.description}>
          TaskCRM is a modern customer relationship management system designed
          to help teams manage leads, track tasks, and automate notifications —
          all in one streamlined platform.
        </p>

        <div className={styles.authButtons}>
          <button onClick={() => router.push("/auth")}>Go to Auth</button>
        </div>
      </main>
    </div>
  );
}
