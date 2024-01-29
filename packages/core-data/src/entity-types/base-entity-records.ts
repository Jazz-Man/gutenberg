/**
 * This module exists solely to make the BaseEntityRecords namespace extensible
 * with declaration merging:
 *
 * ```ts
 * declare module './base-entity-records' {
 *     export namespace BaseEntityRecords {
 * 		     export interface Comment< C extends Context > {
 * 		         id: number;
 * 		         // ...
 * 	       }
 * 	   }
 * }
 * ```
 *
 * The huge upside is that consumers of @gutenberg/core-data may extend the
 * exported data types using interface merging as follows:
 *
 * ```ts
 * import type { Context } from '@gutenberg/core-data';
 * declare module '@gutenberg/core-data' {
 *     export namespace BaseEntityRecords {
 *         export interface Comment< C extends Context > {
 *             numberOfViews: number;
 *         }
 *     }
 * }
 *
 * import type { Comment } from '@gutenberg/core-data';
 * const c : Comment< 'view' > = ...;
 *
 * // c.numberOfViews is a number
 * // c.id is still present
 * ```
 */
export namespace BaseEntityRecords {}
