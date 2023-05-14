import { globalElements } from "./elementStore";
import { showGlyphs } from "./glyphLogic";
import { isHubSpace, setOutput } from "./main";

export function submit(): void {
	const input = (globalElements.input!.portalglyphsInput as HTMLInputElement).value.trim();

	const isHub = isHubSpace(input);
	const message = `You are ${isHub ? '' : 'not'} in Hub space!`;

	setOutput(input ? message : '', isHub);
}

// clears value of an input
export function reset(): void {
	(globalElements.input!.portalglyphsInput as HTMLInputElement).value = '';
	showGlyphs();
	submit();
}