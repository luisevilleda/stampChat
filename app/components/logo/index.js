import React, { Component } from 'react';
import { Image } from 'react-native';
import logoImage from '../../assets/logo.png';

export default function LogoInstance(height, width) {
  return (
    <Image
      style={{ height: +height, width: +width }}
      source={logoImage}
    />
  );
}
