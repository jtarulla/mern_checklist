import React from 'react';
import AppNavBar from './components/AppNavBar';
import CheckList from './components/CheckList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<AppNavBar />
				<Container>
					<ItemModal />
					<CheckList />
				</Container>
			</div>
		</Provider>
	);
}

export default App;
