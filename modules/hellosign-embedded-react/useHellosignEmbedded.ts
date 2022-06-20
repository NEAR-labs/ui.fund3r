import { useEffect, useState } from 'react';
import HelloSign from 'hellosign-embedded';

const useHellosignEmbedded = (signUrl: string, clientId: string) => {
  const [hellosign, setHellosign] = useState<HelloSign | null>(null);

  useEffect(() => {
    const client = new HelloSign();
    setHellosign(client);
  }, []);

  const open = () => {
    if (!hellosign) {
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
