module.exports = {
  base: '/',
  dest: 'public',
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
    ['link', { rel: 'manifest', href: '/manifest.json' }],
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
    docsRepo: 'simpleledger/slp.dev',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    logo: '/logo.png',
    smoothScroll: true,

    nav: [
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
  ]
};
