import type IDataCard from "../interfaces/IDataCard";
import ILinkData from "../interfaces/ILinkData";
import ButtonPushControl from "./ButtonPushControl";
import DateControl from "./DateControl";
import ParseCard from "./ParseCard";

export default class CreateFormCard {
	pageBody: HTMLElement | null;
	buttonControl: ButtonPushControl;

	constructor() {
		this.pageBody = document.querySelector("body");
		this.buttonControl = new ButtonPushControl();
	}

	createLinkInputs(linkName = "", linkUrl = ""): HTMLElement {
		const modalLinkInputs = document.createElement("div");
		modalLinkInputs.classList.add("modal-link-inputs");

		modalLinkInputs.innerHTML = `
		<div class="modal-link-top">
			<div class="modal-link-inputs__site-name modal-link-name">Назва сайту</div>
			<div class="modal-link-delete">Видалити</div>
		</div>
		<input class="modal-link-inputs__site-name-input" type="text" placeholder="Назва сайту" value="${linkName}" />
		<div class="modal-link-inputs__site-url modal-link-name">Адреса сайту URL</div>
		<input class="modal-link-inputs__site-url-input" type="text" placeholder="https://some-site.ua" value="${linkUrl}" />
		<div class="modal-link-inputs__website-address-field">
			<div class="modal-link-inputs__website-address-button">Додати ім'я сайту</div>
		</div>
		`;

		return modalLinkInputs;
	}

	addSiteNameToInputValue(inputName: HTMLInputElement, inputAddress: HTMLInputElement): void {
		if (inputName && inputAddress && inputAddress.value) {
			const pageInputName = inputName;
			let addressName = "";

			try {
				const parsedUrl = new URL(inputAddress.value);
				let { hostname } = parsedUrl;

				if (hostname.startsWith("www.")) {
					hostname = hostname.slice(4);
				}

				const domainNameCapitalized = hostname.charAt(0).toUpperCase() + hostname.slice(1);
				addressName = domainNameCapitalized;

				pageInputName.value = "";
				pageInputName.value = addressName;
			} catch {
				pageInputName.value = "Немає адреси сайту";
			}
		}
	}

	addSiteName(): void {
		const modalLinksInputs = document.querySelector(".modal-links-inputs");

		if (modalLinksInputs) {
			modalLinksInputs.addEventListener("click", (event) => {
				const element = event.target as HTMLElement;

				if (element.classList.contains("modal-link-inputs__website-address-button")) {
					const parentElement = element.closest<HTMLElement>(".modal-link-inputs");
					const inputSiteName = parentElement?.querySelector<HTMLInputElement>(
						".modal-link-inputs__site-name-input",
					);
					const inputSiteAddress = parentElement?.querySelector<HTMLInputElement>(
						".modal-link-inputs__site-url-input",
					);

					if (inputSiteName && inputSiteAddress) {
						this.addSiteNameToInputValue(inputSiteName, inputSiteAddress);
					}
				}
			});
		}
	}

	addSiteLink(): void {
		const buttonCreateLink = document.querySelector(".modal-links-inputs__button");
		const linkField = document.querySelector(".modal-links-inputs__field");

		if (buttonCreateLink !== null && linkField !== null) {
			buttonCreateLink.addEventListener("click", () => {
				linkField.append(this.createLinkInputs());
			});

			linkField.addEventListener("click", (event) => {
				const element = event.target as HTMLElement;

				if (element.classList.contains("modal-link-delete")) {
					element.closest(".modal-link-inputs")?.remove();
				}
			});
		}
	}

	collectLinks(): ILinkData[] | null {
		const linksName = document.querySelectorAll<HTMLInputElement>(".modal-link-inputs__site-name-input");
		const linksUrl = document.querySelectorAll<HTMLInputElement>(".modal-link-inputs__site-url-input");
		const colections: ILinkData[] = [];

		if (linksName.length > 0 && linksUrl.length > 0 && linksName.length === linksUrl.length) {
			for (let i = 0; i < linksName.length; i += 1) {
				const name = linksName[i].value.trim();
				const url = linksUrl[i].value.trim();

				if (name !== "" && url !== "") {
					const linkSite: ILinkData = {
						name,
						url,
					};

					colections.push(linkSite);
				}
			}

			if (colections.length > 0) {
				return colections;
			}
		}

		return null;
	}

	linksParseToModal(linkData: ILinkData[] | null): void {
		const modalField = document.querySelector(".modal-links-inputs__field");

		if (modalField !== null && linkData !== null && linkData.length > 0) {
			linkData.forEach((link) => {
				const linkItem = this.createLinkInputs(link.name, link.url);
				modalField.append(linkItem);
			});
		}
	}

	createForm(dataCardInfo: IDataCard | undefined = undefined): HTMLElement {
		let serialName = "";
		let currentSeria = "";
		let allSeria = "";
		let cardImg = "";
		let cardName = "Створення картки";
		let createButton = "Створити";

		if (dataCardInfo !== undefined && dataCardInfo !== null) {
			serialName = `${dataCardInfo.serialName}`;
			currentSeria = `${dataCardInfo.currentSeria}`;
			allSeria = `${dataCardInfo.allSeria}`;
			cardImg = `${dataCardInfo.cardImg}`;
			cardName = "Змінити картку";
			createButton = "Змінити";
		}

		const modalOverlay = document.createElement("div");
		modalOverlay.classList.add("modal-overlay");
		modalOverlay.innerHTML = `
		<div class="modal modal-scroll">
			<div class="modal__title">${cardName}</div>
			<div class="modal__inputs modal-inputs">
				<div class="modal-inputs__item-text">Додати назву</div>
				<div class="modal-inputs-block">
					<input id="inputCardName" class="modal-inputs__item-input" type="text" placeholder="Назва Серіала" value="${serialName}" />
					<div id="changeText" class="modal-inputs-block__text-change">Aa</div>
				</div>
				<div class="modal-inputs__item-text">Поточна серія</div>
				<input id="inputCardCurrentSeria" class="modal-inputs__item-input" type="number" placeholder="0" value="${currentSeria}" />
				<div class="modal-inputs__item-text">Всього серій</div>
				<input id="inputCardAllSeria" class="modal-inputs__item-input" type="number" placeholder="0" value="${allSeria}" />
				<div class="modal-inputs__item-text">Додати зображення (URL)</div>
				<div class="modal-inputs-block">
					<input id="inputCardImage" class="modal-inputs__item-input" type="text" placeholder="Наприклад https://some-site.ua/img.jpeg" value="${cardImg}" />
					<div id="deleteImg" class="modal-inputs-block__delete-img">Видалити</div>
				</div>
			</div>
			<div class="modal-links-inputs">
				<div class="modal-links-inputs__button">Додати посилання</div>
				<div class="modal-links-inputs__field"></div>
			</div>
			<div class="modal-buttons">
				<div class="modal-buttons__item modal-buttons__item-create">${createButton}</div>
				<div class="modal-buttons__item modal-buttons__item-exit">Скасувати</div>
			</div>
		</div>
        `;

		return modalOverlay;
	}

	changeText(): void {
		const inputCardName: HTMLInputElement | null = document.querySelector("#inputCardName");
		const changeText: HTMLElement | null = document.querySelector("#changeText");
		let switchOptins = false;

		if (inputCardName !== null && changeText !== null) {
			changeText.addEventListener("click", () => {
				const inputText: string = inputCardName.value;

				if (switchOptins) {
					switchOptins = false;
					inputCardName.value = `${inputText.toUpperCase()}`;
					changeText.innerHTML = "AA";
				} else {
					switchOptins = true;
					inputCardName.value = `${inputText.toLowerCase()}`;
					changeText.innerHTML = "aa";
				}
			});
		}
	}

	deleteImg(): void {
		const inputCardImg: HTMLInputElement | null = document.querySelector("#inputCardImage");
		const buttonDeleteImg: HTMLElement | null = document.querySelector("#deleteImg");

		if (inputCardImg !== null && buttonDeleteImg !== null) {
			buttonDeleteImg.addEventListener("click", () => {
				inputCardImg.value = "";
			});
		}
	}

	closeCard(body: HTMLElement | null, card: HTMLElement): void {
		if (body !== null) {
			body.classList.remove("body-lock");
			card.remove();
		}
	}

	removeEmptyCard(): void {
		const emptyCard = document.querySelector(".card-info");

		if (emptyCard !== null) {
			emptyCard.remove();
		}
	}

	addCard(dataCardInfo: IDataCard | undefined = undefined, cardElement: HTMLElement | null = null): void {
		if (this.pageBody !== null) {
			let card = this.createForm();

			let createDate = `${new DateControl().getCurrentDate()}`;
			let updateDate = `${new DateControl().getCurrentDate()}`;

			if (dataCardInfo !== undefined && dataCardInfo !== null) {
				createDate = dataCardInfo.createDate;
				updateDate = dataCardInfo.updateDate;
				card = this.createForm(dataCardInfo);
			}

			this.pageBody?.classList.add("body-lock");

			this.pageBody?.append(card);
			this.changeText();
			this.deleteImg();
			this.addSiteLink();
			this.addSiteName();

			const linkData = dataCardInfo?.serialLinks;

			if (linkData && linkData.length > 0) {
				this.linksParseToModal(linkData);
			}

			const exit1 = card.querySelector(".modal-buttons__item-exit");

			exit1?.addEventListener("click", () => {
				this.closeCard(this.pageBody, card);
			});

			const inputCardName: HTMLInputElement | null = document.querySelector("#inputCardName");
			const inputCardCurrentSeria: HTMLInputElement | null = document.querySelector("#inputCardCurrentSeria");
			const inputCardAllSeria: HTMLInputElement | null = document.querySelector("#inputCardAllSeria");
			const inputCardImage: HTMLInputElement | null = document.querySelector("#inputCardImage");

			const createCard = document.querySelector(".modal-buttons__item-create");

			if (createCard !== null) {
				createCard.addEventListener("click", () => {
					if (
						inputCardName !== null &&
						inputCardCurrentSeria !== null &&
						inputCardAllSeria !== null &&
						inputCardImage !== null
					) {
						const inputCurrentSeria = Number(inputCardCurrentSeria.value);
						const inputAlltSeria = Number(inputCardAllSeria.value);

						if (inputCurrentSeria >= 0 && inputAlltSeria >= 0) {
							const cardInfo: IDataCard = {
								serialName: inputCardName.value,
								currentSeria: String(inputCurrentSeria),
								allSeria: String(inputAlltSeria),
								cardImg: inputCardImage.value,
								createDate,
								updateDate,
								serialLinks: this.collectLinks(),
							};

							this.closeCard(this.pageBody, card);

							const parseCard = new ParseCard(cardInfo);

							if (dataCardInfo !== undefined && cardElement !== null) {
								parseCard.changeOneCard(cardElement);

								this.buttonControl.buttonEnable();
							} else {
								parseCard.parseOneCard();
								this.removeEmptyCard();

								this.buttonControl.buttonEnable();
							}
						} else {
							console.log("Серии не чесла и не равны 0");
						}
					}
				});
			}
		}
	}

	init(): void {
		if (this.pageBody !== null) {
			this.addCard();
		}
	}
}
