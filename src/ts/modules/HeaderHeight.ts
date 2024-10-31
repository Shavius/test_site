export default class HeaderHeight {
	header: HTMLElement | null;
	wrapperBottom: HTMLElement | null;
	static initEnable = false;

	constructor() {
		this.header = document.querySelector("header");
		this.wrapperBottom = document.querySelector(".wrapper--bottom");
	}

	changeHeaderHeight(): void {
		if (this.header !== null && this.wrapperBottom !== null) {
			const headerHeight = this.header.offsetHeight;

			this.wrapperBottom.style.marginTop = `${headerHeight + 10}px`;
		}
	}

	resizeHeader(): void {
		window.addEventListener("resize", () => {
			this.changeHeaderHeight();
		});
	}

	init(): void {
		if (HeaderHeight.initEnable === false) {
			HeaderHeight.initEnable = true;

			this.changeHeaderHeight();
			this.resizeHeader();
		}
	}
}
