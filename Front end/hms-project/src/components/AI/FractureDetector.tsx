import React, { useEffect } from 'react';

export default function FractureDetector() {
  useEffect(() => {
    window.location.href = "https://fracture-final-genpact.netlify.app/";
  }, []);

  return (
    <div>
      Redirecting to our AI model...
    </div>
  );
}
