<script>
	import '$lib/styles/normalise.css';
	import '$lib/styles/index.scss';

	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/fira-sans/400.css';

	import { COPYRIGHT_ENTITY } from '$lib/constants/entities';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import FacebookIcon from '$lib/components/Icons/Facebook.svelte';
	import GitHubIcon from '$lib/components/Icons/GitHub.svelte';
	import LinkedinIcon from '$lib/components/Icons/LinkedIn.svelte';
	import RodneyLabCredit from '$lib/components/RodneyLabCredit.svelte';
	import TiktokIcon from '$lib/components/Icons/Tiktok.svelte';
	import XIcon from '$lib/components/Icons/X.svelte';
	import website from '$lib/config/website';

	const { facebookPage, githubPage, linkedinProfile, tiktokUsername, twitterUsername } = website;
</script>

<main>
	<slot />
</main>
<footer class="footer-container">
	<div>
		Created by <a
			aria-label="Open the Rodney Lab site"
			href="https://rodneylab.com/"
			target="_blank"
			rel="noopener noreferrer">Rodney Lab</a
		>. Copyright {COPYRIGHT_ENTITY} 2021&thinsp;&ndash;&thinsp;2024.
	</div>
	<nav class="footer-icons">
		<ul>
			<li class="hover-jump">
				<ExternalLink
					ariaLabel="Go to the Rodney Lab Tik Tok Page"
					href={`https://www.tiktok.com/${tiktokUsername}`}><TiktokIcon /></ExternalLink
				>
			</li>
			<li class="hover-jump">
				<ExternalLink ariaLabel="Go to the Rodney Lab Facebook Page" href={facebookPage}
					><FacebookIcon /></ExternalLink
				>
			</li>
			<li class="hover-jump">
				<ExternalLink
					ariaLabel="Go to the Rodney Lab X Page"
					href={`https://x.com/intent/user?screen_name=${twitterUsername}`}><XIcon /></ExternalLink
				>
			</li>
			<li class="hover-jump">
				<ExternalLink
					ariaLabel="Go to the Rodney Lab Linked In Page"
					href={`https://uk.linkedin.com/in/${linkedinProfile}`}><LinkedinIcon /></ExternalLink
				>
			</li>
			<li class="hover-jump">
				<ExternalLink
					ariaLabel="Go to the Rodney Lab Git Hub In Page"
					href={`https://github.com/${githubPage}`}><GitHubIcon /></ExternalLink
				>
			</li>
		</ul>
	</nav>
	<RodneyLabCredit />
</footer>

<style lang="scss">
	.footer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: variables.$max-width-wrapper;
		margin: variables.$spacing-12 auto variables.$spacing-0;
		width: 100%;
	}

	.footer-icons {
		display: flex;
		list-style-type: none;

		ul {
			display: flex;
			margin: variables.$spacing-6 variables.$spacing-0;

			li {
				display: flex;
				margin: variables.$spacing-0 variables.$spacing-4 variables.$spacing-0 variables.$spacing-0;
			}
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hover-jump {
			transition: all 0.25s ease-in-out;
		}
	}

	.hover-jump:focus,
	.hover-jump:hover {
		transform: translateY(-1 * variables.$spacing-2);
	}
</style>
