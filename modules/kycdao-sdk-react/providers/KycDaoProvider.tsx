import { useEffect, useMemo, useState } from 'react';
import type { KycDao, SdkConfiguration } from '@kycdao/kycdao-sdk';

import getConfig from '../config';
import KycDaoContext from '../context/KycDaoContext';

const KycDaoProvider = ({ children, networkId = 'tesnet', config }: { children: JSX.Element; networkId: string; config: SdkConfiguration | object }) => {
  const [kycDao, setKycDao] = useState<KycDao | null>(null);

  useEffect(() => {
    const initKycDao = async () => {
      const { KycDao } = await import('@kycdao/kycdao-sdk');
      const defaultConfig = getConfig(networkId);
      const kycDaoInstance = new KycDao({
        ...defaultConfig,
        ...config,
      });
      setKycDao(kycDaoInstance);
    };

    initKycDao();
  }, [networkId, config]);

  const contextValue = useMemo(() => ({ kycDao }), [kycDao]);

  return <KycDaoContext.Provider value={contextValue}>{children}</KycDaoContext.Provider>;
};

export default KycDaoProvider;
