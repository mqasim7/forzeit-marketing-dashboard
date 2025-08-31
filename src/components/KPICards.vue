<template>
  <v-row class="mb-6">
    <!-- Total Unique Visitors -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Total Unique Visitors</div>
              <div class="text-h5 font-weight-bold mt-1">{{ formatNumber(totalVisitors) }}</div>
            </div>
            <v-avatar color="primary" variant="tonal" size="40">
              <v-icon icon="tabler-users" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="visitorsMoM > 0 ? 'success' : visitorsMoM < 0 ? 'error' : 'surface-variant'"
              variant="tonal"
            >
              <v-icon 
                size="14" 
                :icon="visitorsMoM > 0 ? 'tabler-trending-up' : visitorsMoM < 0 ? 'tabler-trending-down' : 'tabler-minus'"
              />
              {{ visitorsMoM > 0 ? '+' : '' }}{{ visitorsMoM }}% MoM
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Trial Signups -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Trial Signups</div>
              <div class="text-h5 font-weight-bold mt-1">{{ formatNumber(totalTrials) }}</div>
            </div>
            <v-avatar color="info" variant="tonal" size="40">
              <v-icon icon="tabler-user-plus" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="trialsMoM > 0 ? 'success' : trialsMoM < 0 ? 'error' : 'surface-variant'"
              variant="tonal"
            >
              <v-icon 
                size="14" 
                :icon="trialsMoM > 0 ? 'tabler-trending-up' : trialsMoM < 0 ? 'tabler-trending-down' : 'tabler-minus'"
              />
              {{ trialsMoM > 0 ? '+' : '' }}{{ trialsMoM }}% MoM
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Trial Conversion Rate vs Benchmark -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Trial Conversion</div>
              <div class="text-h5 font-weight-bold mt-1">{{ currentTrialConversion }}%</div>
            </div>
            <v-avatar :color="trialConversionStatus.color" variant="tonal" size="40">
              <v-icon :icon="trialConversionStatus.icon" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="trialConversionStatus.color"
              variant="tonal"
            >
              vs {{ benchmarks.trialConversionRate }}% target - {{ trialConversionStatus.label }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Paid Subscriptions -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Paid Subscriptions</div>
              <div class="text-h5 font-weight-bold mt-1">{{ Math.round(totalPaidSubs) }}</div>
            </div>
            <v-avatar color="success" variant="tonal" size="40">
              <v-icon icon="tabler-credit-card" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="paidMoM > 0 ? 'success' : paidMoM < 0 ? 'error' : 'surface-variant'"
              variant="tonal"
            >
              <v-icon 
                size="14" 
                :icon="paidMoM > 0 ? 'tabler-trending-up' : paidMoM < 0 ? 'tabler-trending-down' : 'tabler-minus'"
              />
              {{ paidMoM > 0 ? '+' : '' }}{{ paidMoM }}% MoM
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Paid Conversion Rate vs Benchmark -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Paid Conversion</div>
              <div class="text-h5 font-weight-bold mt-1">{{ currentPaidConversion }}%</div>
            </div>
            <v-avatar :color="paidConversionStatus.color" variant="tonal" size="40">
              <v-icon :icon="paidConversionStatus.icon" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="paidConversionStatus.color"
              variant="tonal"
            >
              vs {{ benchmarks.paidConversionRate }}% target - {{ paidConversionStatus.label }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- New MRR -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">New MRR</div>
              <div class="text-h5 font-weight-bold mt-1">£{{ formatNumber(currentNewMRR) }}</div>
            </div>
            <v-avatar color="warning" variant="tonal" size="40">
              <v-icon icon="tabler-currency-pound" />
            </v-avatar>
          </div>
          <div class="mt-2 d-flex flex-column ga-1">
            <v-chip 
              size="small" 
              :color="newMRRMoM > 0 ? 'success' : newMRRMoM < 0 ? 'error' : 'surface-variant'"
              variant="tonal"
            >
              <v-icon 
                size="14" 
                :icon="newMRRMoM > 0 ? 'tabler-trending-up' : newMRRMoM < 0 ? 'tabler-trending-down' : 'tabler-minus'"
              />
              {{ newMRRMoM > 0 ? '+' : '' }}{{ newMRRMoM }}% MoM
            </v-chip>
            <div class="text-caption text-medium-emphasis">30-day run-rate: £{{ formatNumber(currentNewMRR * 12) }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Current MRR -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Current MRR</div>
              <div class="text-h5 font-weight-bold mt-1">£{{ formatNumber(latestMetrics.currentMRR) }}</div>
            </div>
            <v-avatar color="success" variant="tonal" size="40">
              <v-icon icon="tabler-trending-up" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="mrrMoM > 0 ? 'success' : mrrMoM < 0 ? 'error' : 'surface-variant'"
              variant="tonal"
            >
              <v-icon 
                size="14" 
                :icon="mrrMoM > 0 ? 'tabler-trending-up' : mrrMoM < 0 ? 'tabler-trending-down' : 'tabler-minus'"
              />
              {{ mrrMoM > 0 ? '+' : '' }}{{ mrrMoM }}% MoM
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Current ARR -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Current ARR</div>
              <div class="text-h5 font-weight-bold mt-1">£{{ formatNumber(latestMetrics.currentARR) }}</div>
            </div>
            <v-avatar color="primary" variant="tonal" size="40">
              <v-icon icon="tabler-chart-line" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              :color="arrMoM > 0 ? 'success' : arrMoM < 0 ? 'error' : 'surface-variant'"
              variant="tonal"
            >
              <v-icon 
                size="14" 
                :icon="arrMoM > 0 ? 'tabler-trending-up' : arrMoM < 0 ? 'tabler-trending-down' : 'tabler-minus'"
              />
              {{ arrMoM > 0 ? '+' : '' }}{{ arrMoM }}% MoM
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Overall Visitor to Paid Conversion -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 text-medium-emphasis">Visitor→Paid Conversion</div>
              <div class="text-h5 font-weight-bold mt-1">{{ overallConversion }}%</div>
            </div>
            <v-avatar color="secondary" variant="tonal" size="40">
              <v-icon icon="tabler-target" />
            </v-avatar>
          </div>
          <div class="mt-2">
            <v-chip 
              size="small" 
              color="info"
              variant="tonal"
            >
              Overall funnel performance
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Best/Worst Months -->
    <v-col cols="12" sm="6" md="3">
      <v-card elevation="2" class="h-100">
        <v-card-text class="pb-2">
          <div class="text-body-2 text-medium-emphasis mb-2">Performance Highlights</div>
          <div class="d-flex flex-column ga-1">
            <v-chip size="x-small" color="success" variant="tonal">
              <v-icon size="12" icon="tabler-trophy" />
              Best Visitors: {{ bestWorstMonths.uniqueVisitors.best }}
            </v-chip>
            <v-chip size="x-small" color="success" variant="tonal">
              <v-icon size="12" icon="tabler-star" />
              Best Trials: {{ bestWorstMonths.trialSignups.best }}
            </v-chip>
            <v-chip size="x-small" color="success" variant="tonal">
              <v-icon size="12" icon="tabler-cash" />
              Best MRR: {{ bestWorstMonths.newMRR.best }}
            </v-chip>
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
  getPreviousMetrics, 
  calculateMoMChange, 
  getTotalForRange,
  getOverallConversionRate,
  getBestWorstMonths
} from '@/data/marketingData'

// Get latest and previous month data
const latestMetrics = getLatestMetrics()
const previousMetrics = getPreviousMetrics()

// Calculate totals and MoM changes
const totalVisitors = computed(() => getTotalForRange('uniqueVisitors'))
const totalTrials = computed(() => getTotalForRange('trialSignups'))
const totalPaidSubs = computed(() => getTotalForRange('paidSubscriptions'))
const currentNewMRR = computed(() => latestMetrics.newMRR)
const overallConversion = computed(() => getOverallConversionRate())

// MoM calculations
const visitorsMoM = computed(() => calculateMoMChange(latestMetrics.uniqueVisitors, previousMetrics.uniqueVisitors))
const trialsMoM = computed(() => calculateMoMChange(latestMetrics.trialSignups, previousMetrics.trialSignups))
const paidMoM = computed(() => calculateMoMChange(latestMetrics.paidSubscriptions, previousMetrics.paidSubscriptions))
const newMRRMoM = computed(() => calculateMoMChange(latestMetrics.newMRR, previousMetrics.newMRR))
const mrrMoM = computed(() => calculateMoMChange(latestMetrics.currentMRR, previousMetrics.currentMRR))
const arrMoM = computed(() => calculateMoMChange(latestMetrics.currentARR, previousMetrics.currentARR))

// Current conversion rates
const currentTrialConversion = computed(() => latestMetrics.trialConversionRate.toFixed(2))
const currentPaidConversion = computed(() => latestMetrics.paidConversionRate.toFixed(2))

// Benchmark status calculations
const trialConversionStatus = computed(() => {
  const rate = latestMetrics.trialConversionRate
  const benchmark = benchmarks.trialConversionRate
  
  if (rate >= benchmark) {
    return { color: 'success', icon: 'tabler-check', label: 'Good' }
  } else if (rate >= benchmark * 0.8) {
    return { color: 'warning', icon: 'tabler-alert-triangle', label: 'Neutral' }
  } else {
    return { color: 'error', icon: 'tabler-x', label: 'Poor' }
  }
})

const paidConversionStatus = computed(() => {
  const rate = latestMetrics.paidConversionRate
  const benchmark = benchmarks.paidConversionRate
  
  if (rate >= benchmark) {
    return { color: 'success', icon: 'tabler-check', label: 'Good' }
  } else if (rate >= benchmark * 0.8) {
    return { color: 'warning', icon: 'tabler-alert-triangle', label: 'Neutral' }
  } else {
    return { color: 'error', icon: 'tabler-x', label: 'Poor' }
  }
})

// Best/worst months
const bestWorstMonths = getBestWorstMonths()

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
