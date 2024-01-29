/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@gutenberg/blob';

isEmpty( isBlobURL( '' ) );
