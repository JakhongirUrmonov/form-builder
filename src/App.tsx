import React from "react";
import styles from "./App.module.css";
import TabView from "./components/common/TabView";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className={styles.appContainer}>
        <TabView />
      </div>
    </ErrorBoundary>
  );
};

export default App;
