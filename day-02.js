// Advent of Code 2025 day 2

const input = `492410748-492568208,246-390,49-90,16-33,142410-276301,54304-107961,12792-24543,3434259704-3434457648,848156-886303,152-223,1303-1870,8400386-8519049,89742532-89811632,535853-567216,6608885-6724046,1985013826-1985207678,585591-731454,1-13,12067202-12233567,6533-10235,6259999-6321337,908315-972306,831-1296,406-824,769293-785465,3862-5652,26439-45395,95-136,747698990-747770821,984992-1022864,34-47,360832-469125,277865-333851,2281-3344,2841977-2953689,29330524-29523460`;

// convert the list to individual ranges

function flog10(n) {
	return typeof n === `number` ? Math.floor(Math.log10(n)) : NaN;
}

const ranges = input
	.trim()
	.split(`,`)
	.map(range => range.split(`-`).map(num => parseInt(num)));

let total = 0;

// for each range
for (const range of ranges) {
	// ignore ranges consisting entirely of odd-length strings
	if (
		flog10(range[0]) % 2 === 0
		&&
		flog10(range[0]) === flog10(range[1])
	) continue;

	// check each number in the range
	for (let n = range[0]; n <= range[1]; n++) {
		// ignore odd-length strings
		if (flog10(n) % 2 === 0) continue;

		// get half the length of even-length n in digits
		const nHalfLength = (flog10(n) + 1) / 2;

		// check the lower half vs the upper half; if they're identical, add the number to the total
		if (n % 10**nHalfLength === Math.floor(n / 10**nHalfLength)) total += n;
	}
}

console.log(`The sum of the invalid ids is ${total}.`);

// reset total to 0

total = 0;

// for each range
for (const range of ranges) {
	// check each number in the range
	for (let n = range[0]; n <= range[1]; n++) {
		// get length of n in digits
		const nLength = flog10(n) + 1;

		// for each length up to half nLength
		// (because there can't be a pattern longer than half the length of n)
		for (let i = 1; i <= Math.floor(nLength / 2); i++) {
			// if i doesn't neatly divide into nLength with no remainder,
			// then there can't be a pattern of length i
			if (nLength % i !== 0) continue;

			// with regex, divide n into groups of length i
			const ns = n.toString().match(new RegExp(`.{1,${i}}`, `g`));

			// if all blocks of the number match, add it to the total and move to next number in range
			if (ns.every(nx => nx === ns[0])) {
				total += n;

				// break after finding one repeating pattern for an id,
				// because an id can only be invalid once
				break;
			}
		}
	}
}

console.log(`The sum of the invalid ids is ${total}.`);
