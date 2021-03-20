# Passkit Visual Designer

This is a project that aims to make Apple Wallet design phase easier through a simple but complete user interface.

## Designing flow

While creating an Apple Wallet Pass, the generation is not the step that matters the most, but your idea before creating it. So having an idea of colors, texts, translations and so on is very important, also due to a matter of branding.

So the designing flow for Apple Wallet passes _passes_ through this: Design, Approval, Generation.

If, from the perspective of generation, several libraries and proprietary implementations already exist, really a few websites or tools for design already exist... and they are definitely not open-source.

That's what PKVD was born for: to attempt emulating the behavior of Apple Wallet before the on-device tests happen.

## Technical limitations and emulation

Since what has been created is just an emulation, what happens is that few things might not appear as they really appear on Apple Wallet. If you discover any issues like these, please open an issue by attaching:

- the image of how it shows up in the website
- the image of how it shows up in Apple Wallet
- The pass itself (without manifest and signature)

So the behavior can be tested and fixed.

Some limitations might instead regard the platform the website is running on. One of the examples is color-fidelty.
Apple Wallet uses a color scheme called [Display-P3](https://en.wikipedia.org/wiki/DCI-P3), which is widely available in native applications, [but not yet available in browsers](https://caniuse.com/css-color-function).
For this reason, some colors might result less brighter or just different.

At the time of writing, only Safari supports this color scheme and, for this reason, it makes no sense to work with it.

It is also known that, currently, Apple Wallet applies a really small gradient on the background color, which changes color perception and which seems to be different from color to color. I've been able to find no details on how this gradient is composed.

## What does expect us the future?

I don't know what the future reserves for you, but I know for sure which are the ideas that will be implemented in the project:

- [ ] Offline website (it already doesn't require a connection to work);
- [ ] Apple Watch view mode emulation (requires me to buy an Apple Watch first);
- [ ] Notification server testing with live changes;
- [ ] Application localization;
- [ ] Moar easter eggs (yes, I filled the project with a lot of easter eggs and pop culture references);

## Other

The idea behind this project was born after the first publish of my other library for passes generation, [passkit-generator](https://github.com/alexandercerutti/passkit-generator), in late 2018, but the project building actually take off in early 2020. It took about a year to reach the first publish phase.

A big thanks to all the people that gave me suggestions to improve this and a big thanks to [Lorella Levantino](https://dribbble.com/lorellalevantino) for the great help she gave me while designing and realizing the UI/UX.

---

Made with ❤ in Italy. Any contribution and feedback is welcome.
