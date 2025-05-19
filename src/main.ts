import '@picocss/pico';
import './styles.css';
// the order of the CSS imports is IMPORTANT, DO NOT change it!!!
import './elementFunctions';
import { globalElements } from './elementStore';
import { coords2Glyphs } from './coordConversion';
import { regions } from './regions';

// check if glyphs / coords / region match
export function isSpace(input: string): boolean {
  const regionGlyphs = Object.keys(regions);
  const regionNames = Object.values(regions);
  const regionNamesLower = regionNames.map((region) => region.toLowerCase());
  const convertedGlyphs = coords2Glyphs(input);

  const regionMatch = regionNamesLower.includes(input.toLowerCase());
  const glyphMatch = regionGlyphs.includes(input.substring(4).toUpperCase());
  const coordMatch = regionGlyphs.includes(convertedGlyphs.substring(4));

  const isRSS: boolean = regionMatch || glyphMatch || coordMatch;
  return isRSS;
}

export function setOutput(output: string, success: boolean) {
  const outputElement = globalElements.output!.output as HTMLOutputElement;

  const addClass = getClass(success);
  const removeClass = getClass(!success);

  outputElement.classList.add(addClass);
  outputElement.classList.remove(removeClass);

  outputElement.innerText = output;

  function getClass(success: boolean) {
    return success ? 'has-background-success-dark' : 'has-background-danger-dark';
  }
}
