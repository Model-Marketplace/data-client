import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NavigationBar from '../menus/NavigationBar';

import { get_inbox } from '../../services/api/inbox';

export default class InboxPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			inbox: []
		}
	}

	componentDidMount() {
		console.log('InboxPage componentDidMount()');
		
		get_inbox({}, (res) => {
			const { notifications } = res.data;
			console.log(notifications);
			this.setState({ inbox: notifications });
		});
	}

	render() {
		const { inbox } = this.state;
		return (
			<div className="page-vh">
				<NavigationBar />
				<section>
						<div className="layout-col-6 el-box pad-c-s marg-c marg-t-sm">
							<h3 className="marg-b-sm">Inbox</h3>
							<hr className="hr" />
							<div>
								{(inbox.length > 0) ? (
									<div>
										{inbox.map((notification) => (
										<div key={notification._id} className="layout-flex marg-t-sm">
											<Link
												to={`/profile/${notification.sender.username}`}
												className="link"
											>
												<img
													src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
													className="el-image el-image--s marg-r-sm"
												/>
											</Link>
											<div>
												<h5>{notification.title}</h5>
												<p>{notification.body}</p>
												<p className="marg-t-xs">
													{`Received ${moment(notification.updatedAt).toNow(true)} ago`}
												</p>
											</div>
										</div>	
										))}
									</div>
								) : (
									<div>Your inbox is empty</div>
								)}
							</div>
						</div>
				</section>
			</div>
		)
	}
}
