import Ranger from "../modules/Ranger";

describe("Ranger", () => {
	it("getInfo", () => {
		const ranger = new Ranger("Ranger 1", 20);
		expect(ranger.getInfo()).toBe("Name: Ranger 1 Age: 20");
	});

	it("getDamageInfo", () => {
		const ranger = new Ranger("Ranger 1", 20);
		expect(ranger.getDamageInfo(100)).toBe("Name: Ranger 1 Age: 20 Наносит 100 урона");
	});
});
