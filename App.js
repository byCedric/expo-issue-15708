import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';
import { Button } from 'react-native';
import { useCallback, useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = useCallback(() => {
    setLoading(true);
    return checkForUpdates()
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{error ? String(error) : 'Hi!'}</Text>
      <Button title="Check updates" onPress={update} disabled={loading} />
      <StatusBar style="auto" />
    </View>
  );
}

async function checkForUpdates() {
  const status = await Updates.checkForUpdateAsync();
  if (status.isAvailable) {
    const update = await Updates.fetchUpdateAsync();
    if (update.isNew) {
      await Updates.reloadAsync();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
