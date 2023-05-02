/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { Alert, Button, ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Dimensions } from 'react-native';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


interface IPhoto {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string,
  index: boolean[]

}
function App(): JSX.Element {
  


  const [photos, setPhotos] = useState<IPhoto[]>([]);
  

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const data = await response.json();
      const removeLast4990 = data.slice(0, -4990);

      setPhotos(removeLast4990);
 };
 fetchPhotos();
}, []);



const [toggleCheckBox, setToggleCheckBox] = useState<boolean[]>(Array(10).fill(false))
const [filter, setFilter] = useState(false)


  const CardView = (props: any) => {
    const { uri, viewstyle, textstyle, index} = props;
    function idcheckbox(value: any) {
      let newArr = JSON.parse(JSON.stringify(toggleCheckBox));
      newArr[index] = value;
      setToggleCheckBox(newArr);
      console.log(toggleCheckBox);



    }

    return ( 
      <> 
      



      <> 
      <TouchableOpacity onPress={() => {}} >
       <View style={viewstyle}  > 
       <Image source={{uri : uri}} style={styles.Listeler}  />
      </View>

      </TouchableOpacity>
      

      <View style={textstyle}  >
        <Text style={styles.Textler} > Seçilsin mi?</Text>
        <CheckBox
        disabled={false}
        value={toggleCheckBox[index]}
        onValueChange={(newvalue) => idcheckbox(newvalue)}
        /> 
      </View>
      </>
      
      </>
  
    
    )
      
  }





const renderPhoto: ListRenderItem<IPhoto> = ({ item, index }) => {
  const ApiStyleView = {
    alignItems: item.id % 2 === 0 ? "flex-end" : "flex-start",
  };
  const ApiStyleText = {
    alignItems: item.id % 2 === 0 ? "flex-start" : "flex-end",
  };

  
 return <CardView uri={item.url} viewstyle={[styles.Content, ApiStyleView]} textstyle={[ApiStyleText]} index={index} />
 
};

function getAllIndexes(arr: any, val: any) {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
      if (arr[i] === val)
          indexes.push(i+1);
  return indexes;
}

  return (
    <SafeAreaView style={styles.Background}>
      
      <FlatList 

      data={photos}
      renderItem={renderPhoto}
      


      />
      <Button title='Listele' onPress={() => Alert.alert(getAllIndexes(toggleCheckBox, true).toString()) } />
      

    </SafeAreaView>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Background: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",

    
  },
  Listeler: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 25,

  },
  Content: {
    width: windowWidth,
    height: 200,
    marginVertical: 20,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: "center"
    
    
    
  },
  Textler: {
    color: "black",
    fontWeight: "bold",
    
  },



  
});

export default App;
