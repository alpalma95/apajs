<picture>
    <img src="./docs/img/apa-thumbnail.png" alt="Cute water drop with eyes and smile" width="150" align="right" />
</picture>

<h1>ApăJS</h1>

<sub> `Apă` (_water_, in Romanian) &ndash; For when you just need a little hydration.</sub>

## Intro

This started just for fun. I wanted to experiment around with web components and try to build something from scratch.

There was a "first" version (one could say "alpha.0.0.0.0.0.0.1", whose repository you can still check [here](https://github.com/alpalma95/roundjs-legacy)). As it might result evident, it wasn't going anywhere besides being a fun project.

Nonetheless, as it turns out, I felt proud of my work and wanted to share it with the world as a "real" project.

In the legacy version, I stated that this shouldn't be used for production and "Why would you even want another library".

Well, I can now come up with a few reasons why I'll keep on working on it and I'm personally planning to use it:

### Web components for everyone

ApăJS provides a tiny and functional wrapper over web components. The syntax is heavily inspired by [HybridsJS](https://hybrids.js.org/#/), and it allows us to use object literals and functions to create web components, which, in my opinion, should lower the barrier of entry to web components.

> In previous versions, it was possible to directly extend from the `ReactiveWC` class. However, to keep the codebase more sustainable, I decided to drop this possibility. Opting for the class-based approach would have made the code too verbose anyway, which was one of the main pain points I wanted to address when I first started this project.

I believe that we should empower web standards whenever the requirements of our projects allow us to do so. Maybe, (and maybe I'm as well being too _naïf_), a project like this one could make someone reconsider before reaching out to a framework or a +40kb library.

I mean, reusable components, encapsulated logic and reactivity out of the box. And all based on the standards of modern JavaScript<sup>1</sup> and without any build step.

<sub><sup>1</sup> Of course don't expect any compatibility with older browsers.</sub>

### On the shoulders of <sup><sub>tiny</sub></sup> giants

The main issue I faced with the legacy version was that I tried to reinvent the wheel regarding templating and reactivity. Alright, I consider myself to be pretty creative and can find my way out of most of the challenges. _However_, everything felt bloated, fragile and, definitely, not anything I'd personally use (if you're curious about the approach I was aiming at, please check out the legacy repository).

That's why I invested quite a lot of time in researching possible solutions. After considering several options, I found two solutions that fit 100% into my needs:

- [VanJS](https://vanjs.org/): Literally, it only provides reactivity and a functional approach to templating. Gzipped, it's _only 0.9kb_.
- [HTM](https://github.com/developit/htm): It uses tagged template literals to build the DOM based on a sort of "pragma". It was originally designed to pair with Preact, so we could use it without a build step. I wired it up so it'd take VanJS as pragma. _Under 500b_.

These, integrated and combined with the core of ApăJS, weigh (minified) about just **~5kb** **without gzip** (I kept track of the dist files for easier reading of sizes). This was one of my requirements, that it could be just dropped into an `assets` folder and export the functionalities directly into the code. Without any build step or additional compression.

Yet, gzipped it's **2.5kb**. This can change as Apă is under active development, but I'm not planning to add any extra functionalities, only tests and do the needed amendments. I'm aware there's also some duplication and some things I could do to improve these numbers, so I hope everything balances right.

### It's my work (OK, this one is maybe too personal)

I invested so much time and effort into this, that I **do** want it to be usable. It's my little pet project and I hope someone out there will appreciate it as well! It's tiny, it doesn't require any build step and doesn't interfere with the way you write Vanilla JS. The only scope is to reduce boilerplate around web components **aiming at being reactive**.

> Documentation in progress!
