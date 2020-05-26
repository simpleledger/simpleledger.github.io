module.exports = {
  evergreen: true,
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#3a0839'
      }
    ],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
    [
      'meta',
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      }
    ],
    ['meta', { name: 'theme-color', content: '#5bbad5' }]
  ],
  markdown: {
    extractHeaders: ['h1', 'h2', 'h3', 'h4'],
  },
  themeConfig: {
    domain: 'https://slp.dev',
    docsRepo: 'simpleledger/simpleledger.github.io',
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    logo: '/slp-documentation-logo.svg',
    defaultImage: '/logo.png',
    smoothScroll: true,

    nav: [
    ],
    sidebar: [
      ['/get-started', 'Get Started'],
      ['/terminology', 'Terminology'],
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
          ['/guides/overview', 'Overview'],
          ['/guides/slp-implementation-instructions', 'Implementation Instructions'],
          ['/guides/create-slp-faucet', 'Create your own SLP Faucet'],
	  ['/guides/add-slp-icon', 'Add an icon for your SLP Token'],    
    ]
      },
      {
        title: 'Packages',
        children: [
          ['/packages/overview', 'Overview'],
          ['/packages/slpjs', 'SLPJS'],
          ['/packages/slp-validate', 'SLP-Validate'],
          ['/packages/slp-list', 'SLP-List'],
          ['/packages/bchaddrjs-slp', 'bchaddrjs-SLP'],
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
          ['/tooling/overview', 'Overview'],
          ['/tooling/explorer', 'Explorer'],
          ['/tooling/slp-unit-test-data', 'Unit Tests'],
          {
            title: 'SLPDB',
            children: [
              ['/tooling/slpdb', 'SLPDB'],
              ['/tooling/slpdb_examples', 'SLPDB Examples'],
              ['/tooling/slpserve', 'SLPServe'],
              ['/tooling/slpsocket', 'SLPSocket'],
            ],
          },
          {
            title: 'GS++',
            children: [
              ['/tooling/gs++', 'gs++'],
              ['/tooling/gs++-cli', 'gs++-cli'],
              ['/tooling/slpstream', 'SLPStream'],
              ['/tooling/txdecoder', 'txdecoder'],
              ['/tooling/slpdecoder', 'slpdecoder'],
              ['/tooling/blockdecoder', 'blockdecoder'],
              ['/tooling/fuzz', 'fuzz'],
            ]
          },
          ['/tooling/slp-indexer', 'Bitcoin.com SLP Indexer'],
          {
            title: 'Wallets',
            children: [
              ['/tooling/wallets', 'Overview'],
              ['/tooling/ecslp', 'Electron Cash SLP'],
              ['/tooling/badger', 'Badger'],
              ['/tooling/mint', 'Mint'],
              ['/tooling/crescentcash', 'Crescent Cash'],
              ['/tooling/bitcoincomwallet', 'Bitcoin.com Wallet'],
              ['/tooling/monarch', 'Monarch'],
              ['/tooling/zapit', 'Zapit'],
            ]
          }
        ]
      },
      ['/community', 'Community'],
    ]
  },
  plugins: [
    [ "vuepress-plugin-matomo", {
      siteId: 8,
      trackerUrl: 'https://analytics.fountainhead.cash/',
    } ],
    [ '@vuepress/plugin-back-to-top', true ],
    [ '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
        headerTopOffset: 120
      }
    ],
    '@vuepress/plugin-last-updated',
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404/'
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: 'https://slp.dev'
      }
    ],
    'check-md',
    [
      'sitemap', {
        hostname: 'https://slp.dev',
      }
    ],
  ]
};
