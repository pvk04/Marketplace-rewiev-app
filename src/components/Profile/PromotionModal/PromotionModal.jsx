import React from "react";
import { AppContext } from "../../../contexts/context";

import styles from "./PromotionModal.module.css";

function PromotionModal({ active, setActive }) {
	const [state, dispatch] = React.useContext(AppContext);
	const [shops, setShops] = React.useState([]);
	const [selected, setSelected] = React.useState(undefined);

	function close(e) {
		if (e.currentTarget === e.target) {
			setActive(false);
		}
	}

	async function createRequest() {
		console.log(selected);
		await state.contractInstance.methods
			.requestToChangeRole(selected, 1)
			.send({ from: state.currentAcc, gas: "672195" });
		await state.contractInstance.methods
			.addHistory(
				state.currentAcc,
				`You have applied for the role of a seller in store ${shops[selected].shop_address}`
			)
			.send({ from: state.currentAcc, gas: "6721975" });
		dispatch({ type: "ACTIVITY" });
		alert("Request successfully created");
		setSelected(undefined);
		setActive(false);
	}

	React.useEffect(() => {
		async function shopList() {
			try {
				let shops = await state.contractInstance.methods
					.showShops()
					.call({ from: state.currentAcc });
				setShops(shops);
			} catch (error) {
				//todo
			}
		}
		shopList();
	}, []);

	return (
		<div
			className={active ? styles.modal_wrap : styles.hide}
			onClick={(e) => {
				close(e);
			}}
		>
			<div className={styles.modal_prom}>
				<div className={styles.modal_prom_content}>
					<h1>Role promotion request</h1>
					<div className={styles.content_div}>
						<p>Shop:</p>
						<select
							value={selected}
							onChange={(e) => setSelected(e.target.value)}
						>
							{shops.map((shop, index) => {
								if (
									shop.shop_address !=
									"0x0000000000000000000000000000000000000000"
								) {
									if (selected == undefined) {
										setSelected(index);
									}
									return (
										<option value={index} key={index}>
											{shop.shop_address}
										</option>
									);
								}
							})}
						</select>
					</div>
					<div className={styles.buttons_div}>
						<button onClick={createRequest}>Create</button>
					</div>
					<button
						className={styles.close_modal}
						onClick={() => {
							setActive(false);
						}}
					>
						<img src="/assets/close.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default PromotionModal;
