
clean: clean_env

deps: build_env

release-android:
	cd android; GRADLE_OPTS="-Xmx250m -Xms250m" ./gradlew assembleRelease

clean_env:
	rm -rf node_modules

build_env:
	yarn install
