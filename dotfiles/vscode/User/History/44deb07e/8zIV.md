### approach

- too much noise from 3rd-party trackers, so i've started using the NO TRACKERS pages, in DebugBear (these scores are ~30+ points higher, in the 60's)
- first goal is to get THIS SCORE to 80 (outlined below)
- afterwards we can weigh "archi improvements" vs meeting with marketing about 3rd-party trackers

### unused js

- largest problem is "unused javascript", but this mostly seems like an architecture issue. fixable, but not "low hanging".
- affirm is loaded on the homepage. defer it.

### images

- some of our images are very large. shrink+compress them.
- ensure width & height are set
- lazy load & defer off-screen images

### media

- some of our audio & video clips (on the homepage) are loaded straight from aws. instead, load them from cloudfront.
- we load our video 3 times, on the homepage. why?
- can we lazy load, like images?
- can we shrink them?

### font

- we load AkkuratLL "regular" twice. why?
- re-evaluate the font loading (and preloading) we have

### loading

- anything else we can preload? maybe a strategy to make this easier?

### 3rd-party trackers

- can we try disabling some individual trackers in staging, to find the biggest offenders?
  - example: fb lightbox is a big offender (uses "document.write" & loads css). it fires on "all pages", but i think that's not necessary. can we work with marketing?
- should we remove "prefetch" for GTM? maybe counter-intuitive, but maybe the longer we delay GTM, the better (for our users, but not for marketing)
