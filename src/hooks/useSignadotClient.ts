import { useApi, configApiRef, discoveryApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { SignadotEnvironmentsApiImpl } from '../api';

export const useSignadotClient = () => {
  const configApi = useApi(configApiRef);
  const discoveryApi = useApi(discoveryApiRef);
  const fetchApi = useApi(fetchApiRef);

  const client = new SignadotEnvironmentsApiImpl({
    fetchApi,
    configApi,
    discoveryApi,
  });

  return client;
}; 