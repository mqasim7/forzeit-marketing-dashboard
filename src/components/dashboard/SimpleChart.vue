<template>
  <VCard>
    <VCardTitle class="pb-4">
      <div class="d-flex align-center justify-space-between w-100">
        <div>
          <h5 class="text-h5 font-weight-bold mb-1">
            Weekly Performance
          </h5>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Transform aspirations into actionable weekly objectives
          </p>
        </div>
        <VBtn
          variant="outlined"
          size="small"
          prepend-icon="tabler-download"
        >
          Export
        </VBtn>
      </div>
    </VCardTitle>

    <VCardText>
      <!-- Summary metrics -->
      <VRow class="mb-6">
        <VCol cols="6" md="3">
          <div class="metric-box">
            <h6 class="text-h6 font-weight-bold text-primary">
              23%
            </h6>
            <p class="text-body-2 text-medium-emphasis mb-0">
              More Weekly Execution
            </p>
          </div>
        </VCol>
        <VCol cols="6" md="3">
          <div class="metric-box">
            <h6 class="text-h6 font-weight-bold text-success">
              7.2K
            </h6>
            <p class="text-body-2 text-medium-emphasis mb-0">
              Weekly Planners
            </p>
          </div>
        </VCol>
        <VCol cols="6" md="3">
          <div class="metric-box">
            <h6 class="text-h6 font-weight-bold text-warning">
              20 min
            </h6>
            <p class="text-body-2 text-medium-emphasis mb-0">
              Planning Time
            </p>
          </div>
        </VCol>
        <VCol cols="6" md="3">
          <div class="metric-box">
            <h6 class="text-h6 font-weight-bold text-info">
              4.8★
            </h6>
            <p class="text-body-2 text-medium-emphasis mb-0">
              User Rating
            </p>
          </div>
        </VCol>
      </VRow>

      <!-- Simple Bar Chart -->
      <div class="simple-chart">
        <h6 class="text-h6 font-weight-medium mb-4">
          Monthly Revenue Trend
        </h6>
        <VRow>
          <VCol
            v-for="(month, index) in months"
            :key="month"
            cols="2"
          >
            <div class="chart-bar">
              <div
                class="bar"
                :style="{
                  height: `${getBarHeight(index)}px`,
                  backgroundColor: getBarColor(index)
                }"
              />
              <p class="text-body-2 text-center mt-2 mb-0">
                {{ month }}
              </p>
              <p class="text-caption text-center text-medium-emphasis">
                ${{ (revenue[index] / 1000).toFixed(0) }}K
              </p>
            </div>
          </VCol>
        </VRow>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [85000, 92000, 78000, 105000, 98000, 110000]
const colors = ['#B53C17', '#00d084', '#fcb900', '#44FFD2', '#8D99AE', '#cf2e2e']

const getBarHeight = (index: number): number => {
  const maxRevenue = Math.max(...revenue)
  const minHeight = 40
  const maxHeight = 120
  return minHeight + ((revenue[index] / maxRevenue) * (maxHeight - minHeight))
}

const getBarColor = (index: number): string => {
  return colors[index % colors.length]
}
</script>

<style scoped lang="scss">
.metric-box {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.3);
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(var(--v-theme-surface), 0.5);
  }
}

.simple-chart {
  .chart-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .bar {
      width: 100%;
      max-width: 40px;
      border-radius: 4px 4px 0 0;
      transition: all 0.3s ease;
      margin: 0 auto;
      
      &:hover {
        transform: scaleY(1.1);
        opacity: 0.8;
      }
    }
  }
}
</style>
