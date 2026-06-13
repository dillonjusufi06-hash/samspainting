import Script from "next/script";

const TAWK_EMBED_URL = "https://embed.tawk.to/6a2c675bb8a3c31c3913ca3d/1jqun7f23";
const PLUS_JAKARTA =
  "var(--font-sans), 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const PLUS_JAKARTA_IFRAME =
  "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const PLUS_JAKARTA_GOOGLE =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

const hostStyles = `
  #tawk-bubble-container,
  #tawk-bubble-container *,
  .tawk-button,
  .tawk-button-circle,
  .tawk-button span {
    font-family: ${PLUS_JAKARTA} !important;
  }
`;

export function TawkChat() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: hostStyles }} />
      <Script id="tawk-config" strategy="afterInteractive">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          var tawkFont = "${PLUS_JAKARTA_IFRAME}";
          var googleFont = "${PLUS_JAKARTA_GOOGLE}";

          Tawk_API.onLoad = function () {
            function styleIframe(iframe) {
              if (!iframe || !iframe.contentDocument) return false;
              var doc = iframe.contentDocument;
              if (doc.getElementById("sams-tawk-font")) return true;

              var link = doc.createElement("link");
              link.id = "sams-tawk-font";
              link.rel = "stylesheet";
              link.href = googleFont;
              doc.head.appendChild(link);

              var style = doc.createElement("style");
              style.id = "sams-tawk-font-style";
              style.textContent =
                "body, button, input, textarea, select, h1, h2, h3, h4, h5, h6, p, span, div, label, a {" +
                "font-family: " + tawkFont + " !important;" +
                "}";
              doc.head.appendChild(style);
              return true;
            }

            function sync() {
              document
                .querySelectorAll("iframe[title='chat widget'], iframe[src*='tawk.to']")
                .forEach(styleIframe);
            }

            sync();
            new MutationObserver(sync).observe(document.body, { childList: true, subtree: true });
          };
        `}
      </Script>
      <Script
        id="tawk-embed"
        src={TAWK_EMBED_URL}
        strategy="afterInteractive"
        async
        crossOrigin="anonymous"
        charSet="UTF-8"
      />
    </>
  );
}
