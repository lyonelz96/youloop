npx browserify './src/content_scripts/main.js' -p esmify -o './src/content_scripts/bundle.js'
npx browserify './src/page_action/popup/main.js' -p esmify -o './src/page_action/popup/bundle.js'
