import React, { useState } from 'react';
import { Dimensions, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkbox, Button } from 'react-native-material-ui'
import { useDispatch, useSelector } from 'react-redux';
import { getRegionsCreator, setCheckboxCreator } from '../redux/reducers/searchReducer';
import { addMyRegionsCreator } from '../redux/reducers/myRegionsReducer';

export const Search = ({ setModal }) => {
    const dispatch = useDispatch();

    const regions = useSelector(state => state.searchAPI.regions);
    const myRegions = useSelector(state => state.myRegionsAPI.myRegions);

    const [value, setValue] = useState('');

    return (
        <View style={styles.block}>
            <View style={styles.card}>
                <Text style={styles.title}>Add a Country</Text>
                {myRegions.length === 7 // server should not prompt me to select my selected regions, so i do like this
                ? <Text>You have all locations</Text>
                : <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TextInput // react-native-material-ui not have "TextField"
                        placeholder='Search for a country'
                        onChangeText={setValue}
                        value={value}
                        style={styles.input}
                    />
                    <Ionicons
                        style={{
                            left: -10,
                            position: 'absolute'
                        }}
                        name='ios-search'
                        size={18}
                    />
                </View>}
                <FlatList
                    style={value.trim() ? {
                        maxHeight: Dimensions.get('window').height / 7
                    } : {}}
                    keyExtractor={item => item.id.toString()}
                    data={value.trim() ? regions : []}
                    renderItem={({ item }) => {
                        if (myRegions?.find(e => e.id === item.id)) {
                            return null;
                        }
                        return (
                            <View>
                                <Checkbox
                                    onCheck={(e) => {
                                        dispatch(setCheckboxCreator(item.id));
                                        setValue(regions?.filter(e => e.checked).map(e => e.state + ', ' + e.country).join(' + '));
                                    }}
                                    label={item.state + ', ' + item.country}
                                    value="agree"
                                    checked={item.checked}
                                />
                            </View>
                        )
                    }}
                />
                <View style={styles.buttons}>
                    <Button
                        disabled={!regions.some(e => e.checked)}
                        text="ADD"
                        onPress={() => {
                            dispatch(addMyRegionsCreator(regions?.filter(e => e.checked)));
                            dispatch(getRegionsCreator());
                            setModal(false);
                        }}
                    />
                    <Button text="CANCEL" onPress={() => {
                        Keyboard.dismiss();
                        setValue('');
                        setModal(false);
                        dispatch(getRegionsCreator());
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Roboto-Medium',
        marginBottom: '10%',
        fontSize: 20
    },
    card: {
        borderWidth: 1,
        paddingVertical: '5%',
        paddingHorizontal: '10%',
        marginHorizontal: '3%',
        backgroundColor: '#fff'
    },
    input: {
        borderBottomWidth: 1,
        padding: '5%',
        fontSize: 18,
        width: Dimensions.get('window').width / 1.5,
        marginHorizontal: '2%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '5%'
    }
})