import memberstackDOM from "@memberstack/dom";

let memberstackInstance: ReturnType<typeof memberstackDOM.init> | null = null;

export function getMemberstack() {
  if (!memberstackInstance) {
    const appId = process.env.NEXT_PUBLIC_MEMBERSTACK_APP_ID;
    if (!appId) {
      console.warn(
        "Memberstack App ID not found. Set NEXT_PUBLIC_MEMBERSTACK_APP_ID in your .env.local file."
      );
      return null;
    }
    memberstackInstance = memberstackDOM.init({
      publicKey: appId,
      useCookies: true,
    });
  }
  return memberstackInstance;
}
