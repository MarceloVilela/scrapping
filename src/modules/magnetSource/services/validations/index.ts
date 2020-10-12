/**
 * Abstracts the initial page test through the corresponding toContainMagnetResults
 */
expect.extend({
  toContainMagnetResults(received: Object) {
    const pass = this.equals(
      received,
      expect.arrayContaining([
        expect.objectContaining({
          link: expect.stringMatching(/(:\/\/)|(magnet:\?)/),
          name: expect.stringMatching(/\w/),
          size: expect.stringMatching(/\d{1,}.?,?\d{1,}?\s(KB|MB|GB|KiB|MiB|GiB)/),
          seeds: expect.any(Number),
          leech: expect.any(Number),
          engine_url: expect.stringMatching(/\w/),
          desc_link: expect.stringContaining('://'),
        }),
      ]),
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${this.utils.printReceived(
          received
        )} to contain object`,
      pass: false,
    };
  },
});

/**
 * Abstracts the initial page test through the corresponding toContainMagnetAnswers
 */
expect.extend({
  toContainMagnetAnswers(received: Object, argument: Object) {
    const pass = this.equals(
      received,
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching(/\w/),
          thumb: expect.stringContaining('://'),
          links: expect.arrayContaining([
            expect.objectContaining({
              url: expect.stringMatching(/magnet/),
              text: expect.stringMatching(/\w/),
              type: expect.stringMatching(/\w/),
            }),
          ]),
          engine_url: expect.stringMatching(/\w/),
          desc_link: expect.stringContaining('://'),
        }),
      ]),
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object`,
        pass: true,
      };
    }
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          received
        )} to contain object`,
      pass: false,
    };
  },
});
