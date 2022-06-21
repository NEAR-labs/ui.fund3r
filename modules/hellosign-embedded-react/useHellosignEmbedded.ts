/* eslint-disable import/no-duplicates */
import { useState } from 'react';
import type HelloSign from 'hellosign-embedded';
import type Options from 'hellosign-embedded';

const useHellosignEmbedded = (signUrl: string | undefined, clientId: string | undefined, options: Options | undefined) => {
  const [hellosignClient, setHellosignClient] = useState<HelloSign | null>(null);

  const open = () => {
    if (!signUrl) {
      return;
    }

    import('hellosign-embedded')
      .then(({ default: HelloSign }) => {
        return new HelloSign({
          allowCancel: true,
          clientId,
          skipDomainVerification: true,
          ...options,
        });
      })
      .then((client) => {
        setHellosignClient(client);
        client.open(signUrl);
      });
  };

  return {
    hellosignClient,
    open,
  };
};

export default useHellosignEmbedded;
