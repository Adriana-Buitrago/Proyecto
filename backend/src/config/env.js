const requiredVariables = ['DATABASE_URL', 'CLOUD_DATABASE_URL'];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    console.error(
      `Error de configuración: falta la variable obligatoria ${variable}.`
    );
    process.exit(1);
  }
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  cloudDatabaseUrl: process.env.CLOUD_DATABASE_URL,
};
