import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../utils/auth";

export default function GoogleSignInButton({
  onSuccess,
  onError,
  loading = false,
}) {
  const handleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;

      if (!credential) {
        throw new Error("No Google credential returned");
      }

      const data = await googleLogin(credential);

      onSuccess?.(data);
    } catch (err) {
      onError?.(err);
    }
  };

  const handleError = () => {
    onError?.(new Error("Google login failed"));
  };

  return (
    <div
      style={{
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : "auto",
      }}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}   // 🔥 safer (avoids silent FedCM issues)
        theme="outline"
        size="large"
        shape="rectangular"
        text="continue_with"
      />
    </div>
  );
}