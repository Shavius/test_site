import Wizard from "../modules/Wizard";

describe("Wizard", () => {
	it("getInfo", () => {
		const wizard = new Wizard("Wizard 1", 20);
		expect(wizard.getInfo()).toBe("Race: Human Name: Wizard 1 Age: 20 - Class: Wizard");
	});

	it("getInfo", () => {
		const wizard = new Wizard("Wizard 2", 25);
		expect(wizard.getInfo()).toBe("Race: Human Name: Wizard 2 Age: 25 - Class: Wizard");
	});

	it("getInfo", () => {
		const wizard = new Wizard("Wizard 3", 30);
		expect(wizard.getInfo()).toBe("Race: Human Name: Wizard 3 Age: 30 - Class: Wizard");
	});

	it("getInfo", () => {
		const wizard = new Wizard("Wizard 4", 35);
		expect(wizard.getInfo()).toBe("Race: Human Name: Wizard 4 Age: 35 - Class: Wizard");
	});
});
