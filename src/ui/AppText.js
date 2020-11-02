import React from 'react';
import { StyleSheet, Text } from 'react-native';


export const AppText = ({ children }) => (
    <Text style={styles.appText}>{children}</Text>
)

const styles = StyleSheet.create({
    appText: {
        fontFamily: 'Roboto-Regular',
        color: '#fff',
        fontSize: 18
    }
})