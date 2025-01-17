import React from "react";
import { withServices } from './ServiceProvider';

class Events extends React.Component {
	constructor() {
		super()
		this.state = {
				message: false,
				filteredUsers: [],
				users: JSON.parse(localStorage.getItem('users')) || []
		}
	}
	
	toProfile = (_id) => {
		this.props.history.push(`/userprofile/${_id}`)
	}

	componentDidMount() {
		const filteredEvents = this.state.users.filter(user => {
			for(let k in user) {
				if(user[k] !== {} && user[k] !== [] && user[k] !== null){
					if(user[k].toString().toLowerCase().search("events") === 0) {
						return true
					}
				}
			}
			return filteredEvents
		})
		if(filteredEvents.length > 0) {
			this.setState({
				filteredUsers: filteredEvents
			}, () => { console.log(this.state.filteredUsers) }) 
		} else {
			this.setState({
				message: true
			}, () => { console.log(this.state.filteredUsers) })
		}
	}

	render() {
			return (
				<div className="eventsBody">
					<div className='eventsTitleContainer'>
						<div className="serviceTitle">event coordination</div>
					</div>
					<div className="serviceContainer">
						{this.state.filteredUsers ?
							this.state.filteredUsers.map((result, i) => 
							<div className="serviceCard" onClick={() => {this.toProfile(result._id)}} key={i}>
								<div className="serviceBisName">{result.businessName}</div>
								<div className="serviceSwapperName">{result.firstName} {result.lastName}</div>
								<div className="serviceService">{result.service}</div>
								<div className="serviceCost">${result.cost}</div>
								<div className="serviceLocation">{result.city}, {result.state}</div>
							</div>
							)
						:
							<div>no results</div>
						}
					</div>
				</div>
			)

	}
}

export default withServices(Events);




