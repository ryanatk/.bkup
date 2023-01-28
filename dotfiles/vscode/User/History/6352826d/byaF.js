/*
  Edit this file to locally force a feature flag on.

 Example:

 module.exports = {
     'bilbo-product-catalog': true
 }

*/
const flags = {
  'enable-wishlist-hero': true,
  // 'enable-sleep-hero': true,
  // 'enable-accurate-hero': true,
};

if (process.env['LOCAL_ENABLE_FEATURE_FLAG']) {
  for (const flag of process.env['LOCAL_ENABLE_FEATURE_FLAG'].split(',')) {
    console.log(`Enabling feature flag ${flag} (from environment variable)`);
    flags[flag] = true;
  }
}

module.exports = flags;
