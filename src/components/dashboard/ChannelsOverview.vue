<template>
  <VCard>
    <VCardTitle class="pb-4">
      <div class="d-flex align-center justify-space-between w-100">
        <div class="d-flex align-center">
          <VIcon
            icon="tabler-chart-bar"
            color="info"
            size="24"
            class="me-3"
          />
          <div>
            <h5 class="text-h5 font-weight-bold mb-1">
              Growth Channels
            </h5>
            <p class="text-body-2 text-medium-emphasis mb-0">
              Helping users build their perfect week
            </p>
          </div>
        </div>
        <VBtn
          variant="outlined"
          size="small"
          prepend-icon="tabler-plus"
        >
          Add Channel
        </VBtn>
      </div>
    </VCardTitle>

    <VCardText>
      <!-- Summary Cards -->
      <VRow class="mb-6">
        <VCol cols="6" md="3">
          <div class="summary-metric">
            <VIcon icon="tabler-eye" color="primary" size="20" class="mb-2" />
            <h6 class="text-h6 font-weight-bold">336K</h6>
            <p class="text-body-2 text-medium-emphasis mb-0">Impressions</p>
          </div>
        </VCol>
        <VCol cols="6" md="3">
          <div class="summary-metric">
            <VIcon icon="tabler-cursor-text" color="info" size="20" class="mb-2" />
            <h6 class="text-h6 font-weight-bold">10.4K</h6>
            <p class="text-body-2 text-medium-emphasis mb-0">Clicks</p>
          </div>
        </VCol>
        <VCol cols="6" md="3">
          <div class="summary-metric">
            <VIcon icon="tabler-target" color="success" size="20" class="mb-2" />
            <h6 class="text-h6 font-weight-bold">544</h6>
            <p class="text-body-2 text-medium-emphasis mb-0">Conversions</p>
          </div>
        </VCol>
        <VCol cols="6" md="3">
          <div class="summary-metric">
            <VIcon icon="tabler-trending-up" color="warning" size="20" class="mb-2" />
            <h6 class="text-h6 font-weight-bold">4.5x</h6>
            <p class="text-body-2 text-medium-emphasis mb-0">Avg ROAS</p>
          </div>
        </VCol>
      </VRow>

      <!-- Simple Channel List -->
      <div class="channels-list">
        <VRow>
          <VCol
            v-for="channel in channels.slice(0, 4)"
            :key="channel.name"
            cols="12"
            md="6"
          >
            <div class="channel-item">
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
                    <h6 class="text-h6 font-weight-medium mb-1">
                      {{ channel.name }}
                    </h6>
                    <p class="text-caption text-medium-emphasis mb-0">
                      {{ channel.conversions }} conversions
                    </p>
                  </div>
                </div>
                <VChip
                  :color="channel.color"
                  variant="tonal"
                  size="small"
                >
                  {{ channel.roas === 0 ? 'Free' : `${channel.roas}x ROAS` }}
                </VChip>
              </div>
            </div>
          </VCol>
        </VRow>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
const channels = [
  {
    name: 'Google Ads',
    clicks: 3850,
    conversions: 156,
    cpa: 24.50,
    roas: 4.2,
    status: 'active',
    color: 'primary',
    icon: 'tabler-brand-google'
  },
  {
    name: 'Facebook Ads',
    clicks: 2340,
    conversions: 89,
    cpa: 32.10,
    roas: 3.1,
    status: 'active',
    color: 'info',
    icon: 'tabler-brand-facebook'
  },
  {
    name: 'Email Marketing',
    clicks: 890,
    conversions: 134,
    cpa: 8.90,
    roas: 8.4,
    status: 'active',
    color: 'success',
    icon: 'tabler-mail'
  },
  {
    name: 'LinkedIn Ads',
    clicks: 1120,
    conversions: 67,
    cpa: 45.80,
    roas: 2.8,
    status: 'active',
    color: 'warning',
    icon: 'tabler-brand-linkedin'
  },
  {
    name: 'Organic Search',
    clicks: 2150,
    conversions: 98,
    cpa: 0,
    roas: 0,
    status: 'organic',
    color: 'secondary',
    icon: 'tabler-search'
  }
]

const getCPAColor = (cpa: number): string => {
  if (cpa === 0) return 'success'
  if (cpa <= 20) return 'success'
  if (cpa <= 35) return 'warning'
  return 'error'
}

const getROASColor = (roas: number): string => {
  if (roas === 0) return 'medium-emphasis'
  if (roas >= 4) return 'success'
  if (roas >= 2.5) return 'warning'
  return 'error'
}
</script>

<style scoped lang="scss">
.summary-metric {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.3);
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--v-theme-surface), 0.5);
    transform: translateY(-1px);
  }
}

.channels-list {
  .channel-item {
    padding: 1rem;
    border-radius: 8px;
    background: rgba(var(--v-theme-surface), 0.3);
    border: 1px solid rgba(var(--v-border-color), 0.08);
    transition: all 0.2s ease;
    margin-bottom: 1rem;

    &:hover {
      background: rgba(var(--v-theme-surface), 0.5);
      transform: translateY(-1px);
      border-color: rgba(var(--v-theme-primary), 0.2);
    }
  }
}
</style>
