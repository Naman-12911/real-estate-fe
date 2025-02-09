import React from 'react';
import { Text, StyleSheet,View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page:{
		width:'100%',
		alignSelf:'center',
		alignItems:'center'
	},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
	fontFamily:'Helvetica-Bold',
    marginBottom: 10,
	textAlign:'center',
  },
});

const BoldHeading = ({ children }) => (
		<View style={styles.page}>
			<Text style={styles.heading}>{children}</Text>
		</View>
);

export default BoldHeading;