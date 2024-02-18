import { globalElements } from './elementStore';
import { showGlyphs } from './glyphLogic';
import { isEisvanaSpace, setOutput } from './main';

export function submit() {
  if (!globalElements.input || !(globalElements.input.portalglyphsInput instanceof HTMLInputElement)) return;
  const input = globalElements.input.portalglyphsInput.value.trim();

  const isEisvana = isEisvanaSpace(input);
  const message = `You are ${isEisvana ? '' : 'not'} in Eisvana!`;

  setOutput(input ? message : '', isEisvana);
}

// clears value of an input
export function reset() {
  if (!globalElements.input || !(globalElements.input.portalglyphsInput instanceof HTMLInputElement)) return;
  globalElements.input.portalglyphsInput.value = '';
  showGlyphs();
  submit();
}
