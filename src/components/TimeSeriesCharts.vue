<template>
  <v-row class="mb-6">
    <!-- Unique Visitors Chart -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Unique Visitors by Month</span>
            <v-chip size="small" color="primary" variant="tonal">
              {{ formatNumber(latestMetrics.uniqueVisitors) }} latest
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :model-value="visitorsData"
            color="primary"
            line-width="3"
            padding="16"
            smooth
            auto-draw
            height="100"
            :gradient="['#B53C17', '#ff6b3d']"
            fill
          />
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Trial Signups Chart -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Trial Signups by Month</span>
            <v-chip size="small" color="info" variant="tonal">
              {{ formatNumber(latestMetrics.trialSignups) }} latest
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :model-value="trialsData"
            color="info"
            line-width="3"
            padding="16"
            smooth
            auto-draw
            height="100"
            :gradient="['#44FFD2', '#00d084']"
            fill
          />
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Trial Conversion Rate with Benchmark -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Trial Conversion Rate</span>
            <v-chip 
              size="small" 
              :color="trialConversionStatus.color" 
              variant="tonal"
            >
              {{ currentTrialConversion }}% vs {{ benchmarks.trialConversionRate }}%
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="position-relative">
            <v-sparkline
              :model-value="trialConversionData"
              color="warning"
              line-width="3"
              padding="16"
              smooth
              auto-draw
              height="100"
            />
            <!-- Benchmark line indicator -->
            <div 
              class="position-absolute w-100 border-dashed"
              :style="`top: ${benchmarkLinePosition}px; border-top: 2px dashed rgb(var(--v-theme-error)); opacity: 0.6;`"
            />
          </div>
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Target: {{ benchmarks.trialConversionRate }}%</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Paid Conversion Rate with Benchmark -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Paid Conversion Rate</span>
            <v-chip 
              size="small" 
              :color="paidConversionStatus.color" 
              variant="tonal"
            >
              {{ currentPaidConversion }}% vs {{ benchmarks.paidConversionRate }}%
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="position-relative">
            <v-sparkline
              :model-value="paidConversionData"
              color="success"
              line-width="3"
              padding="16"
              smooth
              auto-draw
              height="100"
            />
            <!-- Benchmark line indicator -->
            <div 
              class="position-absolute w-100 border-dashed"
              :style="`top: ${paidBenchmarkLinePosition}px; border-top: 2px dashed rgb(var(--v-theme-error)); opacity: 0.6;`"
            />
          </div>
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Target: {{ benchmarks.paidConversionRate }}%</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- New MRR Chart -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>New MRR by Month</span>
            <v-chip size="small" color="warning" variant="tonal">
              £{{ formatNumber(latestMetrics.newMRR) }} latest
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :model-value="newMRRData"
            color="warning"
            line-width="3"
            padding="16"
            smooth
            auto-draw
            height="100"
            :gradient="['#ffb547', '#ff6b3d']"
            fill
          />
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Current MRR Growth -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Current Total MRR</span>
            <v-chip size="small" color="success" variant="tonal">
              £{{ formatNumber(latestMetrics.currentMRR) }} current
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :model-value="currentMRRData"
            color="success"
            line-width="3"
            padding="16"
            smooth
            auto-draw
            height="100"
            :gradient="['#00d084', '#44FFD2']"
            fill
          />
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Current ARR Growth -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Current Total ARR</span>
            <v-chip size="small" color="primary" variant="tonal">
              £{{ formatNumber(latestMetrics.currentARR) }} current
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :model-value="currentARRData"
            color="primary"
            line-width="3"
            padding="16"
            smooth
            auto-draw
            height="100"
            :gradient="['#B53C17', '#8D99AE']"
            fill
          />
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Paid Subscriptions Bar-style Chart -->
    <v-col cols="12" md="6">
      <v-card elevation="2" class="h-100">
        <v-card-title class="pb-2">
          <div class="d-flex align-center justify-space-between w-100">
            <span>Paid Subscriptions by Month</span>
            <v-chip size="small" color="success" variant="tonal">
              {{ Math.round(latestMetrics.paidSubscriptions) }} latest
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :model-value="paidSubsData"
            color="success"
            line-width="4"
            padding="16"
            auto-draw
            height="100"
            type="bar"
          />
          <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
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
  getLatestMetrics, 
  getPreviousMetrics
} from '@/data/marketingData'

// Get latest metrics
const latestMetrics = getLatestMetrics()

// Extract data arrays for charts
const visitorsData = computed(() => monthlyData.map(m => m.uniqueVisitors))
const trialsData = computed(() => monthlyData.map(m => m.trialSignups))
const trialConversionData = computed(() => monthlyData.map(m => m.trialConversionRate))
const paidConversionData = computed(() => monthlyData.map(m => m.paidConversionRate))
const newMRRData = computed(() => monthlyData.map(m => m.newMRR))
const currentMRRData = computed(() => monthlyData.map(m => m.currentMRR))
const currentARRData = computed(() => monthlyData.map(m => m.currentARR))
const paidSubsData = computed(() => monthlyData.map(m => Math.round(m.paidSubscriptions)))

// Current rates
const currentTrialConversion = computed(() => latestMetrics.trialConversionRate.toFixed(2))
const currentPaidConversion = computed(() => latestMetrics.paidConversionRate.toFixed(2))

// Benchmark status
const trialConversionStatus = computed(() => {
  const rate = latestMetrics.trialConversionRate
  const benchmark = benchmarks.trialConversionRate
  
  if (rate >= benchmark) {
    return { color: 'success', label: 'Good' }
  } else if (rate >= benchmark * 0.8) {
    return { color: 'warning', label: 'Neutral' }
  } else {
    return { color: 'error', label: 'Poor' }
  }
})

const paidConversionStatus = computed(() => {
  const rate = latestMetrics.paidConversionRate
  const benchmark = benchmarks.paidConversionRate
  
  if (rate >= benchmark) {
    return { color: 'success', label: 'Good' }
  } else if (rate >= benchmark * 0.8) {
    return { color: 'warning', label: 'Neutral' }
  } else {
    return { color: 'error', label: 'Poor' }
  }
})

// Calculate benchmark line positions (simplified for visual indication)
const benchmarkLinePosition = computed(() => {
  const maxConversion = Math.max(...trialConversionData.value)
  const benchmarkRatio = benchmarks.trialConversionRate / maxConversion
  return 16 + (100 - 32) * (1 - benchmarkRatio) // 16px padding, 100px height minus padding
})

const paidBenchmarkLinePosition = computed(() => {
  const maxConversion = Math.max(...paidConversionData.value)
  const benchmarkRatio = benchmarks.paidConversionRate / maxConversion
  return 16 + (100 - 32) * (1 - benchmarkRatio)
})

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
.border-dashed {
  border-style: dashed !important;
}
</style>
