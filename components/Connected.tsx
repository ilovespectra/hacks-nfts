import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
  Box,
} from "@chakra-ui/react"
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Metaplex,
  walletAdapterIdentity,
  CandyMachine,
  CandyMachineV2
} from "@metaplex-foundation/js"
import { useRouter } from "next/router"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";


const Connected: FC = () => {
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
  const [isMinting, setIsMinting] = useState(false)

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])
  const images = [
    "../images/phil1.png",
    "../images/phil2.png",
    "../images/phil3.png",
    "../images/phil4.png",
    "../images/phil5.png",
    "../images/phil6.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const handlePrevImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };
  useEffect(() => {
    if (!metaplex) return

    metaplex
      .candyMachinesV2()
      .findByAddress({
        address: new PublicKey("Fs8TzeeYmdhd667KaGrEvJbcHmYk4wxTNst3Qgk59jn8"),
      })
      .then((candyMachine) => {
        console.log(candyMachine)
        setCandyMachine(candyMachine)
      })
      .catch((error) => {
        alert(error)
      })
  }, [metaplex])

  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return

      if (!walletAdapter.connected || !candyMachine) {
        return
      }

      try {
        setIsMinting(true)
        const nft = await metaplex.candyMachinesV2().mint({
          candyMachine,
    });
        console.log(nft)
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
      } catch (error) {
        alert(error)
      } finally {
        setIsMinting(false)
      }
    },
    [walletAdapter.connected, candyMachine, metaplex, router]
  )

  return (
    //<Container height="100vh" overflow="hidden">
    <Box
    bgColor="rgba(0, 0, 0, 0.6)"
    borderRadius="20px"
    p={20}
    w="100%"
    maxW="700"
    mt={{ base: "10%", md: "30%" }}
    height="auto"
    overflow="hidden"
  >
    <VStack spacing={2} alignItems="center" px={5} py={5}>
      <Heading
        color="white"
        as="h2"
        size="2xl"
        noOfLines={1}
        textAlign="center"
      >
        Welcome!
      </Heading>
      <Text color="white" fontSize="l" textAlign="center">
        HeliumDenver is Colorado's largest Helium event in the making. The Philanthropy Token allows you to directly support this ecosystem in its earliest stages. This token comes with perks! You will be awarded:<br /><br />
        <li>100,000 Lava governance tokens (Max supply of 2.5M)</li>
        <li>Free booth hosting at all HeliumDenver events</li>
        <li>Lifetime Membership to LavaDAO</li>
        <li>SWAG! T-shirt, hoodie, stickers, and more!</li><br />
        <b>Price:</b> 220 SOL
      </Text>
  
      <Box w="full" h="full" display="flex" justifyContent="center" alignItems="center">
        <Box position="relative">
          <HStack spacing={0}>
            <Box
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              left={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex={1}
              width="40px"
              height="40px"
              bgColor="gray.500"
              opacity={0.6}
              borderRadius="full"
              onClick={handlePrevImage}
              _hover={{ cursor: "pointer", opacity: 0.8 }}
            >
              <ChevronLeftIcon boxSize={8} />
            </Box>
            <Image
              src={images[currentImage]}
              alt=""
              maxW="400px"
              maxH="400px"
              objectFit="cover"
              borderRadius="md"
            />
            <Box
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              right={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex={1}
              width="40px"
              height="40px"
              bgColor="gray.500"
              opacity={0.6}
              borderRadius="full"
              onClick={handleNextImage}
              _hover={{ cursor: "pointer", opacity: 0.8 }}
            >
              <ChevronRightIcon boxSize={8} />
            </Box>
          </HStack>
        </Box>
      </Box>
      
      <Text><i>HeliumDenver Philanthropy Tokens</i></Text><br />
      
      <Button
        bgColor="accent"
        color="white"
        maxW="420px"
        isLoading={isMinting}
        onClick={handleClick}
      >
        <Text> Mint </Text>
      </Button>
      
    </VStack>
  </Box>
  
        //</Container>
    );
  };

export default Connected
  
