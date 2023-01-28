/**
 * This file allows us to maintain this old URL
 * while we move this page to the new URL.
 *
 * This is necessary because the redirects
 * live in ecom-content, which will be released after.
 */

import { ReactElement } from 'react';
import NewPage from '../Heart-Rate-Monitoring';

const Page = (): ReactElement => <NewPage />;

export default Page;
