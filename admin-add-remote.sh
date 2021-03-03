#!/bin/bash
git remote rm staging > /dev/null 2>&1
git remote rm live > /dev/null 2>&1
git remote add staging baywatch-origin:/home/baywatch-staging.git
git remote add live baywatch-origin:/home/baywatch-live.git
