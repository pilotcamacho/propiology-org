/**
 * Removes bundled graphql@15.10.1 copies from @aws-amplify packages.
 *
 * @aws-amplify/data-construct and @aws-amplify/graphql-api-construct both list
 * 'graphql' in their bundledDependencies, shipping a separate graphql@15.10.1
 * inside their tarballs. npm overrides cannot affect bundledDependencies.
 *
 * By deleting those directories (not symlinking — to avoid --preserve-symlinks
 * issues in Amplify CI), Node.js CJS resolution falls back up the tree to the
 * single root graphql install, ensuring one GraphQLSchema class throughout
 * the CDK synthesis that runs during `ampx pipeline-deploy`.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'node_modules');

const bundledCopies = [
  path.join(root, '@aws-amplify', 'data-construct', 'node_modules', 'graphql'),
  path.join(root, '@aws-amplify', 'graphql-api-construct', 'node_modules', 'graphql'),
];

for (const target of bundledCopies) {
  try {
    if (!fs.existsSync(target)) continue;
    const stat = fs.lstatSync(target);
    if (stat.isSymbolicLink()) {
      fs.unlinkSync(target);
      console.log('graphql patch (removed symlink):', path.relative(root, target));
    } else {
      fs.rmSync(target, { recursive: true, force: true });
      console.log('graphql patch (removed dir):', path.relative(root, target));
    }
  } catch (e) {
    console.warn('graphql patch skipped for', target, ':', e.message);
  }
}
