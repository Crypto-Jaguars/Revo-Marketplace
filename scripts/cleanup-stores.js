#!/usr/bin/env node

/**
 * Store Cleanup Script
 * 
 * This script helps with the final cleanup of old store files after the transition
 * to the new modular structure is complete.
 */

const fs = require('fs');
const path = require('path');

// Define the store root directory
const storeDir = path.join(process.cwd(), 'src', 'store');

// Files to keep (don't delete these)
const filesToKeep = [
  'index.ts',
  'README.md',
  '__tests__/farm.test.ts'
];

// Directories to keep
const dirsToKeep = [
  'slices',
  '__tests__'
];

// Clean up old store files
const cleanupOldStoreFiles = () => {
  console.log('Cleaning up old store files...');
  
  // Read all files in the store directory
  const files = fs.readdirSync(storeDir);
  
  files.forEach(file => {
    const filePath = path.join(storeDir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    
    // Skip directories we want to keep
    if (isDirectory && dirsToKeep.includes(file)) {
      return;
    }
    
    // Skip files we want to keep
    if (!isDirectory && filesToKeep.includes(file)) {
      return;
    }
    
    // Remove the file or directory
    if (isDirectory) {
      console.log(`Removing directory: ${file}`);
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      console.log(`Removing file: ${file}`);
      fs.unlinkSync(filePath);
    }
  });
  
  console.log('Old store files cleaned up successfully!');
};

// Run the cleanup
const runCleanup = async () => {
  try {
    console.log('WARNING: This script will remove old store files that are no longer needed.');
    console.log('Make sure you have updated all imports to use the new store structure before running this script.');
    console.log('Press Ctrl+C to cancel or wait 5 seconds to continue...');
    
    // Wait for 5 seconds before proceeding
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    cleanupOldStoreFiles();
    console.log('\nStore cleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
};

runCleanup();
