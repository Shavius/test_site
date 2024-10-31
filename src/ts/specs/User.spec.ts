import User from "../modules/User";

describe("User", () => {
	it("getInfo User 1", () => {
		const user = new User("User 1", 20);
		expect(user.getInfo()).toBe("Race: Human Name: User 1 Age: 20");
	});

	it("getInfo User 2", () => {
		const user = new User("User 2", 25);
		expect(user.getInfo()).toBe("Race: Human Name: User 2 Age: 25");
	});

	it("getInfo User 3", () => {
		const user = new User("User 3", 30);
		expect(user.getInfo()).toBe("Race: Human Name: User 3 Age: 30");
	});

	it("getInfo User 4", () => {
		const user = new User("User 4", 35);
		expect(user.getInfo()).toBe("Race: Human Name: User 4 Age: 35");
	});
});
