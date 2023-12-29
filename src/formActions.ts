import { globalElements } from "./elementStore";
import { showGlyphs } from "./glyphLogic";
import { isEisvanaSpace, setOutput } from "./main";

export function submit(): void {
	const input = (globalElements.input!.portalglyphsInput as HTMLInputElement).value.trim();

	const isEisvana = isEisvanaSpace(input);
	const message = `${isEisvana ? '' : 'NO'} Estas en territorio de la Royal Space Society!`;

	setOutput(input ? message : '', isEisvana);
}

// clears value of an input
export function reset(): void {
	(globalElements.input!.portalglyphsInput as HTMLInputElement).value = '';
	showGlyphs();
	submit();
}