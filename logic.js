const regions = {
	Euclid: {
		'F9556C30': 'The Arm of Vezitinen',
		'F9555C30': 'Canthian',
		'F9555C31': 'Dexterf Sector',
		'F9556C31': 'The Arm of Katteus',
		'F9557C31': 'Nugsdor Adjunct',
		'F9557C30': 'Uefert Nebula',
		'F9557C2F': 'Widraik',
		'F9556C2F': 'Airnaka Conflux',
		'F9555C2F': 'Sivess Instability',
		'FA556C30': 'Savenix Instability',
		'F8556C30': 'Nonlopsi Instability'
	},
	Hilbert: {
		'F9556C30': 'Nuwardia',
		'F9555C30': 'Arm of Orphaea',
		'F9555C31': 'Oulvill',
		'F9556C31': 'Sea of Femanau',
		'F9557C31': 'Logalurug Expanse',
		'F9557C30': 'Doikawis',
		'F9557C2F': 'Ijortu Spur',
		'F9556C2F': 'Bayores Shallows',
		'F9555C2F': 'Meveldrun Expanse',
		'FA556C30': 'Kossiza',
		'F8556C30': 'Lorishup'
	},
	Calypso: {
		'F9556C30': 'Uisaor Spur',
		'F9555C30': 'The Arm of Kiffeyn',
		'F9555C31': 'Ilongl Cloud',
		'F9556C31': 'The Arm of Taticale',
		'F9557C31': 'Egerap Anomaly',
		'F9557C30': 'Wakestones Expanse',
		'F9557C2F': 'Erhahn Fringe',
		'F9556C2F': 'Imrikians Terminus',
		'F9555C2F': 'Imedeili',
		'FA556C30': 'Kovasu Adjunct',
		'F8556C30': 'Lossians Boundary'
	},
	Budullangr: {
		'F9556C30': 'The Arm of Mupkean',
		'F9555C30': 'Uslogo Boundry',
		'F9555C31': 'Chmida Boundry',
		'F9556C31': 'Lawaik Void',
		'F9557C31': 'Tuorng',
		'F9557C30': 'Rorfinko Sector',
		'F9557C2F': 'Nudyrok Nebula',
		'F9556C2F': 'Gushener Terminus',
		'F9555C2F': 'Layhyimpia Adjunct',
		'FA556C30': 'Wodaabil Expanse',
		'F8556C30': 'Baksan Adjunct'
	},
	Eissentam: {
		'F9556C30': 'Riwala',
		'F9555C30': 'Omskio Instability',
		'F9555C31': 'Marcki',
		'F9556C31': 'Anolamga Spur',
		'F9557C31': 'Sea of Zonyayp',
		'F9557C30': 'Rayuyar Band',
		'F9557C2F': 'Umaton Instability',
		'F9556C2F': 'Exramb Adjunct',
		'F9555C2F': 'Ologowe Fringe',
		'FA556C30': 'Yatrifex',
		'FA555C30': 'Yeiada Sector',
		'FA555C31': 'Iptrevs Fringe',
		'FA556C31': 'Yamiraith Sector',
		'FA557C31': 'Wedragi Spur',
		'FA557C30': 'Rezhensk',
		'FA557C2F': 'Sobert Cloud',
		'FA556C2F': 'Umtats Anomaly',
		'FA555C2F': 'Tavill',
		'F8556C30': 'Qangew Expanse',
		'F8555C30': 'Nijhwal Boundary',
		'F8555C31': 'Usband Cluster',
		'F8556C31': 'Ejongaa Anomaly',
		'F8557C31': 'Zahrel Expanse',
		'F8557C30': 'The Arm of Fupand',
		'F8557C2F': 'Cuculta',
		'F8556C2F': 'Etmarao',
		'F8555C2F': 'Otreie Void'
	}
}

const validPortalKeys = '0123456789ABCDEF';

// deletes last character of a string
function deleteCharacter(codeId) {
	const input = document.getElementById(codeId);
	const editedText = input.value.slice(0, -1);

	input.value = editedText;
	showGlyphs();
}

// assigns the region based on glyphs
function glyphRegion(glyph_inputId, galaxy_inputId) {
	let glyphElement = document.getElementById(glyph_inputId);
	let glyphs = document.getElementById(glyph_inputId).value;
	let civ = document.getElementById(galaxy_inputId).value;
	if (glyphs.length == 12) {
		let region;
		let regionGlyphs = glyphs.substring(4);
		switch (civ) {
			case "GHub":
				region = GHubRegions[regionGlyphs];
				break;

			case "CalHub":
				region = CalHubRegions[regionGlyphs];
				break;

			case "EisHub":
				region = EisHubRegions[regionGlyphs];
				break;
		}
		if (region == undefined) {
			document.getElementById(region_codeId).style.backgroundColor = 'red';
			region = 'No valid Hub region'	// NoSonar (region is initialised in the block above)
			glyphElement.style.backgroundColor = 'red';
		} else {
			document.getElementById(region_codeId).style.backgroundColor = '';
			glyphElement.style.backgroundColor = '';
		}
	}
}

// makes glyph buttons clickable and adds their value to input field
function glyphOnClick(button, inputId) {

	const input = document.getElementById(inputId);
	const portalCode = input.value;

	if (portalCode.length < 12) {
		input.value += button.value;
	}
	showGlyphs();
}

function glyphInputOnChange(input) {
	const intermediateValue = input?.value?.toUpperCase?.();
	if (intermediateValue == null) return;

	const newValue = intermediateValue
		.split('')
		.filter(char => validPortalKeys.includes(char))
		.join('')
		.substr(0, 12);
	input.value = newValue;
	return newValue;
}

// clears value of an input
function clearValues(inputArray) {
	for (const ID of inputArray) {
		document.getElementById(ID).value = '';
	}
}

function hideGlyphs(input, target) {
	const names = document.getElementsByClassName(target);
	if (input.value == '') {
		for (const name of names) {
			name.style.display = 'none';
		}
	} else {
		for (const name of names) {
			name.style.display = '';
		}
	}
}

// returns Hub nr
function getHubNumber(galaxy_inputId, glyph_inputId) {
	let check = document.getElementById(galaxy_inputId).value;
	let glyphs = document.getElementById(glyph_inputId).value;
	let index;
	let regArray = [];
	regArray = Object.keys(regions[check]);

	glyphs = glyphs.substring(4);
	index = regArray.indexOf(glyphs);
	index++;

	return index;
}

function setOutput(output, success) {
	const outputElement = document.getElementById('output');
	if (success) {
		outputElement.classList.remove('has-background-danger-dark');
		outputElement.classList.add('has-background-success-dark');
	} else {
		outputElement.classList.remove('has-background-success-dark');
		outputElement.classList.add('has-background-danger-dark');
	}
	outputElement.innerText = output;
}

function submitGlyphs() {
	const galaxy = document.getElementById('galaxy_input').value;
	const glyphs = document.getElementById('portalglyphs_input').value;

	if (glyphs.length != 12) {
		setOutput('Glyph string is not 12 characters long!', false);
		return;
	}

	const regionArray = Object.keys(regions[galaxy]);
	const regionGlyphs = glyphs.substring(4);

	if (regionArray.includes(regionGlyphs)) {
		setOutput('You are in Hub space.', true);
	} else {
		setOutput('You are not in Hub space!', false);
	}
}