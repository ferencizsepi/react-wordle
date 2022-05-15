import React from 'react';
import styles from './Tile.module.scss';

const Tile = ({ letter, contained, correct, incorrect }) => {

    const getStyles = () => {
        if (contained) {
            return [styles.Tile, styles.Contained].join(' ');
        } else if (correct) {
            return [styles.Tile, styles.Correct].join(' ');
        } else if (incorrect) {
            return [styles.Tile, styles.Incorrect].join(' ');
        }
        return styles.Tile;
    };

    return (
        <div className={getStyles()}>{letter}</div>
    );
};

export default Tile;