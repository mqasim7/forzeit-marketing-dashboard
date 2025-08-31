<template>
  <v-row class="mb-6">
    <!-- Monthly Conversion Funnel -->
    <v-col cols="12" md="8">
      <v-card elevation="2" class="h-100">
        <v-card-title>Monthly Conversion Funnel (Latest Month)</v-card-title>
        <v-card-text>
          <div class="funnel-container">
            <!-- Visitors -->
            <div class="funnel-step">
              <div class="funnel-bar visitors" :style="{ width: '100%' }">
                <div class="funnel-content">
                  <div class="funnel-label">Unique Visitors</div>
                  <div class="funnel-value">{{ formatNumber(latestMetrics.uniqueVisitors) }}</div>
                  <div class="funnel-rate">100%</div>
                </div>
              </div>
            </div>

            <!-- Arrow -->
            <div class="funnel-arrow">
              <v-icon icon="tabler-arrow-down" color="primary" size="24" />
            </div>

            <!-- Trials -->
            <div class="funnel-step">
              <div class="funnel-bar trials" :style="{ width: `${trialsWidth}%` }">
                <div class="funnel-content">
                  <div class="funnel-label">Trial Signups</div>
                  <div class="funnel-value">{{ formatNumber(latestMetrics.trialSignups) }}</div>
                  <div class="funnel-rate">{{ latestMetrics.trialConversionRate.toFixed(2) }}%</div>
                </div>
              </div>
            </div>

            <!-- Arrow -->
            <div class="funnel-arrow">
              <v-icon icon="tabler-arrow-down" color="info" size="24" />
            </div>

            <!-- Paid -->
            <div class="funnel-step">
              <div class="funnel-bar paid" :style="{ width: `${paidWidth}%` }">
                <div class="funnel-content">
                  <div class="funnel-label">Paid Subscriptions</div>
                  <div class="funnel-value">{{ Math.round(latestMetrics.paidSubscriptions) }}</div>
                  <div class="funnel-rate">{{ latestMetrics.paidConversionRate.toFixed(2) }}%</div>
                </div>
              </div>
            </div>

            <!-- Overall Rate -->
            <div class="mt-4 text-center">
              <v-chip color="secondary" variant="tonal" size="large">
                <v-icon icon="tabler-target" />
                Overall Visitor→Paid: {{ overallConversionRate }}%
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Funnel Evolution -->
    <v-col cols="12" md="4">
      <v-card elevation="2" class="h-100">
        <v-card-title>Funnel Evolution</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-3">
            <!-- Trial Conversion Trend -->
            <div class="text-center">
              <div class="text-body-2 text-medium-emphasis">Trial Conversion Trend</div>
              <v-sparkline
                :model-value="trialConversionTrend"
                color="warning"
                line-width="2"
                padding="8"
                smooth
                height="40"
              />
              <div class="text-caption">Last 6 months</div>
            </div>

            <v-divider />

            <!-- Paid Conversion Trend -->
            <div class="text-center">
              <div class="text-body-2 text-medium-emphasis">Paid Conversion Trend</div>
              <v-sparkline
                :model-value="paidConversionTrend"
                color="success"
                line-width="2"
                padding="8"
                smooth
                height="40"
              />
              <div class="text-caption">Last 6 months</div>
            </div>

            <v-divider />

            <!-- Quality Score -->
            <div class="text-center">
              <div class="text-body-2 text-medium-emphasis mb-2">Funnel Quality</div>
              <v-progress-circular
                :model-value="funnelQualityScore"
                :color="funnelQualityColor"
                size="60"
                width="6"
              >
                <span class="text-body-2 font-weight-bold">{{ Math.round(funnelQualityScore) }}%</span>
              </v-progress-circular>
              <div class="text-caption mt-1">Based on benchmark performance</div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Relationship Analysis -->
    <v-col cols="12">
      <v-card elevation="2">
        <v-card-title>Relationship Analysis</v-card-title>
        <v-card-text>
          <v-row>
            <!-- Visitors vs Trials Scatter -->
            <v-col cols="12" md="4">
              <div class="text-center mb-3">
                <div class="text-body-1 font-weight-medium">Visitors vs Trials</div>
                <div class="text-caption text-medium-emphasis">Linear relationship expected</div>
              </div>
              <div class="scatter-container">
                <div 
                  v-for="(point, index) in visitorsTrialsScatter" 
                  :key="index"
                  class="scatter-point"
                  :style="{
                    left: `${point.x}%`,
                    bottom: `${point.y}%`,
                    backgroundColor: point.isOutlier ? 'rgb(var(--v-theme-error))' : 'rgb(var(--v-theme-primary))'
                  }"
                  :title="`${monthlyData[index].month}: ${monthlyData[index].uniqueVisitors} visitors, ${monthlyData[index].trialSignups} trials`"
                />
              </div>
              <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
                <span>Low Visitors</span>
                <span>High Visitors</span>
              </div>
            </v-col>

            <!-- Trials vs Paid Scatter -->
            <v-col cols="12" md="4">
              <div class="text-center mb-3">
                <div class="text-body-1 font-weight-medium">Trials vs Paid</div>
                <div class="text-caption text-medium-emphasis">Trial quality indicator</div>
              </div>
              <div class="scatter-container">
                <div 
                  v-for="(point, index) in trialsPaidScatter" 
                  :key="index"
                  class="scatter-point"
                  :style="{
                    left: `${point.x}%`,
                    bottom: `${point.y}%`,
                    backgroundColor: point.isOutlier ? 'rgb(var(--v-theme-error))' : 'rgb(var(--v-theme-info))'
                  }"
                  :title="`${monthlyData[index].month}: ${monthlyData[index].trialSignups} trials, ${Math.round(monthlyData[index].paidSubscriptions)} paid`"
                />
              </div>
              <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
                <span>Low Trials</span>
                <span>High Trials</span>
              </div>
            </v-col>

            <!-- Paid vs New MRR Scatter -->
            <v-col cols="12" md="4">
              <div class="text-center mb-3">
                <div class="text-body-1 font-weight-medium">Paid vs New MRR</div>
                <div class="text-caption text-medium-emphasis">ARPPU indicator</div>
              </div>
              <div class="scatter-container">
                <div 
                  v-for="(point, index) in paidMRRScatter" 
                  :key="index"
                  class="scatter-point"
                  :style="{
                    left: `${point.x}%`,
                    bottom: `${point.y}%`,
                    backgroundColor: point.isOutlier ? 'rgb(var(--v-theme-error))' : 'rgb(var(--v-theme-success))'
                  }"
                  :title="`${monthlyData[index].month}: ${Math.round(monthlyData[index].paidSubscriptions)} paid, £${monthlyData[index].newMRR} MRR`"
                />
              </div>
              <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-2">
                <span>Low Paid</span>
                <span>High Paid</span>
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
  getLatestMetrics,
  getOverallConversionRate
} from '@/data/marketingData'

// Get latest metrics
const latestMetrics = getLatestMetrics()
const overallConversionRate = computed(() => getOverallConversionRate())

// Calculate funnel widths (relative to visitors)
const trialsWidth = computed(() => (latestMetrics.trialSignups / latestMetrics.uniqueVisitors) * 100)
const paidWidth = computed(() => (latestMetrics.paidSubscriptions / latestMetrics.uniqueVisitors) * 100)

// Conversion trends for last 6 months
const trialConversionTrend = computed(() => 
  monthlyData.slice(-6).map(m => m.trialConversionRate)
)
const paidConversionTrend = computed(() => 
  monthlyData.slice(-6).map(m => m.paidConversionRate)
)

// Funnel quality score based on benchmark performance
const funnelQualityScore = computed(() => {
  const trialScore = Math.min(100, (latestMetrics.trialConversionRate / benchmarks.trialConversionRate) * 100)
  const paidScore = Math.min(100, (latestMetrics.paidConversionRate / benchmarks.paidConversionRate) * 100)
  return (trialScore + paidScore) / 2
})

const funnelQualityColor = computed(() => {
  if (funnelQualityScore.value >= 80) return 'success'
  if (funnelQualityScore.value >= 60) return 'warning'
  return 'error'
})

// Scatter plot data generation
const createScatterData = (xValues: number[], yValues: number[]) => {
  const maxX = Math.max(...xValues)
  const maxY = Math.max(...yValues)
  
  return xValues.map((x, index) => {
    const y = yValues[index]
    
    // Simple outlier detection (beyond 2 standard deviations)
    const meanX = xValues.reduce((a, b) => a + b, 0) / xValues.length
    const meanY = yValues.reduce((a, b) => a + b, 0) / yValues.length
    const stdX = Math.sqrt(xValues.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0) / xValues.length)
    const stdY = Math.sqrt(yValues.reduce((acc, val) => acc + Math.pow(val - meanY, 2), 0) / yValues.length)
    
    const isOutlier = Math.abs(x - meanX) > 2 * stdX || Math.abs(y - meanY) > 2 * stdY
    
    return {
      x: (x / maxX) * 90 + 5, // 5-95% range
      y: (y / maxY) * 90 + 5,
      isOutlier
    }
  })
}

const visitorsTrialsScatter = computed(() => 
  createScatterData(
    monthlyData.map(m => m.uniqueVisitors),
    monthlyData.map(m => m.trialSignups)
  )
)

const trialsPaidScatter = computed(() => 
  createScatterData(
    monthlyData.map(m => m.trialSignups),
    monthlyData.map(m => m.paidSubscriptions)
  )
)

const paidMRRScatter = computed(() => 
  createScatterData(
    monthlyData.map(m => m.paidSubscriptions),
    monthlyData.map(m => m.newMRR)
  )
)

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
.funnel-container {
  padding: 20px 0;
}

.funnel-step {
  margin: 16px 0;
  display: flex;
  justify-content: center;
}

.funnel-bar {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-primary-darken-1)));
  border-radius: 8px;
  padding: 16px;
  color: white;
  position: relative;
  min-width: 200px;
  transition: all 0.3s ease;
}

.funnel-bar.trials {
  background: linear-gradient(135deg, rgb(var(--v-theme-info)), rgb(var(--v-theme-info-darken-1)));
}

.funnel-bar.paid {
  background: linear-gradient(135deg, rgb(var(--v-theme-success)), rgb(var(--v-theme-success-darken-1)));
}

.funnel-content {
  text-align: center;
}

.funnel-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.funnel-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 4px 0;
}

.funnel-rate {
  font-size: 0.875rem;
  opacity: 0.9;
}

.funnel-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
}

.scatter-container {
  position: relative;
  height: 120px;
  background: rgba(var(--v-theme-surface-variant), 0.1);
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
}

.scatter-point {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translate(-50%, 50%);
  transition: all 0.2s ease;
  cursor: pointer;
}

.scatter-point:hover {
  transform: translate(-50%, 50%) scale(1.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
