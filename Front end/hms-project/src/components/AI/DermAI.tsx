import React, { useEffect } from 'react';

export default function DermAi() {
  useEffect(() => {
    const newTab = window.open("https://skin-final-genpact.netlify.app/", "_blank");
    return () => newTab.close();
  }, []);

  return (
    <div>
      Redirecting to our AI Model...
    </div>
  );
}
