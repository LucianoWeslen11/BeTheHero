import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

const AppStack = createStackNavigator();

export default function Routes(){
    return(
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
          <AppStack.Screen name="Incidents" component={Incidents}/>
          <AppStack.Screen name="Detail" component={Detail} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
}