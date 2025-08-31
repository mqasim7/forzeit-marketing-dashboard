<template>
  <VCard>
    <VCardTitle class="pb-4">
      <div class="d-flex align-center">
        <VIcon
          icon="tabler-chart-donut"
          color="info"
          size="24"
          class="me-3"
        />
        <div>
          <h5 class="text-h5 font-weight-bold mb-1">
            Weekly Goals
          </h5>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Track your path to success
          </p>
        </div>
      </div>
    </VCardTitle>

    <VCardText>
      <!-- Weekly Execution Progress -->
      <div class="stat-item mb-4">
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="text-body-2">Weekly Execution Goal</span>
          <span class="font-weight-bold text-success">8 / 10 tasks</span>
        </div>
        <VProgressLinear
          color="success"
          height="8"
          :model-value="80"
          rounded
        />
        <p class="text-caption text-medium-emphasis mt-1">80% completed - Great progress!</p>
      </div>

      <!-- Planning Efficiency -->
      <div class="stat-item mb-4">
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="text-body-2">Planning Efficiency</span>
          <span class="font-weight-bold text-primary">18 / 20 min</span>
        </div>
        <VProgressLinear
          color="primary"
          height="8"
          :model-value="90"
          rounded
        />
        <p class="text-caption text-medium-emphasis mt-1">90% - Under target time!</p>
      </div>

      <!-- Template Usage -->
      <div class="stat-item mb-4">
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="text-body-2">Template Reuse</span>
          <span class="font-weight-bold text-warning">92%</span>
        </div>
        <VProgressLinear
          color="warning"
          height="8"
          :model-value="92"
          rounded
        />
        <p class="text-caption text-medium-emphasis mt-1">Excellent template optimization</p>
      </div>

      <VDivider class="my-4" />

      <!-- Top Performing Channels -->
      <div class="top-channels">
        <h6 class="text-h6 font-weight-medium mb-3">
          Top Channels This Month
        </h6>
        
        <div
          v-for="(channel, index) in topChannels"
          :key="channel.name"
          class="channel-item"
          :class="{ 'mb-3': index < topChannels.length - 1 }"
        >
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <VAvatar
                :color="channel.color"
                variant="tonal"
                size="32"
                class="me-3"
              >
                <VIcon
                  :icon="channel.icon"
                  size="16"
                />
              </VAvatar>
              <div>
                <p class="text-body-2 font-weight-medium mb-0">
                  {{ channel.name }}
                </p>
                <p class="text-caption text-medium-emphasis">
                  {{ channel.conversions }} conversions
                </p>
              </div>
            </div>
            <VChip
              :color="channel.color"
              variant="tonal"
              size="small"
            >
              {{ channel.roas }}x ROAS
            </VChip>
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
const topChannels = [
  {
    name: 'Email Marketing',
    conversions: 134,
    roas: 8.4,
    color: 'success',
    icon: 'tabler-mail'
  },
  {
    name: 'Google Ads',
    conversions: 156,
    roas: 4.2,
    color: 'primary',
    icon: 'tabler-brand-google'
  },
  {
    name: 'Facebook Ads',
    conversions: 89,
    roas: 3.1,
    color: 'info',
    icon: 'tabler-brand-facebook'
  },
  {
    name: 'LinkedIn Ads',
    conversions: 67,
    roas: 2.8,
    color: 'warning',
    icon: 'tabler-brand-linkedin'
  }
]
</script>

<style scoped lang="scss">
.stat-item {
  padding: 1rem;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.2);
  border: 1px solid rgba(var(--v-border-color), 0.1);
}

.channel-item {
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(var(--v-theme-surface), 0.3);
  }
}
</style>
