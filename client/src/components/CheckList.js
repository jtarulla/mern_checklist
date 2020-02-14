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

	onDeleteClick(id) {
		this.props.deleteItem(id);
	}

	render() {
		const { items } = this.props.item;
		const { isDone } = this.props;
		return (
			<Container>
				<ListGroup>
					<TransitionGroup className='check-list'>
						{items.map(({ id, name }) => (
							<CSSTransition key={id} timeout={500} classNames='fade'>
								<ListGroupItem action>
									{name}
									<Button
										className='remove-btn'
										style={{
											marginLeft: '0.5rem',
											float: 'right'
										}}
										color='btn btn-outline-danger'
										size='sm'
										onClick={this.onDeleteClick.bind(this, id)}
									>
										delete
									</Button>
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
	item: PropTypes.object.isRequired,
	isDone: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(CheckList);
