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
    const [row1, setRow1] = useState({ active: true, activeLetterIndex: 0, letters: ['', '', '', '', ''] });
    const [row2, setRow2] = useState({ active: false, activeLetterIndex: 0, letters: ['', '', '', '', ''] });
    const [row3, setRow3] = useState({ active: false, activeLetterIndex: 0, letters: ['', '', '', '', ''] });
    const [row4, setRow4] = useState({ active: false, activeLetterIndex: 0, letters: ['', '', '', '', ''] });
    const [row5, setRow5] = useState({ active: false, activeLetterIndex: 0, letters: ['', '', '', '', ''] });
    const [row6, setRow6] = useState({ active: false, activeLetterIndex: 0, letters: ['', '', '', '', ''] });

    const [selectedKey, setSelectedKey] = useState('');
    const [activeRow, setActiveRow] = useState(0);
    const [message, setMessage] = useState({ text: '', type: '' });

    const keyHandler = ({ key }) => {
        if (key && VALID_KEYS.includes(String(key).toUpperCase())) {
            console.log(key.toUpperCase());
            setSelectedKey(key.toUpperCase());
            setMessage({text: '', type: ''})
        } else if (key && key === 'Backspace') {
            deleteLetter();
            setMessage({text: '', type: ''})
        } else if (key && key === 'Enter') {
            onEnterPressed();
        }
    };

    const onEnterPressed = () => {
        const row = getSelectedRow();
        if (row.activeLetterIndex < 5) {
            setMessage({ text: 'Not enough letters', type: 'WARNING' });
        } else {
            alert('Check solution');
        }
    };

    // TODO find better solution
    const deleteLetter = () => {
        const row = getSelectedRow();
        const activeLetterIndex = row.activeLetterIndex;
        if (activeLetterIndex > 0) {
            let updatedLetters = [...row.letters];
            updatedLetters[activeLetterIndex - 1] = '';
            const updatedIndex = row.activeLetterIndex - 1;
            let updatedRow = { ...row, activeLetterIndex: updatedIndex, letters: updatedLetters };
            if (activeRow === 0) {
                setRow1(updatedRow);
            }
            if (activeRow === 1) {
                setRow2(updatedRow);
            }
            if (activeRow === 2) {
                setRow3(updatedRow);
            }
            if (activeRow === 3) {
                setRow4(updatedRow);
            }
            if (activeRow === 4) {
                setRow5(updatedRow);
            }
            if (activeRow === 5) {
                setRow6(updatedRow);
            }
        }
    };

    // TODO find better solution
    const getSelectedRow = () => {
        if (activeRow === 0) {
            return row1;
        }
        if (activeRow === 1) {
            return row2;
        }
        if (activeRow === 2) {
            return row2;
        }
        if (activeRow === 3) {
            return row4;
        }
        if (activeRow === 4) {
            return row5;
        }
        if (activeRow === 5) {
            return row6;
        }
    };

    useEffect(() => {
            const row = getSelectedRow();
            if (activeRow === 0 && selectedKey) {
                let updatedLetters = [...row.letters];
                const currentLetterIndex = row.activeLetterIndex;
                if (currentLetterIndex < 5) {
                    updatedLetters[currentLetterIndex] = selectedKey;
                    const updatedIndex = row.activeLetterIndex + 1;
                    let updatedRow1 = { ...row, activeLetterIndex: updatedIndex, letters: updatedLetters };
                    setRow1(updatedRow1);
                    setSelectedKey('');
                }

            }
        },
        [selectedKey]
    );

    const getMessageStyles = () => {
        if (message && message.type === 'WARNING') {
            return [styles.Message, styles.Warning].join(' ');
        }
        return styles.Message;
    };

    useEventListener('keydown', keyHandler);

    return (
        <div className={styles.Game}>
            <div className={getMessageStyles()}>
                {message.text}
            </div>
            <div>
                {/*Row 1*/}
                <div className={styles.Row}>
                    {row1.letters.map((letter, index) => (
                        <Tile key={10 + index} letter={letter}/>
                    ))}
                </div>
                {/*Row 2*/}
                <div className={styles.Row}>
                    {row2.letters.map((letter, index) => (
                        <Tile key={20 + index} letter={letter}/>
                    ))}
                </div>
                {/*Row 3*/}
                <div className={styles.Row}>
                    {row3.letters.map((letter, index) => (
                        <Tile key={30 + index} letter={letter}/>
                    ))}
                </div>
                {/*Row 4*/}
                <div className={styles.Row}>
                    {row4.letters.map((letter, index) => (
                        <Tile key={40 + index} letter={letter}/>
                    ))}
                </div>
                {/*Row 5*/}
                <div className={styles.Row}>
                    {row5.letters.map((letter, index) => (
                        <Tile key={50 + index} letter={letter}/>
                    ))}
                </div>
                {/*Row 6*/}
                <div className={styles.Row}>
                    {row6.letters.map((letter, index) => (
                        <Tile key={60 + index} letter={letter}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;
