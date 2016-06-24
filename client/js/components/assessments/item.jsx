"use strict";

import React  from "react";

import * as AssessmentActions  from "../../actions/assessment";
import UniversalInput          from "./universal_input";

export default class Item extends React.Component{

  static propTypes = {
    question                   : React.PropTypes.object.isRequired,
    response                   : React.PropTypes.array.isRequired,
    currentItemIndex           : React.PropTypes.number.isRequired,
    questionCount              : React.PropTypes.number.isRequired,
    messageIndex               : React.PropTypes.number.isRequired,
    goToNextQuestion           : React.PropTypes.func.isRequired,
    goToPrevQuestion           : React.PropTypes.func.isRequired,
    submitAssessment           : React.PropTypes.func.isRequired,
    selectAnswer               : React.PropTypes.func.isRequired,
    outcomes                   : React.PropTypes.object,
  };

  nextButtonClicked(e){
    e.preventDefault();
    this.props.goToNextQuestion();
  }

  previousButtonClicked(e){
    e.preventDefault();
    this.props.goToPrevQuestion();
  }

  submitButtonClicked(e){
    e.preventDefault();
    this.props.submitAssessment();
  }

  getNavigationButtons() {
    return (
      <div className="confidence_wrapper">
        {this.getPreviousButton()}
        {this.getNextButton()}
      </div>
    );
  }

  getNextButton() {
    let disabled = (this.props.currentItemIndex == this.props.questionCount - 1);
    return (
      <button className="next-btn"
              onClick={(e) => { this.nextButtonClicked(e); }}
              disabled={disabled}>
        <span>Next</span> <i className="glyphicon glyphicon-chevron-right"></i>
      </button>
    );
  }

  getPreviousButton() {
    let disabled = (this.props.currentItemIndex === 0);
    return (
      <button className="prev-btn"
              onClick={(e) => { this.previousButtonClicked(e); }}
              disabled={disabled}>
        <i className="glyphicon glyphicon-chevron-left"></i><span>Previous</span>
      </button>
    );
  }

  getSubmitButton() {
    if(this.props.currentItemIndex == this.props.questionCount - 1 && this.props.assessment_kind === "SUMMATIVE") {
      return (
        <div>
          <button className="btn btn-check-answer"
                  onClick={(e)=>{this.submitButtonClicked(e);}}>
            Submit
          </button>
        </div>
      );
    }
  }

  getCounter(){
    if(this.props.shouldShowCounter){
      return <span className="counter">
              {this.props.currentItemIndex + 1} of {this.props.questionCount}
             </span>;
    }
  }

  getResult(index){
    var text;

    if(index == CORRECT_RESPONSE){
      text = "Correct";
    } else if(index == INCORRECT_RESPONSE) {
      text = "Incorrect";
    } else {
      text = "";
    }

    return (
      <div className="check_answer_result">
        <p>{text}</p>
      </div>
    );
  }


  render() {
    var result = this.getResult(this.props.messageIndex);
    var navigation = this.getNavigationButtons();

    var counter = this.getCounter();
    var submitButton = this.getSubmitButton();

    var questionDirections;
    if(this.props.question.question_type == "multiple_answers_question"){
      questionDirections = <div>Choose <b>ALL</b> that apply.</div>;
    } else {
      questionDirections = <div>Choose the <b>BEST</b> answer.</div>;
    }

    return (
      <div className="assessment_container">
        <div className="question">
          <div className="header">
            {counter}
            <p>{this.props.question.title}</p>
          </div>
          <div>
            <form className="edit_item">
              <div className="full_question" tabIndex="0">
                <div className="inner_question">
                  <div className="question_text">
                    {questionDirections}
                    <div
                        dangerouslySetInnerHTML={{
                          __html: this.props.question.material
                        }}>
                    </div>
                  </div>
                  <UniversalInput
                    item={this.props.question}
                    isResult={false}
                    selectAnswer={this.props.selectAnswer}
                    response={this.props.response}
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-6 col-xs-8" >
                    {result}
                    {navigation}
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-4">
                    {submitButton}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const UNGRADED_RESPONSE = 0;
export const CORRECT_RESPONSE = 1;
export const INCORRECT_RESPONSE = 2;
