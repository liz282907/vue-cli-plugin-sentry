# Sentry plugin for @vue/cli 3.0.

## Install
First you need to install @vue/cli globally ([follow the instructions here](https://cli.vuejs.org/)).

Then create a project and add the Sentry plugin:

```
vue create your-app
cd your-app
vue add sentry 
```
If you want to update your setting,just type `vue invoke sentry`;

You'll be asked some questions regarding how sentry/raven is configured in your project. After that, you're good to go.

## Release Guide

run `yarn release -- --release-as patch/minor/major` if you want to release the repo. 