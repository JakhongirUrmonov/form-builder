import React, { useState } from "react";
import styles from "../../App.module.css";
import ConfigTab from "../configTab/ConfigTab";
import { useFormState } from "../../hooks/useFormState";
import FormGenerator from "../formGenerator/FormGenerator";

const TabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"config" | "result">("config");
  const formState = useFormState();

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <button
            onClick={() => setActiveTab("config")}
            className={`${styles.navButton} ${
              activeTab === "config" ? styles.active : ""
            }`}
          >
            Config
          </button>
          <button
            onClick={() => setActiveTab("result")}
            className={`${styles.navButton} ${
              activeTab === "result" ? styles.active : ""
            }`}
          >
            Result
          </button>
        </nav>
      </header>
      <main className={styles.mainContent}>
        {activeTab === "config" ? (
          <ConfigTab formState={formState} />
        ) : (
          <FormGenerator formState={formState} />
        )}
      </main>
    </div>
  );
};

export default TabView;
