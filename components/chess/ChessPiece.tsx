import { View, Image, StyleSheet } from 'react-native';

interface ChessPieceProps {
  type: string;
  color: string;
  size: number;
}

export function ChessPiece({ type, color, size }: ChessPieceProps) {
  // Map of piece types to their image URLs from Wikimedia Commons
  const pieceImages = {
    w: {
      p: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
      n: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
      b: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
      r: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
      q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
      k: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    },
    b: {
      p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
      n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
      b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
      r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
      q: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
      k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    },
  };

  return (
    <View style={[styles.pieceContainer, { width: size, height: size }]}>
      <Image
        source={{ uri: pieceImages[color][type] }}
        style={[styles.pieceImage, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pieceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieceImage: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});
