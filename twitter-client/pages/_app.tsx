import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google"
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return <GoogleOAuthProvider clientId="471596141239-d2qu1ci2ov6e3qssm5bggmlrrhm25sgs.apps.googleusercontent.com">
    <div className={inter.className}>
    <Component {...pageProps} />
  </div>;
  </GoogleOAuthProvider>
}
