import React from 'react';
import logo from './logo.svg';
import './App.css';
import superagent from 'superagent'
import { Component } from './component1';
export class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      batsmen: [] ,
      bowlers: [] ,
      score: {} ,
      fetchingData: true,
      team1: {},
      team2: {},
      inn: 0
    }
    this.matchId= '1144508'
    this.apiKey = 'mP0O3HI1uddyqe7l0ztQ0y2p8gg2'
    this.getData = this.getData.bind(this)
    this.onInng = this.onInng.bind(this)
  }
  componentDidMount(){
    this.getData()
    setInterval(this.getData,60000)
  }
  onInng(e){
    e.preventDefault()
    console.log('id', this.state.inn)
    if (this.state.inn === 1) {
      this.setState({
        inn: 0
      })
      this.getData()
    } else {
      this.setState({
        inn: 1
      })
      this.getData()
    }
  }
  getData(){
    console.log('inside getData')
    this.setState({
      fetchingData: true
    })
     superagent.get('https://cricapi.com/api/cricketScore')
      .query({'apikey' : this.apiKey , 'unique_id' : this.matchId})
      .then(data=>{
        this.setState({
          score : {
          score:data.body.score,
          stat: data.body.stat
        }
        })
      })

      superagent.get('https://cricapi.com/api/fantasySummary')
        .query({'apikey' : this.apiKey , 'unique_id' : this.matchId})
        .then((res)=>{
          console.log('response',res)
          this.setState({
            team1: res.body.data.team[0],
            team2: res.body.data.team[1],
            bowlers: res.body.data.bowling[this.state.inn],
            batsmen: res.body.data.batting[this.state.inn],
            fetchingData: false
          })
          console.log('after final set state:', this.state)
        })
  }
  render(){
    return(
      <div className="container color ">
      <span className="display-4">Live Score</span>
      <span className="ml-5 lead text-muted">Australia Vs Bangladesh</span>
      <div className="text-right">
          <button className="btn btn-primary" onClick={this.onInng}>Innings 1</button>
          <button className="btn btn-primary" onClick={this.onInng}>Innings 2</button>
      </div>
      {this.state.fetchingData ? 
        <div className="text-center lead mt-5 pt-2 mb-5">
          Fetching data from api
        </div>
        :
        <div className="mt-4">
            <h6 className="lead">{this.state.score.score}</h6>
            <p>{this.state.score.stat}</p>
            <div>
            <div className="row">
              <div className="col-lg-6">
              
            <p className="lead">Batsmen</p>
               <div className="row">
                <div className="col-lg-4">
                <span className="mr-5 ">Name</span>
                  {this.state.batsmen.scores.map((value)=>(
              <p >{value.batsman} <span className="text-muted">{value.dismissal}</span></p>
            ))}
                </div>
                <div className="col-lg-4">
                <span className="mr-4">Runs</span>
                   {this.state.batsmen.scores.map((value)=>(
              <p className="">{value.R}</p>
            ))}
                </div>
            <div className="col-lg-4">
              <span className="mr-4">Balls</span>
               {this.state.batsmen.scores.map((value)=>(
              <p className="">{value.B}</p>
            ))}
              </div>
              </div>
            </div>

            <div className="col-lg-6">
            <p className="lead">Bowlers</p>
              <div className="row">
                <div className="col-lg-5">
                <span className="mr-5 pr-3">Name</span>
                  {this.state.bowlers.scores.map((value)=>(
              <p className="">{value.bowler}</p>
            ))}
                </div>
                <div className="col-lg-2">
                <span className="mr-5">Over</span>
                   {this.state.bowlers.scores.map((value)=>(
              <p className="">{value.O}</p>
            ))}
                </div>
            <div className="col-lg-2">
              <span className="mr-5">Wicket</span>
               {this.state.bowlers.scores.map((value)=>(
              <p className="">{value.W}</p>
            ))}
            </div>
            <div className="col-lg-3">
              <span className="mr-5">Runs</span>
               {this.state.bowlers.scores.map((value)=>(
              <p className="">{value.R}</p>
            ))}
              </div>
            
              </div>
            </div>
            </div>

            <div id="squad">
              <p className="lead">Teams</p>
              <div>
                <p className="lead mb-0">Australia</p>
                {this.state.team1.players.map((value)=>(
                  <span> {value.name} </span>
                ))}
              </div>
              <div>
                <p className="lead mb-0 mt-2">Bangladesh</p>
                {this.state.team2.players.map((value)=>(
                  <span> {value.name} </span>
                ))}
              </div>
            </div>
            
          
            </div>
        </div>
      }
      </div>  
      )
  }
}

export default App;
