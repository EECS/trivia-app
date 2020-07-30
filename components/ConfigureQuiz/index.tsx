import React from "react";
import Select, { ValueType } from "react-select";

//Types import
import { TOption } from "../../types/ConfigureQuiz/ConfigureQuiz.types";

import Button from '../Button';

import { DIFFICULTY_OPTIONS } from '../../constants/ConfigureQuiz/constants';

type Props = {
    onDifficultySelect(value: ValueType<TOption>): void,
    onStartClick: Function,
    selectedDifficulty: TOption,
};


const ConfigureQuiz = ({ onDifficultySelect, onStartClick, selectedDifficulty }: Props) => {
    return (
        <div>
            <Select
                options={DIFFICULTY_OPTIONS}
                onChange={option => onDifficultySelect(option)}
                value={selectedDifficulty}
                defaultValue={DIFFICULTY_OPTIONS[0]}
            />
            <Button onClick={onStartClick} disabled={!selectedDifficulty}>Start Quiz</Button>
        </div>
    );
};

export default ConfigureQuiz;
