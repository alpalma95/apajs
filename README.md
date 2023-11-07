<picture>
    <img src="./public/apa-thumbnail.png" alt="Cute water drop with eyes and smile" width="150" align="right" />
</picture>

<h1 width="50%">ApăJS</h1>


<sub> `Apă` (_water_, in Romanian) &ndash; For when you just need a little hydration.</sub>



## Intro

This started just for fun. I wanted to experiment around with web components and try to build something from scratch.

There was a "first" version (one could say "alpha.0.0.0.0.0.0.1", whose repository you can still check [here](https://github.com/alpalma95/roundjs-legacy)). As it might result evident, it wasn't going anywhere besides being a fun project.

Nonetheless, as it turns out, I felt proud of my work and wanted to share it with the world as a "real" project.

In the legacy version, I stated that this shouldn't be used for production and "Why would you even want another library".

Well, I can now come up with a few reasons why I'll keep on working on it and I'm planning to use it:

### Web components for everyone

ApaJS provides a very nice and intuitive wrapper over web components. You can take either a class-based approach (by extending from `ReactiveWC`) or a functional one (by using the `defineComponent` function). At the moment, you can find an example of the functional one on the `index.js` at the root of the project.

I believe that we should empower web standards whenever the requirements of our projects allow us to do so. Maybe, (and maybe I'm as well being too _naïf_), a project like this one could make someone reconsider before reaching out to a framework or a +40kb library. I mean, reusable components, encapsulated logic and (optionally) styles and reactivity out of the box. And all based on the standards of modern JavaScript<sup>1</sup>. You know JavaScript, you can still use everything you know with ApaJS.

Additionally, I'm aware some people are not very delighted with OOP. That's alright. As a sort of experiment and heavily inspired by the syntax of [HybridsJS](https://hybrids.js.org/#/), I also wanted to provide a way to use functions and object literals with web components<sup>2</sup>.

<sub><sup>1</sup> Of course don't expect any compatibility with older browsers.</sub>

<sub><sup>2</sup> This "hybrid" (pun intended...) approach adds ~400b to the minified file. While it's not critical for my case, that's the size of one of the dependencies alone. Put into perspective, I'd like to provide a standalone version of it.

### On the shoulders of <sup><sub>tiny</sub></sup> giants

The main issue I faced with the legacy version was that I tried to reinvent the wheel regarding templating and reactivity. Alright, I consider myself to be pretty creative and can find my way out of most of the challenges. _However_, everything felt bloated, fragile and, definitely, not anything I'd personally use (if you're curious about the approach I was aiming at, please check out the legacy repository).

That's why I invested quite a lot of time in researching possible solutions. After considering several options, I found two solutions that fit 100% into my needs:

- [VanJS](https://vanjs.org/): Literally, it only provides reactivity and a functional approach to templating. Gzipped, it's _only 0.9kb_.
- [HTM](https://github.com/developit/htm): It uses tagged template literals to build the DOM based on a sort of "pragma". It was originally designed to pair with Preact, so we could use it without a build step. I wired it up so it'd take VanJS as pragma. _Under 500b_.

These, integrated and combined with the core of ApaJS, weigh (minified) about just under _5.5kb_ **without gzip** (I kept track of the dist files for easier reading of sizes). This was one of my requirements, that it could be just dropped into an `assets` folder and export the functionalities directly into the code. Without any build step or additional compression.

Yet, gzipped it's **2.5kb**. This can change as Apa is under active development, but I'm not planning to add any extra functionalities, only tests and do the needed amendments. I'm aware there's also some duplication and some things I could do to improve these numbers, so I hope everything balances right.

### It's my work (OK, this one is maybe too personal)

I invested so much time and effort into this, that I **do** want it to be usable. It's my little pet project and I hope someone out there will appreciate it as well! It's tiny, it doesn't require any build step and doesn't interfere with the way you write Vanilla JS. The only scope is to reduce boilerplate around web components **aiming at being reactive**.

## README to be continued!
