export default class ScrollingAfterReboot {
	storageKey: string;

	constructor() {
		this.storageKey = "scrollPosition";
	}

	saveScrollPosition(): void {
		sessionStorage.setItem(this.storageKey, window.scrollY.toString());
	}

	saveScrollPositionBeforeUnload(): void {
		window.addEventListener("beforeunload", () => this.saveScrollPosition());
	}

	restoreScrollPosition(): void {
		const scrollPosition = sessionStorage.getItem(this.storageKey);
		if (scrollPosition) {
			window.scrollTo(0, parseInt(scrollPosition, 10));
		}
	}
}
