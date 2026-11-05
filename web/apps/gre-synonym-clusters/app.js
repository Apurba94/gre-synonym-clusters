/* Synonym Clusters: learn GRE words in meaning groups, then sort words into groups and find the odd one out. */
(function () {
  'use strict';
  const sortItems = (groups, n, seed) => {
    const r = SK.rng(seed), out = [];
    const pairs = SK.shuffle(r, groups.flatMap((g) => g.words.map((w) => [g, w])));
    for (const [g, w] of pairs) {
      const wrong = SK.shuffle(r, groups.filter((x) => x.id !== g.id && x.id !== g.opposite)).slice(0, 2);
      const opp = groups.find((x) => x.id === g.opposite);
      const choices = [g.name].concat(opp ? [opp.name] : [], wrong.map((x) => x.name)).slice(0, 4);
      out.push(SK.shuffleItem(r, { id: 'sort-' + w, type: 'single', topic: 'Sort', stem: 'Which group does **' + w + '** belong to?', choices, answer: 0,
        explanation: '**' + w + '** belongs with ' + g.words.filter((x) => x !== w).slice(0, 4).join(', ') + ': ' + g.name.toLowerCase() + '.' + (opp ? ' Its opposite group is ' + opp.name.toLowerCase() + '.' : '') }));
      if (out.length >= n) break;
    }
    return out;
  };
  const oddItems = (groups, n, seed) => {
    const r = SK.rng(seed), out = [];
    for (let k = 0; out.length < n && k < n * 4; k++) {
      const g = SK.pick(r, groups), other = groups.find((x) => x.id === g.opposite) || SK.pick(r, groups.filter((x) => x.id !== g.id));
      const three = SK.sample(r, g.words, 3), odd = SK.pick(r, other.words);
      out.push(SK.shuffleItem(r, { id: 'odd-' + three.join('-') + '-' + odd, type: 'single', topic: 'Odd one out', stem: 'Which word does NOT belong with the others?', choices: [odd].concat(three), answer: 0,
        explanation: three.join(', ') + ' all mean ' + g.name.toLowerCase() + '. **' + odd + '** means ' + other.name.toLowerCase() + '.' }));
    }
    return out;
  };
  const App = {
    about: 'Words are easier to remember in families. This app groups over 200 GRE words into 36 meaning clusters, each paired with its opposite cluster, such as praise and criticize, or stingy and generous. Sentence Equivalence rewards exactly this kind of knowledge: you must spot two words that mean the same.',
    how: ['Study a cluster and its opposite in **Clusters**.', 'Test yourself in **Sort**: put each word into its group.', 'Play **Odd one out** to tell near-synonyms from their opposites.'],
    tabs: [
      { id: 'groups', label: 'Clusters', render(el, ctx) {
        const g = ctx.data.clusters;
        el.appendChild(SK.card('Clusters and their opposites', SK.table(['Meaning', 'Words', 'Opposite group'], g.map((x) => [SK.h('strong', { text: x.name }), x.words.join(', '), (g.find((y) => y.id === x.opposite) || {}).name || '']))));
      } },
      { id: 'sort', label: 'Sort', render(el, ctx) { SK.quizStarter(el, { title: 'Sort words into groups', sizes: [10, 20, 40], make: (t, n, seed) => sortItems(ctx.data.clusters, n, seed), seconds: (n) => n * 20 }); } },
      { id: 'odd', label: 'Odd one out', render(el, ctx) { SK.quizStarter(el, { title: 'Odd one out', sizes: [10, 20], make: (t, n, seed) => oddItems(ctx.data.clusters, n, seed), seconds: (n) => n * 25 }); } },
    ],
    checks: {
      'no word sits in two groups, and opposites point both ways': (data, assert) => {
        const all = data.clusters.flatMap((c) => c.words);
        assert.equal(new Set(all).size, all.length);
        for (const c of data.clusters) { const o = data.clusters.find((x) => x.id === c.opposite); assert.ok(o, c.id); assert.equal(o.opposite, c.id); }
      },
      'sorting and odd-one-out questions have exactly one right answer': (data, assert) => {
        for (let s = 1; s < 30; s++) {
          for (const it of sortItems(data.clusters, 20, s).concat(oddItems(data.clusters, 10, s))) assert.deepEqual(SK.validateItem(it), []);
          for (const it of oddItems(data.clusters, 10, s)) {
            const groupsOf = it.choices.map((w) => data.clusters.find((c) => c.words.includes(w)).id);
            const odd = groupsOf[it.answer];
            assert.equal(groupsOf.filter((g) => g === odd).length, 1);
          }
        }
      },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
