'use strict';
/**
 * Clear a user's solve history and platform ticks.
 *
 *   node tools/reset_progress.js --tests      only the _selftest sandbox
 *   node tools/reset_progress.js Subhodeep
 *   node tools/reset_progress.js --all        WIPES REAL ACCOUNTS TOO
 *
 * Use --tests after running the suites: they judge as _selftest, so that is
 * the only account a test run ever dirties. --all also clears Subhodeep and
 * kashish, which hold real solve history - only run it when you mean to
 * throw that away.
 *
 * Does not touch your code in workspace/ - only progress records.
 */
const { getStore } = require('../server/storage');

(async () => {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.log('\n  usage: node tools/reset_progress.js --tests | <username> | --all\n');
    process.exit(1);
  }

  const store = await getStore();
  const targets = args.includes('--tests')
    ? ['_selftest']
    : (args.includes('--all') ? ['Subhodeep', 'kashish', '_selftest'] : args);

  const real = targets.filter((u) => u !== '_selftest');
  if (real.length) {
    console.log(`\n  NOTE: this clears REAL solve history for ${real.join(', ')}.`);
    console.log('  After a test run you want --tests instead.');
  }

  console.log('');
  for (const u of targets) {
    const r = await store.resetProgress(u);
    console.log(`  ${u.padEnd(12)} cleared ${r.submissions} submission(s), ${r.platform} platform tick(s)`);
  }
  console.log('\n  done - workspace code was not touched\n');
  process.exit(0);
})().catch((e) => { console.error('\n  ' + e.message + '\n'); process.exit(1); });
