import IUserData from "../interfaces/IUserData";
import Cards from "./Cards";
import DataGetFromServer from "./DataGetFromServer";
import DataSendToServer from "./DataSendToServer";
import HeaderHeight from "./HeaderHeight";

export default class UserCheck {
	dataSendToServer: DataSendToServer;
	dataGetFromServer: DataGetFromServer;
	cards: Cards;
	headerHeight: HeaderHeight;

	constructor() {
		this.dataSendToServer = new DataSendToServer();
		this.dataGetFromServer = new DataGetFromServer();
		this.cards = new Cards();
		this.headerHeight = new HeaderHeight();
	}

	addHeaderButton(): void {
		const headerButtons = document.querySelector(".header__buttons");

		if (headerButtons !== null) {
			const buttonCreateSerial = document.createElement("div");
			const buttonPushSerial = document.createElement("div");

			buttonCreateSerial.classList.add("header__button", "header__create-serial");
			buttonPushSerial.classList.add("header__button", "header__push-serial");

			buttonCreateSerial.innerHTML = `Додати серіал`;
			buttonPushSerial.innerHTML = `----`;

			headerButtons.prepend(buttonCreateSerial, buttonPushSerial);
		}
	}

	changeButtonAuthorization(): void {
		const buttonClassName = "header__authorization";
		const buttonClassNameNew = "header__authorization-exit";
		const button = document.querySelector(`.${buttonClassName}`);

		if (button !== null) {
			button.innerHTML = `Вийти`;
			button.classList.remove(buttonClassName);
			button.classList.add(buttonClassNameNew);
		}
	}

	userYes(): void {
		this.changeButtonAuthorization();
		this.addHeaderButton();
		this.dataGetFromServer.init();

		this.headerHeight.changeHeaderHeight();
	}

	userNo(): void {
		this.cards.addCard(this.cards.createNoAuthorizationCard());
	}

	init(): void {
		const userData: IUserData | null = this.dataSendToServer.getUserData();
		this.headerHeight.init();

		if (userData !== null) {
			this.userYes();
		} else {
			this.userNo();
		}
	}
}
