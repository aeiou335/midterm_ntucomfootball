import React, { Component} from 'react'
import { NavLink, Route, Switch, withRouter, Redirect } from 'react-router-dom'

import Intro from './Intro';
import History from './History';
import Manage from './Manage';
import '../css/Main.css';
import '../css/poole.css';
import teamImg from "../img/team.jpg"

class Main extends Component {
	render() {
		return (
            <div>
                <div className="sidebar">
                    <div className="container sidebar-sticky">
                        <div className="sidebar-about">
                            <h1 className="sidebar-heading">管理學院足球聯隊</h1>
                            <img src={teamImg} alt='team pic'></img>
                            <p>成立於2014年，2017/18賽季台大聯賽冠軍。</p>
                        </div>
                        <nav className="sidebar-nav">
                            <NavLink to="/intro" exact className="sidebar-nav-item">
                                關於球隊
                            </NavLink>
                            <NavLink to="/history" exact className="sidebar-nav-item">
                                比賽成績
                            </NavLink>
                            <NavLink to="/manage" exact className="sidebar-nav-item">
                                管理球隊
                            </NavLink>
                            <a href="https://www.facebook.com/ntucomfootball/" target="_blank">
                                聯絡我們
                            </a>
                        </nav>
                    </div>
                </div>
                <div className="content">
                    <Switch>
                        <Route path="/intro" component={Intro} />
                        <Route path="/manage" component={Manage} />
                        <Route path="/history" component={History} />
                        {/*
                        <Route path="/stats" component={Stats} />
                        <Route path="/home" component={() => <Redirect to="/" />} />
                        */}
                    </Switch>
                </div>
                
                
            </div>
            
            
		)
	}
}

export default Main;
