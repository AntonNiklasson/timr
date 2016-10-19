import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const reduxStore = createStore(

	// Reducer.
	(state, action) => {
		switch(action.type) {
			default: return { ...state }
		}
	},

	// Initial State.
	{
		timers: []
	}
);

ReactDOM.render(
	(
		<Provider store={reduxStore}>
			<App />
		</Provider>
	),
	document.getElementById('root')
);
