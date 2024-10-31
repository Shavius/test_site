import IDataCard from "../interfaces/IDataCard";
import IUserData from "../interfaces/IUserData";
import Cards from "./Cards";
import DataSendToServer from "./DataSendToServer";
import FirebaseControl from "./FirebaseControl";
import Modal from "./Modal";
import ParseCard from "./ParseCard";
import ScrollingAfterReboot from "./ScrollingAfterReboot";

export default class DataGetFromServer {
	modal: Modal;
	cards: Cards;

	constructor() {
		this.modal = new Modal();
		this.cards = new Cards();
	}

	async getDataFromServer(userData: IUserData): Promise<void> {
		const cardLoad = this.cards.addCard(this.cards.createCardLoad());
		const firebase = new FirebaseControl();
		const token: string = await firebase.loginWithEmailPassword(userData.email, userData.password);

		if (token !== "error") {
			const userName = userData.email.split("@")[0];
			const cardData: [] | IDataCard[] | null = await firebase.getDataFromDatabase(token, userName);

			if (cardData !== null && cardData.length > 0) {
				cardData.forEach((cardElement) => {
					if (cardElement !== null) {
						const parseCard = new ParseCard(cardElement);
						parseCard.parseOneCard();
					}
				});

				cardLoad?.remove();

				const scrollingAfterReboot = new ScrollingAfterReboot();
				scrollingAfterReboot.restoreScrollPosition();
			} else {
				this.cards.addCard(this.cards.createEmptyCard());
			}
		} else {
			this.modal.addModalToPage();
			this.modal.modalError("Ви не авторізовані, або щось пішло не так, спробуйте знову авторизуватися");
		}
	}

	init(): void {
		const userData: IUserData | null = new DataSendToServer().getUserData();

		if (userData !== null) {
			this.getDataFromServer(userData);
		} else {
			this.modal.addModalToPage();
			this.modal.modalError("Ви не авторізовані, або щось пішло не так, спробуйте знову авторизуватися");
		}
	}
}
