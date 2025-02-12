export const config = {
    db: {
      host: process.env.POSTGRES_HOST || 'postgres',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres'
    },
    wb: {
      apiKey: process.env.WB_API_KEY || ''
    },
    google: {
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
      privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
      sheetIds: process.env.GOOGLE_SHEET_IDS?.split(',') || []
    }
  };