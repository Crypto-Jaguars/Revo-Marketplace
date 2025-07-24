#!/usr/bin/env node

/**
 * Store Migration Script
 * 
 * This script helps with the transition from the old store structure to the new modular structure.
 * It creates compatibility re-exports to ensure backward compatibility during the transition.
 */

const fs = require('fs');
const path = require('path');

// Define the store root directory
const storeDir = path.join(process.cwd(), 'src', 'store');

// Create compatibility re-exports
const createCompatibilityReExports = () => {
  console.log('Creating compatibility re-exports...');
  
  // Cart store compatibility
  fs.writeFileSync(
    path.join(storeDir, 'cartStore', 'index.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from '../slices/cart';
export * from '../slices/cart/types';
`
  );

  // Language store compatibility
  fs.writeFileSync(
    path.join(storeDir, 'languageStore.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from './slices/language';
`
  );

  fs.writeFileSync(
    path.join(storeDir, 'languageStore', 'index.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from '../slices/language';
`
  );

  // Search store compatibility
  fs.writeFileSync(
    path.join(storeDir, 'searchStore', 'index.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from '../slices/search';
`
  );

  // Wallet store compatibility
  fs.writeFileSync(
    path.join(storeDir, 'walletStore', 'index.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from '../slices/wallet';
`
  );

  // Utils store compatibility
  fs.writeFileSync(
    path.join(storeDir, 'utilsStore', 'index.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from '../slices/utils';
`
  );

  // Farm store compatibility
  fs.writeFileSync(
    path.join(storeDir, 'farm.ts'),
    `/**
 * @deprecated Import from '@/store' instead
 */
export * from './slices/farm';
export * from './slices/farm/types';
`
  );

  console.log('Compatibility re-exports created successfully!');
};

// Run the migration
const runMigration = async () => {
  try {
    createCompatibilityReExports();
    console.log('\nStore migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update all imports to use the new structure: import { useXStore } from \'@/store\';');
    console.log('2. Run tests to ensure everything works correctly');
    console.log('3. Once all imports are updated, you can safely remove the old store files');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

runMigration();
