import React, { useState } from 'react';

import Tile from '../tile/Tile';
import TileSet from '../tile/TileSet';
import styles from './Game.module.scss';

const Game = () => {
    const [tiles, setTiles] = useState([{}, {}, {}, {}, {}, {}]);

    return (
        <div className={styles.Game}>
            {tiles.map((tile, index) => (
                <TileSet key={index} />
            ))}
        </div>
    );
};

export default Game;
