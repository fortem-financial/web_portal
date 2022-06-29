import axios from 'axios';

const instance = axios.create({
		
	baseURL: 'http://demo.fortem-financial.io:4500/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

// tslint:disable-next-line: no-default-export
export default instance;
