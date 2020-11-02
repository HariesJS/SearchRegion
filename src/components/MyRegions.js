import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Dimensions, ScrollView, FlatList } from 'react-native';
import { Button, DialogDefaultActions, Dialog } from 'react-native-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppText } from '../ui/AppText';
import { HRLine } from '../ui/HRLine';
import { Search } from './Search';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { removeRegionCreator } from '../redux/reducers/myRegionsReducer';

export const MyRegions = () => {
    const dispatch = useDispatch();

    const myRegions = useSelector(state => state.myRegionsAPI.myRegions);

    const [modal, setModal] = useState(false);

    const removeRegion = id => {
        dispatch(removeRegionCreator(id));
    }

    return (
        <View style={styles.regionsBlock}>
            <Modal visible={modal} transparent={true} animationType='slide'>
                <Search setModal={setModal} />
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Regions</Text>
                </View>
                <View>
                    <View style={styles.information}>
                        <AppText>State</AppText>
                        <AppText>Country</AppText>
                        <Button
                            style={{
                                text: {
                                    color: '#fff',
                                    fontSize: 16,
                                    bottom: 5
                                }
                            }}
                            onPress={() => setModal(true)}
                            text={'+ ADD'}
                        />
                    </View>
                    <HRLine />
                    {myRegions.length ? (
                        <FlatList
                            keyExtractor={item => item.id.toString()}
                            data={myRegions}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.myRegions}>
                                        <AppText>{item.state}</AppText>
                                        <AppText>{item.country}</AppText>
                                        <Button
                                            style={{
                                                text: {
                                                    color: '#fff',
                                                    fontSize: 16,
                                                    bottom: 5
                                                }
                                            }}
                                            onPress={() => removeRegion(item.id)}
                                            text={'X'}
                                        />
                                    </View>
                                )
                            }}
                        />
                    ) : <View style={styles.body}>
                        <MaterialIcons name="location-off" size={50} color="#fff" />
                        <Text style={styles.warn}>Regions not found</Text>
                    </View>}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    regionsBlock: {
        flex: 1,
        backgroundColor: '#3999ab'
    },
    header: {
        marginHorizontal: '5%',
        marginVertical: Dimensions.get('window').height / 10
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Roboto-Regular'
    },
    body: {
        alignItems: 'center'
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    warn: {
        fontSize: 16,
        color: '#474747'
    },
    myRegions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%'
    }
})