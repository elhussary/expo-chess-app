import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { ChessPiece } from './ChessPiece';

interface ChessBoardProps {
  game: any;
  selectedSquare: string | null;
  possibleMoves: string[];
  onSquarePress: (square: string) => void;
  flipped?: boolean;
  analysisMode?: boolean;
}

export function ChessBoard({
  game,
  selectedSquare,
  possibleMoves,
  onSquarePress,
  flipped = false,
  analysisMode = false,
}: ChessBoardProps) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // Use the smaller dimension to ensure board fits on screen, with more space
  const boardSize = Math.min(windowWidth - 32, windowHeight * 0.7, 600);
  const squareSize = boardSize / 8;

  // Generate the squares in the correct order
  const squares = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // If the board is flipped, reverse the files and ranks
  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  // Check if a position is in check
  const isInCheck = () => {
    return game.inCheck();
  };

  // Find the king's position
  const findKingPosition = (color: 'w' | 'b') => {
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const square = files[file] + ranks[rank];
        const piece = game.get(square);
        if (piece && piece.type === 'k' && piece.color === color) {
          return square;
        }
      }
    }
    return null;
  };

  // Get the king's square if it's in check
  const kingInCheckSquare = isInCheck() ? findKingPosition(game.turn()) : null;

  // Create rows array to hold squares
  const rows = [];

  // Create the board row by row
  for (let rank = 0; rank < 8; rank++) {
    const squaresInRow = [];

    for (let file = 0; file < 8; file++) {
      const squareName = displayFiles[file] + displayRanks[rank];
      const isLightSquare = (file + rank) % 2 === 0;
      const piece = game.get(squareName);
      const isSelected = selectedSquare === squareName;
      const isPossibleMove = possibleMoves.includes(squareName);
      const isCheck = squareName === kingInCheckSquare;

      // Determine the background color - using lichess colors
      let backgroundColor = isLightSquare ? '#F0D9B5' : '#B58863';

      // Apply special colors for selected squares and possible moves
      if (isSelected) {
        backgroundColor = '#94CF58'; // Bright green for selected square
      } else if (isPossibleMove) {
        backgroundColor = isLightSquare ? '#AAD576' : '#829769'; // Green tint for possible moves
      } else if (isCheck) {
        backgroundColor = '#E32636'; // Bright red for check
      }

      squaresInRow.push(
        <TouchableOpacity
          key={squareName}
          style={[
            styles.square,
            {
              backgroundColor,
              width: squareSize,
              height: squareSize,
            },
          ]}
          onPress={() => onSquarePress(squareName)}
        >
          {piece && (
            <ChessPiece
              type={piece.type}
              color={piece.color}
              size={squareSize * 0.85}
            />
          )}

          {isPossibleMove && !piece && (
            <View
              style={[
                styles.moveIndicator,
                { width: squareSize * 0.28, height: squareSize * 0.28 },
              ]}
            />
          )}

          {isPossibleMove && piece && (
            <View
              style={[
                styles.captureIndicator,
                { width: squareSize - 4, height: squareSize - 4 },
              ]}
            />
          )}

          {/* Coordinates */}
          {file === 0 && (
            <Text
              style={[
                styles.coordinateText,
                styles.rankText,
                {
                  left: 4,
                  color: isLightSquare ? '#B58863' : '#F0D9B5',
                  fontSize: squareSize * 0.25,
                },
              ]}
            >
              {displayRanks[rank]}
            </Text>
          )}

          {rank === 7 && (
            <Text
              style={[
                styles.coordinateText,
                styles.fileText,
                {
                  bottom: 4,
                  color: isLightSquare ? '#B58863' : '#F0D9B5',
                  fontSize: squareSize * 0.25,
                },
              ]}
            >
              {displayFiles[file]}
            </Text>
          )}
        </TouchableOpacity>
      );
    }

    rows.push(
      <View key={rank} style={styles.row}>
        {squaresInRow}
      </View>
    );
  }

  return (
    <View style={[styles.boardContainer]}>
      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {rows}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    padding: 8,
    backgroundColor: '#302E2C',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  board: {
    flexDirection: 'column',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  moveIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 100,
  },
  captureIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
  },
  coordinateText: {
    position: 'absolute',
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
  },
  rankText: {
    top: 2,
  },
  fileText: {
    right: 2,
  },
});
