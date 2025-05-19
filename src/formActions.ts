import { globalElements } from './elementStore';
import { showGlyphs } from './glyphLogic';
import { isSpace, setOutput } from './main';

export function submit() {
  if (!(globalElements.input?.portalglyphsInput instanceof HTMLInputElement)) return;
  const input = globalElements.input.portalglyphsInput.value.trim();

  const isRSS = isSpace(input);
  const message = isRSS ? '¡Estás en la RSS!' : '¡No estás en la RSS!';

  setOutput(input ? message : '', isRSS);
}

// clears value of an input
export function reset() {
  if (!(globalElements.input?.portalglyphsInput instanceof HTMLInputElement)) return;
  globalElements.input.portalglyphsInput.value = '';
  showGlyphs();
  submit();
}
