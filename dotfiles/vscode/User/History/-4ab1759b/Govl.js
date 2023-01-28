import { useEffect, useMemo, useState } from 'react';
import { Redirect, matchPath } from 'react-router';
import { useQuery } from 'react-query';
import { flatten } from 'lodash';

import { ROUTE, TEXT } from 'common/const';
import { getEventCatalog, getEventPackages } from 'data/events';
import { CartProvider, useOrders, useShop } from 'app/context';
import { Error, Require } from 'common/components';
import { Page } from 'common/site';
import PrivateRoute from 'routes/PrivateRoute';
import { useEvent } from 'common/hooks';

import ProductDetail from './ProductDetail';
import Catalog from './Catalog';
import Packages from './Catalog/Packages';
import Filters from './Catalog/Filters';
import Cart from './Cart';
import EventInfo from './EventInfo';

import styles from './Shopping.module.css';

const Shopping = ({ location }) => {
  const item = location.state;

  // console.log('<Shopping>', { location, item });

  const { eventId, ooSummaryId, scrollTo, ...shop } = useShop();

  // TODO: remove this after the catalog data refactor is complete
  const updateShop = useMemo(() => shop.update, [shop.update]);

  useEffect(() => {
    const isCatalog = matchPath(location.pathname, {
      path: ROUTE.CATALOG + '/:selected',
    });

    if (isCatalog && scrollTo) {
      window.scrollTo({ left: 0, top: scrollTo ?? 0, behavior: 'auto' });
      updateShop({ scrollTo: 0 });
    }
  }, [location, scrollTo, updateShop]);

  const { findOrder } = useOrders();
  const order = findOrder(ooSummaryId);

  const { response: boothType } = order?.assessmentResponseData?.find(
    ({ assessmentQ_ID }) => assessmentQ_ID === 2,
  ) || { response: 'blank' };
  const { response: boothLocation } = order?.assessmentResponseData?.find(
    ({ assessmentQ_ID }) => assessmentQ_ID === 3,
  ) || { response: 'blank' };

  const {
    isLoading: isLoadingCatalog,
    error: catalogError,
    data = {},
  } = useQuery(
    ['getEventCatalog', { eventId, ooSummaryId }],
    () =>
      getEventCatalog({ eventId, ooId: ooSummaryId, boothType, boothLocation }),
    { enabled: Boolean(eventId), cacheTime: 0 },
  );

  const {
    isLoading: isLoadingPackages,
    error: packagesError,
    data: packageData = {},
  } = useQuery(
    ['getEventPackages', { eventId, ooSummaryId }],
    () =>
      getEventPackages({
        eventId,
        ooId: ooSummaryId,
        boothType,
        boothLocation,
      }),
    { enabled: Boolean(eventId), cacheTime: 0 },
  );

  const { catalog = [] } = useMemo(() => data, [data]);

  const error = useMemo(
    () => packagesError?.message ?? catalogError?.message,
    [packagesError, catalogError],
  );

  // get filters from response data
  const filters = useMemo(() => {
    const getFilter = ({ description }, options) =>
      Object.assign({}, options, { name: description });
    const packagesFilter = packageData?.categories?.length
      ? getFilter(packageData, { isPackage: true })
      : undefined;

    return [packagesFilter, ...catalog.map(getFilter)].filter(
      (filter) => filter !== undefined,
    );
  }, [packageData, catalog]);

  // update our shop context
  useEffect(() => {
    // only do this once
    if (
      shop.categories.length ||
      Object.keys(shop.inventory).length ||
      Object.keys(shop.powerPackage).length
    ) {
      return;
    }

    // wait for catalog
    if (isLoadingCatalog) {
      // show spinner
      if (!shop.isLoading) {
        shop.update({ isLoading: true });
      }

      return;
    }

    // wait for packages
    if (isLoadingPackages) {
      return;
    }

    // get categories from catalog
    const categories = catalog.map(({ description }) => description) ?? [];

    // get inventory from catalog
    const inventory = catalog.reduce((invObj, { categories }) => {
      const categoryItems = flatten(categories.map(({ items }) => items));

      return {
        ...invObj,
        ...categoryItems.reduce(
          (categoryObject, item) => ({
            ...categoryObject,
            [item.id]: item,
          }),
          {},
        ),
      };
    }, {});

    // get package data
    const powerPackage = packageData.categories?.reduce(
      (packageObj, { items = [] }) => ({
        ...packageObj,
        ...items.reduce(
          (itemObj, item) => ({
            ...itemObj,
            [item.id]: item,
          }),
          {},
        ),
      }),
      {},
    );

    shop.update({ categories, inventory, powerPackage, isLoading: false });
  }, [shop, catalog, packageData, isLoadingCatalog, isLoadingPackages]);

  const { data: event = {} } = useEvent(eventId);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (isLoadingCatalog || isLoadingPackages) {
      return;
    }

    if (!selected && filters[0]) {
      setSelected(filters[0].name);
    }
  }, [isLoadingCatalog, isLoadingPackages, filters, selected, setSelected]);

  return (
    <Require shop>
      <CartProvider>
        <Page
          variant="shopping"
          Cart={Cart}
          title="Shopping"
          isLoading={isLoadingCatalog || isLoadingPackages}
          eventInfo={<EventInfo className={TEXT.CAPTION} />}
          filters={
            <Filters
              filters={filters}
              selected={selected}
              onChange={setSelected}
            />
          }
        >
          {/* Redirect /shopping & /shopping/catalog & /shopping/product */}
          <PrivateRoute
            exact
            path={[ROUTE.SHOPPING, ROUTE.CATALOG, ROUTE.PRODUCT]}
          >
            {selected && <Redirect to={ROUTE.CATALOG + '/' + selected} />}
          </PrivateRoute>

          {/* Catalog */}
          <PrivateRoute path={ROUTE.CATALOG}>
            {error && (
              <div className={styles.error}>
                <Error>{error}</Error>
              </div>
            )}
          </PrivateRoute>

          {/* Catalog selected item */}
          <PrivateRoute path={ROUTE.CATALOG + '/:selected'}>
            <Packages
              packageData={packageData}
              isEarlyPricing={event.isEarlyPricing}
            />

            <Catalog catalog={catalog} isEarlyPricing={event.isEarlyPricing} />
          </PrivateRoute>

          {/* ProductDetail */}
          <PrivateRoute path={ROUTE.PRODUCT + '/:id'}>
            <ProductDetail
              itemId={item?.id}
              isEarlyPricing={event.isEarlyPricing}
            />
          </PrivateRoute>
        </Page>
      </CartProvider>
    </Require>
  );
};

export default Shopping;
