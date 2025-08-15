import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <CssBaseline />
      <Navbar route={router.pathname} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
