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
        <title>LavaDAO Philanthropy Token</title>
        <meta name="HeliumDenver, by LavaDAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="full"
        h="160vh"
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
            <Heading size="lg" mb={4} color="white">Glad You're Here!</Heading>
            <Text color="white">Here's your chance to be a part of something big. We're creating a Helium expo and hackathon, big dreams write big checks, and we could use your help.
            <br></br><br></br><i>LavaDAO is a Colorado LCA created to manage HeliumDenver. Help us acheive our lofty goals by purchasing a Philanthropy NFT. Simple as it sounds, provides immediate equity to LavaDAO for HeliumDenver marketings and events.</i></Text><br></br>
            <Button onClick={() => setShowHelp(false)}>Done</Button>
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
              <Button onClick={() => setShowHelp(true)}>   ?   </Button>
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
