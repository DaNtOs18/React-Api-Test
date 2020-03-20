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
    state = {
        allAnswers: [],
        message: "",
        styleMessage: "",
        disabled: false
    }

    checkAnswer = (idQuestion) => {
        var answers = document.getElementsByName("answer" + idQuestion);
        for (let answer of answers) {
            if (answer.checked) {
                let result = (answer.value === this.props.question.correct_answer) ? "Correcto" : "Incorrecto";
                (result === "Correcto") ? this.setState({ styleMessage: "my-05 text-green" }) : this.setState({ styleMessage: "my-05 text-red" });
                this.setState({ message: result, disabled: true });
                return true;
            }
        }
        this.setState({
            message: "You must choose an answer first.",
            styleMessage: "my-05 text-yellow"
        });
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

    componentDidMount() {
        const { correct_answer, incorrect_answers } = this.props.question;
        this.setState({ allAnswers: this.shuffle([...incorrect_answers, correct_answer]) });
    }

    render() {
        const { id, question } = this.props.question;
        const { allAnswers, message, styleMessage, disabled } = this.state;
        let allAnswersShuffled = allAnswers;
        if (allAnswersShuffled.find(e => e === "True") && allAnswersShuffled.find(e => e === "False")) allAnswersShuffled = ["True", "False"];
        return (
            <Grid container justify="center" alignItems="center" className="my-1">
                <Grid item xs={3}>
                    <Card variant="outlined" className="bg-gray rounded-md">
                        <CardContent >
                            <Typography component="h3" className="text-gray my-1">{question}</Typography >
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
}

export default Question;