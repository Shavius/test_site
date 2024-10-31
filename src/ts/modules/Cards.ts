export default class Cards {
	createCardLoad(): HTMLElement {
		const cardLoad: HTMLElement = document.createElement("div");
		cardLoad.classList.add("card-info");
		cardLoad.innerHTML = `
        <div class="card-info__title">Зачекайте йде завантаженя</div>
        <div class="loader">
            <div class="loader__item"></div>
        </div>
        `;

		return cardLoad;
	}

	createEmptyCard(): HTMLElement {
		const emptyCard: HTMLElement = document.createElement("div");
		emptyCard.classList.add("card-info");
		emptyCard.innerHTML = `
        <div class="card-info__title">Ваш список порожний</div>
        `;

		return emptyCard;
	}

	createNoAuthorizationCard(): HTMLElement {
		const emptyCard: HTMLElement = document.createElement("div");
		emptyCard.classList.add("card-info");
		emptyCard.innerHTML = `
        <div class="card-info__title">Ви не авторизовані, будь ласка, авторизуйтесь</div>
        `;

		return emptyCard;
	}

	addCard(card: HTMLElement | null): HTMLElement | null {
		const mainContent = document.querySelector(".main__content");

		if (mainContent !== null && card !== null) {
			mainContent.innerHTML = "";
			mainContent.append(card);

			return card;
		}

		return null;
	}
}
