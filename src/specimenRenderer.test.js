import test from 'ava'
import { readFileSync } from 'fs'
import blockRenderer from './blockRenderer'
import specimenRenderer from './specimenRenderer'

test('Nothing is rendered for a specimen without blocks', t => {
	const specimen = {
		name: 'specimen-name',
		blocks: [],
	}
	const expectedHtml = readFileSync(`${__dirname}/specimenRenderer-test-cases/no-blocks.html`, { encoding: 'utf8' })

	t.is(specimenRenderer(specimen, { blockRenderer }), expectedHtml)
})

test('Specimen blocks for HTML, CSS, and JS are rendered', t => {
	const specimen = {
		name: 'specimen-name',
		blocks: [
			{ language: 'html', executableContent: '<b>html content</b>' },
			{ language: 'css', executableContent: 'b { color: red }' },
			{ language: 'css', executableContent: 'b { color: green }' },
			{ language: 'js', executableContent: `var foo = 'foo'` },
			{ language: 'js', executableContent: `var bar = 'bar'` },
		],
	}
	const expectedHtml = readFileSync(`${__dirname}/specimenRenderer-test-cases/blocks.html`, { encoding: 'utf8' })

	t.is(specimenRenderer(specimen, { blockRenderer }), expectedHtml)
})
