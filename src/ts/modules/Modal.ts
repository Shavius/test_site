export default class Modal {
	body: HTMLElement | null;

	constructor() {
		this.body = document.querySelector("body");
	}

	createModalWrapper(): HTMLElement {
		const modalOverlay = document.createElement("div");
		modalOverlay.classList.add("modal-overlay");

		return modalOverlay;
	}

	createModal(): HTMLElement {
		const modalOverlay = this.createModalWrapper();
		modalOverlay.innerHTML = `
        <div class="modal"></div>
        `;

		return modalOverlay;
	}

	addModalToPage(): void {
		if (this.body !== null) {
			this.body.classList.add("body-lock");
			this.body.append(this.createModal());
		}
	}

	removeModalToPage(): void {
		const body = document.querySelector("body");
		const modal = document.querySelector(".modal-overlay");
		if (modal !== null && body !== null) {
			modal.remove();
			body.classList.remove("body-lock");
		}
	}

	modalLoad(modalText = "you text"): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title">${modalText}</div>
			<div class="modal__loader"></div>
			`;
		}
	}

	modalYes(buttonText = "You text"): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title">${buttonText}</div>
			<div class="modal-buttons">
                    <button class="modal-buttons__item modal__buttons-yes" type="button">Закрити</button>
                </div>
			`;
		}

		const button: HTMLElement | null = document.querySelector(".modal__buttons-yes");
		if (button !== null) {
			button.addEventListener("click", () => {
				this.removeModalToPage();
			});
		}
	}

	modalError(buttonText = "You text"): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title modal__title--error">${buttonText}</div>
			<div class="modal-buttons">
                    <button class="modal-buttons__item modal__buttons-yes" type="button">Закрити</button>
                </div>
			`;
		}

		const button: HTMLElement | null = document.querySelector(".modal__buttons-yes");
		if (button !== null) {
			button.addEventListener("click", () => {
				this.removeModalToPage();
			});
		}
	}
}
