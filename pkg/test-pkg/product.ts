import { IPlugin } from '@shell/core/types';
import { STATE, NAME as NAME_COL, AGE } from '@shell/config/table-headers';

export const YOUR_PRODUCT_NAME = 'test-pkg';
export const BLANK_CLUSTER = '_';

export function init($plugin: IPlugin, store: any) {
  const { product, basicType, headers } = $plugin.DSL(store, YOUR_PRODUCT_NAME);

  product({
    icon:    'gear',
    inStore: 'management',
    weight:  100,
    to:      {
      name:   `${ YOUR_PRODUCT_NAME }-c-cluster`,
      params: { product: YOUR_PRODUCT_NAME, cluster: BLANK_CLUSTER }
    }
  });

  const RESOURCE = 'provisioning.cattle.io.cluster';

  /**
  * This method is registering a new resource/type with our product -
  * `provisioning.cattle.io.cluster` is an existing resource within Rancher
  * You can create and add CRDs for these types
  */
  basicType([RESOURCE]);

  headers(RESOURCE, [
    STATE,
    NAME_COL,
    {
      name: 'property-1', label: 'Property 1', value: 'myProp'
    },
    {
      name:     'property-2',
      label:    'Property 2',
      value:    'myProp2',
      getValue: (row: any) => `${ row.myProp }2`
    },
    AGE
  ]);
}
