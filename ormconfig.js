// configuration only for typeorm cli
module.exports = {
  migrationsRun: true,
  migrations: ['src/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
