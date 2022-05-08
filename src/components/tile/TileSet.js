import React, { useState } from 'react';

import Tile from '../tile/Tile';
import styles from './TileSet.module.scss';

const TileSet = () => {
    const [tiles, setTiles] = useState([{}, {}, {}, {}, {}]);
    return (
        <div className={styles.TileSet}>
            {tiles.map((tile, index) => (
                <Tile key={index} />
            ))}
        </div>
    );
};

export default TileSet;
