/**
 * Abstracts the initial page test through the corresponding toContainHomePageObject
 */
expect.extend({
  toContainHomePageObject(received: Object) {

    const pass = this.equals(
      received,
      expect.objectContaining({
        posts: expect.arrayContaining([
          expect.objectContaining({
            // link: "https://gizmodo.uol.com.br/twitter-limitar-quem-pode-responder-tuites/"
            link: expect.stringContaining('://'),
            // titulo: "↵			Twitter permitirá que usuários limitem quem pode responder aos seus tuítes↵								"
            title: expect.stringMatching(/\w/),
            // thumb: "https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2019/10/twitter-getty-800x450.jpg"
            thumb: expect.stringContaining('://'),
            // preview: "↵				O Twitter está testando uma função para limitar quais usuários podem responder aos seus tuítes. Serão quatro opções, que devem ser liberadas ainda neste ano.↵			"
            // preview: expect.stringMatching(/\w/),
            // date: "9 de janeiro de 2020 @ 10:17"
            created_at: expect.any(Date),
          }),
        ]),
      })
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
 * Abstract test of full post page through the correspondent toContainPostDetailsObject
 */
expect.extend({
  toContainPostObject(received: Object) {

    const pass = this.equals(
      received,
      expect.objectContaining({
        link: expect.stringContaining('://'),
        title: expect.stringMatching(/\w/),
        thumb: expect.stringContaining('://'),
        created_at: expect.any(Date),
        contents: expect.arrayContaining([
          expect.objectContaining({
            type: expect.stringMatching(/\w/),
            value: expect.stringMatching(/\w/),
          })
        ])
      })
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
