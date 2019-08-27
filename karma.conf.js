module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
    
        files: [
            {pattern: './tests/dummyFrameController.js', included: false},
            {pattern: './tests/**/*.js', watched: true},
            {pattern: './tests/dummy_frame.html', watched: true, included: false},
            {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', watched: false}
        ],

        preprocessors: {
            './tests/**/*.js': ['webpack']
        },

        webpack: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                          loader: 'babel-loader',
                          options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                          }
                        }
                    },
                ]
            },
            mode: 'development',
            devtool: 'inline-source-map'
        },

        customDebugFile: "./tests/custom_debug_template.html",

        autoWatch: true,

        browsers: ['Chrome'],
    
        client: {
            mocha: {
                reporter: 'html'
            }
        }
    });
};
