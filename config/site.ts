export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'mannazu',
  description: 'Travel to make Friend! 😁',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Mobile',
      href: '/posts/mobile',
    },
    {
      label: 'Desktop',
      href: '/posts/desktop',
    },
    {
      label: 'Community',
      href: '/community',
    },
    {
      label: 'Shop',
      href: '/shop',
    },
  ],
  navMenuItems: [
    {
      label: 'Posts',
      href: '/posts/mobile',
    },
    {
      label: 'Community',
      href: '/community',
    },
    {
      label: 'Shop',
      href: '/shop',
    },
    {
      label: 'Profile',
      href: '/users/profile',
    },
    {
      label: 'Settings',
      href: '/users/',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/mannazo',
    // twitter: 'https://twitter.com/getnextui',
    // docs: 'https://nextui.org',
    // discord: 'https://discord.gg/9b6yyZKmH4',
    // sponsor: 'https://patreon.com/jrgarciadev',
  },
}
