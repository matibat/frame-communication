module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
    
        files: [
            {pattern: './build/**/*.js', watch: true},
            {pattern: './tests/**/*.js', watch: true}
        ],

        preprocessors: {
            './tests/**/*.js': ['webpack']
        },

        webpack: {
            // externals: {
            //     'FrameCommunication': 'FrameCommunication',
            // },
            mode: 'development',
            devtool: 'eval-source-map'
        },

        customClientContextFile: "./tests/index.html",

        autoWatch: true,

        browsers: ['Chrome'],
    
        client: {
            mocha: {
                // change Karma's debug.html to the mocha web reporter
                reporter: 'html',
        
                // require specific files after Mocha is initialized
                // require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],
        
                // // custom ui, defined in required file above
                // ui: 'bdd-lazy-var/global',
            }
        }
    });
};
