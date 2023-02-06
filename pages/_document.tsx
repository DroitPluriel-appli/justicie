import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ReactElement } from 'react'

export default class MyDocument extends Document {
  override render(): ReactElement {
    return (
      <Html lang="fr">
        <Head>
          <Script
            src="/tarteaucitron.js"
            strategy="beforeInteractive"
          />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
            tarteaucitron.init({
              "privacyUrl": "", /* Privacy policy url */
                "bodyPosition": "top", /* or top to bring it as first element for accessibility */
              "hashtag": "#tarteaucitronRoot", /* Open the panel with this hashtag */
              "cookieName": "tarteaucitron", /* Cookie name */
              "orientation": "bottom", /* Banner position (top - bottom) */
                "groupServices": false, /* Group services by category */
                "serviceDefaultState": "wait", /* Default state (true - wait - false) */
              "showAlertSmall": false, /* Show the small banner on bottom right */
              "cookieslist": false, /* Show the cookie list */
                "closePopup": false, /* Show a close X on the banner */
                "showIcon": true, /* Show cookie icon to manage cookies */
                "iconSrc": "/consent-icon.svg",
                "iconPosition": "BottomRight", /* BottomRight, BottomLeft, TopRight and TopLeft */
              "adblocker": false, /* Show a Warning if an adblocker is detected */
                "DenyAllCta" : true, /* Show the deny all button */
                "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
                "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */
              "handleBrowserDNTRequest": true, /* If Do Not Track == 1, disallow all */
              "removeCredit": true, /* Remove credit link */
              "moreInfoLink": true, /* Show more info link */
                "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
                "useExternalJs": false, /* If false, the tarteaucitron.js file will be loaded */
                "readmoreLink": "ReadmoreLink", /* Change the default readmore link */
                "mandatory": false, /* Show a message about mandatory cookies */
                "mandatoryCta": false /* Show the disabled accept button when mandatory on */
              });

            // tarteaucitron.user.gtagUa = 'G-QVSWEV0X5D';
            tarteaucitron.user.gtagUa = 'G-XXXXXXXXX';
            (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
          `,
            }}
            id="tarteaucitron"
            strategy="afterInteractive"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
