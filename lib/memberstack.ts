// eslint-disable-next-line @typescript-eslint/no-explicit-any
let memberstackInstance: any | null = null;

export function getMemberstack() {
  if (typeof window === "undefined") return null;

  if (!memberstackInstance) {
    const appId = process.env.NEXT_PUBLIC_MEMBERSTACK_APP_ID;
    if (!appId) {
      console.warn(
        "Memberstack App ID not found. Set NEXT_PUBLIC_MEMBERSTACK_APP_ID in your .env.local file."
      );
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const memberstackDOM = require("@memberstack/dom").default;
    memberstackInstance = memberstackDOM.init({
      publicKey: appId,
      useCookies: true,
    });
  }
  return memberstackInstance;
}
