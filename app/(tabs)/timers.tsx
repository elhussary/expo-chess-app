import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Clock, Check } from 'lucide-react-native';

// Predefined time controls
const timeControls = [
  { name: 'Bullet', baseTime: 1, increment: 0 },
  { name: 'Blitz', baseTime: 3, increment: 2 },
  { name: 'Rapid', baseTime: 10, increment: 5 },
  { name: 'Classical', baseTime: 30, increment: 10 },
  { name: 'Custom', baseTime: 5, increment: 3 }
];

export default function TimersScreen() {
  const [selectedControl, setSelectedControl] = useState(1); // Blitz is default
  const [customBaseTime, setCustomBaseTime] = useState(5);
  const [customIncrement, setCustomIncrement] = useState(3);
  const [useBronstein, setUseBronstein] = useState(false);
  const [useDelay, setUseDelay] = useState(false);

  const formatTimeDisplay = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
    }
  };

  const incrementText = (increment) => {
    if (useBronstein) {
      return `+${increment} Bronstein`;
    } else if (useDelay) {
      return `${increment}s delay`;
    } else {
      return `+${increment}s`;
    }
  };

  const renderTimeSetting = (value, onChange, label, min = 0, max = 60) => {
    return (
      <View style={styles.timeSettingContainer}>
        <Text style={styles.timeSettingLabel}>{label}</Text>
        <View style={styles.timeControlButtons}>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min}
          >
            <Text style={styles.timeButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.timeValue}>{value}</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max}
          >
            <Text style={styles.timeButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Time Controls</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preset Time Controls</Text>
          <View style={styles.presetContainer}>
            {timeControls.map((control, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.presetCard,
                  selectedControl === index ? styles.selectedPreset : null
                ]}
                onPress={() => setSelectedControl(index)}
              >
                <View style={styles.presetHeader}>
                  <Text style={styles.presetName}>{control.name}</Text>
                  {selectedControl === index && (
                    <Check size={20} color="#E09F3E" />
                  )}
                </View>
                <View style={styles.presetDetails}>
                  <View style={styles.presetTime}>
                    <Clock size={16} color="#1A2238" />
                    <Text style={styles.presetTimeText}>
                      {formatTimeDisplay(control.baseTime)}
                    </Text>
                  </View>
                  <Text style={styles.presetIncrement}>
                    {incrementText(control.increment)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedControl === timeControls.length - 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Settings</Text>
            <View style={styles.customSettingsContainer}>
              {renderTimeSetting(
                customBaseTime, 
                setCustomBaseTime, 
                'Base Time (minutes)', 
                1, 
                180
              )}
              
              {renderTimeSetting(
                customIncrement, 
                setCustomIncrement, 
                'Increment (seconds)', 
                0, 
                60
              )}
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Use Bronstein Delay</Text>
                <Switch
                  value={useBronstein}
                  onValueChange={(value) => {
                    setUseBronstein(value);
                    if (value) setUseDelay(false);
                  }}
                  trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
                  thumbColor={useBronstein ? '#E09F3E' : '#FFFFFF'}
                />
              </View>
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Use Simple Delay</Text>
                <Switch
                  value={useDelay}
                  onValueChange={(value) => {
                    setUseDelay(value);
                    if (value) setUseBronstein(false);
                  }}
                  trackColor={{ false: '#E0E0E0', true: '#B85C38' }}
                  thumbColor={useDelay ? '#E09F3E' : '#FFFFFF'}
                />
              </View>
              
              <Text style={styles.helperText}>
                {useBronstein 
                  ? 'Bronstein: Increment is only added for the time spent on the move (up to max increment).'
                  : useDelay 
                    ? 'Simple Delay: Timer starts after the delay period for each move.'
                    : 'Fischer: Full increment is added after each move.'}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Game with Timer</Text>
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
  presetContainer: {
    paddingHorizontal: 16,
  },
  presetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPreset: {
    borderColor: '#E09F3E',
  },
  presetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  presetName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A2238',
  },
  presetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  presetTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presetTimeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1A2238',
    marginLeft: 8,
  },
  presetIncrement: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
  },
  customSettingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeSettingContainer: {
    marginBottom: 16,
  },
  timeSettingLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1A2238',
    marginBottom: 8,
  },
  timeControlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1A2238',
  },
  timeValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A2238',
    width: 60,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1A2238',
  },
  helperText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#616161',
    fontStyle: 'italic',
    marginTop: 8,
  },
  startButton: {
    backgroundColor: '#1A2238',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 24,
    marginBottom: 100,
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});