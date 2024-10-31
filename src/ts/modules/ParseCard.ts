import type IDataCard from "../interfaces/IDataCard";
import DateControl from "./DateControl";

export default class ParseCard {
	pageMainContent: HTMLElement | null;
	dataCard: IDataCard;

	constructor(dataCard: IDataCard) {
		this.pageMainContent = document.querySelector(".main__content");
		this.dataCard = dataCard;
	}

	createLink(name: string, url: string): HTMLAnchorElement {
		const cardLink = document.createElement("a");
		cardLink.classList.add("card-links__item");

		cardLink.textContent = name;
		cardLink.href = url;
		cardLink.target = "target";

		return cardLink;
	}

	createCard(): HTMLElement {
		let name = this.dataCard.serialName.trim();
		if (name === undefined || name === "undefined" || name === "") {
			name = "No Name";
		}

		const img = this.dataCard.cardImg;
		const currentSeriaNumber = Number(this.dataCard.currentSeria);
		const allSeriaNumber = Number(this.dataCard.allSeria);

		const dateControl = new DateControl();
		const pastDate = dateControl.getDaysPassed(this.dataCard.updateDate);

		const card = document.createElement("div");
		card.classList.add("serial-card");

		card.innerHTML = `
        <div class="serial-card__top-buttons top-buttons">
			<div class="top-buttons__item links-button">Посилання</div>
			<div class="top-buttons__item serial-card__button-up">Вгору</div>
			<div class="top-buttons__item serial-card__button-down">Вниз</div>
			<div class="top-buttons__item serial-card__button-change">Змінити</div>
            <div class="top-buttons__item serial-card__button-delete">Видалити</div>
        </div>
        <div class="serial-card__container">
            <div class="serial-card__img-wrapper"></div>
            <div class="serial-card__content-wrapper">
                <div class="serial-card__title">${name}</div>
                <div class="serial-card__serial-info serial-info">
                    <div class="serial-info__item serial-info__number-current">
                        Поточна серія: <span>${currentSeriaNumber}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-buttons">
            <div class="card-buttons__item card-buttons__item-up">+</div>
            <div class="card-buttons__item card-buttons__item-down">-</div>
        </div>
		<div class="card-links card-links--hidden">
			<div class="card-links__title">Посилання</div>
			<div class="card-links__item card-links__item--default">Немає посилань</div>
		</div>
		 <div class="card-date">
            <div class="card-date__item card-date__item-create">Створенно: <span>${this.dataCard.createDate}</span></div>
            <div class="card-date__item card-date__item-update">Оновленно: <span>${this.dataCard.updateDate}</span></div>
        </div>
		<div class="days-passed">
			<div class="days-passed__item">Останнє оновлення <span>${pastDate}</span> днів</div>
		</div>
        `;

		if (img.length > 0) {
			const imgElement = card.querySelector(".serial-card__img-wrapper");
			if (imgElement !== null) {
				imgElement.innerHTML = `
                <img
                    class="serial-card__img"
                    src="${img}"
                    alt="Зображення"
                 />
                `;
			}
		}

		if (allSeriaNumber !== 0 && allSeriaNumber >= currentSeriaNumber) {
			const serialInfoElement = card.querySelector(".serial-card__serial-info");
			if (serialInfoElement !== null) {
				const allSeriaElement = document.createElement("div");
				allSeriaElement.className = "serial-info__item serial-info__number-all";
				allSeriaElement.innerHTML = `Всього серій: <span>${allSeriaNumber}</span>`;

				const leftSeriaElement = document.createElement("div");
				leftSeriaElement.className = "serial-info__item serial-info__number-left";
				leftSeriaElement.innerHTML = `Залишилось сериій: <span>${allSeriaNumber - currentSeriaNumber}</span>`;

				serialInfoElement.append(allSeriaElement);
				serialInfoElement.append(leftSeriaElement);
			}
		}

		if (
			this.dataCard?.serialLinks &&
			Array.isArray(this.dataCard?.serialLinks) &&
			this.dataCard?.serialLinks.length > 0
		) {
			const cardLinks = card.querySelector(".card-links");
			const linkList = this.dataCard.serialLinks;

			if (cardLinks !== null && linkList.length > 0) {
				const cardLinksDefault = card.querySelector(".card-links__item--default");
				cardLinksDefault?.remove();

				linkList.forEach((link) => {
					const linkItem = this.createLink(link.name, link.url);
					cardLinks.append(linkItem);
				});
			}
		}

		return card;
	}

	parseOneCard(): void {
		if (this.pageMainContent !== null) {
			this.pageMainContent.append(this.createCard());
		}
	}

	changeOneCard(cardElement: HTMLElement | null): void {
		if (this.pageMainContent !== null && cardElement !== null) {
			cardElement.after(this.createCard());
			cardElement.remove();
		}
	}
}
