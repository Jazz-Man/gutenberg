/**
 * External dependencies
 */
import memize from 'memize';

/**
 * Shortcode attributes object.
 */
export type WPShortcodeAttrs = {
	named: Record<string, string>;
	numeric: string[];
};

export type ShortcodeOptions = {
	tag?: string;
	attrs?: WPShortcodeAttrs | string | string[];
	type?: 'single' | 'self-closing' | 'closed';
	content?: string;
};

/**
 * Shortcode object.
 */
export type WPShortcode = InstanceType<typeof shortcode>;

/**
 * Matched information for a shortcode.
 */
export type WPShortcodeMatch = {
	index: number;
	content: string;
	shortcode: WPShortcode;
};

/**
 * Find the next matching shortcode.
 * @param tag
 * @param text
 * @param index
 */
export function next(
	tag: string,
	text: string,
	index = 0
): WPShortcodeMatch | undefined {
	const re = regexp(tag);

	re.lastIndex = index;

	const match = re.exec(text);

	if (!match) {
		return;
	}

	if ('[' === match[1] && ']' === match[7]) {
		return next(tag, text, re.lastIndex);
	}

	const result: WPShortcodeMatch = {
		index: match.index,
		content: match[0],
		shortcode: fromMatch(match),
	};

	if (match[1]) {
		result.content = result.content.slice(1);
		result.index++;
	}

	if (match[7]) {
		result.content = result.content.slice(0, -1);
	}

	return result;
}

/**
 * Replace matching shortcodes in a block of text.
 * @param tag
 * @param text
 * @param callback
 */
export function replace(
	tag: string,
	text: string,
	callback: (match: any) => string
): string {
	return text.replace(
		regexp(tag),
		(match, left, _tag, _attrs, _slash, _content, _closing, right) => {
			if (left === '[' && right === ']') {
				return match;
			}

			const result = callback(fromMatch(arguments));

			return result || result === '' ? left + result + right : match;
		}
	);
}

/**
 * Generate a string from shortcode parameters.
 * @param options
 * @param options.tag
 * @param options.attrs
 * @param options.type
 * @param options.content
 */
export function string(options: {
	tag: string;
	attrs?: string | WPShortcodeAttrs;
	type?: 'self-closing' | 'closed' | 'single';
	content?: string;
}): string {
	return new shortcode(options).string();
}

/**
 * Generate a RegExp to identify a shortcode.
 * @param tag
 */
export function regexp(tag: string): RegExp {
	return new RegExp(
		'\\[(\\[?)(' +
			tag +
			')(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)',
		'g'
	);
}

/**
 * Parse shortcode attributes.
 */
export const attrs = memize((text: string): WPShortcodeAttrs => {
	const named: Record<string, string> = {};
	const numeric: string[] = [];

	const pattern =
		/([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g;

	text = text.replace(/[\u00a0\u200b]/g, ' ');

	let match;

	while ((match = pattern.exec(text))) {
		if (match[1]) {
			named[match[1].toLowerCase()] = match[2];
		} else if (match[3]) {
			named[match[3].toLowerCase()] = match[4];
		} else if (match[5]) {
			named[match[5].toLowerCase()] = match[6];
		} else if (match[7]) {
			numeric.push(match[7]);
		} else if (match[8]) {
			numeric.push(match[8]);
		} else if (match[9]) {
			numeric.push(match[9]);
		}
	}

	return { named, numeric };
});

/**
 * Generate a Shortcode Object from a RegExp match.
 * @param match
 */
export function fromMatch(match: any): WPShortcode {
	let type: 'self-closing' | 'closed' | 'single';

	if (match[4]) {
		type = 'self-closing';
	} else if (match[6]) {
		type = 'closed';
	} else {
		type = 'single';
	}

	return new shortcode({
		tag: match[2],
		attrs: match[3],
		type,
		content: match[5],
	});
}

export default class shortcode {
	tag: string | undefined;
	attrs: WPShortcodeAttrs;

	type: 'single' | 'self-closing' | 'closed' | undefined;
	content: string | undefined;

	constructor(options?: ShortcodeOptions) {
		this.tag = options?.tag;
		this.type = options?.type;
		this.content = options?.content;

		this.attrs = {
			named: {},
			numeric: [],
		};

		if (options?.attrs) {
			if (typeof options.attrs === 'string') {
				this.attrs = attrs(options.attrs);
			} else {
				Object.entries(options.attrs).forEach(([key, value]) => {
					this.set(key, value);
				});
			}
		}
	}

	get(attr: number | string): string {
		if (typeof attr === 'number') {
			return this.attrs.numeric[attr];
		}

		return this.attrs.named[attr];
	}

	set(attr: number | string, value: string): shortcode {
		if (typeof attr === 'number') {
			this.attrs.numeric[attr] = value;
		} else {
			this.attrs.named[attr] = value;
		}

		return this;
	}

	string(): string {
		let text = `[${this.tag}`;

		text += this.attrs.numeric
			.map((value: string) =>
				/\s/.test(value) ? ` "${value}"` : ` ${value}`
			)
			.join('');

		text += Object.entries(this.attrs.named)
			.map(([name, value]) => ` ${name}="${value}"`)
			.join('');

		if (this.type === 'single') {
			return `${text}]`;
		} else if (this.type === 'self-closing') {
			return `${text} /]`;
		}

		text += ']';

		if (this.content) {
			text += this.content;
		}

		return `${text}[/${this.tag}]`;
	}
}
