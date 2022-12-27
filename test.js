const { reduce } = require('lodash');

const o = { a: 1, b: 2, c: 3 };

const res = reduce(
	o,
	(result, value, key) => {
		result[key] = value.toString();
		return result;
	},
	{}
);

console.log(res);
