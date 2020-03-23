import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import "./Question.css";

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            allAnswersShuffled: [],
            answerChecked: false,
            message: "",
            styleMessage: "",
            disabled: false
        }
    }

    componentWillMount() {
        this.setState({ title: this.decode(this.props.question.question) });
        const { correct_answer, incorrect_answers } = this.props.question;
        this.setState({ allAnswersShuffled: this.shuffle([...incorrect_answers, correct_answer]) });
        if (this.state.allAnswersShuffled.find(e => e === "True") && this.state.allAnswersShuffled.find(e => e === "False")) this.setState({ allAnswersShuffled: ["True", "False"] });
    }

    render() {
        //throw new Error("message");
        console.log("estoy renderizando");
        const { id } = this.props.question;
        const { title, allAnswersShuffled, message, styleMessage, disabled } = this.state;
        return (
            <Grid container justify="center" alignItems="center" className="my-1">
                <Grid item xs={3}>
                    <Card variant="outlined" className="bg-gray rounded-md">
                        <CardContent >
                            <Typography component="h3" className="text-gray my-1">{title}</Typography >
                            <RadioGroup name={"answer" + id}>
                                {allAnswersShuffled.map((answer, i) =>
                                    <FormControlLabel key={i} value={answer} control={<Radio />} label={answer} disabled={disabled} />
                                )}
                            </RadioGroup>
                            <FormHelperText className={styleMessage} >{message}</FormHelperText>
                            <Button onClick={() => this.checkAnswer(id)} variant="contained" color="secondary" className="my-1" disabled={disabled}>Check answer</Button>
                        </CardContent>
                    </Card >
                </Grid>
            </Grid>
        )
    }

    decode(codified) {
        var parser = new DOMParser();
        var dom = parser.parseFromString('<!doctype html><body>' + codified, 'text/html');
        var decodedString = dom.body.textContent;
        return codified = decodedString;
    }

    shuffle(array) {
        var ctr = array.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = array[ctr];
            array[ctr] = array[index];
            array[index] = temp;
        }
        return array;
    }

    checkAnswer = (idQuestion) => {
        var answers = document.getElementsByName("answer" + idQuestion);
        for (let answer of answers) {
            if (answer.checked) {
                let result = (answer.value === this.props.question.correct_answer) ? "Correcto" : "Incorrecto";
                (result === "Correcto") ? this.setState({ styleMessage: "my-05 text-green" }) : this.setState({ styleMessage: "my-05 text-red" });
                this.setState({ answerChecked: true, message: result, disabled: true });
                return true;
            }
        }
        this.setState({
            message: "You must choose an answer first.",
            styleMessage: "my-05 text-yellow"
        });
    }
 
    //Cheater
    /*
    componentDidUpdate() {
        if (this.state.message === "Incorrecto" && this.state.answerChecked === true) {
            this.setState({ answerChecked: false, disabled: false })
        }
    }
    */

}

export default Question;