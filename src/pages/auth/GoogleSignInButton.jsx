import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleSignInButton({
  onSuccess,
  onError,
  loading = false,
}) {
  const handleSuccess = (credentialResponse) => {
    const credential = credentialResponse?.credential;

    if (!credential) {
      onError?.(new Error("No Google credential returned"));
      return;
    }

    onSuccess?.(credential);
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
        useOneTap={false}
        theme="outline"
        size="large"
        shape="rectangular"
        text="continue_with"
      />
    </div>
  );
}