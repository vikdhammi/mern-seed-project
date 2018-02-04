import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class Add extends React.Component {
constructor() {
      super();
this.state = {
        description: '',
        // amount: '',
        // month: '',
        // year: '',
        priority: '',
        name:'',
        messageFromServer: '',
        modalIsOpen: false
      }
// this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      // this.insertNewExpense = this.insertNewExpense.bind(this);
     this.insertNewTask = this.insertNewTask.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
closeModal() {
      this.setState({
        modalIsOpen: false,
        description: '',
        // amount: '',
        // month: 'Jan',
        // year: 2016,
        priority:'',
        name:'',
        messageFromServer: ''
      });
    }
componentDidMount() {
      this.setState({
        name: this.props.name
        
      });
      this.setState({
        desc: this.props.description
      });
    }
// handleSelectChange(e) {
//       if (e.target.name == 'month') {
//         this.setState({
//           month: e.target.value
//         });
//       }
//       if (e.target.name == 'year') {
//         this.setState({
//           year: e.target.value
//         });
//       }
//     }
onClick(e) {
      // this.insertNewExpense(this);
      this.insertNewTask(this);
    }
//insertNewExpense(e) {
  insertNewTask(e) {
      axios.post('/insert',
        querystring.stringify({
          description: e.state.description,
          // amount: e.state.amount,
          // month: e.state.month,
          // year: e.state.year
          priority: e.state.priority,
          name:e.state.name
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
      });
    }
handleTextChange(e) {
      if (e.target.name == "description") {
        this.setState({
          description: e.target.value
        });
      }
      if (e.target.name == "priority") {
        this.setState({
          priority: e.target.value
        });
      }
      if (e.target.name == "name") {
        this.setState({
          name: e.target.value
        });
      }
    }
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
      <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Task"
       className="Modal">
<Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
<fieldset>
       <label for="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
       <label for="priority">Priority:</label><input type="text" id="priority" name="priority" value={this.state.priority} onChange={this.handleTextChange}></input>
       <label for="name">Name:</label><input type ="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
      </fieldset>
<div className='button-center'>
        <br/>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Task</Button>
       </div>
          </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Add Task"
        className="Modal">
<div className='button-center'>
        <h3>{this.state.messageFromServer}</h3>
        <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
         <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
        </Link>
       </div>
      </Modal>
       </div>
     )
    }
   }
}
export default Add;

