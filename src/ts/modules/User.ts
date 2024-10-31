export default class User {
	protected name: string;
	protected age: number;
	protected race: string;

	constructor(userName: string, userAge: number) {
		this.name = userName;
		this.age = userAge;
		this.race = "Human";
	}

	public getInfo(): string {
		return `Race: ${this.race} Name: ${this.name} Age: ${this.age}`;
	}
}
