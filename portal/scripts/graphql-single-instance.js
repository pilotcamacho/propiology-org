/**
 * Loaded via NODE_OPTIONS=--require before ampx starts.
 * Patches Module._resolveFilename so every CJS require('graphql') or
 * require('graphql/X') call in any package returns the same root graphql path,
 * guaranteeing one GraphQLSchema class throughout CDK synthesis.
 *
 * Belt-and-suspenders alongside patch-graphql.js (which removes the bundled
 * directory copies). Either fix alone should be sufficient; together they are
 * resilient to both --preserve-symlinks and file-removal race conditions.
 */
'use strict';
const Module = require('module');
const path = require('path');

let rootGraphqlIndex;
let rootGraphqlDir;

try {
  rootGraphqlIndex = require.resolve('graphql');
  rootGraphqlDir = path.dirname(rootGraphqlIndex);
} catch (_) {
  // graphql not installed — nothing to patch
  return;
}

const _orig = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === 'graphql') return rootGraphqlIndex;
  if (typeof request === 'string' && request.startsWith('graphql/')) {
    return path.join(rootGraphqlDir, request.slice('graphql/'.length));
  }
  return _orig.call(this, request, parent, isMain, options);
};
