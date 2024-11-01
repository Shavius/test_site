export default class Ranger {
	protected name: string;
	protected age: number;

	constructor(userName: string, userAge: number) {
		this.name = userName;
		this.age = userAge;
	}

	private compileNameDamage(mg: number): string {
		const damage = mg;
		const userInfo = this.getInfo();

		return `${userInfo} Наносит ${damage} урона`;
	}

	public getInfo(): string {
		return `Name: ${this.name} Age: ${this.age}`;
	}

	public getDamageInfo(mg = 0): string {
		const nameDamage = this.compileNameDamage(mg);

		return `${nameDamage}`;
	}
}
