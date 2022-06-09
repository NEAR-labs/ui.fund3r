import { useEffect, useMemo, useState } from 'react';
import type { SdkConfiguration } from '@kycdao/kycdao-sdk';
import { KycDao } from '@kycdao/kycdao-sdk';

import getConfig from '../config';
import KycDaoContext from '../context/KycDaoContext';

const KycDaoProvider = ({ children, networkId = 'tesnet', config }: { children: JSX.Element; networkId: string; config: SdkConfiguration }) => {
  const [kycDao, setKycDao] = useState<KycDao | null>(null);

  useEffect(() => {
    const defaultConfig = getConfig(networkId);
    const kycDaoInstance = new KycDao({
      ...defaultConfig,
      ...config,
    });
    setKycDao(kycDaoInstance);
  }, [networkId, config]);

  const contextValue = useMemo(() => ({ kycDao }), [kycDao]);

  return <KycDaoContext.Provider value={contextValue}>{children}</KycDaoContext.Provider>;
};

export default KycDaoProvider;
