import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class CheckList extends Component {
	state = {
		items: [
			{ id: uuid(), name: 'Finish this code' },
			{ id: uuid(), name: 'Learn MERN stack ASAP' },
			{ id: uuid(), name: 'Keep looking for a job' },
			{
				id: uuid(),
				name: 'Never give up! Never give up! Never give up! Never give up!'
			}
		]
	};

	render() {
		const { items } = this.state;
		return (
			<Container>
				<Button
					color='dark'
					style={{ marginBottom: '2rem' }}
					onClick={() => {
						const name = prompt('Enter Item');
						if (name) {
							this.setState(state => ({
								items: [...state.items, { id: uuid(), name }]
							}));
						}
					}}
				>
					Add Item
				</Button>

				<ListGroup>
					<TransitionGroup className='check-list'>
						{items.map(({ id, name }) => (
							<CSSTransition key={id} timeout={500} classNames='fade'>
								<ListGroupItem action>
									<Button
										className='remove-btn'
										style={{ marginRight: '0.5rem' }}
										color='btn btn-outline-danger'
										size='sm'
										onClick={() => {
											this.setState(state => ({
												items: state.items.filter(item => item.id !== id)
											}));
										}}
									>
										&times;
									</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

export default CheckList;
