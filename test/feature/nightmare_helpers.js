import Nightmare from 'nightmare';

Nightmare.action('clickOnElementContaining', function (selector, text, done) {
  this.evaluate_now(function (selector, text) {
    document.activeElement.blur();

    const found = [];
    const downcaseText = text.toLowerCase();
    document.querySelectorAll(selector).forEach((element) => {
      if (element.innerText.toLowerCase().indexOf(downcaseText) >= 0) {
        found.push(element);
      }
    });

    if (found.length < 1) {
      throw new Error(`Unable to find element by selector ${selector} containing text: ${text}`);
    }

    const event = document.createEvent('MouseEvent');
    event.initEvent('click', true, true);
    found[0].dispatchEvent(event);
  }, done, selector, text);
});

Nightmare.action('mouseDownUpOnElement', function (selector, done) {
  this.evaluate_now(function (selector,) {
    document.activeElement.blur();

    const found = document.querySelector(selector);
    if (!found) {
      throw new Error(`Unable to find element by selector ${selector}`);
    }

    const events = ['mousedown', 'mouseup'];

    events.forEach(function (type) {
      const event = document.createEvent('MouseEvent');
      event.initEvent(type, true, true);
      found.dispatchEvent(event);
    });

  }, done, selector,);
});

Nightmare.action('mouseDownUpOnElementContaining', function (selector, text, done) {
  this.evaluate_now(function (selector, text) {
    document.activeElement.blur();

    const found = [];
    const downcaseText = text.toLowerCase();
    document.querySelectorAll(selector).forEach((element) => {
      if (element.innerText.toLowerCase().indexOf(downcaseText) >= 0) {
        found.push(element);
      }
    });

    if (found.length < 1) {
      throw new Error(`Unable to find element by selector ${selector} containing text: ${text}`);
    }

    const events = ['mousedown', 'mouseup'];

    events.forEach(function (type) {
      const event = document.createEvent('MouseEvent');
      event.initEvent(type, true, true);
      found[0].dispatchEvent(event);
    });

  }, done, selector, text);
});
