import ButtonPushControl from "./ButtonPushControl";

export default class CardMover {
	cardElement: HTMLElement | null;
	buttonControl: ButtonPushControl;

	constructor(cardElement: HTMLElement | null) {
		this.cardElement = cardElement;
		this.buttonControl = new ButtonPushControl();
	}

	moveUp(): void {
		const currentCard = this.cardElement;
		const previousCard = currentCard?.previousElementSibling as HTMLElement;

		if (currentCard !== null && previousCard !== null && previousCard.classList.contains("serial-card")) {
			previousCard.before(currentCard);

			this.buttonControl.buttonEnable();
		}
	}

	moveDown(): void {
		const currentCard = this.cardElement;
		const nextCard = currentCard?.nextElementSibling as HTMLElement;

		if (currentCard !== null && nextCard !== null && nextCard.classList.contains("serial-card")) {
			nextCard.after(currentCard);

			this.buttonControl.buttonEnable();
		}
	}
}
