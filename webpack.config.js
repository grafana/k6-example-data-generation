
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'test.[name].js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
        ]
    },
    stats: {
        colors: true,
        warnings: false
    },
    target: "web",
    externals: /k6(\/.*)?/,
    devtool: 'source-map',
}