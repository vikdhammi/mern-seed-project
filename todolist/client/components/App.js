import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Delete from './Delete';

export default class App extends React.Component {

constructor() {
    super();
    this.state = {selectedMonth:'Jan', selectedYear: 2016, data: []};
    this.getData = this.getData.bind(this);
  }

componentDidMount() {
  this.getData(this);  
  // this.getData(this,'2016');
  }
  componentWillReceiveProps(nextProps) {
    // this.getData(this,'2016');
    this.getData('this');
  }

// getData(ev, year){
//     axios.get('/getAll?month=All&year='+year)
//       .then(function(response) {
//         ev.setState({data: response.data});
//         ev.setState({selectedYear: parseInt(year)})
//       });
//   }
getData(ev){
  axios.get('/getAll')
    .then(function(response) {
      ev.setState({data: response.data});
    });
}

render() {
    return (
      <div>
        {/* <Add selectedMonth={this.state.name} selectedYear={this.state.description} /> */}
        <Add />
        <table>
          <thead>
            <tr><th></th><th className='desc-col'>Description</th><th className='button-col'>Priority</th><th className='button-col'>Name</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(exp){
                return  <tr><td className='counterCell'></td><td className='desc-col'>{exp.description}</td><td className='button-col'>{exp.priority}</td><td className='button-col'>{exp.name}</td><td className='button-col'><Delete id={exp._id} expense={exp} /></td></tr>
              })
            }
            </tbody>

</table>
      </div>
    );
  }
}