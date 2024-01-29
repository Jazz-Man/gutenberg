/**
 * WordPress dependencies
 */
import { isBlobURL } from '@gutenberg/blob';

/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';

_.isEmpty( isBlobURL( '' ) );
