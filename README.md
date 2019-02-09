Service Publisher
=================

## What does this do?

This node JS electron app is designed to be used to download video from an ftp server,
encode it with adobe media encoder, then upload to any number of other ftp servers.

It also encodes audio recorded locally with media encoder and also uploads it.

## Changing settings

All of the settings can be found in settings.json there is also a UI for the settings, 
but doesn't yet work for the upload servers thease have to be manually added.

## Installing everything
`npm install`

## Debugging
Debug logs can be found in ./logs/debug.log