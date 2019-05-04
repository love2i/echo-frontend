module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer:{
    proxy: {
      '/api': {
        target: 'https://api.echo.ituoniao.net/api/web',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/'
}
