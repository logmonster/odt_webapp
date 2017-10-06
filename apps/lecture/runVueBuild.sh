# testing the initial trial
#browserify -t vueify -e public/clientView/testVue/main.js -o public/clientView/testVue/build/build.js

# lectureHome
browserify -t vueify -e public/clientView/lectureHome.js -o public/clientView/build/build-lectureHome.js
#browserify -t vueify -e public/clientView/lectureNavigator.js -o public/clientView/build/build-lectureNavigator.js
browserify -t vueify -e public/clientView/lectureContainer.js -o public/clientView/build/build-lectureContainer.js
