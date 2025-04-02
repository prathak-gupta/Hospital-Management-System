import React, { useEffect } from 'react';

export default function AiPharmaReader() {
  useEffect(() => {
    const newTab = window.open("https://prescription-genpact-final.netlify.app/", "_blank");
    return () => newTab.close();
  }, []);

  return (
    <div>
      Redirecting to our AI Model...
    </div>
  );
}
