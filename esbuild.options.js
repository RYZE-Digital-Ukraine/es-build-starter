const devMode = process.env.ESBUILD_DEV === "true" || false,
  URL = null, // if use different server (e.g. OpenServer)
  smartGrid = false,
  base = "./build",
  paths = {
    src: `${base}/src`,
    dist: `${base}/dist`,
    getJS() {
      return {
        src: `${this.src}/js/`,
        dist: `${this.dist}/js/`,
      };
    },
    getCSS() {
      return {
        src: `${this.src}/css/`,
        dist: `${this.dist}/css/`,
      };
    },
    getFonts() {
      return {
        src: `${this.src}/fonts/`,
        dist: `${this.dist}/fonts/`,
      };
    },
    getImgs() {
      return {
        src: `${this.src}/imgs/`,
        dist: `${this.dist}/imgs/`,
      };
    },
    getViews() {
      return {
        src: `${this.src}/views/`,
        dist: `${this.dist}/`,
      };
    },
  },
  utils = {
    isJson(str) {
      try {
        JSON.parse(str);
      } catch (error) {
        return false;
      }
      return true;
    },
  },
  settings = {
    inlineCSS: false,
    support: ["chrome58", "firefox57", "safari11", "edge16"],
    smartGrid: {
      filename: "_grid",
      outputStyle: "scss" /* less || scss || sass || styl */,
      columns: 12 /* number of grid columns */,
      offset: "30px" /* gutter width px || % || rem */,
      mobileFirst: true /* mobileFirst ? 'min-width' : 'max-width' */,
      container: {
        maxWidth: "1200px" /* max-width оn very large screen */,
        fields: "30px" /* side fields */,
      },
      breakPoints: {
        lg: {
          width: "1100px" /* -> @media (max-width: 1100px) */,
        },
        md: {
          width: "960px",
        },
        sm: {
          width: "780px",
          fields:
            "15px" /* set fields only if you want to change container.fields */,
        },
        xs: {
          width: "560px",
        },
        /*
          We can create any quantity of break points.

          some_name: {
              width: 'Npx',
              fields: 'N(px|%|rem)',
              offset: 'N(px|%|rem)'
          }
          */
      },
    },
  };

export {
  devMode,
  URL,
  base,
  paths,
  utils,
  settings,
  smartGrid
};
