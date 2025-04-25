import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RotateCcw, SkipForward, Pause, Play } from 'lucide-react-native';

interface ChessControlsProps {
  onUndo: () => void;
  onNewGame: () => void;
  onTogglePause: () => void;
  isPaused: boolean;
}

export function ChessControls({ 
  onUndo, 
  onNewGame, 
  onTogglePause, 
  isPaused 
}: ChessControlsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.controlButton}
        onPress={onUndo}
      >
        <RotateCcw size={24} color="#1A2238" />
        <Text style={styles.controlText}>Undo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.controlButton, styles.pauseButton]}
        onPress={onTogglePause}
      >
        {isPaused ? (
          <>
            <Play size={24} color="#FFFFFF" />
            <Text style={[styles.controlText, styles.pauseText]}>Start</Text>
          </>
        ) : (
          <>
            <Pause size={24} color="#FFFFFF" />
            <Text style={[styles.controlText, styles.pauseText]}>Pause</Text>
          </>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.controlButton}
        onPress={onNewGame}
      >
        <SkipForward size={24} color="#1A2238" />
        <Text style={styles.controlText}>New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pauseButton: {
    backgroundColor: '#1A2238',
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#1A2238',
    marginTop: 4,
  },
  pauseText: {
    color: '#FFFFFF',
  },
});