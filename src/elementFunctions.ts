import { getElement, type GlobalElement, globalElements, type GlobalElements } from './elementStore';
import { reset, submit } from './formActions';
import { deleteCharacter } from './glyphLogic';
import { switchTheme } from './themeSwitch';

export interface ElementFunctions {
  element: string;
  handler: string;
  func: () => void;
}

const elementFunctions: ElementFunctions[] = [
  {
    element: 'themeSwitch',
    handler: 'click',
    func: function () {
      switchTheme();
    },
  },
  {
    element: 'delButton',
    handler: 'click',
    func: function () {
      deleteCharacter('portalglyphsInput');
    },
  },
  {
    element: 'submitBtn',
    handler: 'click',
    func: function () {
      submit();
    },
  },
  {
    element: 'resetBtn',
    handler: 'click',
    func: function () {
      reset();
    },
  },
];

for (const functionObject of elementFunctions) {
  assignFunction(functionObject);
}

export function assignFunction(dataObject: ElementFunctions): void {
  const { handler, func } = dataObject;
  const elementId = dataObject.element as keyof GlobalElements;
  const element = (() => {
    if (globalElements[elementId]) {
      return globalElements[elementId];
    }

    return getElement(elementId);
  })() as GlobalElement;
  if (!element) console.error(elementId + ' is null');
  if (Array.isArray(element)) {
    element.forEach((element) => element.addEventListener(handler, func));
  } else {
    element.addEventListener(handler, func);
  }
}
