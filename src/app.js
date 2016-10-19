import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AddTimer from './AddTimer';

class App extends Component {
	render() {
		return (
			<div>
				<AddTimer />
				{this.props.timers.forEach(timer => <Timer />)}
			</div>
		);
	}
}

export default connect(state => state)(App);
