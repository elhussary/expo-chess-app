import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Moon, Sun, Palette, Volume2, Eye, Info, Award, Cloud, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [highlightMoves, setHighlightMoves] = useState(true);
  const [autoPromoteQueen, setAutoPromoteQueen] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [boardTheme, setBoardTheme] = useState('classic');
  const [pieceSet, setPieceSet] = useState('standard');

  const boardThemes = [
    { id: 'classic', name: 'Classic', colors: ['#E8C496', '#B58763'] },
    { id: 'emerald', name: 'Emerald', colors: ['#EEEED2', '#769656'] },
    { id: 'midnight', name: 'Midnight', colors: ['#DEE3E6', '#788A91'] },
  ];

  const pieceSets = [
    { id: 'standard', name: 'Standard' },
    { id: 'neo', name: 'Neo' },
    { id: 'chess24', name: 'Chess 24' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Moon size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
              thumbColor={darkMode ? '#E09F3E' : '#FFFFFF'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Palette size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Board Theme</Text>
            </View>
            <View style={styles.settingValueContainer}>
              <View style={styles.colorPreviews}>
                {boardThemes.find(theme => theme.id === boardTheme).colors.map((color, index) => (
                  <View 
                    key={index} 
                    style={[styles.colorPreview, { backgroundColor: color }]} 
                  />
                ))}
              </View>
              <Text style={styles.settingValue}>
                {boardThemes.find(theme => theme.id === boardTheme).name}
              </Text>
              <ChevronRight size={20} color="#9E9E9E" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Award size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Piece Set</Text>
            </View>
            <View style={styles.settingValueContainer}>
              <Text style={styles.settingValue}>
                {pieceSets.find(set => set.id === pieceSet).name}
              </Text>
              <ChevronRight size={20} color="#9E9E9E" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Eye size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Show Coordinates</Text>
            </View>
            <Switch
              value={showCoordinates}
              onValueChange={setShowCoordinates}
              trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
              thumbColor={showCoordinates ? '#E09F3E' : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gameplay</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Volume2 size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
              thumbColor={soundEffects ? '#E09F3E' : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Sun size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Animations</Text>
            </View>
            <Switch
              value={animations}
              onValueChange={setAnimations}
              trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
              thumbColor={animations ? '#E09F3E' : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <ChevronRight size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Highlight Legal Moves</Text>
            </View>
            <Switch
              value={highlightMoves}
              onValueChange={setHighlightMoves}
              trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
              thumbColor={highlightMoves ? '#E09F3E' : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Award size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Auto-Promote to Queen</Text>
            </View>
            <Switch
              value={autoPromoteQueen}
              onValueChange={setAutoPromoteQueen}
              trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
              thumbColor={autoPromoteQueen ? '#E09F3E' : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Cloud size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Sync Game Data</Text>
            </View>
            <ChevronRight size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <HelpCircle size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#9E9E9E" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Info size={20} color="#1A2238" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>About Chess Master</Text>
            </View>
            <ChevronRight size={20} color="#9E9E9E" />
          </TouchableOpacity>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Chess Master v1.0.0</Text>
          </View>
        </View>
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A2238',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1A2238',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#757575',
    marginRight: 8,
  },
  colorPreviews: {
    flexDirection: 'row',
    marginRight: 12,
  },
  colorPreview: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
});