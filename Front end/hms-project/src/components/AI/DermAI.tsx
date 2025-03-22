import React, { useEffect } from 'react';

export default function DermAi() {
  useEffect(() => {
    window.location.href = "https://skin-final-genpact.netlify.app/";
  }, []);

  return (
    <div>
      Redirecting to our AI Model...
    </div>
  );
}
