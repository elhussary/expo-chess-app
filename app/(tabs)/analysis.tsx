import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chess } from 'chess.js';
import { ChessBoard } from '@/components/chess/ChessBoard';
import { ArrowLeft, ArrowRight, RotateCcw, SquareCheck as CheckSquare, ClipboardPaste } from 'lucide-react-native';

export default function AnalysisScreen() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moveIndex, setMoveIndex] = useState(-1);
  const [moveHistory, setMoveHistory] = useState([]);
  const [fenInput, setFenInput] = useState('');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  const handleSquarePress = (square) => {
    // In analysis mode, we allow repositioning pieces freely
    if (!selectedSquare) {
      const piece = game.get(square);
      if (piece) {
        setSelectedSquare(square);
        // Get possible moves for selected piece
        const moves = game.moves({ square, verbose: true });
        setPossibleMoves(moves.map(move => move.to));
      }
    } else {
      try {
        // Make the move
        game.move({ from: selectedSquare, to: square, promotion: 'q' });
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setFen(newGame.fen());
        
        // Update move history
        const newHistory = [...moveHistory, { 
          from: selectedSquare, 
          to: square, 
          piece: game.get(square),
          fen: newGame.fen(),
          san: game.history({ verbose: true }).pop()?.san || ''
        }];
        setMoveHistory(newHistory);
        setMoveIndex(newHistory.length - 1);
      } catch (e) {
        // Invalid move
      }
      
      // Clear selection
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const resetBoard = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setMoveHistory([]);
    setMoveIndex(-1);
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  const navigateMove = (direction) => {
    const newIndex = moveIndex + direction;
    if (newIndex >= -1 && newIndex < moveHistory.length) {
      setMoveIndex(newIndex);
      let newGame;
      
      if (newIndex === -1) {
        // Initial position
        newGame = new Chess();
      } else {
        // Position after move
        newGame = new Chess(moveHistory[newIndex].fen);
      }
      
      setGame(newGame);
      setFen(newGame.fen());
    }
  };

  const importFen = () => {
    try {
      const newGame = new Chess(fenInput);
      setGame(newGame);
      setFen(newGame.fen());
      setMoveHistory([]);
      setMoveIndex(-1);
      setSelectedSquare(null);
      setPossibleMoves([]);
    } catch (e) {
      // Invalid FEN
      alert('Invalid FEN notation');
    }
  };

  const copyFen = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fen);
      alert('FEN copied to clipboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analysis Board</Text>
      </View>

      <View style={styles.boardContainer}>
        <ChessBoard 
          game={game} 
          selectedSquare={selectedSquare}
          possibleMoves={possibleMoves}
          onSquarePress={handleSquarePress}
          flipped={false}
          analysisMode={true}
        />
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.navigationControls}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigateMove(-1)}
            disabled={moveIndex === -1}
          >
            <ArrowLeft size={24} color={moveIndex === -1 ? '#BBBBBB' : '#1A2238'} />
          </TouchableOpacity>
          
          <Text style={styles.moveIndexText}>
            {moveIndex + 1} / {moveHistory.length}
          </Text>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigateMove(1)}
            disabled={moveIndex === moveHistory.length - 1}
          >
            <ArrowRight size={24} color={moveIndex === moveHistory.length - 1 ? '#BBBBBB' : '#1A2238'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetBoard}
        >
          <RotateCcw size={20} color="#FFFFFF" />
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fenSection}>
        <Text style={styles.sectionTitle}>Position (FEN)</Text>
        <View style={styles.fenContainer}>
          <Text style={styles.fenText} numberOfLines={1} ellipsizeMode="tail">
            {fen}
          </Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyFen}>
            <ClipboardPaste size={20} color="#1A2238" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.fenInputContainer}>
          <TextInput
            style={styles.fenInput}
            value={fenInput}
            onChangeText={setFenInput}
            placeholder="Enter FEN notation..."
            placeholderTextColor="#9E9E9E"
          />
          <TouchableOpacity style={styles.importButton} onPress={importFen}>
            <CheckSquare size={20} color="#FFFFFF" />
            <Text style={styles.importButtonText}>Import</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.movesContainer}>
        <Text style={styles.sectionTitle}>Move History</Text>
        {moveHistory.length === 0 ? (
          <Text style={styles.emptyText}>No moves yet</Text>
        ) : (
          <View style={styles.moveList}>
            {moveHistory.map((move, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.moveItem,
                  moveIndex === index ? styles.activeMoveItem : null
                ]}
                onPress={() => {
                  setMoveIndex(index);
                  setGame(new Chess(move.fen));
                  setFen(move.fen);
                }}
              >
                <Text style={styles.moveNumber}>
                  {Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'}
                </Text>
                <Text style={styles.moveSan}>{move.san}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1A2238',
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  navigationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  moveIndexText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A2238',
    marginHorizontal: 16,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2238',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  fenSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A2238',
    marginBottom: 8,
  },
  fenContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  fenText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1A2238',
    flex: 1,
  },
  copyButton: {
    padding: 4,
  },
  fenInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fenInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E09F3E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  importButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  movesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
  moveList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 4,
  },
  activeMoveItem: {
    backgroundColor: '#E8F0FE',
    borderColor: '#1A2238',
  },
  moveNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    marginRight: 4,
  },
  moveSan: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1A2238',
  },
});