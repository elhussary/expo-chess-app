import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chess } from 'chess.js';
import { RotateCcw, SkipForward, Pause, Settings } from 'lucide-react-native';
import { ChessBoard } from '@/components/chess/ChessBoard';
import { MoveHistory } from '@/components/chess/MoveHistory';
import { GameTimer } from '@/components/chess/GameTimer';
import { ChessControls } from '@/components/chess/ChessControls';

const DEFAULT_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

export default function PlayScreen() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('w');
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [timeWhite, setTimeWhite] = useState(DEFAULT_TIME);
  const [timeBlack, setTimeBlack] = useState(DEFAULT_TIME);
  const [isPaused, setIsPaused] = useState(true);

  // Start a new game
  const newGame = () => {
    const newGameState = new Chess();
    setGame(newGameState);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setCurrentPlayer('w');
    setGameOver(false);
    setGameStatus('');
    setTimeWhite(DEFAULT_TIME);
    setTimeBlack(DEFAULT_TIME);
    setIsPaused(true);
  };

  // Handle timer tick based on current player
  useEffect(() => {
    let interval;
    
    if (!isPaused && !gameOver) {
      interval = setInterval(() => {
        if (currentPlayer === 'w') {
          setTimeWhite(prev => {
            if (prev <= 1000) {
              clearInterval(interval);
              setGameOver(true);
              setGameStatus('Black wins on time');
              return 0;
            }
            return prev - 1000;
          });
        } else {
          setTimeBlack(prev => {
            if (prev <= 1000) {
              clearInterval(interval);
              setGameOver(true);
              setGameStatus('White wins on time');
              return 0;
            }
            return prev - 1000;
          });
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [currentPlayer, isPaused, gameOver]);

  // Check for checkmate and other game end conditions
  useEffect(() => {
    if (game.isGameOver()) {
      setGameOver(true);
      setIsPaused(true);
      
      if (game.isCheckmate()) {
        setGameStatus(`${currentPlayer === 'w' ? 'Black' : 'White'} wins by checkmate`);
      } else if (game.isDraw()) {
        setGameStatus('Game ended in draw');
      } else if (game.isStalemate()) {
        setGameStatus('Game ended in stalemate');
      } else if (game.isThreefoldRepetition()) {
        setGameStatus('Game ended by threefold repetition');
      } else if (game.isInsufficientMaterial()) {
        setGameStatus('Game ended by insufficient material');
      }
    }
  }, [game, currentPlayer]);

  // Handle square selection and move
  const handleSquarePress = (square) => {
    if (gameOver) return;
    
    // If selecting a piece
    if (!selectedSquare) {
      const piece = game.get(square);
      // Only allow selecting own pieces
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(square);
        // Get possible moves for selected piece
        const moves = game.moves({ square, verbose: true });
        setPossibleMoves(moves.map(move => move.to));
      }
    } 
    // If moving a piece
    else {
      // Check if the move is valid
      if (possibleMoves.includes(square)) {
        try {
          // Start timer on first move
          if (isPaused) {
            setIsPaused(false);
          }
          
          // Make the move
          game.move({ from: selectedSquare, to: square, promotion: 'q' });
          setGame(new Chess(game.fen()));
          setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
          
          // Apply haptic feedback if supported
          if (Platform.OS !== 'web') {
            try {
              const Haptics = require('expo-haptics');
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            } catch (e) {
              // Haptics not available
            }
          }
        } catch (e) {
          // Invalid move, do nothing
        }
      }
      
      // Clear selection
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const undoMove = () => {
    if (!gameOver && game.history().length > 0) {
      game.undo();
      setGame(new Chess(game.fen()));
      setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const confirmNewGame = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Start a new game? Current game will be lost.')) {
        newGame();
      }
    } else {
      Alert.alert(
        'New Game',
        'Start a new game? Current game will be lost.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'New Game', onPress: () => newGame() },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chess Game</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#1A2238" />
        </TouchableOpacity>
      </View>

      <View style={styles.timerContainer}>
        <GameTimer 
          time={timeBlack} 
          isActive={currentPlayer === 'b' && !isPaused} 
          player="Black" 
        />
      </View>

      <View style={styles.boardContainer}>
        <ChessBoard 
          game={game} 
          selectedSquare={selectedSquare}
          possibleMoves={possibleMoves}
          onSquarePress={handleSquarePress}
          flipped={false}
        />
      </View>

      <View style={styles.timerContainer}>
        <GameTimer 
          time={timeWhite} 
          isActive={currentPlayer === 'w' && !isPaused} 
          player="White" 
        />
      </View>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>{gameStatus}</Text>
          <TouchableOpacity 
            style={styles.newGameButton}
            onPress={newGame}
          >
            <Text style={styles.newGameButtonText}>New Game</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.bottomContainer}>
        <ChessControls 
          onUndo={undoMove}
          onNewGame={confirmNewGame}
          onTogglePause={togglePause}
          isPaused={isPaused}
        />
      </View>

      <View style={styles.moveHistoryContainer}>
        <MoveHistory moves={game.history({ verbose: true })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1A2238',
  },
  settingsButton: {
    padding: 8,
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  timerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  gameOverContainer: {
    backgroundColor: 'rgba(26, 34, 56, 0.9)',
    padding: 24,
    borderRadius: 16,
    margin: 24,
    alignItems: 'center',
  },
  gameOverText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  newGameButton: {
    backgroundColor: '#E09F3E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  newGameButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  moveHistoryContainer: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
});