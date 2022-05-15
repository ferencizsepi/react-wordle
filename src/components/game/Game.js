import React, { useEffect, useState } from 'react';

import Tile from '../tile/Tile';
import styles from './Game.module.scss';
import useEventListener from '../../hooks/useEventListener';

// TODO just for testing
const SOLUTION = 'KUTYA';

const VALID_KEYS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'
];

const Game = () => {
    const [row1, setRow1] = useState({
        active: true,
        activeLetterIndex: 0,
        letters: [
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' }
        ]
    });
    const [row2, setRow2] = useState({
        active: false,
        activeLetterIndex: 0,
        letters: [
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' }
        ]
    });
    const [row3, setRow3] = useState({
        active: false,
        activeLetterIndex: 0,
        letters: [
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' }
        ]
    });
    const [row4, setRow4] = useState({
        active: false,
        activeLetterIndex: 0,
        letters: [
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' }
        ]
    });
    const [row5, setRow5] = useState({
        active: false,
        activeLetterIndex: 0,
        letters: [
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' }
        ]
    });
    const [row6, setRow6] = useState({
        active: false,
        activeLetterIndex: 0,
        letters: [
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' },
            { contained: false, correct: false, incorrect: false, key: '' }
        ]
    });

    const [selectedKey, setSelectedKey] = useState('');
    const [activeRow, setActiveRow] = useState(undefined);
    const [message, setMessage] = useState({ text: '', type: '' });

    const keyHandler = ({ key }) => {
        if (key && VALID_KEYS.includes(String(key).toUpperCase())) {
            setSelectedKey(key.toUpperCase());
            if (!activeRow) {
                console.log('active row undefined')
                setActiveRow(1);
            }
            setMessage({ text: '', type: '' });
        } else if (key && key === 'Backspace') {
            deleteLetter();
            setMessage({ text: '', type: '' });
        } else if (key && key === 'Enter') {
            onEnterPressed();
        }
    };

    const onEnterPressed = () => {
        const row = getSelectedRow();
        if (row.activeLetterIndex < 5) {
            setMessage({ text: 'Not enough letters', type: 'WARNING' });
        } else {
            checkSolution();
        }
    };

    const checkSolution = () => {
        const solutionLetters = [...SOLUTION];
        let updatedLetters = [...getSelectedRow().letters];
        updatedLetters.forEach(function (letter, i) {
            const key = letter.key;
            if (solutionLetters[i] === key) {
                letter.correct = true;
            } else if (solutionLetters.includes(key)) {
                letter.contained = true;
            } else {
                letter.incorrect = true;
            }
        });

        let updatedRow = { ...getSelectedRow(), letters: updatedLetters };
        updateRow(activeRow, updatedRow);
        console.log('active row', activeRow)
        setActiveRow((prevValue => prevValue + 1));
    };

    // TODO find better solution
    const updateRow = (rowNum, updatedRow) => {
        if (rowNum === 1) {
            setRow1(updatedRow);
        }
        if (rowNum === 2) {
            setRow2(updatedRow);
        }
        if (rowNum === 3) {
            setRow3(updatedRow);
        }
        if (rowNum === 4) {
            setRow4(updatedRow);
        }
        if (rowNum === 5) {
            setRow5(updatedRow);
        }
        if (rowNum === 6) {
            setRow6(updatedRow);
        }
    };

    // TODO find better solution
    const deleteLetter = () => {
        const row = getSelectedRow();
        const activeLetterIndex = row.activeLetterIndex;
        if (activeLetterIndex > 0) {
            let updatedLetters = [...row.letters];
            updatedLetters[activeLetterIndex - 1].key = '';
            const updatedIndex = row.activeLetterIndex - 1;
            let updatedRow = { ...row, activeLetterIndex: updatedIndex, letters: updatedLetters };
            updateRow(activeRow, updatedRow);
        }
    };

    // TODO find better solution
    const getSelectedRow = () => {
        if (activeRow === 1) {
            return row1;
        }
        if (activeRow === 2) {
            return row2;
        }
        if (activeRow === 3) {
            return row2;
        }
        if (activeRow === 4) {
            return row4;
        }
        if (activeRow === 5) {
            return row5;
        }
        if (activeRow === 6) {
            return row6;
        }
    };

    useEffect(() => {
            const row = getSelectedRow();
            console.log('selected row', row)
            console.log('active row number', activeRow)
            if (activeRow && selectedKey) {
                let updatedLetters = [...row.letters];
                const currentLetterIndex = row.activeLetterIndex;
                if (currentLetterIndex < 5) {
                    updatedLetters[currentLetterIndex].key = selectedKey;
                    const updatedIndex = row.activeLetterIndex + 1;
                    let updatedRow = { ...row, activeLetterIndex: updatedIndex, letters: updatedLetters };
                    updateRow(activeRow, updatedRow);
                    setSelectedKey('');
                }

            }
        },
        [activeRow, getSelectedRow, selectedKey]
    );

    const getMessageStyles = () => {
        if (message && message.type === 'WARNING') {
            return [styles.Message, styles.Warning].join(' ');
        }
        return styles.Message;
    };

    useEventListener('keydown', keyHandler);

    return (
        <div className={ styles.Game }>
            <div className={ getMessageStyles() }>
                { message.text }
            </div>
            <div>
                {/*Row 1*/ }
                <div className={ styles.Row }>
                    { row1.letters.map((letter, index) => (
                        <Tile key={ 10 + index } letter={ letter.key } contained={ letter.contained }
                              correct={ letter.correct } incorrect={ letter.incorrect }/>
                    )) }
                </div>
                {/*Row 2*/ }
                <div className={ styles.Row }>
                    { row2.letters.map((letter, index) => (
                        <Tile key={ 20 + index } letter={ letter.key } contained={ letter.contained }
                              correct={ letter.correct } incorrect={ letter.incorrect }/>
                    )) }
                </div>
                {/*Row 3*/ }
                <div className={ styles.Row }>
                    { row3.letters.map((letter, index) => (
                        <Tile key={ 30 + index } letter={ letter.key } contained={ letter.contained }
                              correct={ letter.correct } incorrect={ letter.incorrect }/>
                    )) }
                </div>
                {/*Row 4*/ }
                <div className={ styles.Row }>
                    { row4.letters.map((letter, index) => (
                        <Tile key={ 40 + index } letter={ letter.key } contained={ letter.contained }
                              correct={ letter.correct } incorrect={ letter.incorrect }/>
                    )) }
                </div>
                {/*Row 5*/ }
                <div className={ styles.Row }>
                    { row5.letters.map((letter, index) => (
                        <Tile key={ 50 + index } letter={ letter.key } contained={ letter.contained }
                              correct={ letter.correct } incorrect={ letter.incorrect }/>
                    )) }
                </div>
                {/*Row 6*/ }
                <div className={ styles.Row }>
                    { row6.letters.map((letter, index) => (
                        <Tile key={ 60 + index } letter={ letter.key } contained={ letter.contained }
                              correct={ letter.correct } incorrect={ letter.incorrect }/>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default Game;
