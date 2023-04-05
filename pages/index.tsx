import { Box, 
  Center, 
  Spacer, 
  Stack, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Heading,
  Text
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import NavBar from "../components/NavBar"
import Disconnected from "../components/Disconnected"
import { connected } from "process"
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"
import { useState } from "react";
import { Button, VStack } from "@chakra-ui/react";

const Home: NextPage = () => {
  const {connected} = useWallet()
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Hacks NFTs</title>
        <meta name="This NFT represents a sensor and in-person onboarding class" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="full"
        h="130vh"
        bgImage={`url(${'/images/home-background.png'})`}
        backgroundSize="cover"
        backgroundPosition="center"
        className="blur-background"
      >
        
        <Stack w="full" h="100vh" justify="center">
          <NavBar />

          <Spacer />
          <Center>
            { connected ? <Box
                            backgroundImage="url('/images/background.jpg')"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                          >
                        <Connected />
                      </Box> : <Disconnected /> }
          </Center>
          <Spacer />
          {showHelp && (
        <div>
          <Modal isOpen={showHelp} onClose={() => setShowHelp(false)} isCentered>
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.5)">
          <ModalBody textAlign="center">
            <Heading size="lg" mb={4} color="white">Safety First!</Heading>
            <Text color="white">On mobile devices, clicking the Phantom link takes you to download the app. Open this webpage from your Phantom browser to connect your wallet. When installing a wallet extension on desktop, such as Phantom, Solflare, Torus, Coinbase, etc., you will be prompted to create a wallet or import one with a seed phrase. <b>Consider setting up your wallet in a new browser window to isolate your extension, which can enhance user confidence.</b><br></br><br></br> The wallet pop-up window is your private interface with the associated blockchain, and entering your seed phrase grants access to approve transactions. Be vigilant when handling transactions and double-check addresses to avoid man-in-the-middle attacks that may authorize third-party transactions from your wallet.
            <br></br><br></br><i>HeliumDenver is not directly affiliated with Nova or Helium Foundation, but rather represents a meat-space community dedicated to the growth of developers within the Helium and Solana ecosystems. You were probably sent this link directly by Tanner, Founder of HeliumDenver. You will be delivered your sensor in person at the time of your course. Find us in the Discord for any questions!</i></Text><br></br>
            <Button onClick={() => setShowHelp(false)}>Close</Button>
          </ModalBody>

        </ModalContent>
      </Modal>
        </div>
        )}

          <Center>
            <Box
              p={8}
              borderRadius="xl"
              bg="rgba(0, 0, 0, 0.5)"
              backdropFilter="blur(15px)"
            >
              <Box marginBottom={1} color="black" fontSize="4xl" textAlign="center">
              <Button onClick={() => setShowHelp(true)}>Want Help?</Button>
              </Box>
              <Box marginBottom={1} color="white" fontSize="xl" textAlign="center">
                <a
                  href="https://twitter.com/hntdenver"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @heliumdenver
                </a>
              </Box>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}

export default Home
