import preprocess from "svelte-preprocess";

const config = {
  preprocess: [
    preprocess({
      postcss: true,
    }),
    // sass: {
    //   sync: true,
    //   implementation: require('sass'),
    // },
  ],
};

export default config;
