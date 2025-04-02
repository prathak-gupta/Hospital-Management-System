import React, { useEffect } from 'react';

export default function FractureDetector() {
  useEffect(() => {
    const newTab = window.open("https://fracture-final-genpact.netlify.app/", "_blank");
    return () => newTab.close();
  }, []);

  return (
    <div>
      Redirecting to our AI model...
    </div>
  );
}
