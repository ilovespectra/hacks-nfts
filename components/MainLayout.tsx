import { FC, ReactNode } from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"
const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { connected } = useWallet()
  return (
    <div className={styles.container}>
      <Head>
        <title>HeliumDenver Presents the Hacks NFT Collection</title>
        <meta name="The NFT Collection for HeliumDenver Hacks sessions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

	@@ -38,7 +38,7 @@ const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
                target="_blank"
                rel="noopener noreferrer"
              >
                Hacks for the masses. 
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}
export default MainLayout
