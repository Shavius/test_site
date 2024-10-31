import Warrior from "../modules/Warrior";

describe("Warrior", () => {
	it("getInfo", () => {
		const warrior = new Warrior("Lenargo", 20, "Warrior");
		expect(warrior.getInfo()).toBe("Race: Human Name: Lenargo Age: 20 - Class: Warrior");
	});
});
