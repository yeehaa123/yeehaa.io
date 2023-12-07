const smoke = {
	50: '#f6f6f9',
	100: '#ececf2',
	200: '#d5d5e2',
	300: '#b1b3c8',
	400: '#8689aa',
	500: '#676a90',
	600: '#525477',
	700: '#434461',
	800: '#3a3c52',
	900: '#343446',
	950: '#0e0e13',
};

const velvet = {
	50: '#faf5f8',
	100: '#f7ecf3',
	200: '#f0dae9',
	300: '#e5bcd5',
	400: '#d492ba',
	500: '#c4709f',
	600: '#b35c89',
	700: '#95416a',
	800: '#7c3858',
	900: '#69324c',
	950: '#3e192b',
};

const mist = {
	50: '#f3f4fa',
	100: '#eaebf5',
	200: '#dfe1f0',
	300: '#c0c3e1',
	400: '#a6a6d3',
	500: '#918fc5',
	600: '#8078b3',
	700: '#6e669c',
	800: '#5b547f',
	900: '#4c4867',
	950: '#2c2a3c',
};

const amber = {
	50: '#fffeea',
	100: '#fffbc5',
	200: '#fff787',
	300: '#ffec48',
	400: '#ffdd1e',
	500: '#fbbd03',
	600: '#df9200',
	700: '#b96804',
	800: '#96500a',
	900: '#7b420c',
	950: '#472201',
};

const mint = {
	50: '#f1f8f4',
	100: '#dcefe2',
	200: '#bbdfc8',
	300: '#85c2a0',
	400: '#5ea982',
	500: '#3d8c65',
	600: '#2c6f4f',
	700: '#235941',
	800: '#1e4735',
	900: '#193b2d',
	950: '#0d2119',
};
const gray = smoke;

const colors = {
	gray,
	black: gray['950'],
	offblack: gray['900'],
	primary: amber['500'],
	'primary-light': amber['400'],
	'primary-dark': amber['600'],
	secondary: velvet['600'],
	'secondary-light': velvet['500'],
	'secondary-dark': velvet['700'],
	tertiary: mint['300'],
	'tertiary-light': mint['200'],
	'tertiary-dark': mint['400'],
	offwhite: gray['100'],
	white: gray['50'],
};

export default colors;
