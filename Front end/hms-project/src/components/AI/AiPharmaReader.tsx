import React, { useEffect } from 'react';

export default function AiPharmaReader() {
  useEffect(() => {
    window.location.href = "https://prescription-genpact-final.netlify.app/";
  }, []);

  return (
    <div>
      Redirecting to our AI Model...
    </div>
  );
}
