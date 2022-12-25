import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, Pressable, Dimensions } from 'react-native';
import Header from '../components/Header';
import { gql, useQuery } from '@apollo/client';
import { Card, Title, ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
const ScreenWidth = Dimensions.get("window").width;

const FITNESSPACKAGE_QUERY = gql`
query {
    fitnesspackages{
      data{
        id,
        attributes{
            tags,
            packagename,
            aboutpackage,
            intropicture,
            level,
            introvideo,
            mode,
            ptoffline,
            ptonline,
            grouponline,
            groupoffline,
            recordedclasses,
            restdays,
            bookingleadday,
            fitnesspackagepricing,
            duration,
            groupstarttime,
            groupendtime,
            groupinstantbooking,
            Ptclasssize
        }
      }
    }
  }
`

const FitnessItem = ({ data, onPress }) => {
    return (
        <Pressable onPress={onPress}>

            <Card style={styles.item}>


                <Card.Cover source={{
                    uri: data.intropicture == null ?
                        'https://img.freepik.com/free-vector/woman-sport-activities_102902-2337.jpg'
                        : 'https://picsum.photos/700'
                }} style={{ height: 100 }} />
                <Card.Content>
                    <Title style={styles.titleText}>{data.attributes.packagename}</Title>

                </Card.Content>

            </Card>
        </Pressable>
    )
}

const Home = ({ navigation }) => {
    const { data, loading, refetch } = useQuery(FITNESSPACKAGE_QUERY);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (refetch) {
                refetch();
            }
        });
        return unsubscribe;
    }, [navigation]);
    if (loading) return
    <View style={styles.loadercontainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>;
    return (

        <View style={styles.wrrapper}>
            <Header title={'Fitness Packages'} style={{ color: 'black' }} backBtn='0' navigation={navigation} />
            <View style={styles.container}>
                <FlatList
                    data={data.fitnesspackages.data}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <FitnessItem
                            data={item}
                            onPress={() => navigation.navigate('PackageDetails', { data: item })}
                        />
                    )}

                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrrapper: {
        flex: 1
    },
    container: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flex: 1
    },
    item: {
        width: (ScreenWidth - 40) / 2 - 10,
        height: 150,
        padding: 2,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    titleText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 'bold',
        marginTop: 3
    },
    loadercontainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Home;