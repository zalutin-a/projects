module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ["./src/**/*.{html,js,tsx}", "./public/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'angular': "url('../public/icons/angular.png')",
        'typescript': "url('../public/icons/typescript.png')",
        'css': "url('../public/icons/css.png')",
        'git': "url('../public/icons/git.png')",
        'github': "url('../public/icons/github.png')",
        'html': "url('../public/icons/html.png')",
        'js': "url('../public/icons/js.png')",
        'react': "url('../public/icons/react.png')",
        'sass': "url('../public/icons/sass.png')",
        'tailwind': "url('../public/icons/tailwind.png')",
        'vscode': "url('../public/icons/vscode.png')",
        'nodejs': "url('../public/icons/nodejs.png')",
      },
      colors: {
        'app': {
          orange: '#FF6A00',
          red: '#F5315D',
          gray: {
            300: '#e8e6ef',
            500: '#A7A4C5',
            700: '#837FA3',
            800: '#3E4050',
          },
          blue: {
            300: '#009FFF',
            500: '#545FFF',
            800: '#2F2B54',
          },
          dark: '#151B33'
        }
      },
      gridTemplateColumns: {
        'pages': '110px 250px minmax(auto,auto) minmax(100px,13%) minmax(65px,8%)',
        'statements': '110px minmax(auto,auto) minmax(100px,23%) minmax(65px,8%)',
        'categories': '35px minmax(auto,auto) minmax(65px,8%)',
        'calendar': '12% 12% 12% 12% 12% 12% 12%'
      }
    },
    fontFamily: {
      'head': ['Inter','Roboto', "cursive", 'sans-serif'],
      'body': ['Roboto','Inter','sans-serif'],
    },
    dropShadow: {
      'rounded': '0px 0px 10px rgba(0, 0, 0, 0.27)',
    },
  },
  plugins: [],
};