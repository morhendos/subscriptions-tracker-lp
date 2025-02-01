import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="canonical" href="https://subscriptions-tracker.com" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0A0A1B" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
