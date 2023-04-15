import logo from './logo.svg';
import './App.css';
import React from 'react';
import web3 from './web3';
import lottery from './lottery';




class App extends React.Component {


  // constructor(props){
  //   super(props);

  //   this.state={manager: '' };
  // }

  //this code below is added to the constructer
  state={
    manager:' ',
    players: [],
    balance: ' ',
    event: '',
    message:''
  };

  async componentDidMount(){
    const manager=await lottery.methods.manager().call();
    const players=await lottery.methods.getPlayer().call();
    const balance=await web3.eth.getBalance(lottery.options.address);
    
    this.setState({
      manager:manager,
      players:players,
      balance:balance
    });

  }
  onSubmit=async event=>{
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();

    this.setState({message:"Transaction in process!!"});
    await lottery.methods.enter().send({
      from:accounts[0], 
      value: web3.utils.toWei(this.state.value,'ether')
    });
    this.setState({message:"Trasaction is done:)"});

  };

  onClick=async event=>{
    const accounts=await web3.eth.getAccounts();

    this.setState({message:"Transaction in process to pick a winner!!"});
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });
    this.setState({message:"Trasaction is done, winner is picked:)"});

  };
  
   
  render(){
    
    return (
      <div>
        <h1>Contract </h1>
        <p>This Contract is managed by {this.state.manager} 
        There are {this.state.players.length} players and the balance is 
        {web3.utils.fromWei(this.state.balance,'ether')};</p>

        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Enter the amout of ether</label>
            <input  value={this.state.value} 
            onChange={event => this.setState({value: event.target.value})}
            />

          </div>
          <button>Enter</button>
        </form>

        <h3>{this.state.message}</h3>

        <h4>Pick a Winner</h4>
        <button onClick={this.onClick}>Pick Winner</button>
      </div>
    );
  }
}

export default App;
