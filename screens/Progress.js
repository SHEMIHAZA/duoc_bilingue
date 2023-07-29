import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';



const Progress = () => {
  const navigation = useNavigation();

  const data = [
    { test: 1, earnings: 49 },
    { test: 2, earnings: 45 },
    { test: 3, earnings: 45 },
    { test: 4, earnings: 32 },
    { test: 5, earnings: 22 },
    { test: 6, earnings: 35 },
    { test: 7, earnings: 32 },
    { test: 8, earnings: 32 },
    { test: 9, earnings: 16 },
    { test: 10, earnings: 31 },
  ];



  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "YOUR PROGRESS",
      justifyContent: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        
      },
      headerStyle: {
        backgroundColor: "#6f6f5d",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);


  return (
    <>
      <View>
        <Text style={styles.heading}>These are the analyses of your last 10 attempts.</Text>
      </View>
      <View style={styles.chartContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: data.map(item => `Test ${item.test}`),
              datasets: [{
                data: data.map(item => item.earnings),
              }]
            }}
            // width={Dimensions.get('window').width} se ajusta a la pantalla
            width={600}
            height={230}
            yAxisLabel="Pts. "
            chartConfig={{
              yAxisInterval: 10,
              backgroundColor: '#f7f3f2',
              backgroundGradientFrom: '#f7f3f2',
              backgroundGradientTo: '#f2f3f2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              }
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};


export default Progress

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10, // Márgen izquierdo
    paddingRight:10, // Márgen derecho
  },
  heading: {
    marginTop: 40,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    fontFamily:"Poppins",
    // Añadir sombra a las letras
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
