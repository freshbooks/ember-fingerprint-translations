# Ember Finger Print translations

This addon builds a map of fingerprinted translation files.

It's usefull when dynamically sideloading translations from the /public folder 

Assuming that you already have a translation fetcher service with the following API

Assuming that you have the following translation file:

/public/translations/en/upgrade/errors.json
```
{
  "4012": "Wrong credentials"
}

And a translation fetcher service with a similar API

```
// Fetch the translation located at `/translations/${i18n.get('locale')}/upgrade/errors.json`
translationService.fetch('upgrade.errors');-

```

You can use the TranslationMap service provided by this plugin to find the fingerprinted path
associated to this asset.
