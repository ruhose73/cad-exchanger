#!/usr/bin/env ts-node
import { Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import { resolve } from 'path';

const loggerContext = 'MigrationGenerator';
const migrationName = process.argv[2];

if (!migrationName) {
  Logger.log('Usage: ts-node scripts/migrate-gen.ts <name>', loggerContext);
  Logger.log('Example: ts-node scripts/migrate-gen.ts AddUserTable', loggerContext);
  process.exit(1);
}

const fullMigrationName = `${migrationName}`;

Logger.log(`🚀 Generating migration: ${fullMigrationName}`, loggerContext);

const projectRoot = resolve(__dirname, '..');
const migrationsPath = resolve(projectRoot, 'src/migrations', fullMigrationName);
const configPath = resolve(projectRoot, 'src/config/datasource-migration.config.ts');

Logger.log(`📁 Config path: ${configPath}`, loggerContext);
Logger.log(`📂 Migration path: ${migrationsPath}`, loggerContext);

try {
  const command = `npx ts-node ./node_modules/typeorm/cli.js migration:generate "${migrationsPath}" -d "${configPath}"`;
  Logger.log(`⚡ Executing: ${command}`, loggerContext);

  execSync(command, {
    stdio: 'inherit',
    cwd: projectRoot,
  });

  Logger.log(`✅ Migration created: src/migrations/${fullMigrationName}.ts`, loggerContext);
} catch (error: any) {
  Logger.log('❌ Failed to generate migration', loggerContext);
  Logger.log(`Error: ${error.message}`, loggerContext);
  process.exit(1);
}
