import { assignFunction, type ElementFunctions } from './elementFunctions';
import { globalElements } from './elementStore';

const validPortalKeys = '0123456789ABCDEF';

// adds the portal buttons
const wrapper = document.querySelector('.portal-buttons') as HTMLElement;
const codeStore: string[] = [];
const functionArray: ElementFunctions[] = [];
for (let i = 0; i < validPortalKeys.length; i++) {
  const funcObj = {
    element: 'glyphButton' + i.toString(),
    handler: 'click',
    func: function () {
      glyphOnClick(this as unknown as HTMLButtonElement);
    },
  };
  const character = validPortalKeys[i];
  const button = `<button class="button glyphs" type="button" id="glyphButton${i}" value="${character}">${character}</button>`;
  codeStore.push(button);
  functionArray.push(funcObj);
}
wrapper.innerHTML = codeStore.join('');

for (const obj of functionArray) {
  assignFunction(obj);
}

export function showGlyphs() {
  const glyphInputId = 'portalglyphsInput';
  const glyphOutputId = 'glyphDisplay';
  const glyphInput = globalElements.input![glyphInputId] as HTMLInputElement;
  const glyphOutput = globalElements.output![glyphOutputId] as HTMLOutputElement;
  glyphOutput.innerText = glyphInput.value;
}

// makes glyph buttons clickable and adds their value to input field
function glyphOnClick(button: HTMLButtonElement) {
  const inputId = 'portalglyphsInput';
  const input = globalElements.input![inputId] as HTMLInputElement;
  const portalCode = input.value;

  if (portalCode.length < 12) {
    input.value += button.value;
  }

  showGlyphs();
}

// deletes last character of a string
export function deleteCharacter(inputId: string) {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const editedText = input.value.slice(0, -1);

  input.value = editedText;
  showGlyphs();
}
