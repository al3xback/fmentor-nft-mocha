import assert from 'assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-mocha/';
let document;

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	before(async () => {
		try {
			document = await getData();
		} catch (err) {
			console.log(err);
		}
	});

	it("should have an article element with a class of 'card'", () => {
		const articleEl = document.querySelector('article');
		const articleClass = articleEl.className;

		assert.ok(articleEl);
		assert.equal(articleClass, 'card');
	});

	it("should have two children inside of the element with a class of 'card'", () => {
		const cardEl = document.querySelector('.card');
		const cardChildrenLength = cardEl.children.length;

		assert.equal(cardChildrenLength, 2);
	});

	it('should have a card image element that has width and height attribute with each value of 302px', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgWidth = parseInt(cardImgEl.getAttribute('width'));
		const cardImgHeight = parseInt(cardImgEl.getAttribute('height'));

		assert.equal(cardImgWidth, 302);
		assert.equal(cardImgHeight, 302);
	});

	it('should have title, description, statuses, and author elements', () => {
		const cardEl = document.querySelector('.card');

		const cardTitleEl = cardEl.querySelector('.card__title');
		const cardDescEl = cardEl.querySelector('.card__desc');
		const cardStatListEl = cardEl.querySelector('.card__stats-list');
		const cardAuthorEl = cardEl.querySelector('.card__author');

		assert.ok(cardTitleEl);
		assert.ok(cardDescEl);
		assert.ok(cardStatListEl);
		assert.ok(cardAuthorEl);
	});

	it("should have a title element that contains 'Equilibrium' word", () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent.trim();

		assert.match(cardTitle, /Equilibrium/);
	});

	it("should have a description element that contains 'Our Equilibrium' word", () => {
		const cardDescEl = document.querySelector('.card__desc');
		const cardDesc = cardDescEl.textContent.trim();

		assert.match(cardDesc, /Our Equilibrium/);
	});

	it('should have two card status list item elements', () => {
		const cardStatListEl = document.querySelector('.card__stats-list');
		const cardStatListChildrenLength = cardStatListEl.children.length;

		assert.equal(cardStatListChildrenLength, 2);
	});

	it('should not have an author name element with a single name', () => {
		const cardAuthorEl = document.querySelector('.card__author');
		const cardAuthorName =
			cardAuthorEl.querySelector('.btn--link').textContent;
		const cardAuthorWordNameLength = cardAuthorName
			.trim()
			.split(' ').length;

		assert.notEqual(cardAuthorWordNameLength, 1);
	});
});
