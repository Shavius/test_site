import Wizard from "../modules/Wizard";

describe("Wizard", () => {
	it("getInfo", () => {
		const wizard = new Wizard("Wizard", 20);
		expect(wizard.getInfo()).toBe("Race: Human Name: Wizard Age: 20 - Class: Wizard");
	});
});
