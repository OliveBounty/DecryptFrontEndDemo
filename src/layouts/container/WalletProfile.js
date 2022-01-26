import React, { useState } from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
// hooks
// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});
export default function WalletProfile() {
  return <RootStyle>This is WalletProfiler</RootStyle>;
}
