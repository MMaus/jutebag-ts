<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input id="reply" ref="reply" placeholder="(reply here)" />
    <button type="button" id="submitter" @click="fetchStuff">Test API</button>
    <p>
      <button type="button" id="submitter" @click="increase">click increase {{ count }} times</button>
    </p>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
        >babel</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
          target="_blank"
          rel="noopener"
        >typescript</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa"
          target="_blank"
          rel="noopener"
        >pwa</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
        >router</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >eslint</a>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import { defineComponent, ref } from 'vue';

// @Component
// export default class HelloWorld extends Vue {
export default defineComponent({

  setup() {
    const count = ref(0);
    const msg = "Hello, world!";
    const increase = () => { count.value++}
    return { count, increase, msg }
  }

});


  // @Prop() private msg!: string;

  // @Ref('reply') reply!: HTMLInputElement

// private async fetchIt(): Promise<any> {
//   // TODO: switch between production and dev HERE
//     const url = new URL("/bag/hello", window.location.href);
//     url.searchParams.append("you", "yourName");
//     const urlString = url.toString();
//     console.log("gonna fetch " + urlString)
//     const response = await fetch(urlString);
//     return response.text(); //  json();
// }
//   private fetchStuff(): void {
//     console.log("BEFORE");
//     this.fetchIt().then(res => this.reply.value = res);
//     console.log("AFTER");
//     // const response = fetch(urlString)
//     //   .then(res => this.reply.value = res.body())
//     // this.reply.value = "Method called";
//   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
