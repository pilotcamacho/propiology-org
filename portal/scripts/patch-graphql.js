/**
 * Replaces bundled graphql@15.10.1 copies inside @aws-amplify packages with
 * symlinks to the root graphql install. Without this, the CDK synthesis step
 * in `ampx pipeline-deploy` throws "Cannot use GraphQLSchema from another
 * module or realm" because @aws-amplify/data-construct and
 * @aws-amplify/graphql-api-construct both declare graphql in bundledDependencies,
 * making npm overrides ineffective.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'node_modules', 'graphql');

if (!fs.existsSync(root)) {
  process.exit(0);
}

const nested = [
  path.resolve(__dirname, '..', 'node_modules', '@aws-amplify', 'data-construct', 'node_modules', 'graphql'),
  path.resolve(__dirname, '..', 'node_modules', '@aws-amplify', 'graphql-api-construct', 'node_modules', 'graphql'),
];

for (const target of nested) {
  try {
    if (!fs.existsSync(target)) continue;
    if (fs.lstatSync(target).isSymbolicLink()) continue;
    fs.rmSync(target, { recursive: true, force: true });
    fs.symlinkSync(root, target, 'junction');
    console.log('graphql patch:', path.relative(path.resolve(__dirname, '..'), target), '->', 'node_modules/graphql');
  } catch (e) {
    console.warn('graphql patch skipped for', target, ':', e.message);
  }
}
