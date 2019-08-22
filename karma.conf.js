module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
    
        files: [
            {pattern: './build/**/*.js', watched: true},
            {pattern: './tests/dummyFrameController.js', included: false},
            {pattern: './tests/**/*.js', watched: true},
            {pattern: './tests/dummy_frame.html', watched: true, included: false},
            {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', watched: false}
        ],

        preprocessors: {
            './tests/**/*.js': ['webpack']
        },

        webpack: {
            // externals: {
            //     'FrameCommunication': 'FrameCommunication',
            // },
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
            devtool: 'eval-source-map'
        },

        customContextFile: "./tests/index.html",

        autoWatch: true,

        browsers: ['Chrome'],
    
        client: {
            useIframe: false,
            mocha: {
                reporter: 'html'
            }
        }
    });
};
