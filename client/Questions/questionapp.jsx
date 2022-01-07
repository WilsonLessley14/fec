import React from 'react';
import Questionslist from './questionslist.jsx';
import Search from './search.jsx';
import token from '../../config.js';
import axios from 'axios';

class Questionapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      keyword: '',
      expandedView: 1
    };
    this.get = this.get.bind(this);
    // this.post = this.post.bind(this);
    this.sortHelpfulness = this.sortHelpfulness.bind(this);
    this.toggleQuestions = this.toggleQuestions.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.searchSort = this.searchSort.bind(this);
  }

  searchSort(arr) {
    if (this.state.keyword.length >= 3 ) {
      var contains = [];
      var original = arr;
      for (var i = 0; i < original.length; i ++) {
        if (original[i].question_body.includes(this.state.keyword)) {
          contains.push(original[i]);
        }
      }
      return contains;
    } else {
      return arr;
    }
  }

  searchKeyword(keyword) {
    if (keyword.length >= 3) {
      this.setState({
        keyword: keyword
      });
    } else {
      this.setState({
        keyword: ''
      });
    }
  }

  toggleQuestions(e) {
    e.preventDefault();
    this.setState({
      expandedView: this.state.expandedView + 2
    });
  }

  sortHelpfulness(arr) {
    var zeroesArray = [];

    for (var i = 0; i < arr.length; i ++) {
      if (arr[i].question_helpfulness === 0) {
        zeroesArray.push(arr[i]);
        arr.splice(i, 1);
      }
    }

    arr.sort((a, b) => (a.question_helpfulness) - (b.question_helpfulness));
    arr.reverse();

    for (var i = 0; i < zeroesArray.length; i ++) {
      arr.push(zeroesArray[i]);
    }
    return arr;
  }
  // post() {
  //   var options = {
  //     method: 'post',
  //     url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp32/qa/questions',
  //     data: {
  //       body: 'testquestion',
  //       name: 'testusername',
  //       email: 'testemail',
  //       product_id: 0
  //     },
  //     headers: {
  //       Authorization: token,
  //       accept: 'application/json',
  //       'content-type': 'application/json'
  //     }
  //   }

  //   axios(options)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  get() {
    var options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=' + JSON.stringify(this.props.product.id),
      headers: {
        Authorization: token,
        accept: 'application/json',
        'content-type': 'application/json',
      }
    }

    axios(options)
    .then(result => {
      this.setState({
        questions: this.sortHelpfulness(result.data.results)
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  getReported() {
    var options = {
      method: 'get',
      url: 'http://127.0.0.1:3000/fec'
    }
  }

  getHelpful() {

  }

  componentDidUpdate() {
    this.get();
    console.log('second questionapp', this.props.product);
  }

  render() {
    return (<div>
      <Search search={this.searchKeyword}/>
      <Questionslist questions={this.searchSort(this.state.questions)} productid={JSON.stringify(this.props.product.id)} productname={this.props.product.name} expandedView={this.state.expandedView}/>
      <button onClick={this.toggleQuestions} style={{display: (this.state.expandedView >= this.state.questions.length - 1) ? 'none' : 'block'}}>More Answered Questions</button>
      <button>Submit new question</button>
    </div>
    );
  }
}

export default Questionapp;