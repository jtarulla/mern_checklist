import React from 'react';
import AppNavBar from './components/AppNavBar';
import CheckList from './components/CheckList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className='App'>
			<AppNavBar />
			<CheckList />
		</div>
	);
}

export default App;
