import Modal from "./Modal";

export default class ModalAuthorization extends Modal {
	createModal(): HTMLElement {
		const modalOverlay = this.createModalWrapper();
		modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal__title">Авторизація</div>
            <form class="modal-authorization" action="#" method="post">
                <label for="email">Пошта користувача</label>
                <input type="email" class="modal-authorization__email" id="email" name="email" required>

                <label for="password">Пароль</label>
                <input type="password" class="modal-authorization__password" id="password" name="password" required>

                <div class="modal-buttons">
                    <button class="modal-buttons__item modal__buttons-yes" type="submit">Увійти</button>
                    <button class="modal-buttons__item modal__buttons-no" type="button">Відміна</button>
                </div>
            </form>
		</div>
        `;

		return modalOverlay;
	}
}
