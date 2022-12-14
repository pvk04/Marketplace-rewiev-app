import React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/context";

import styles from "./ModalAuth.module.css";

function ModalAuth() {
	const navigate = useNavigate();
	const [state, dispatch] = React.useContext(AppContext);
	const [login, setLogin] = React.useState("");
	const [password, setPassword] = React.useState("");

	async function reg() {
		let bytesPass = await state.web3.utils.soliditySha3({
			type: "string",
			value: password,
		});
		await state.contractInstance.methods
			.registration(bytesPass)
			.send({ from: login }, (error) => {
				if (!error) {
					alert("You succesfully registered");
				}
			});
	}

	async function auth() {
		let bytesPass = await state.web3.utils.soliditySha3({
			type: "string",
			value: password,
		});
		let resp = await state.contractInstance.methods
			.login(bytesPass)
			.call({ from: login });

		if (resp) {
			setLogin("");
			setPassword("");
			dispatch({ type: "SET_CURRENT", payload: login });
			let userInfo = await state.contractInstance.methods
				.users(login)
				.call({ from: login });
			dispatch({ type: "SET_ROLE", payload: userInfo.role });
			dispatch({ type: "SET_ACTIVEROLE", payload: userInfo.activeRole });
			dispatch({ type: "USER_LOGIN" });
			navigate("/profile");
		} else {
			alert("Incorrect address or password");
			setPassword("");
		}
	}

	async function authShop() {
		let bytesPass = await state.web3.utils.soliditySha3({
			type: "string",
			value: password,
		});
		let resp = await state.contractInstance.methods
			.shopLogin(bytesPass)
			.call({ from: login });
		if (resp) {
			setLogin("");
			setPassword("");
			dispatch({ type: "SET_CURRENT", payload: login });
			dispatch({ type: "SET_ROLE", payload: 3 });
			dispatch({ type: "SET_ACTIVEROLE", payload: 3});
			dispatch({ type: "USER_LOGIN" });
			navigate("/profile");
		} else {
			alert("Incorrect address or password");
			setPassword("");
		}
	}

	return (
		<div className={styles.modal_wrap}>
			<div className={styles.modal_auth}>
				<div className={styles.modal_auth_content}>
					<h1>Login/Register</h1>
					<div className={styles.content_div}>
						<p>Address:</p>
						<input
							type="text"
							className={styles.auth_inp}
							value={login}
							onChange={(e) => {
								setLogin(e.target.value);
							}}
						/>
					</div>
					<div className={styles.content_div}>
						<p>Password:</p>
						<input
							type="password"
							className={styles.auth_inp}
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className={styles.buttons_div}>
						<button className={styles.login_button} onClick={auth}>
							Login
						</button>
						<button className={styles.login_button} onClick={authShop}>
							Login shop
						</button>
						<button className={styles.reg_button} onClick={reg}>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalAuth;
