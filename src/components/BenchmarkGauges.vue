<template>
  <v-row class="mb-6">
    <!-- Trial Conversion Gauge -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="text-center">Trial Conversion Performance</v-card-title>
        <v-card-text class="text-center">
          <div class="gauge-container">
            <v-progress-circular
              :model-value="trialConversionPercentage"
              :color="trialConversionStatus.color"
              size="120"
              width="10"
              class="mb-4"
            >
              <div class="gauge-content">
                <div class="text-h6 font-weight-bold">{{ latestMetrics.trialConversionRate.toFixed(2) }}%</div>
                <div class="text-caption text-medium-emphasis">vs {{ benchmarks.trialConversionRate }}%</div>
              </div>
            </v-progress-circular>
            
            <div class="mt-3">
              <v-chip
                :color="trialConversionStatus.color"
                variant="tonal"
                size="large"
              >
                <v-icon :icon="trialConversionStatus.icon" />
                {{ trialConversionStatus.label }}
              </v-chip>
            </div>

            <!-- Progress indicator -->
            <div class="mt-4">
              <div class="text-body-2 text-medium-emphasis mb-2">Progress to Target</div>
              <v-progress-linear
                :model-value="Math.min(100, trialConversionPercentage)"
                :color="trialConversionStatus.color"
                height="8"
                rounded
              />
              <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                <span>0%</span>
                <span>Target: {{ benchmarks.trialConversionRate }}%</span>
              </div>
            </div>

            <!-- Monthly sparkline -->
            <div class="mt-4">
              <div class="text-body-2 text-medium-emphasis mb-2">12-Month Trend</div>
              <v-sparkline
                :model-value="trialConversionTrend"
                color="warning"
                line-width="2"
                padding="8"
                smooth
                height="40"
              />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Paid Conversion Gauge -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="text-center">Paid Conversion Performance</v-card-title>
        <v-card-text class="text-center">
          <div class="gauge-container">
            <v-progress-circular
              :model-value="paidConversionPercentage"
              :color="paidConversionStatus.color"
              size="120"
              width="10"
              class="mb-4"
            >
              <div class="gauge-content">
                <div class="text-h6 font-weight-bold">{{ latestMetrics.paidConversionRate.toFixed(2) }}%</div>
                <div class="text-caption text-medium-emphasis">vs {{ benchmarks.paidConversionRate }}%</div>
              </div>
            </v-progress-circular>
            
            <div class="mt-3">
              <v-chip
                :color="paidConversionStatus.color"
                variant="tonal"
                size="large"
              >
                <v-icon :icon="paidConversionStatus.icon" />
                {{ paidConversionStatus.label }}
              </v-chip>
            </div>

            <!-- Progress indicator -->
            <div class="mt-4">
              <div class="text-body-2 text-medium-emphasis mb-2">Progress to Target</div>
              <v-progress-linear
                :model-value="Math.min(100, paidConversionPercentage)"
                :color="paidConversionStatus.color"
                height="8"
                rounded
              />
              <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                <span>0%</span>
                <span>Target: {{ benchmarks.paidConversionRate }}%</span>
              </div>
            </div>

            <!-- Monthly sparkline -->
            <div class="mt-4">
              <div class="text-body-2 text-medium-emphasis mb-2">12-Month Trend</div>
              <v-sparkline
                :model-value="paidConversionTrend"
                color="success"
                line-width="2"
                padding="8"
                smooth
                height="40"
              />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Additional KPI Sparklines -->
    <v-col cols="12">
      <v-card elevation="2">
        <v-card-title>Key Metrics Trends</v-card-title>
        <v-card-text>
          <v-row>
            <!-- Visitors Trend -->
            <v-col cols="12" sm="6" md="3">
              <div class="trend-card">
                <div class="text-body-2 text-medium-emphasis mb-2">Visitors Trend</div>
                <v-sparkline
                  :model-value="visitorsTrend"
                  color="primary"
                  line-width="2"
                  padding="8"
                  smooth
                  height="50"
                  :gradient="['#B53C17', '#ff6b3d']"
                  fill
                />
                <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                  <span>{{ formatNumber(Math.min(...visitorsTrend)) }}</span>
                  <span>{{ formatNumber(Math.max(...visitorsTrend)) }}</span>
                </div>
              </div>
            </v-col>

            <!-- Trials Trend -->
            <v-col cols="12" sm="6" md="3">
              <div class="trend-card">
                <div class="text-body-2 text-medium-emphasis mb-2">Trials Trend</div>
                <v-sparkline
                  :model-value="trialsTrend"
                  color="info"
                  line-width="2"
                  padding="8"
                  smooth
                  height="50"
                  :gradient="['#44FFD2', '#00d084']"
                  fill
                />
                <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                  <span>{{ Math.min(...trialsTrend) }}</span>
                  <span>{{ Math.max(...trialsTrend) }}</span>
                </div>
              </div>
            </v-col>

            <!-- New MRR Trend -->
            <v-col cols="12" sm="6" md="3">
              <div class="trend-card">
                <div class="text-body-2 text-medium-emphasis mb-2">New MRR Trend</div>
                <v-sparkline
                  :model-value="newMRRTrend"
                  color="warning"
                  line-width="2"
                  padding="8"
                  smooth
                  height="50"
                  :gradient="['#ffb547', '#ff6b3d']"
                  fill
                />
                <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                  <span>£{{ Math.min(...newMRRTrend) }}</span>
                  <span>£{{ Math.max(...newMRRTrend) }}</span>
                </div>
              </div>
            </v-col>

            <!-- Current MRR Trend -->
            <v-col cols="12" sm="6" md="3">
              <div class="trend-card">
                <div class="text-body-2 text-medium-emphasis mb-2">Current MRR Trend</div>
                <v-sparkline
                  :model-value="currentMRRTrend"
                  color="success"
                  line-width="2"
                  padding="8"
                  smooth
                  height="50"
                  :gradient="['#00d084', '#44FFD2']"
                  fill
                />
                <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
                  <span>£{{ formatNumber(Math.min(...currentMRRTrend)) }}</span>
                  <span>£{{ formatNumber(Math.max(...currentMRRTrend)) }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  monthlyData, 
  benchmarks, 
  getLatestMetrics
} from '@/data/marketingData'

// Get latest metrics
const latestMetrics = getLatestMetrics()

// Calculate gauge percentages (relative to benchmark * 1.5 for visual scaling)
const trialConversionPercentage = computed(() => {
  const maxTarget = benchmarks.trialConversionRate * 1.5
  return Math.min(100, (latestMetrics.trialConversionRate / maxTarget) * 100)
})

const paidConversionPercentage = computed(() => {
  const maxTarget = benchmarks.paidConversionRate * 1.5
  return Math.min(100, (latestMetrics.paidConversionRate / maxTarget) * 100)
})

// Status calculations
const trialConversionStatus = computed(() => {
  const rate = latestMetrics.trialConversionRate
  const benchmark = benchmarks.trialConversionRate
  
  if (rate >= benchmark) {
    return { color: 'success', icon: 'tabler-check', label: 'Exceeds Target' }
  } else if (rate >= benchmark * 0.8) {
    return { color: 'warning', icon: 'tabler-alert-triangle', label: 'Near Target' }
  } else {
    return { color: 'error', icon: 'tabler-x', label: 'Below Target' }
  }
})

const paidConversionStatus = computed(() => {
  const rate = latestMetrics.paidConversionRate
  const benchmark = benchmarks.paidConversionRate
  
  if (rate >= benchmark) {
    return { color: 'success', icon: 'tabler-check', label: 'Exceeds Target' }
  } else if (rate >= benchmark * 0.8) {
    return { color: 'warning', icon: 'tabler-alert-triangle', label: 'Near Target' }
  } else {
    return { color: 'error', icon: 'tabler-x', label: 'Below Target' }
  }
})

// Trend data for sparklines (last 12 months)
const trialConversionTrend = computed(() => monthlyData.map(m => m.trialConversionRate))
const paidConversionTrend = computed(() => monthlyData.map(m => m.paidConversionRate))
const visitorsTrend = computed(() => monthlyData.map(m => m.uniqueVisitors))
const trialsTrend = computed(() => monthlyData.map(m => m.trialSignups))
const newMRRTrend = computed(() => monthlyData.map(m => m.newMRR))
const currentMRRTrend = computed(() => monthlyData.map(m => m.currentMRR))

// Utility function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.gauge-container {
  padding: 20px 0;
}

.gauge-content {
  text-align: center;
}

.trend-card {
  padding: 16px;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.1);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
}
</style>
