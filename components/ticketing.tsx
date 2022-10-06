import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

const TicketingInfo = () => {
  const [departData, setDepartData] = useState(undefined);
  const [arrivalData, setArrivalData] = useState(undefined);
  const [exist, isExist] = useState<boolean>(false);

  const url =
    'http://43.200.99.243/user/ticket/reservation/info?' + 'userId=' + '1'; // 바꾸기

  useEffect(() => {
    fetch(url, {method: 'GET'})
      .then(response => response.json())
      .then(json => {
        // console.log([json.result.result[0].DepartTerminal,json.result.result[0].ArrivalTerminal])
        setDepartData(json.result.result[0].DepartTerminal);
        setArrivalData(json.result.result[0].ArrivalTerminal);
        if (departData) {
          console.log(departData);
          isExist(true);
        } else {
          isExist(false);
        }
      })
      .finally()
      .catch(error => console.log(error));
  }, [departData]);

  if (exist) {
    return (
      /*            <TouchableOpacity
                style={{
                    // width: "90%",
                    height: 150,
                    marginTop: 20,
                    backgroundColor: '#D1E7F3',
                    borderRadius: 20,
                    padding: 10,
                }}
            >*/
      <SafeAreaView
        style={{
          height: 150,
          marginTop: 20,
          backgroundColor: '#D1E7F3',
          borderRadius: 20,
          padding: 10,
        }}>
        <Text style={{fontSize: 15, margin: 5}}>예매 현황</Text>

        <View style={styles.view}>
          <Image
            style={{
              width: '30%',
              height: '90%',
            }}
            source={require('../assets/bus.png')}
          />
          <Text style={styles.contents}>
            {departData} ➡➡ {arrivalData}
          </Text>
        </View>
      </SafeAreaView>

      // </TouchableOpacity>
    );
  } else return <View></View>;
};

export default TicketingInfo;

const styles = StyleSheet.create({
  text: {
    color: '#1B4679',
    fontSize: 30,
  },
  contents: {
    fontSize: 15,
    marginLeft: 50,
    alignItems: 'center',
  },
  view: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
