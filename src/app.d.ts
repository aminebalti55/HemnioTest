// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
	  // interface Error {}
	  // interface Locals {}
	  // interface PageData {}
	  // interface PageState {}
	  // interface Platform {}
	}
  }
  
  declare module 'svelte-swipeable';

  declare module "*.svelte" {
	const component: any;
	export default component;
  }
  
  declare module "svelte-icons/fa" {
	export { Icon as default } from 'svelte-icons/fa';
  }
  
  
  export {};
  