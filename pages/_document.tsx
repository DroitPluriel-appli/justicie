import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ReactElement } from 'react'

export default class MyDocument extends Document {
  tarteAuCitron(): ReactElement {
    return (
      <>
        <Script
          src="/tarteaucitron.js"
          strategy="beforeInteractive"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            tarteaucitron.init({
              "privacyUrl": "", 
                "bodyPosition": "top", 
              "hashtag": "#tarteaucitron", 
              "cookieName": "tarteaucitron", 
              "orientation": "bottom", 
                "groupServices": false, 
                "serviceDefaultState": "wait", 
              "showAlertSmall": false, 
              "cookieslist": false, 
                "closePopup": false, 
                "showIcon": true, 
                "iconSrc": "
                "iconPosition": "BottomRight", 
              "adblocker": false, 
                "DenyAllCta" : true, 
                "AcceptAllCta" : true, 
                "highPrivacy": true, 
              "handleBrowserDNTRequest": true, 
              "removeCredit": true, 
              "moreInfoLink": true, 
                "useExternalCss": false, 
                "useExternalJs": false, 
                "readmoreLink": "ReadmoreLink", 
                "mandatory": false, 
                "mandatoryCta": false 
              });
            tarteaucitron.user.gtagUa = 'G-QVSWEV0X5D';
            (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
          `,
          }}
          id="tarteaucitronScript"
          strategy="afterInteractive"
        />
      </>
    )
  }
  override render(): ReactElement {
    return (
      <Html lang="fr">
        <Head>
          {process.env.NODE_ENV === 'production' && this.tarteAuCitron()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
