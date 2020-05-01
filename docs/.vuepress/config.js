module.exports = {
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'simpleledger/slp.dev',

    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
    logo: '/assets/img/logo.png',
    //displayAllHeaders: true, // Default: false
    smoothScroll: true,

    markdown: {
      extractHeaders: ['h1', 'h2', 'h3', 'h4'],
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/', items: [
        { text: 'Chinese', link: '/language/chinese/' },
        { text: 'Japanese', link: '/language/japanese/' },
      ]},
      { text: 'External', link: 'https://google.com' }
    ],
    sidebar: [
      {
        title: 'Get Started',
        children: [
        ]
      },
      {
        title: 'Specifications',
        children: [
          ['/specs/slp-token-type-1', 'Token Type 1'],
          ['/specs/slp-nft-1', 'NFT1'],
          ['/specs/slp-payment-protocol', 'Payment Protocol'],
          ['/specs/slp-postage-protocol', 'Postage Protocol'],
          ['/specs/slp-uri-scheme', 'URI Scheme'],
          ['/specs/bitcoinfiles', 'Bitcoin Files'],
        ]
      },
      {
        title: 'Guides',
        children: [
          ['/guides/slp-implementation-instructions', 'Implementation Instructions'],
        ]
      },
      {
        title: 'Packages',
        children: [
          ['/packages/slpjs', 'SLPJS'],
          ['/packages/slp-validate', 'SLP-Validate'],
          ['/packages/slp-list', 'SLP-List'],
          {
            title: 'Parser',
            children: [
              ['/packages/slp-parser.js', 'SLP-Parser.js'],
              ['/packages/slp-parser.dart', 'SLP-Parser.dart'],
            ]
          },
          {
            title: 'Metadata Maker',
            children: [
              ['/packages/slp-mdm.js', 'SLP-MDM.js'],
              ['/packages/slp-mdm.dart', 'SLP-MDM.dart'],
            ]
          },
        ]
      },
      {
        title: 'Tooling',
        children: [
          ['/tooling/explorer', 'Explorer'],
          {
            title: 'SLPDB',
            children: [
              ['/tooling/slpdb', 'SLPDB'],
              ['/tooling/slpserve', 'SLPServe'],
              ['/tooling/slpsocket', 'SLPSocket'],
            ],
          },
          {
            title: 'GS++',
            children: [
              ['/tooling/gs++', 'GS++'],
              ['/tooling/slpstream', 'SLPStream'],
            ]
          },
          {
            title: 'Wallets',
            children: [
              ['/tooling/ecslp', 'Electron Cash SLP'],
            ]
          }
        ]
      },
      ['/community', 'Community'],
    ]
  }
};
