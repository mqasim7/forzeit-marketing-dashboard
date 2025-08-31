<template>
  <div>
    <!-- Dashboard Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">
              Forzeit Marketing Dashboard
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-0">
              Real-time insights into user acquisition, conversions, and revenue growth
            </p>
          </div>
          <VChip
            color="success"
            variant="tonal"
            size="small"
          >
            <VIcon
              start
              icon="tabler-circle-dot"
              size="16"
            />
            Live Data
          </VChip>
        </div>
      </VCol>
    </VRow>

    <!-- Live Stats Strip -->
    <LiveStatsStrip />

    <!-- KPI Cards -->
    <KPICards />

    <!-- Time Series Charts -->
    <TimeSeriesCharts />

    <!-- Benchmark Gauges -->
    <BenchmarkGauges />

    <!-- Funnel Analytics -->
    <FunnelAnalytics />

    <!-- Summary Table and Anomalies -->
    <SummaryTable />
  </div>
</template>

<script setup lang="ts">
import LiveStatsStrip from '@/components/LiveStatsStrip.vue'
import KPICards from '@/components/KPICards.vue'
import TimeSeriesCharts from '@/components/TimeSeriesCharts.vue'
import BenchmarkGauges from '@/components/BenchmarkGauges.vue'
import FunnelAnalytics from '@/components/FunnelAnalytics.vue'
import SummaryTable from '@/components/SummaryTable.vue'
</script>
