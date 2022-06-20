import { useEffect, useState } from 'react';
import HelloSign from 'hellosign-embedded';

const useHellosignEmbedded = (signUrl: string | undefined, clientId: string | undefined) => {
  const [hellosign, setHellosign] = useState<HelloSign | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const client = new HelloSign();
      setHellosign(client);
    }
  }, []);

  const open = () => {
    if (!hellosign || !signUrl) {
      return;
    }

    hellosign.open(signUrl, {
      clientId,
    });
  };

  return {
    hellosign,
    open,
  };
};

export default useHellosignEmbedded;
