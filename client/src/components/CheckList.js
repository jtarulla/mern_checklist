import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';

class CheckList extends Component {
	static propTypes = {
		getItems: PropTypes.func.isRequired,
		item: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.getItems();
	}

	onDeleteClick = id => {
		this.props.deleteItem(id);
	};

	render() {
		const { items } = this.props.item;
		const { isAuthenticated } = this.props.auth;

		return (
			<Container>
				{isAuthenticated ? (
					<ListGroup>
						<>
							<ItemModal />
						</>
						<TransitionGroup className='check-list'>
							{items.map(({ _id, name }) => (
								<CSSTransition key={_id} timeout={500} classNames='fade'>
									<ListGroupItem action>
										<Button
											className='remove-btn'
											style={{
												float: 'left',
												borderRadius: '6%',
												marginRight: '16px',
												alignItems: 'center',
												textAling: 'center'
											}}
											color='btn btn-outline-danger'
											size='sm'
											onClick={this.onDeleteClick.bind(this, _id)}
										>
											&times; delete
										</Button>

										{name}
									</ListGroupItem>
								</CSSTransition>
							))}
						</TransitionGroup>
					</ListGroup>
				) : (
					<div
						className='btn-secondary float-center'
						style={{ padding: '.5rem', borderRadius: '10px' }}
					>
						<div className='text-center' style={{ fontFamily: 'cursive' }}>
							PLEASE, LOGIN TO USE THE APP
						</div>
					</div>
				)}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
	auth: state.auth
});

export default connect(mapStateToProps, { getItems, deleteItem })(CheckList);
