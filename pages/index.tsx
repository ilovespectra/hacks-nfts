import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import NavBar from "../components/NavBar"
import Disconnected from "../components/Disconnected"
import { connected } from "process"
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"

const Home: NextPage = () => {
  const {connected} = useWallet()
  return (
    <div className={styles.container}>
      <Head>
        <title>Hacks NFTs</title>
        <meta name="This NFT represents a sensor and in-person onboarding class" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="100vh"
        bgImage={connected ? "" : `url(${'/images/home-background.png'})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Stack w="full" h="100vh" justify="center">
          <NavBar />

          <Spacer />
          <Center>
            { connected ? <Connected/> : <Disconnected /> }
          </Center>
          <Spacer />

          <Center>
            <Box
              p={8}
              borderRadius="xl"
              bg="rgba(0, 0, 0, 0.5)"
              backdropFilter="blur(15px)"
            >
              <Box marginBottom={1} color="white" fontSize="3xl" textAlign="center">
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
