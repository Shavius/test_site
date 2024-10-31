export default class ButtonPushControl {
	buttonName = "header__push-serial";
	buttonNameActive = "header__push-serial--active";

	findButton(buttonName: string): HTMLElement | null {
		const button: HTMLElement | null = document.querySelector(`.${buttonName}`);

		if (button !== null) {
			return button;
		}

		return null;
	}

	buttonEnable(): void {
		const button = this.findButton(this.buttonName);

		if (button !== null) {
			button.classList.remove(`${this.buttonName}`);
			button.classList.add(`${this.buttonNameActive}`);
			button.innerHTML = "Зберегти";
		}
	}

	buttonDisable(): void {
		const button = this.findButton(this.buttonNameActive);

		if (button !== null) {
			button.classList.remove(`${this.buttonNameActive}`);
			button.classList.add(`${this.buttonName}`);
			button.innerHTML = "----";
		}
	}
}
