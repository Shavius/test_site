import User from "./User";

type WarriorClass = "Warrior" | "Paladin";

export default class Warrior extends User {
	protected warriorClass: WarriorClass;

	constructor(UserName: string, UserAge: number, userClass: WarriorClass) {
		super(UserName, UserAge);
		this.warriorClass = userClass;
	}

	public getInfo(): string {
		const userData = super.getInfo();
		return `${userData} - Class: ${this.warriorClass}`;
	}
}
