import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Move {
  color: string;
  from: string;
  to: string;
  piece: string;
  san: string;
  flags: string;
  captured?: string;
  promotion?: string;
}

interface MoveHistoryProps {
  moves: Move[];
}

export function MoveHistory({ moves }: MoveHistoryProps) {
  // Group moves by pairs for display
  const groupedMoves = [];
  for (let i = 0; i < moves.length; i += 2) {
    groupedMoves.push({
      moveNumber: Math.floor(i / 2) + 1,
      whiteMove: moves[i],
      blackMove: i + 1 < moves.length ? moves[i + 1] : null,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Move History</Text>
      
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.numberCell]}>#</Text>
        <Text style={[styles.headerText, styles.moveCell]}>White</Text>
        <Text style={[styles.headerText, styles.moveCell]}>Black</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {groupedMoves.length === 0 ? (
          <Text style={styles.emptyText}>No moves yet</Text>
        ) : (
          groupedMoves.map(({ moveNumber, whiteMove, blackMove }) => (
            <View key={moveNumber} style={styles.moveRow}>
              <Text style={[styles.moveText, styles.numberCell]}>{moveNumber}.</Text>
              <Text style={[styles.moveText, styles.moveCell]}>{whiteMove.san}</Text>
              <Text style={[styles.moveText, styles.moveCell]}>
                {blackMove ? blackMove.san : ''}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A2238',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1A2238',
  },
  scrollContainer: {
    maxHeight: 150,
  },
  moveRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  moveText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#212121',
  },
  numberCell: {
    width: 40,
    color: '#616161',
  },
  moveCell: {
    flex: 1,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
});