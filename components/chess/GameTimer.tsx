import { View, Text, StyleSheet } from 'react-native';

interface GameTimerProps {
  time: number;
  isActive: boolean;
  player: string;
}

export function GameTimer({ time, isActive, player }: GameTimerProps) {
  // Format milliseconds to MM:SS
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[
      styles.container,
      isActive ? styles.activeContainer : null,
      player === 'Black' ? styles.blackContainer : styles.whiteContainer
    ]}>
      <Text style={styles.playerText}>{player}</Text>
      <Text style={[
        styles.timeText,
        isActive ? styles.activeTimeText : null,
        time < 60000 ? styles.lowTimeText : null
      ]}>
        {formatTime(time)}
      </Text>
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
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#E09F3E',
  },
  blackContainer: {
    backgroundColor: '#EEEEEE',
  },
  whiteContainer: {
    backgroundColor: '#FFFFFF',
  },
  playerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A2238',
  },
  timeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1A2238',
  },
  activeTimeText: {
    color: '#1A2238',
  },
  lowTimeText: {
    color: '#E53935',
  },
});