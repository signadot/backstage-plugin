import { configApiRef, discoveryApiRef, fetchApiRef, useApi as useBackstageApi} from "@backstage/core-plugin-api";
import { SignadotEnvironmentsApiImpl } from "../api";

export const useSignadotClient = () => {
  const configApi = useBackstageApi(configApiRef);
  const discoveryApi = useBackstageApi(discoveryApiRef);
  const fetchApi = useBackstageApi(fetchApiRef);

  const client = new SignadotEnvironmentsApiImpl({
    fetchApi,
    configApi,
    discoveryApi,
  });

  return client;
};
