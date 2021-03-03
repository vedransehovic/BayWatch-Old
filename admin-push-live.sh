#!/bin/sh

echo "live" > cfg_env
dir_path=$(dirname pwd)
echo "dir_path - $dir_path"
. $dir_path/admin-set-env


# if [ -z "${NODE_ENV}" ]; then
# 	echo "0 - $0"
# 	#full_path=$(realpath $0)
# 	#dir_path=$(dirname $full_path)
# 	dir_path=$(dirname pwd)
# 	echo "dir_path - $dir_path"
# 	. $dir_path/admin-set-env
# fi
if [ -z "${NODE_ENV}" ]; then
	echo ">>> ERROR: NODE_ENV NOT SET"
	return
fi

_BRANCH=$(git rev-parse --abbrev-ref HEAD)
# _BRANCH="$1"
# if [ -z "${_BRANCH}" ]; then
# 	echo "Please provide branch name"
# 	exit 1
# fi
echo ">>> LOCAL BRANCH: $_BRANCH"

_VERSION="$1"
if [ -z "${_VERSION}" ]; then
	_VERSION=$(<version)
	if [ -z "${_VERSION}" ]; then
		echo "Please provide a git commit message or 'version' file"
		return 1
	fi	
fi
echo $_VERSION > version
echo ">>> VERSION: $_VERSION"

# Add random text to cause diff w branch (for repo and docker workflow testing and no content change)
echo $RANDOM > admin-temp-mod.txt
# Make sure all scripts are executable
chmod +x *.sh
# Add all changes and commit
git add -A
git commit -a -m $_VERSION > /dev/null 2>&1
if [ $? -eq 0 ]
then
	# git push staging master
	echo ">>> PUSHING $_BRANCH TO $NODE_ENV:master"
	git push -u $NODE_ENV $_BRANCH:master
else
	echo "Error while committing. Did you forget a commit message?"
fi
