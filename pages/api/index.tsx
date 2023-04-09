  return (
    <div className={styles.container}>
      <Head>
        <title>Hacks NFTs</title>
        <meta name="HACKs NFTs by HeliumDenver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="full"
        h="130vh"
        bgImage={`url(${'/images/home-background.png'})`}
        backgroundSize="cover"
        backgroundPosition="center"
	@@ -61,10 +61,10 @@ const Home: NextPage = () => {
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.5)">
          <ModalBody textAlign="center">
            <Heading size="lg" mb={4} color="white">Safety First!</Heading>
            <Text color="white">The Phantom link on mobile takes you to download the app. Open this webpage from your Phantom browser to connect your wallet. On desktop, after installing Phantom, or any wallet app, you will be prompted to create a wallet or import one with a seed phrase. <b>Consider setting up your wallet in a new browser window to isolate your extension, which can enhance user confidence.</b><br></br><br></br> The wallet pop-up window is your private interface with the associated blockchain, entering your seed phrase grants access to approve transactions. Double-check addresses to avoid man-in-the-middle attacks that may authorize third-party transactions from your wallet.
            <br></br><br></br><i>HACKSs NFTs is brought to you by HeliumDenver. Each NFT represents the purchase of a Helium sensor and in-person onboarding hacks course. You will be delivered your sensor in person at the time of your course. Find us in the Discord for any questions!</i></Text><br></br>
            <Button onClick={() => setShowHelp(false)}>Close</Button>
          </ModalBody>

        </ModalContent>
	@@ -80,7 +80,7 @@ const Home: NextPage = () => {
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
