#!/bin/sh

. admin-set-env

_GITLOC=/home/baywatch-$NODE_ENV.git
cp setup/post-receive setup/admin-set-env setup/admin-hooks-clone setup/admin-hooks-docker $_GITLOC/hooks

ls -l $_GITLOC/hooks