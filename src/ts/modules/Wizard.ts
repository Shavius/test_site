import User from "./User";

export default class Wizard extends User {
	protected userClass: string;

	constructor(userName: string, userAge: number) {
		super(userName, userAge);
		this.userClass = "Wizard";
	}

	public getInfo(): string {
		const userInfo = super.getInfo();
		return `${userInfo} - Class: ${this.userClass}`;
	}
}
