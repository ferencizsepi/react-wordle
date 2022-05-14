import React from 'react';
import styles from './Tile.module.scss';

const Tile = ({ letter }) => {
    return (
        <div className={styles.Tile}>{letter}</div>
    );
};

export default Tile;