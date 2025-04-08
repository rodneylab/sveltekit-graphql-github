import {
	PUBLIC_CONTACT_EMAIL,
	PUBLIC_FACEBOOK_PAGE,
	PUBLIC_GITHUB_PAGE,
	PUBLIC_LINKEDIN_PROFILE,
	PUBLIC_SITE_URL,
	PUBLIC_TELEGRAM_USERNAME,
	PUBLIC_TIKTOK_USERNAME,
	PUBLIC_TWITTER_USERNAME,
	PUBLIC_TWITTER_USER_ID,
	PUBLIC_WIRE_USERNAME,
} from '$env/static/public';

const facebookPageName = PUBLIC_FACEBOOK_PAGE;

const website = {
	author: 'Rodney Johnson',
	ogLanguage: 'en_GB',
	siteLanguage: 'en-GB',
	siteTitle: 'SvelteKit Blog Mdx',
	siteShortTitle: 'SvelteKit Blog',
	siteUrl: PUBLIC_SITE_URL,
	icon: 'static/icon.png',
	backgroundColor: '#1b4079',
	themeColor: '#d62828',
	contactEmail: PUBLIC_CONTACT_EMAIL,
	facebookPage: `https://www.facebook.com/${facebookPageName}`,
	facebookPageName,
	githubPage: PUBLIC_GITHUB_PAGE,
	linkedinProfile: PUBLIC_LINKEDIN_PROFILE,
	telegramUsername: PUBLIC_TELEGRAM_USERNAME,
	tiktokUsername: PUBLIC_TIKTOK_USERNAME,
	twitterUsername: PUBLIC_TWITTER_USERNAME,
	twitterUserId: PUBLIC_TWITTER_USER_ID,
	wireUsername: PUBLIC_WIRE_USERNAME,
};

export { website as default };
