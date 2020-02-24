import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class CheckList extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	onDeleteClick = id => {
		this.props.deleteItem(id);
	};

	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<ListGroup>
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
			</Container>
		);
	}
}

CheckList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(CheckList);
