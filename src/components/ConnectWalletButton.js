import {
  Box,
  Link,
  Grid,
  List,
  Stack,
  Popover,
  ListItem,
  ListSubheader,
  CardActionArea,
  Typography,
  Modal,
  Button
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { connectWallet } from '../utils/interact';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
export default function ConnectWalletButton() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('');
  const [modalopen, setModalOpen] = useState(false);
  // useEffect(async () => {
  //   const walletResponse = await connectWallet();
  //   if (walletResponse.success === true) {
  //     addWalletListener();
  //   } else {
  //     setStatus(walletResponse.status);
  //     // setModalOpen(true);
  //   }
  //   setWalletAddress(walletResponse.address);
  // }, []);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus('👆🏽 Write a message in the text-field above.');
        } else {
          setWalletAddress('');
          setStatus('🦊 Connect to Metamask using the above button.');
        }
      });
    } else {
      setStatus(
        <p>
          {' '}
          🦊{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/download.html">
            You must install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      );
    }
  }
  async function handleOnConnectWallet(e) {
    e.preventDefault();
    // console.log('connect Wallet clicked:');
    const walletResponse = await connectWallet();
    console.log('handleOnConnectWallet:=>', walletResponse);
    if (walletResponse.success === true) {
      addWalletListener();
    } else {
      setStatus(walletResponse.status);
      // setModalOpen(true);
    }
    setWalletAddress(walletResponse.address);
  }
  return (
    <>
      <Modal
        open={modalopen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {status}
          </Typography>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOnConnectWallet}>
        {walletAddress.length > 0
          ? `${String(walletAddress).substring(0, 6)}...${String(walletAddress).substring(38)}`
          : 'Connect Wallet'}
      </Button>
    </>
  );
}
