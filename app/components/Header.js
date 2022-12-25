import * as React from 'react';
import { Appbar,Text } from 'react-native-paper';

const Header = ({ title, style ,backBtn,navigation}) => (
    <Appbar.Header> 
        {backBtn=='1'?<Appbar.BackAction onPress={navigation.goBack} />:''}
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
    
    <Appbar.Action icon="bell"  />
    
  </Appbar.Header>
);


export default Header;