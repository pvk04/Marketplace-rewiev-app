import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import ShopsPage from "./ShopsPage/ShopsPage";
import ChangeRolePage from "./ChangeRolePage/ChangeRolePage";
import RequestsPage from "./RequestsPage/RequestsPage";
import HistoryPage from "./HistoryPage/HistoryPage";
import WorkersPage from "./WorkersPage/WorkersPage";

import styles from "./FunctionalPanel.module.css";

function FunctionalPanel() {
	return (
		<main className={styles.main}>
			<NavBar />
			<Routes>
				<Route path="/shops" element={<ShopsPage />} />
				<Route path="/changerole" element={<ChangeRolePage />} />
				<Route path="/requests" element={<RequestsPage />} />
				<Route path="/history" element={<HistoryPage />} />
				<Route path="/workers" element={<WorkersPage />} />
			</Routes>
		</main>
	);
}

export default FunctionalPanel;
