<template>
  <v-row class="mb-6">
    <!-- Monthly Summary Table -->
    <v-col cols="12" lg="8">
      <v-card elevation="2">
        <v-card-title>Monthly Summary</v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="tableData"
            :items-per-page="-1"
            hide-default-footer
            class="summary-table"
          >
            <!-- Custom month column -->
            <template #item.month="{ item }">
              <div class="font-weight-medium">{{ item.month }}</div>
            </template>

            <!-- Visitors with conditional formatting -->
            <template #item.uniqueVisitors="{ item }">
              <v-chip
                size="small"
                :color="getAnomalyColor('uniqueVisitors', item.month)"
                variant="tonal"
              >
                {{ formatNumber(item.uniqueVisitors) }}
              </v-chip>
            </template>

            <!-- Trials with conditional formatting -->
            <template #item.trialSignups="{ item }">
              <v-chip
                size="small"
                :color="getAnomalyColor('trialSignups', item.month)"
                variant="tonal"
              >
                {{ formatNumber(item.trialSignups) }}
              </v-chip>
            </template>

            <!-- Trial Conversion Rate -->
            <template #item.trialConversionRate="{ item }">
              <div class="d-flex align-center ga-2">
                <span>{{ item.trialConversionRate.toFixed(2) }}%</span>
                <v-icon
                  v-if="item.trialConversionRate >= benchmarks.trialConversionRate"
                  icon="tabler-check"
                  color="success"
                  size="16"
                />
                <v-icon
                  v-else-if="item.trialConversionRate >= benchmarks.trialConversionRate * 0.8"
                  icon="tabler-alert-triangle"
                  color="warning"
                  size="16"
                />
                <v-icon
                  v-else
                  icon="tabler-x"
                  color="error"
                  size="16"
                />
              </div>
            </template>

            <!-- Paid Subs -->
            <template #item.paidSubscriptions="{ item }">
              <v-chip
                size="small"
                :color="getAnomalyColor('paidSubscriptions', item.month)"
                variant="tonal"
              >
                {{ Math.round(item.paidSubscriptions) }}
              </v-chip>
            </template>

            <!-- Paid Conversion Rate -->
            <template #item.paidConversionRate="{ item }">
              <div class="d-flex align-center ga-2">
                <span>{{ item.paidConversionRate.toFixed(2) }}%</span>
                <v-icon
                  v-if="item.paidConversionRate >= benchmarks.paidConversionRate"
                  icon="tabler-check"
                  color="success"
                  size="16"
                />
                <v-icon
                  v-else-if="item.paidConversionRate >= benchmarks.paidConversionRate * 0.8"
                  icon="tabler-alert-triangle"
                  color="warning"
                  size="16"
                />
                <v-icon
                  v-else
                  icon="tabler-x"
                  color="error"
                  size="16"
                />
              </div>
            </template>

            <!-- New MRR -->
            <template #item.newMRR="{ item }">
              <v-chip
                size="small"
                :color="getAnomalyColor('newMRR', item.month)"
                variant="tonal"
              >
                £{{ formatNumber(item.newMRR) }}
              </v-chip>
            </template>

            <!-- Current MRR -->
            <template #item.currentMRR="{ item }">
              <span class="font-weight-medium">£{{ formatNumber(item.currentMRR) }}</span>
            </template>

            <!-- Current ARR -->
            <template #item.currentARR="{ item }">
              <span class="font-weight-medium">£{{ formatNumber(item.currentARR) }}</span>
            </template>

            <!-- MoM Delta -->
            <template #item.momDelta="{ item }">
              <v-chip
                size="small"
                :color="item.momDelta > 0 ? 'success' : item.momDelta < 0 ? 'error' : 'surface-variant'"
                variant="tonal"
              >
                <v-icon
                  size="12"
                  :icon="item.momDelta > 0 ? 'tabler-trending-up' : item.momDelta < 0 ? 'tabler-trending-down' : 'tabler-minus'"
                />
                {{ item.momDelta > 0 ? '+' : '' }}{{ item.momDelta }}%
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Anomalies Detection -->
    <v-col cols="12" lg="4">
      <v-card elevation="2" class="h-100">
        <v-card-title>Top Anomalies</v-card-title>
        <v-card-subtitle>Significant spikes and drops detected</v-card-subtitle>
        <v-card-text>
          <div class="d-flex flex-column ga-3">
            <div 
              v-for="anomaly in anomalies" 
              :key="`${anomaly.metric}-${anomaly.month}`"
              class="anomaly-item"
            >
              <v-chip
                :color="anomaly.type === 'spike' ? 'success' : 'error'"
                variant="tonal"
                size="small"
                class="mb-1"
              >
                <v-icon
                  size="12"
                  :icon="anomaly.type === 'spike' ? 'tabler-trending-up' : 'tabler-trending-down'"
                />
                {{ anomaly.type === 'spike' ? 'Spike' : 'Drop' }}
              </v-chip>
              <div class="text-body-2 font-weight-medium">{{ anomaly.metric }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ anomaly.month }}: {{ 
                  anomaly.metric.includes('Rate') || anomaly.metric.includes('Conversion') 
                    ? anomaly.value.toFixed(2) + '%' 
                    : formatNumber(anomaly.value) 
                }}
                <span :class="anomaly.type === 'spike' ? 'text-success' : 'text-error'">
                  ({{ anomaly.change > 0 ? '+' : '' }}{{ anomaly.change }}%)
                </span>
              </div>
            </div>

            <div v-if="anomalies.length === 0" class="text-center text-medium-emphasis">
              <v-icon icon="tabler-check-circle" color="success" size="32" class="mb-2" />
              <div class="text-body-2">No significant anomalies detected</div>
            </div>
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
  calculateMoMChange,
  findAnomalies
} from '@/data/marketingData'

// Table headers
const headers = [
  { title: 'Month', key: 'month', sortable: false },
  { title: 'Visitors', key: 'uniqueVisitors', align: 'center' },
  { title: 'Trials', key: 'trialSignups', align: 'center' },
  { title: 'Trial CVR', key: 'trialConversionRate', align: 'center' },
  { title: 'Paid', key: 'paidSubscriptions', align: 'center' },
  { title: 'Paid CVR', key: 'paidConversionRate', align: 'center' },
  { title: 'New MRR', key: 'newMRR', align: 'center' },
  { title: 'Current MRR', key: 'currentMRR', align: 'center' },
  { title: 'Current ARR', key: 'currentARR', align: 'center' },
  { title: 'MoM Δ', key: 'momDelta', align: 'center' },
] as const

// Generate table data with MoM calculations
const tableData = computed(() => {
  return monthlyData.map((month, index) => {
    const prevMonth = index > 0 ? monthlyData[index - 1] : null
    const momDelta = prevMonth 
      ? calculateMoMChange(month.uniqueVisitors, prevMonth.uniqueVisitors)
      : 0

    return {
      ...month,
      momDelta
    }
  })
})

// Get anomalies
const anomalies = computed(() => findAnomalies())

// Get anomaly color for conditional formatting
const getAnomalyColor = (metric: string, month: string): string => {
  const anomaly = anomalies.value.find(a => 
    a.metric.toLowerCase().includes(metric.toLowerCase()) && a.month === month
  )
  
  if (!anomaly) return 'default'
  return anomaly.type === 'spike' ? 'success' : 'error'
}

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
.summary-table :deep(.v-data-table-header) {
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
}

.anomaly-item {
  padding: 12px;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.2);
}
</style>
