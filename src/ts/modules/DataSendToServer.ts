import IDataCard from "../interfaces/IDataCard";
import IUserData from "../interfaces/IUserData";
import ButtonPushControl from "./ButtonPushControl";
import CardChange from "./CardChange";
import FirebaseControl from "./FirebaseControl";
import Modal from "./Modal";

export default class DataSendToServer {
	modal: Modal;
	textError = "Вибачте щось пішло не так, спробуйте вийти та авторізуватися знов";

	constructor() {
		this.modal = new Modal();
	}

	getCardsFromPage(): HTMLElement[] | null {
		const cards = document.querySelectorAll(".serial-card");

		if (cards.length > 0) {
			const cardsList = [...cards] as HTMLElement[];

			return cardsList;
		}

		return null;
	}

	getDataFromCards(): IDataCard[] | null {
		const cardList: HTMLElement[] | null = this.getCardsFromPage();
		const cardData: IDataCard[] = [];

		if (cardList !== null && cardList.length > 0) {
			cardList.forEach((card) => {
				const data: IDataCard | undefined = new CardChange(card).getDataCard();
				if (data !== undefined) {
					cardData.push(data);
				}
			});

			return cardData;
		}

		return null;
	}

	getUserData(): IUserData | null {
		const userDataString: string | null = localStorage.getItem("userData");

		if (userDataString !== null) {
			const userData: IUserData = JSON.parse(userDataString);
			return userData;
		}

		return null;
	}

	async pushToServer(userData: IUserData, dataCard: IDataCard[] | []): Promise<void> {
		this.modal.addModalToPage();
		this.modal.modalLoad("Зачекайте іде відправка даних");

		const firebase = new FirebaseControl();
		const token = await firebase.loginWithEmailPassword(userData.email, userData.password);

		if (token !== "error") {
			const userName = userData.email.split("@")[0];
			const responseToServer = await firebase.sendDataToDatabase(token, userName, dataCard);

			if (responseToServer) {
				this.modal.removeModalToPage();

				const buttonControl = new ButtonPushControl();
				buttonControl.buttonDisable();
			} else {
				this.modal.modalError(this.textError);
			}
		} else {
			this.modal.modalError(this.textError);
		}
	}

	init(): void {
		const userData: IUserData | null = this.getUserData();
		const cardData: IDataCard[] | null = this.getDataFromCards();

		if (userData !== null) {
			if (cardData !== null) {
				this.pushToServer(userData, cardData);
			}

			if (cardData === null) {
				this.pushToServer(userData, []);
			}
		} else {
			this.modal.addModalToPage();
			this.modal.modalError(this.textError);
		}
	}
}
