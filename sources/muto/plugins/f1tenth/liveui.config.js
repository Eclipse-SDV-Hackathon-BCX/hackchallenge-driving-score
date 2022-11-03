module.exports = {
    hotReloadContext: 'src',
    devPort: 4007,
    microPort: 5007,
    exposes: {
        'f1tenth': './src/index.tsx'
    },
    shared: [
        
        'react',
        'react-dom',
        "react-router-dom",
        '@patternfly/react-core',
        "@patternfly/react-icons",
        "html-loader",
        "style-loader",
        'uuid',
        'graphql',
        '@apollo/client'   

    ],
}
