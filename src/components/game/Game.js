import React, { useEffect, useState } from 'react';

import Tile from '../tile/Tile';
import styles from './Game.module.scss';
import useEventListener from '../../hooks/useEventListener';

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

    const keyHandler = ({ key }) => {
        if (key && VALID_KEYS.includes(String(key).toUpperCase())) {
            console.log(key.toUpperCase());
            setSelectedKey(key.toUpperCase());
        }
    };

    useEffect(() => {
            if (activeRow === 0 && selectedKey) {
                let updatedLetters = [...row1.letters];
                const currentLetterIndex = row1.activeLetterIndex;
                updatedLetters[currentLetterIndex] = selectedKey;
                const updatedIndex = row1.activeLetterIndex + 1;
                let updatedRow1 = { ...row1, activeLetterIndex: updatedIndex, letters: updatedLetters };
                setRow1(updatedRow1);
            }
        },
        [selectedKey]
    );

    useEventListener('keydown', keyHandler);

    return (
        <div className={styles.Game}>
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
    );
};

export default Game;
