<script>
	import '@sveltejs/site-kit/base.css';
	import { page, navigating } from '$app/stores';
	import { Icons, Nav, NavItem, PreloadingIndicator } from '@sveltejs/site-kit';
	import icon_svelte from '@sveltejs/site-kit/icons/svelte.svg';
	import icon_github from '@sveltejs/site-kit/icons/github.svg';

	$: segment = $page.path.split('/').pop();
</script>

<Icons />

{#if $navigating}
	<PreloadingIndicator />
{/if}

<Nav {segment} {page} logo="/svelte-cubed-horizontal.svg">
	<svelte:fragment slot="nav-center">
		<NavItem segment="/docs/introduction">Docs</NavItem>
		<NavItem segment="/examples">Examples</NavItem>
	</svelte:fragment>

	<svelte:fragment slot="nav-right">
		<!-- <NavItem external="https://svelte.dev/chat" title="Discord Chat">
			<img width="20px" src="/icons/discord.svg" alt="Open Discord chat" />
		</NavItem> -->

		<NavItem external="https://github.com/rich-harris/svelte-cubed" title="GitHub Repo">
			<img width="20px" src={icon_github} alt="Open Svelte GitHub page" />
		</NavItem>

		<NavItem external="https://svelte.dev/" title="Svelte Homepage">
			<img width="20px" src={icon_svelte} alt="Open Svelte page" />
		</NavItem>
	</svelte:fragment>
</Nav>

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		margin: 0 auto;
		padding: var(--nav-h) 0 0 0;
		overflow-x: hidden;
		min-height: 100vh;
	}
</style>
