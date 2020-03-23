import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import "./Questions.css";
import Question from './Question';
import ErrorBoundary from './ErrorBoundary';

class Questions extends Component {
  state = {
    questions: []
  };

  async componentDidMount() {
    /*
    const data = await fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean");
    const json = await data.json();
    var questionsList = await json.results.map((e, index) => {
      var parser = new DOMParser();
      var dom = parser.parseFromString('<!doctype html><body>' + e.question, 'text/html');
      var decodedString = dom.body.textContent;
      e.question = decodedString;
      return Object.assign({ id: index }, e);
    });
    */
    const questionsList = await fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy")
      .then(datas => datas.json())
      .then(json => json.results.map((data, index) => {
        data.id = index;
        return data;
      }));
    //this.setState({ questions });
    this.setState({ questions: questionsList });
  }

  render() {
    //throw new Error("pepito");
    return (
      <Grid container justify="center">{
        this.state.questions.map((e, index) =>
          <ErrorBoundary key={index}>
            <Question question={e} key={index} />
          </ErrorBoundary>
        )
      }</Grid>
    );
  }
}

export default Questions;
