/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type IDataCard from "../interfaces/IDataCard";
import ILinkData from "../interfaces/ILinkData";
import CreateFormCard from "./CreateFormCard";

export default class CardChange {
	cardElement: HTMLElement | null;

	constructor(cardElement: HTMLElement | null) {
		this.cardElement = cardElement;
	}

	getDataLinks(): ILinkData[] | null {
		if (this.cardElement !== null) {
			const cardLinksList = this.cardElement.querySelectorAll<HTMLAnchorElement>(
				".card-links__item:not(.card-links__item--default)",
			);

			if (cardLinksList !== null && cardLinksList.length > 0) {
				const linkList = [...cardLinksList];
				const linkData: ILinkData[] = [];

				linkList.forEach((link) => {
					const linkItem = {
						name: `${link.innerHTML}`,
						url: `${link.href}`,
					};

					linkData.push(linkItem);
				});

				return linkData;
			}
		}

		return null;
	}

	getDataCard(): IDataCard | undefined {
		if (this.cardElement !== null) {
			const card = this.cardElement;

			let cardImgString = "";
			const cardImg = card.querySelector<HTMLImageElement>(".serial-card__img");
			if (cardImg?.src !== null && cardImg?.src !== undefined) {
				cardImgString = cardImg.src;
			}

			const cardInfo: IDataCard = {
				serialName: card.querySelector(".serial-card__title")?.innerHTML || "No Name",
				currentSeria: card.querySelector(".serial-info__number-current span")?.innerHTML || "0",
				allSeria: card.querySelector(".serial-info__number-all span")?.innerHTML || "0",
				leftSeria: card.querySelector(".serial-info__number-left span")?.innerHTML || "",
				cardImg: cardImgString,
				createDate: card.querySelector(".card-date__item-create span")?.innerHTML || "",
				updateDate: card.querySelector(".card-date__item-update span")?.innerHTML || "",
				serialLinks: this.getDataLinks(),
			};

			return cardInfo;
		}

		return undefined;
	}

	init(): void {
		const body = document.querySelector("body");
		const data: IDataCard | undefined = this.getDataCard();

		if (body !== null && data !== undefined && this.cardElement !== null) {
			const createFormCard = new CreateFormCard();
			createFormCard.addCard(data, this.cardElement);
		}
	}
}
