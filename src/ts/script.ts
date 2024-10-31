import "../index.html";
import "../404.html";
import "../scss/style.scss";
import User from "./modules/User";
import Warrior from "./modules/Warrior";

console.log("Hello from console");

const header = document.querySelector("header");
const modeEnvSite = process.env.MODE_ENV_SITE;

if (header && modeEnvSite) {
	const div = document.createElement("div");
	div.classList.add("mode-env-site");
	div.innerHTML = `${modeEnvSite}`;
	header.append(div);
}

const user1 = new User("Lenargo", 20);
const user2 = new User("Mikena", 25);

console.log(user1.getInfo());
console.log(user2.getInfo());

const warrior1 = new Warrior("Linara", 30, "Warrior");
const warrior2 = new Warrior("Teyra", 35, "Paladin");

console.log(warrior1.getInfo());
console.log(warrior2.getInfo());
