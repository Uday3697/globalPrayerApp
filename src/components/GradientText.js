import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
const GradientText = ({ text }) => (
    <Svg height="40" width="100%">
      <Defs>
        <SvgLinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor="#031629" stopOpacity="1" />
          <Stop offset="1" stopColor="#002791" stopOpacity="1" />
        </SvgLinearGradient>
      </Defs>
      <SvgText fill="url(#grad)" fontSize="28" fontWeight="bold" x="50%" y="30" textAnchor="middle">
        {text}
      </SvgText>
    </Svg>
  );
  
export default GradientText;
const styles = StyleSheet.create({})