import "../index.html";
import "../404.html";
import "../scss/main.scss";
import ControlButtons from "./modules/ControlButtons";
import UserCheck from "./modules/UserCheck";
import ScrollingAfterReboot from "./modules/ScrollingAfterReboot";

const header = document.querySelector("header");
const modeEnvSite = process.env.MODE_ENV_SITE;

if (modeEnvSite && header) {
	const div = document.createElement("div");
	div.classList.add("mode-env-site");
	div.innerHTML = `${modeEnvSite}`;
	header.append(div);
}

const scrollingAfterReboot = new ScrollingAfterReboot();
scrollingAfterReboot.saveScrollPositionBeforeUnload();

const controlButtons = new ControlButtons();
controlButtons.init();

const userCheck = new UserCheck();
userCheck.init();

console.log("Test 1");
