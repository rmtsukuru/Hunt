const mapTileWidth = 157;
const mapTileHeight = 200;

var tiles = [];
for (var i = 0; i < mapTileHeight; i++) {
    var row = [];
    for (var j = 0; j < mapTileWidth; j++) {
        row.push(0);
    }
    tiles.push(row);
}

// Places a tree at the specified at the specified x,y tile position, indexed at the top-left corner.
function insertTree(j, i) {
    tiles[i][j] = 2;
    tiles[i][j+1] = 2;
    tiles[i][j+2] = 2;
    tiles[i+1][j] = 2;
    tiles[i+1][j+1] = 2;
    tiles[i+1][j+2] = 2;
    tiles[i+2][j+1] = 1;
    tiles[i+3][j+1] = 1;
}

insertTree(72, 194);
insertTree(78, 192);
insertTree(65, 183);
insertTree(70, 180);
insertTree(75, 177);
insertTree(82, 182);

const TILE_SIZE = 32;
