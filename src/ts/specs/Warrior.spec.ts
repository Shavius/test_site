/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
import Warrior from "../modules/Warrior";

jest.mock("../modules/User", () => {
	return require("./__mocks__/MockUser");
});

describe("Warrior", () => {
	it("getInfo", () => {
		const warrior = new Warrior("Lenargo", 20, "Warrior");
		expect(warrior.getInfo()).toBe("Race: Mock Human Name: Lenargo Age: 20 - Class: Warrior");
	});
});
