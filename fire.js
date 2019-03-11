const rows = 80
const columns = 140
const pixelsArray = new2DimensionalArray(rows, columns);
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const debug = false

function start() {
	createFireSource();
	render();

	setInterval(calculateFirePropagation, 50);
}

function setArrayValues(array, value) {
	for(let i =0; i < array.length; i++) {
		array[i] = value;
	}
}

function new2DimensionalArray(rows, columns, initialValue = 0) {
	let array = new Array(rows);

	for(let row = 0; row < rows; row++) {
		array[row] = new Array(columns);
		array[row].setValues = (value) => setArrayValues(array[row], value);
		array[row].setValues(initialValue);

		array[row].forEach(item => { item = 1 });
	}

	return array;
}

function createFireSource() {
	let firstRow = pixelsArray[pixelsArray.length-1];
	let lastIntensity = fireColorsPalette.length -1;

	firstRow.setValues(lastIntensity);
}

function calculateFirePropagation() {
	for (let col = 0; col < columns; col++) {
		for (let row = 0; row < rows -1; row++) {
			let decay = Math.floor(Math.random() * 3) //set debug true and decay as 1 to better undersand the algorism
			let belowRow = pixelsArray[row+1];
			let newIntensity = belowRow[col] - decay;

			// without wind effect
			//pixelsArray[row][col] = newIntensity >= 0 ? newIntensity : 0

			let windEffectCol = col - decay;
			let windEffectRow = col < 0 ? row -1 : row;

			pixelsArray[row][col < 0 ? columns - 1 - col : col] = newIntensity >= 0 ? newIntensity : 0
		}
	}

	render();
}

function render() {
	let html = '<table cellpadding=0 cellspacing=0>'

	for (let row = 0; row < pixelsArray.length; row++) {
		html += '<tr>'

		for (let col = 0; col < pixelsArray[row].length; col++) {
			let fireIntensity = pixelsArray[row][col];
			let color = fireColorsPalette[fireIntensity];
			let colorString = `${color.r},${color.g},${color.b}`

			if (debug === true) {
				let pixelIndex = `${row},${col}`

				html += '<td>'
				html += `<div class="pixel-index">${pixelIndex}</div>`
				html += `<div style="color: rgb(${colorString})">${fireIntensity}</div>`
				html += '</td>'
			} else {
				html += `<td class="pixel" style="background-color: rgb(${colorString})">`
				html += '</td>'
			}
		}

		html += '</tr>'
	}

	html += '</table>'

	document.querySelector('#fireCanvas').innerHTML = html  
}

start();