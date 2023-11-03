# RoundJS

<sub>... Because it's a minimal and bad substitute for Angular.</sub>

---

## Intro

I left the subtitle under the name of the library because I think it's funny (and also as a kind of reminder of how everything started).

This started just for fun, wanted to experiment around with web components and try to build something from scratch.

Nonetheless, as it turns out, I felt proud of my work and wanted to share it with the world as a "real" project.

I stated in the first version (one could say "alpha.0.0.0.0.0.0.1", you can still check the repository [here](https://github.com/alpalma95/roundjs-legacy)) that this shouldn't be used for production and "Why would you even want another library".

Well, I can come up with some reasons why I'll keep on working on it and I'm planning to use it:

### Web components for everyone

It provides a very nice and intuitive wrapper over web components. You can take either a class-based approach (by extending from `ReactiveWC`) or a functional component (by using the `defineComponent` function). At the moment, you can find an example of the functional one on the `index.js` at the root of the project.

I believe that we should empower web standards whenever the requirements of our projects allow us to do so. Maybe, (and maybe I'm as well being too _naïf_), a project like this one could make someone reconsider before reaching out to a framework of a +40kb library. I mean, reusable components, encapsulated logic and (optionally) styles and reactivity out of the box. And all based on the standards of modern JavaScript<sup>1</sup>. You know JavaScript, you can still use everything you know with RoundJS.

Additionally, I'm aware some people are not very delighted with OOP. That's alright. As a sort of experiment and heavily inspired by the syntax of [HybridsJS](https://hybrids.js.org/#/), I also wanted to provide a way to use functions and object literals with web components<sup>2</sup>.

<sub><sup>1</sup> Of course don't expect any compatibility with older browsers.</sub>

<sub><sup>2</sup> This "hybrid" (pun intended...) approach adds ~500b to the minified file. While it's not critical for my case, that's the size of one of the dependencies alone. Put into perspective, I'd like to provide a standalone version of it.

### On the shoulders of "tiny giants"

The main issue I faced with the legacy version was that I tried to reinvent the wheel regarding templating and reactivity. Alright, I consider myself to be pretty creative and can find my way out of most of the challenges. _However_, everything felt bloated, fragile and, definitely, not anything I'd personally use (if you're curious about the approach I was aiming at, please check the legacy repository).

That's why I invested quite a lot of time in researching possible solutions. After considering several options, I found two solutions that fit 100% into my needs:

- [VanJS](https://vanjs.org/): Literally, it only provides reactivity and a functional approach to templating (just creating nodes from functions and binding them to a reactive state to update the DOM accordingly). Gzipped, it's _only 0.9kb_.
- [HTM](https://github.com/developit/htm): It uses tagged template literals to build the DOM. It was originally designed to pair with Preact, so we could use it without a build step. I wired it up so it'd take VanJS as "pragma". _Under 500b_.

These, integrated and combined with the core of RoundJS, weigh (minified) about just _4.5kb_ **without gzip** (find the 3 dist files under `./dist-check-sizes`). This was one of my requirements, that it could be just dropped into an `assets` folder and export the functionalities directly into the code. Without any build step or additional compression.

Yet, gzipped it's **2.45kb**. This can change as Round is under active development, but I'm not planning to add any extra functionalities, only tests and do the needed amendments. I'm aware there's also some duplication and some things I could do to improve these numbers, so I hope everything balances right.

### It's my work (OK, this one is maybe too personal)

I invested so much time and effort into this, that I **do** want it to be usable. It's my little pet project and I hope someone out there will appreciate it as well! It's tiny, it doesn't require any build step and doesn't interfere with the way you write Vanilla JS. The only scope is to reduce boilerplate around web components **aiming at being reactive**.

## README to be continued!
