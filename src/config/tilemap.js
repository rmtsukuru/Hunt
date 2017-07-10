const mapTileWidth = 137;
const mapTileHeight = 200;

const TILE_SIZE = 32;

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
    tiles[i][j] = 6;
    tiles[i][j+1] = 7;
    tiles[i][j+2] = 8;
    tiles[i+1][j] = 3;
    tiles[i+1][j+1] = 4;
    tiles[i+1][j+2] = 5;
    tiles[i+2][j+1] = 2;
    tiles[i+3][j+1] = 1;
}

insertTree(72, 194);
insertTree(78, 192);
insertTree(65, 183);
insertTree(70, 180);
insertTree(75, 177);
insertTree(82, 182);
insertTree(76, 168);
insertTree(80, 160);
insertTree(62, 150);
insertTree(73, 143);
insertTree(65, 136);
insertTree(70, 120);
insertTree(69, 113);
insertTree(76, 106);
insertTree(72, 96);
insertTree(78, 98);
insertTree(84, 82);
insertTree(65, 86);
insertTree(63, 191);
insertTree(57, 185);
insertTree(51, 190);
insertTree(43, 178);
insertTree(40, 187);
insertTree(33, 181);
insertTree(26, 190);
insertTree(20, 176);
insertTree(12, 184);
insertTree(7, 169);
insertTree(3, 158);
insertTree(12, 162);
insertTree(68, 167);
insertTree(64, 159);
insertTree(75, 152);
insertTree(55, 171);
insertTree(44, 166);
insertTree(30, 162);
insertTree(23, 168);
insertTree(48, 154);
insertTree(36, 150);
insertTree(20, 147);
insertTree(9, 138);
insertTree(51, 140);
insertTree(55, 129);
insertTree(30, 136);
insertTree(39, 125);
insertTree(17, 127);
insertTree(49, 116);
insertTree(58, 107);
insertTree(51, 95);
insertTree(43, 105);
insertTree(10, 114);
insertTree(25, 109);
insertTree(33, 93);
insertTree(16, 99);
insertTree(7, 88);
insertTree(21, 78);
insertTree(42, 76);
insertTree(58, 74);
insertTree(12, 61);
insertTree(29, 65);
insertTree(8, 47);
insertTree(19, 50);
insertTree(11, 37);
insertTree(45, 63);
insertTree(63, 58);
insertTree(32, 53);

