/**
 * Signadot plugin configuration
 *
 * @public
 */
export interface Config {
	/**
	 * Configuration options for the signadot plugin
	 */
	signadot: {
		/**
		 * The base URL of your Signadot API
		 * @visibility frontend
		 */
		apiUrl: string;

		/**
		 * Organization name
		 * @visibility frontend
		 */
		org: string;

		/**
		 * API key
		 * @visibility frontend
		 */
		apiKey: string;
	};
}
