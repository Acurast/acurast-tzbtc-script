const path = require('path')
const webpack = require('webpack')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'tzbtc',
        libraryTarget: 'umd'
    },
    resolve: {
        fallback: {
            crypto: false,
            fs: false,
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ]
}
