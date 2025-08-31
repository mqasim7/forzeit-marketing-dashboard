<template>
  <v-card class="mb-6" elevation="2">
    <v-card-text class="py-4">
      <div class="d-flex align-center justify-space-between flex-wrap ga-4">
        <div class="text-center">
          <div class="text-h4 font-weight-bold text-success">{{ activeUsers5s }}</div>
          <div class="text-body-2 text-medium-emphasis">Active users last 5s</div>
          <v-chip 
            size="x-small" 
            class="mt-1" 
            :color="users5sTrend > 0 ? 'success' : users5sTrend < 0 ? 'error' : 'surface-variant'"
          >
            <v-icon 
              size="12" 
              :icon="users5sTrend > 0 ? 'tabler-trending-up' : users5sTrend < 0 ? 'tabler-trending-down' : 'tabler-minus'"
            />
            {{ users5sTrend > 0 ? '+' : '' }}{{ users5sTrend }}
          </v-chip>
        </div>

        <v-divider vertical />

        <div class="text-center">
          <div class="text-h4 font-weight-bold text-info">{{ activeUsers24h }}</div>
          <div class="text-body-2 text-medium-emphasis">Active users last 24h</div>
          <v-chip 
            size="x-small" 
            class="mt-1" 
            :color="users24hTrend > 0 ? 'success' : users24hTrend < 0 ? 'error' : 'surface-variant'"
          >
            <v-icon 
              size="12" 
              :icon="users24hTrend > 0 ? 'tabler-trending-up' : users24hTrend < 0 ? 'tabler-trending-down' : 'tabler-minus'"
            />
            {{ users24hTrend > 0 ? '+' : '' }}{{ users24hTrend }}%
          </v-chip>
        </div>

        <v-divider vertical />

        <div class="text-center">
          <div class="text-h4 font-weight-bold text-primary">{{ cardsCreated24h }}</div>
          <div class="text-body-2 text-medium-emphasis">Cards created last 24h</div>
          <v-chip 
            size="x-small" 
            class="mt-1" 
            :color="cardsTrend > 0 ? 'success' : cardsTrend < 0 ? 'error' : 'surface-variant'"
          >
            <v-icon 
              size="12" 
              :icon="cardsTrend > 0 ? 'tabler-trending-up' : cardsTrend < 0 ? 'tabler-trending-down' : 'tabler-minus'"
            />
            {{ cardsTrend > 0 ? '+' : '' }}{{ cardsTrend }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive values for live stats
const activeUsers5s = ref(0)
const activeUsers24h = ref(0)
const cardsCreated24h = ref(0)

// Trend indicators
const users5sTrend = ref(0)
const users24hTrend = ref(0)
const cardsTrend = ref(0)

// Base values for realistic simulation
const baseUsers5s = 12
const baseUsers24h = 847
const baseCards24h = 234

// Intervals for updates
let interval5s: number | null = null
let interval24h: number | null = null
let intervalCards: number | null = null

// Generate realistic fluctuations
const getRandomVariation = (base: number, maxPercent: number = 10): number => {
  const variation = (Math.random() - 0.5) * 2 * (base * maxPercent / 100)
  return Math.max(0, Math.round(base + variation))
}

const updateActiveUsers5s = () => {
  const prevValue = activeUsers5s.value
  activeUsers5s.value = getRandomVariation(baseUsers5s, 25) // More volatile for 5s metric
  users5sTrend.value = activeUsers5s.value - prevValue
}

const updateActiveUsers24h = () => {
  const prevValue = activeUsers24h.value
  activeUsers24h.value = getRandomVariation(baseUsers24h, 5) // Less volatile for 24h metric
  users24hTrend.value = Number(((activeUsers24h.value - prevValue) / prevValue * 100).toFixed(1))
}

const updateCardsCreated24h = () => {
  const prevValue = cardsCreated24h.value
  cardsCreated24h.value = getRandomVariation(baseCards24h, 8) // Moderate volatility
  cardsTrend.value = cardsCreated24h.value - prevValue
}

onMounted(() => {
  // Initial values
  activeUsers5s.value = baseUsers5s
  activeUsers24h.value = baseUsers24h
  cardsCreated24h.value = baseCards24h

  // Update intervals
  interval5s = setInterval(updateActiveUsers5s, 5000) // Every 5 seconds
  interval24h = setInterval(updateActiveUsers24h, 30000) // Every 30 seconds
  intervalCards = setInterval(updateCardsCreated24h, 15000) // Every 15 seconds
})

onUnmounted(() => {
  if (interval5s) clearInterval(interval5s)
  if (interval24h) clearInterval(interval24h)
  if (intervalCards) clearInterval(intervalCards)
})
</script>

<style scoped>
.v-divider--vertical {
  height: 60px;
}
</style>
