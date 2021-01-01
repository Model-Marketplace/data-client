import React, { Component } from 'react';
import NavigationBar from '../menus/NavigationBar';

export default class NotificationsPage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="page">
				<NavigationBar />
				<section>
						<div className="layout-col-6 marg-c">
								Test
						</div>
				</section>
			</div>
		)
	}
}
