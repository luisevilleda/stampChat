import React, { Component } from 'react';
import { Image } from 'react-native';
import logoImage from '../../assets/logo.png';

export default function LogoInstance() {
  return (
    <Image
      style={{ width: 150, height: 110 }}
      source={logoImage}
    />
  );
}
