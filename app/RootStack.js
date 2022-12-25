import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import PackageDetails from './screens/PackageDetails';
import React from 'react';
const Stack = createStackNavigator();
const RootStack = () => {
return (
<Stack.Navigator>
<Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
<Stack.Screen name="PackageDetails" component={PackageDetails} options={{ headerShown: false }}/>


</Stack.Navigator>
)
}
export default RootStack;