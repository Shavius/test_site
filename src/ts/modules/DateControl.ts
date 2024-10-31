export default class DateControl {
	getCurrentDate(): string {
		const currentDate = new Date();
		const date = currentDate.toLocaleDateString("ua-UA", { day: "numeric", month: "numeric", year: "numeric" });
		return date;
	}

	convertDate(dateString: string): Date {
		const [day, month, year] = dateString.split(".").map(Number);
		return new Date(year, month - 1, day);
	}

	getDaysPassed(lastDate: string): string {
		const currentDate: Date = this.convertDate(this.getCurrentDate());
		const pastDate: Date = this.convertDate(`${lastDate}`);

		const diffInMilliseconds: number = currentDate.getTime() - pastDate.getTime();

		const millisecondsInOneDay = 1000 * 60 * 60 * 24;
		const daysPassed: number = Math.floor(diffInMilliseconds / millisecondsInOneDay);

		return daysPassed.toLocaleString();
	}
}
