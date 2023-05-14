import '@picocss/pico';
import './styles.css';
// the order of the CSS imports is IMPORTANT, DO NOT change it!!!
import './elementFunctions';
import { globalElements } from './elementStore';
import { coords2Glyphs } from './coordConversion';
import { regions } from './regions';

let galaxy: string;

const GHubHosts = [
	'amihereyet.nmsgalactichub.com',
	'amIhereyet.nmsgalactichub.com',
	'amithereyet.nmsgalactichub.com',
	'amIthereyet.nmsgalactichub.com',
	'amiinhubspace.nmsgalactichub.com'
]
if (GHubHosts.includes(window.location.host)) (document.querySelector('a[href=".."]') as HTMLAnchorElement).href = 'https://lenni009.github.io/';	// 'https://nmsgalactichub.com';

hideMain();

// hides the main element if no galaxy is given
export function hideMain() {
	const dropdownId = 'galaxyInput';
	const dropdownElement = globalElements.input![dropdownId] as HTMLSelectElement;
	const mainElement = document.querySelector('main') as HTMLElement;
	galaxy = dropdownElement.value;
	mainElement.style.display = galaxy ? '' : 'none';
}

// check if glyphs / coords / region match
export function isHubSpace(input: string): boolean {
	const galaxyRegions = regions[galaxy];
	const regionGlyphs = Object.keys(galaxyRegions);
	const regionNames = Object.values(galaxyRegions);
	const regionNamesLower = regionNames.map(region => region.toLowerCase());
	const convertedGlyphs = coords2Glyphs(input);

	const regionMatch = regionNamesLower.includes(input.toLowerCase());
	const glyphMatch = regionGlyphs.includes(input.substring(4).toUpperCase());
	const coordMatch = regionGlyphs.includes(convertedGlyphs.substring(4));

	const isHub: boolean = regionMatch || glyphMatch || coordMatch;
	return isHub;
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