import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const LOGO_URI = `http://www.palaisdetokyo.com/sites/default/files/aiaiai_logo_circle_new_1.png`;
const getImageUri = (id: any) => `https://aiaiai.dk/images/front/${id}_m.png`;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi Peter</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
