import React from "react";
import Select from "react-select";

import Button from '../Button';

import { DIFFICULTY_OPTIONS } from './constants';

type Props = {
    onDifficultySelect: Function,
    onStartClick: Function,
    selectedDifficulty?: string,
};


const ConfigureQuiz = ({ onDifficultySelect, onStartClick, selectedDifficulty }: Props) => {
    return (
        <div>
            <Select 
                options={DIFFICULTY_OPTIONS}
                onChange={onDifficultySelect}
                value={selectedDifficulty}
            />
            <Button onClick={onStartClick} disabled={!selectedDifficulty}>Start Quiz</Button>
        </div>
    );
};

export default ConfigureQuiz;
