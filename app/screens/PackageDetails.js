import React, { useEffect } from 'react';
import Header from '../components/Header';
import { StyleSheet, View, FlatList, Dimensions,ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Video } from 'expo-av';

const ScreenWidth = Dimensions.get("window").width;
const PackagePrice = ({ data,val}) => {
    
    return (
        <Card style={data.duration!==val?styles.item:styles.itemActive}>


            <Card.Content>
            <Title style={styles.titleText}>Duration: {data.duration}</Title>
                <Title style={styles.titleText}>MRP:{data.mrp}</Title>
                {data.voucher!=''?<Title style={styles.titleText}>Voucher:{data.voucher}</Title>:
                ''}
            </Card.Content>

        </Card>

    )
}

const PackageDetails = (props) => {
    const item = props.route.params.data;
    const duration=props.route.params.data.attributes.duration;

    return (
        
        <View style={styles.wrrapper}>
            <Header title={item.attributes.packagename} style={{ color: 'black' }} backBtn='1' navigation={props.navigation} />
            <ScrollView>
            <View style={styles.container}>
                <Card >


                    <Card.Cover source={{
                        uri: item.attributes.intropicture == null ?
                            'https://img.freepik.com/free-vector/woman-sport-activities_102902-2337.jpg'
                            : 'https://picsum.photos/700'
                    }} style={{ height: 150 }} />
                    <Card.Content>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 6 }}>
                            <Title style={styles.desTitle}>{item.attributes.packagename}</Title>
                            <Title style={styles.titleMode}>Mode:{item.attributes.mode}</Title>
                        </View>
                        <View style={styles.description}>
                            <Title style={styles.titleText}>About Package</Title>
                            <View style={styles.hr}></View>
                            <Paragraph>
                                {item.attributes.aboutpackage}
                            </Paragraph>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 6 }}>
                            <Title style={styles.titleText}>Level :{item.attributes.level}</Title>
                            <Title style={styles.titleMode}>Class Size :{item.attributes.Ptclasssize}</Title>
                            </View>
                        </View>
                    </Card.Content>

                </Card>
                <View style={styles.Pricecontainer}>
                <Title style={styles.titleText}>Fitness Package Price </Title>
                            <View style={styles.hr}></View>
                <FlatList
                        data={item.attributes.fitnesspackagepricing}
                        keyExtractor={(items, index) => index}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        horizontal={true}
                        renderItem={({ item}) => (
                            <PackagePrice
                                data={item}
                                val={duration}
                            />
                        )}

                    />
                   <View>
                   <Video
                source={{ uri: item.attributes.introvideo =='http://123'?'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4':item.attributes.introvideo ==null?'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4':item.attributes.introvideo}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: '100%', height: 200 }}
                /> 
                </View>
                </View>
                
            </View>
           </ScrollView> 
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
    Pricecontainer: {
        paddingVertical:10,
       
    },
    item: {
        width: (ScreenWidth - 60) / 2 ,
        height: 100,
        padding: 2,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems:'center'
    },
    itemActive: {
        width: (ScreenWidth - 60) / 2 ,
        height: 100,
        padding: 2,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems:'center',
        backgroundColor:'#ffe1b3'
    },
    titleText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 'bold',
        marginTop: 3
    },
    titleMode: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 'bold',
        marginTop: 3,
        color: 'green'
    },
    description: {
        fontSize: 12,
        padding: 5
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom:4
    },
    desTitle: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 'bold',
        marginTop: 3,
        textTransform: 'uppercase'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
})
export default PackageDetails;