import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import RealNews from './components/RealNews';
import 'animate.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'






export default class App extends Component {
  pageSize=15;
  state={
    progress: 10
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar />
       
          <Routes>
            <Route exact path="/" element={<RealNews setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="General"/>}/>
            <Route exact path="/entertainment" element={<RealNews setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="Entertainment"/>}/>
            <Route exact path="/health" element={<RealNews setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="Health"/>}/>
            <Route exact path="/sports" element={<RealNews setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="Sports"/>}/>
            <Route exact path="/science" element={<RealNews setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="Science"/>}/>
            <Route exact path="/technology" element={<RealNews setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="Technology"/>}/>
          </Routes>
        </Router>
        <LoadingBar
        color='#f11946'
        transitionTime={3000}
        loaderSpeed={2000}
        height={4}
        progress={this.state.progress}
      />

      </div>
    )
  }
}
