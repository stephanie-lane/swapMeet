import React , { Component } from "react";
import { withServices } from "./ServiceProvider";
import DisplayServices from "./DisplayServices";
// import { Link } from 'react-router-dom';
// import Auto from './Auto'

import "./App.css";
import "./DisplayServices.css";

import sorry from "./images/sorry.png";



class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: "",
            message: false,
            filteredUsers: [],
            searched: false
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.props.users)
        let input = this.state.input.toUpperCase()
        const filteredUsers = this.props.users.filter(user => {
            for(let k in user) {
                if(user[k] !== {} && user[k] !== [] && user[k] !== null){
                    if(user[k].toString().toUpperCase().search(input) === 0) {
                        return true
                    }
                }
            }
            const swappers = user.swapper
            for(let k in swappers){
                if (swappers[k].toString().toUpperCase().search(input) === 0) {
                    return true
                }
            }
            return filteredUsers
        })
        if(filteredUsers.length > 0) {
            this.setState({ filteredUsers, message: false, searched: true })
        } else {
            this.setState({ filteredUsers, message: true, searched: true })
        }
        return filteredUsers
    }

    
    

    render() {
        return (
            <>
                <div className="homeBack">
                    <div className='spacing'></div>
                    <form className='homeSearchForm' onSubmit={this.handleSubmit}>
                        <input className="homeSearchBar"
                        type="text"
                        placeholder="Search for Swappers"
                        name="input"
                        value={this.state.name}
                        onChange={this.handleChange}/>
                        <div className='searchButtonContainer'>
                            <button className="homeSearchButton">SEARCH</button>
                        </div>
                    </form>
                    <div className='sorryMessageContainer'>
                        {this.state.searched && this.state.message ?
                            <div className="sorry">
                                <div className="sorryMessage">
                                    Sorry, nothing matches your search.
                                </div>
                                <img className='sorryImage' src={sorry} alt=""/>
                            </div> 
                        :
                            null
                        }
                    </div>
                </div>
                {this.state.searched && !this.state.message ?
                    <div className="gridContainer">
                        {this.state.filteredUsers.map((result, i) => <DisplayServices key={i} result={result} />)}
                    </div>
                :
                        null
                }
            </>
        )
    }
}

export default withServices(Home);