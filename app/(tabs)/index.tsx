import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Award, BookOpen, Clock } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Chess Master</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Player</Text>
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/277092/pexels-photo-277092.jpeg' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Quick Game</Text>
            <TouchableOpacity style={styles.playButton}>
              <Play size={24} color="#FFFFFF" />
              <Text style={styles.playButtonText}>Play Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Game Modes</Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.cardIcon, { backgroundColor: '#4ECDC4' }]}>
              <Clock size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>Blitz</Text>
            <Text style={styles.cardSubtitle}>3 + 2 minutes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={[styles.cardIcon, { backgroundColor: '#FF6B6B' }]}>
              <Clock size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>Rapid</Text>
            <Text style={styles.cardSubtitle}>10 + 5 minutes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={[styles.cardIcon, { backgroundColor: '#45B7D1' }]}>
              <Clock size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>Classical</Text>
            <Text style={styles.cardSubtitle}>30 + 10 minutes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
        </View>

        <TouchableOpacity style={styles.lessonCard}>
          <View style={styles.lessonCardContent}>
            <View style={styles.lessonIconContainer}>
              <BookOpen size={24} color="#FFFFFF" />
            </View>
            <View style={styles.lessonDetails}>
              <Text style={styles.lessonTitle}>Mastering the Opening</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '35%' }]} />
                </View>
                <Text style={styles.progressText}>35% Complete</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lessonCard}>
          <View style={styles.lessonCardContent}>
            <View style={[styles.lessonIconContainer, { backgroundColor: '#F9A826' }]}>
              <Award size={24} color="#FFFFFF" />
            </View>
            <View style={styles.lessonDetails}>
              <Text style={styles.lessonTitle}>End Game Strategies</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '60%', backgroundColor: '#F9A826' }]} />
                </View>
                <Text style={styles.progressText}>60% Complete</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1A2238',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#616161',
    marginTop: 4,
  },
  bannerContainer: {
    marginHorizontal: 24,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(26, 34, 56, 0.7)',
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E09F3E',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1A2238',
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A2238',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#616161',
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1A2238',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A2238',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1A2238',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#616161',
    width: 100,
  },
});