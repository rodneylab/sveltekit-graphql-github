<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';

	let { data } = $props();

	dayjs.extend(relativeTime);

	const { login: user, repositories: repoNodes } = data.data.viewer;
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

		{#each repos as repo, index}
			<article aria-posinset={index + 1} aria-setsize={repoCount} class="repo">
				<h2>
					{repo.name}
				</h2>
				<span>
					<span class="meta">Updated {fromNow(repo.pushedAt)}</span>
					{#if repo.stargazerCount > 0}<span class="meta stars">🌟 {repo.stargazerCount}</span>{/if}
				</span>
				{#if repo.description != null}
					<p><a href={`https://github.com/${repo.resourcePath}`}>{repo.description}</a></p>
				{/if}
			</article>
		{:else}
			<p>No repos found :/</p>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		background: variables.$color-theme-4;
		border: solid variables.$color-theme-3 variables.$spacing-px;
		border-radius: variables.$spacing-1;
		width: 70%;
		margin: variables.$spacing-12 auto;
		padding: variables.$spacing-2 variables.$spacing-4;

		p {
			font-size: variables.$font-size-2;
			margin-top: variables.$spacing-8;
		}
	}

	.heading {
		color: variables.$color-theme-3;
	}

	.content {
		margin: variables.$spacing-12;
		color: variables.$color-theme-3;
	}

	.repo {
		border: solid variables.$color-theme-3 variables.$spacing-px;
		border-radius: variables.$spacing-1;
		background-color: variables.$color-theme-5;
		margin: variables.$spacing-6 variables.$spacing-0;
		padding: variables.$spacing-4;
		color: variables.$color-theme-3;

		h2 {
			margin-top: variables.$spacing-0;
			margin-bottom: variables.$spacing-4;
			color: variables.$color-theme-3;
			font-size: variables.$font-size-4;
		}

		.stars {
			font-weight: variables.$font-weight-bold;
		}
	}

	.meta {
		font-size: variables.$font-size-1;
		background-color: variables.$color-theme-3;
		color: variables.$color-theme-4;
		padding: variables.$spacing-1 variables.$spacing-2;
		border-radius: variables.$spacing-1;
	}

	.repo:focus,
	.repo:hover {
		background-color: variables.$color-theme-3;
		color: variables.$color-theme-5;

		h2 {
			color: variables.$color-theme-5;
		}

		a {
			color: variables.$color-theme-4;
		}

		.meta {
			border: solid variables.$color-theme-4 variables.$spacing-px;
			padding: #{variables.$spacing-1 - variables.$spacing-px} /* prettier-ignore */
				#{variables.$spacing-2 - variables.$spacing-px};
		}
	}

	@media screen and (max-width: variables.$desktop-breakpoint) {
		.container {
			width: 95%;
		}

		.content {
			margin: variables.$spacing-12 variables.$spacing-2;
		}

		.repo {
			margin: variables.$spacing-10 variables.$spacing-0;
		}
	}
</style>
