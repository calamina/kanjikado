<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';

const { symbols } = defineProps<{
  symbols: kana[]
}>()

interface kana {
  kana: string;
  roumaji: string;
  type: string;
}

const faceUp = ref(false)
const list: Ref<Array<kana | undefined>> = ref(shuffleArray(symbols))
const active = computed(() => list.value[0])
const score = 0

const okScores = [1, 2, 3]
const nokScores = [-1, -2, -3]

const turn = () => faceUp.value = !faceUp.value
const next = () => {
  list.value.push(list.value.shift()!)
  faceUp.value = false
};
// const prev = () => {
//   list.value.unshift(list.value.pop()!)
//   faceUp.value = true
// };
const failed = () => {
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

// todo
const switchFace = () => { };
</script>

<template>
  <div class="deck">
    <div class="card">
      <button class="switch" @click="switchFace()">↺</button>
      <transition name="actions" mode="out-in">
        <div class="score" v-if="faceUp">
          <div class="score-zone">
            <div class="nok" v-for="i in nokScores" :key="i" :class="{ 'active': score < 0 && i <= score }"></div>
          </div>
          <div class="score-zone">
            <div class="ok" v-for="i in okScores" :key="i" :class="{ 'active': i <= score }">
            </div>
          </div>
        </div>
      </transition>
      <transition name="card" mode="out-in">
        <div :key="active?.kana">
          <transition name="face" mode="out-in">
            <div class="face" v-if="!faceUp" @click="turn">
              <p class="text" :key="active?.roumaji">
                {{ active?.roumaji }}
              </p>
            </div>
            <div class="face" v-else @click="turn">
              <p class="symbol" :key="active?.kana">
                {{ active?.kana }}
              </p>
            </div>
          </transition>
        </div>
      </transition>
      <transition name="actions" mode="out-in">
        <div class="actions" v-if="faceUp">
          <button class="failure" @click="failed()">Failed</button>
          <button class="success" @click="next()">Got it</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.deck {
  width: min(40rem, 80vw);
  height: 100%;
  padding: 2rem 0 3rem;
}

.card {
  position: relative;
  height: fit-content;
  height: 100%;
  display: grid;
  gap: 1rem;
  width: 100%;
  border-radius: 2rem;
  top: 0;
  left: 0;
  background-color: var(--bg-color-secondary);
  box-sizing: border-box;
  transition: outline-color 0.15s;
  outline: 6px solid transparent;
  padding-bottom: 1.5rem;
  box-shadow: var(--bg-color-dim) 0px 50px 100px -20px, var(--bg-color-dim) 0px 30px 60px -30px;

  &:hover {
    outline-color: var(--bg-color-dim);
  }
}

.switch {
  z-index: 200;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  border-top-left-radius: 1.75rem;
  font-size: 2.5rem;
  color: var(--bg-color-dim);

  &:hover {
    background-color: var(--bg-color-dim);
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
  height: 5rem;
}

.score-zone {
  display: flex;
  gap: 0.75rem;
}

.nok,
.ok {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.nok {
  background-color: var(--text-color-dim);
  opacity: 0.4;

  &.active {
    opacity: 1;
  }
}

.ok {
  background-color: var(--bg-color-dim);
  opacity: 0.4;

  &.active {
    opacity: 1;
  }
}

.actions {
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
  font-size: 15rem;
  line-height: 15rem;
  user-select: none;
  font-weight: 500;
  letter-spacing: -2.5rem;
  width: 100%;
  text-align: center;
}

.text {
  font-size: 13rem;
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
