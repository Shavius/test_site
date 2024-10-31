import ILinkData from "./ILinkData";

export default interface IDataCard {
	serialName: string;
	currentSeria: string;
	allSeria: string;
	leftSeria?: string;
	cardImg: string;
	createDate: string;
	updateDate: string;
	serialLinks?: ILinkData[] | null;
}
