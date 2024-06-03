import { IPlugin } from '@shell/core/types';

import { Product } from './types/product';

export function init($plugin: IPlugin, store: any) {
  const UIPLUGIN_RESOURCE = 'catalog.cattle.io.uiplugin';
  const CUSTOM_PAGE_NAME = 'page1';

  const {
    product,
    configureType,
    virtualType,
    basicType
  } = $plugin.DSL(store, Product.name);

  // registering a cluster-level product
  product({
    icon:    'gear',
    inStore: 'cluster', // this is what defines the extension as a cluster-level product
    weight:  100,
    to:      {
      name:   `c-cluster-${ Product.name }-${ CUSTOM_PAGE_NAME }`,
      params: { product: Product.name }
    }
  });

  // defining a k8s resource as page
  configureType(UIPLUGIN_RESOURCE, {
    displayName: 'test-display-name',
    isCreatable: false,
    isEditable:  true,
    isRemovable: true,
    showAge:     true,
    showState:   true,
    canYaml:     true,
    customRoute: {
      name:   `c-cluster-${ Product.name }-resource`,
      params: {
        product:  Product.name,
        resource: UIPLUGIN_RESOURCE
      }
    }
  });

  // creating a custom page
  virtualType({
    labelKey: 'generic.info',
    name:     CUSTOM_PAGE_NAME,
    route:    {
      name:   `c-cluster-${ Product.name }-${ CUSTOM_PAGE_NAME }`,
      params: { product: Product.name }
    }
  });

  // registering the defined pages as side-menu entries
  basicType([UIPLUGIN_RESOURCE, CUSTOM_PAGE_NAME]);
}
