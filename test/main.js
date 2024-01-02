import assert from 'assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-flex/';

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
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
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
		const cardEl = document.querySelector('.card');
		const cardImageEl = cardEl.querySelector('.card__image img');
		const cardImageWidth = parseInt(cardImageEl.getAttribute('width'));
		const cardImageHeight = parseInt(cardImageEl.getAttribute('height'));

		assert.equal(cardImageWidth, 302);
		assert.equal(cardImageHeight, 302);
	});

	it('should have title, description, statuses, and author elements', () => {
		const cardEl = document.querySelector('.card');

		const cardTitleEl = cardEl.querySelector('.card__title');
		const cardDescEl = cardEl.querySelector('.card__desc');
		const cardStatusListEl = cardEl.querySelector('.card__stats-list');
		const cardAuthorEl = cardEl.querySelector('.card__author');

		assert.ok(cardTitleEl);
		assert.ok(cardDescEl);
		assert.ok(cardStatusListEl);
		assert.ok(cardAuthorEl);
	});

	it("should have a title element that contains 'Equilibrium' word", () => {
		const cardEl = document.querySelector('.card');

		const cardTitleEl = cardEl.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent;

		assert.match(cardTitle, /Equilibrium/);
	});

	it("should have a description element that contains 'Our Equilibrium' word", () => {
		const cardEl = document.querySelector('.card');

		const cardDescEl = cardEl.querySelector('.card__desc');
		const cardDesc = cardDescEl.textContent.trim();

		assert.match(cardDesc, /Our Equilibrium/);
	});

	it('should have two card statuses elements', () => {
		const cardEl = document.querySelector('.card');

		const cardStatusListEl = cardEl.querySelector('.card__stats-list');
		const cardStatusListChildrenLength = cardStatusListEl.children.length;

		assert.equal(cardStatusListChildrenLength, 2);
	});

	it('should not have an author name element with a single name', () => {
		const cardEl = document.querySelector('.card');

		const cardAuthorEl = cardEl.querySelector('.card__author');
		const cardAuthorName =
			cardAuthorEl.querySelector('.btn--link').textContent;
		const cardAuthorWordNameLength = cardAuthorName
			.trim()
			.split(' ').length;

		assert.notEqual(cardAuthorWordNameLength, 1);
	});
});
