<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import IconLanguage from './IconLanguage.vue';

const { symbols } = defineProps<{
  symbols: kana[]
}>()

interface kana {
  kana: string;
  roumaji: string;
  type: string;
}

const faceUp = ref(false)
// const menuActive = ref(false)
const mode: Ref<"text" | "symbol"> = ref("symbol")
const list: Ref<Array<kana | undefined>> = ref(shuffleArray(symbols))
const active = computed(() => list.value[0])
const errors = 0

const turn = () => faceUp.value = !faceUp.value
const next = (e: Event) => {
  e.stopPropagation()
  list.value.push(list.value.shift()!)
  faceUp.value = false
};
// const prev = () => {
//   list.value.unshift(list.value.pop()!)
//   faceUp.value = true
// };
const failed = (e: Event) => {
  e.stopPropagation()
  if (!active.value) return;
  list.value.splice(Math.floor(list.value.length / 2), 1, active.value)
  list.value.shift()
  faceUp.value = false
};

function shuffleArray(array: Array<kana | undefined>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (!!array[i] || !!array[j])
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const switchMode = () => {
  if (mode.value === "text") {
    mode.value = "symbol"
    document.querySelector('html')?.setAttribute("data-theme", "symbol")
  } else {
    mode.value = "text"
    document.querySelector('html')?.setAttribute("data-theme", "text")
  }
  console.debug(mode.value)
}
</script>

<template>
  <div class="wrap">
    <div class="deck">
      <div class="card">
        <transition name="actions" mode="out-in">
          <div class="score" v-if="faceUp">
            <div class="error" v-for="i in errors" :key="i">
            </div>
          </div>
        </transition>
        <transition name="card" mode="out-in">
          <div :key="active?.kana">
            <transition name="face" mode="out-in">
              <div class="face" v-if="faceUp" @click="turn">
                <transition name="face" mode="out-in">
                  <p v-if="mode === 'text'" class="text" :key="active?.roumaji">
                    {{ active?.roumaji }}
                  </p>
                  <p v-else class="symbol" :key="active?.kana">
                    {{ active?.kana }}
                  </p>
                </transition>
              </div>
              <div class="face" v-else @click="turn">
                <transition name="face" mode="out-in">
                  <p v-if="mode === 'text'" class="symbol" :key="active?.kana">
                    {{ active?.kana }}
                  </p>
                  <p v-else class="text" :key="active?.roumaji">
                    {{ active?.roumaji }}
                  </p>
                </transition>
              </div>
            </transition>
          </div>
        </transition>
        <transition name="actions" mode="out-in">
          <div class="actions" v-if="faceUp">
            <button class="failure" @click="failed($event)">Failed</button>
            <button class="success" @click="next($event)">Got it</button>
          </div>
        </transition>
      </div>
    </div>
    <div class="menu">
      <!-- <button @click="menuActive = !menuActive">A</button> -->
      <!-- <div v-if="menuActive"> -->
      <button class="switch" @click="switchMode()">
        <IconLanguage />
      </button>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.wrap {
  --char-height: 18rem;
  --line-height: 16rem;
  --line-height: 0;
  width: 100vw;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr auto;
  transition: grid-template-rows 0.3s;
}

.deck {
  width: min(40rem, calc(100vw - 1rem));
  height: 100%;

  @media (min-width: 1000px) {
    padding: 2rem 0 3rem;
  }
}

.card {
  position: relative;
  height: fit-content;
  height: 100%;
  display: grid;
  gap: 1rem;
  width: 100%;
  /* border-radius: 2rem; */
  border-radius: 0.75rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  top: 0;
  left: 0;
  background-color: var(--bg-color-secondary);
  box-sizing: border-box;
  padding-bottom: 1.5rem;
  box-shadow: var(--bg-color-dim) 0px 50px 100px -20px, var(--bg-color-dim) 0px 30px 60px -30px;

  @media (min-width: 1000px) {
    transition: outline-color 0.15s;
    outline: 6px solid transparent;

    &:hover {
      outline-color: var(--bg-color-dim);
    }
  }
}

.menu {
  padding: 0.5rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
}

.switch {
  z-index: 200;
  width: fit-content;
  height: 100%;
  height: 2.75rem;
  border-radius: 1rem;
  border-radius: 1.75rem;
  font-size: var(--type-1);
  padding: 0 1rem;
  color: var(--text-color);
  background-color: var(--bg-color-dim);

  &:hover {
    color: var(--text-color-dim);
  }
}

.face {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  transition: opacity 0.22s cubic-bezier(0.7, 0, 0.3, 0.8);
  cursor: pointer;
}

.card-back {
  opacity: 0;
  visibility: hidden;
}

.score {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
  width: 100%;
  place-items: center;
  height: 4.5rem;
}

.error {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: var(--text-color-dim);
  background-color: var(--bg-color-dim);
}

.actions {
  z-index: 200;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  place-items: center;
  height: 5rem;
}

button {
  display: grid;
  place-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  height: 4rem;
  width: 100%;
  border-radius: 1rem;
  border-bottom-right-radius: 1.75rem;

  font-weight: 500;

  &.success {
    background-color: var(--bg-color-dim);
  }

  &.failure {
    background-color: var(--bg-color-secondary);
    color: var(--highlight-color);
  }
}

.symbol {
  font-size: var(--type-10);
  line-height: 15rem;
  user-select: none;
  font-weight: 500;
  letter-spacing: -2.5rem;
  width: 100%;
  text-align: center;
}

.text {
  font-size: var(--type-8);
  line-height: 15rem;
  user-select: none;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.card-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.card-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}

.card-enter-from {
  transform: scale(0.9) translateY(2rem) rotateZ(3deg);
  opacity: 0.5;
}

.card-leave-to {
  transform: scale(0.9) translateY(-2rem) rotateZ(-3deg);
  opacity: 0;
}

.face-enter-active,
.face-leave-active {
  transition: opacity 0.04s ease-out, transform 0.04s ease-out;
}

.face-enter-from {
  transform: scale(1.1);
  opacity: 0.4;
}

.face-leave-to {
  transform: scale(0.9);
  opacity: 0.2;
}

.actions-enter-active,
.actions-leave-active {
  transition: opacity 0.04s ease-out;
}

.actions-enter-from,
.actions-leave-to {
  opacity: 0.2;
}
</style>
