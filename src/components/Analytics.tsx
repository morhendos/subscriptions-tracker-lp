'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type AnalyticsProps = {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
};

/**
 * Analytics scripts component that loads Google Analytics and Microsoft Clarity
 * This component doesn't depend on URL parameters and can be rendered directly
 */
export function AnalyticsScripts({
  googleAnalyticsId,
  microsoftClarityId
}: AnalyticsProps) {
  return (
    <>
      {/* Google Analytics Script */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity Script */}
      {microsoftClarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityId}");
          `}
        </Script>
      )}
    </>
  );
}

/**
 * Analytics tracking component that handles page views
 * This component uses client-side hooks and needs to be wrapped in a Suspense boundary
 */
export function AnalyticsPageTracker({
  googleAnalyticsId
}: Pick<AnalyticsProps, 'googleAnalyticsId'>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views in Google Analytics when the route changes
  useEffect(() => {
    if (googleAnalyticsId && window.gtag) {
      window.gtag('config', googleAnalyticsId, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams, googleAnalyticsId]);

  return null; // This component doesn't render anything
}

/**
 * Main Analytics component that exports both scripts and tracker
 * This allows for more flexible usage based on the context
 */
export default function Analytics({
  googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  microsoftClarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
}: AnalyticsProps) {
  return (
    <AnalyticsScripts 
      googleAnalyticsId={googleAnalyticsId}
      microsoftClarityId={microsoftClarityId}
    />
  );
}

// Declare global window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}
