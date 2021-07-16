<script context="module">
	export const prerender = true;
	export async function load({ fetch }) {
		const url = '/query/repositories.json';
		const res = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				limit: 5
			})
		});
		const { data } = await res.json();
		if (res.ok) {
			return {
				props: { data }
			};
		}

		return {
			status: res.status,
			error: new Error(`Couldn't load ${url}`)
		};
	}
</script>

<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	export let data;

	dayjs.extend(relativeTime);

	const { login: user, repositories: repoNodes } = data.viewer;
	const { nodes: repos } = repoNodes;
	const repoCount = repos.length;

	const fromNow = (date) => {
		const daysJSDate = dayjs(date);
		return daysJSDate.fromNow();
	};
</script>

<div class="container">
	<div class="content">
		<h1 class="heading">{`${user}'s GitHub`}</h1>

		{#if repoCount > 0}
			{#each repos as repo, index}
				<article aria-posinset={index + 1} aria-setsize={repoCount} class="repo">
					<h2>
						{repo.name}
					</h2>
					<span>
						<span class="meta">Updated {fromNow(repo.pushedAt)}</span>
						{#if repo.stargazerCount > 0}<span class="meta stars">🌟 {repo.stargazerCount}</span
							>{/if}
					</span>
					{#if repo.description != null}
						<p><a href={`https://github.com/${repo.resourcePath}`}>{repo.description}</a></p>
					{/if}
				</article>
			{/each}
		{:else}
			<p>No repos found :/</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		background: $color-theme-4;
		border: solid $color-theme-3 $spacing-px;
		border-radius: $spacing-1;
		margin: 0;
		width: 70%;
		margin: $spacing-12 auto;
		padding: $spacing-2 $spacing-4;

		p {
			font-size: $font-size-2;
			margin-top: $spacing-8;
		}
	}
	.heading {
		color: $color-theme-3;
	}

	.content {
		margin: $spacing-12;
		color: $color-theme-3;
	}

	.repo {
		border: solid $color-theme-3 $spacing-px;
		border-radius: $spacing-1;
		background-color: $color-theme-5;
		margin: $spacing-6 $spacing-0;
		padding: $spacing-4;
		color: $color-theme-3;

		h2 {
			margin-top: $spacing-0;
			margin-bottom: $spacing-4;
			color: $color-theme-3;
			font-size: $font-size-4;
		}

		.stars {
			font-weight: $font-weight-bold;
		}
	}

	.repo:hover {
		background-color: $color-theme-3;
		color: $color-theme-5;

		h2 {
			color: $color-theme-5;
		}

		a {
			color: $color-theme-4;
		}

		.meta {
			border: solid $color-theme-4 $spacing-px;
			padding: #{$spacing-1 - $spacing-px} #{$spacing-2 - $spacing-px};
		}
	}

	.meta {
		font-size: $font-size-1;
		background-color: $color-theme-3;
		color: $color-theme-4;
		padding: $spacing-1 $spacing-2;
		border-radius: $spacing-1;
	}

	@media screen and (max-width: $desktop-breakpoint) {
		.container {
			width: 95%;
		}
		.content {
			margin: $spacing-12 $spacing-2;
		}
		.repo {
			margin: $spacing-10 $spacing-0;
		}
	}
</style>
