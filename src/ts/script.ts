import "../index.html";
import "../scss/style.scss";
import User from "./modules/User";

console.log("Hello from console");

const user1 = new User("Lenargo", 20);
const user2 = new User("Mikena", 25);

console.log(user1.getInfo());
console.log(user2.getInfo());
