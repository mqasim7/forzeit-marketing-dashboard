<template>
  <VCard
    class="stats-card"
    :class="`border-s-${color}`"
    style="border-start-width: 4px; border-start-style: solid;"
  >
    <VCardText class="d-flex align-center">
      <VAvatar
        variant="tonal"
        :color="color"
        size="50"
        class="me-4"
      >
        <VIcon
          :icon="icon"
          size="28"
        />
      </VAvatar>

      <div class="flex-grow-1">
        <div class="d-flex align-center justify-space-between mb-1">
          <h6 class="text-h6 font-weight-medium">
            {{ title }}
          </h6>
          <VChip
            v-if="trend"
            color="success"
            variant="tonal"
            size="x-small"
          >
            <VIcon
              icon="tabler-trending-up"
              size="14"
              start
            />
            +{{ trend }}%
          </VChip>
        </div>
        
        <div class="d-flex align-center">
          <h3 class="text-h3 font-weight-bold me-2">
            {{ formatNumber(stats) }}
          </h3>
          <div class="live-indicator">
            <VIcon
              icon="tabler-circle-dot"
              color="success"
              size="12"
              class="blinking"
            />
          </div>
        </div>
        
        <p class="text-body-2 text-medium-emphasis mb-0">
          {{ subtitle }}
        </p>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
interface Props {
  stats: number
  title: string
  subtitle: string
  icon: string
  color: string
  trend?: number
}

const props = defineProps<Props>()

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped lang="scss">
.stats-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.live-indicator {
  .blinking {
    animation: blink 2s infinite;
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.3;
  }
}
</style>
