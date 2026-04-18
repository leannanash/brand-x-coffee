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
      if (!credentialResponse?.credential) {
        throw new Error("No Google credential returned");
      }

      const token = credentialResponse.credential;

      const data = await googleLogin(token);

      if (onSuccess) onSuccess(data);
    } catch (err) {
      if (onError) onError(err);
    }
  };

  

  return (
    <div style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? "none" : "auto" }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          if (onError) onError(new Error("Google login failed"));
        }}
        useOneTap
        theme="outline"
        size="large"
        shape="rectangular"
        text="continue_with"
      />
    </div>
  );
}