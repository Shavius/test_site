import ButtonPushControl from "./ButtonPushControl";
import Cards from "./Cards";
import CreateFormCard from "./CreateFormCard";

export default class CardDelete {
	cardElement: HTMLElement | null;

	constructor(cardElement: HTMLElement | null) {
		this.cardElement = cardElement;
	}

	createDeleteWindow(): HTMLElement | null {
		if (this.cardElement !== null) {
			const deleteWindow = document.createElement("div");
			deleteWindow.classList.add("modal-overlay");
			const serialName = this.cardElement.querySelector(".serial-card__title")?.innerHTML;

			deleteWindow.innerHTML = `
			<div class="modal">
        		<div class="modal__title">Видалити серіал ?</div>
					<div class="modal__title-serial">${serialName}</div>
					<div class="modal-buttons">
						<div class="modal-buttons__item modal__buttons-yes">Так</div>
						<div class="modal-buttons__item modal__buttons-no">Ні</div>
					</div>
				</div>
			</div>
        `;

			return deleteWindow;
		}

		return null;
	}

	addEmptyCard(): void {
		const cardList = document.querySelectorAll(".serial-card");

		if (cardList.length === 0) {
			const cards = new Cards();
			cards.addCard(cards.createEmptyCard());
		}
	}

	init(): void {
		if (this.cardElement !== null) {
			const body = document.querySelector("body");
			if (body !== null) {
				const createFormCard = new CreateFormCard();
				const deleteWindow = this.createDeleteWindow();

				if (deleteWindow !== null) {
					body.classList.add("body-lock");
					body.append(deleteWindow);

					const buttonDelete = deleteWindow.querySelector(".modal__buttons-yes");
					const buttonNoDelete = deleteWindow.querySelector(".modal__buttons-no");

					if (buttonDelete !== null && buttonNoDelete !== null) {
						buttonDelete.addEventListener("click", () => {
							this.cardElement?.remove();
							createFormCard.closeCard(body, deleteWindow);
							this.addEmptyCard();

							const buttonControl = new ButtonPushControl();
							buttonControl.buttonEnable();
						});

						buttonNoDelete.addEventListener("click", () => {
							createFormCard.closeCard(body, deleteWindow);
						});
					}
				}
			}
		}
	}
}
