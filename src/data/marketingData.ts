export interface MonthlyMetrics {
  month: string
  uniqueVisitors: number
  trialSignups: number
  trialConversionRate: number
  paidSubscriptions: number
  paidConversionRate: number
  newMRR: number
  currentMRR: number
  currentARR: number
}

export interface Benchmarks {
  trialConversionRate: number
  paidConversionRate: number
}

export const benchmarks: Benchmarks = {
  trialConversionRate: 9.00, // 9%
  paidConversionRate: 20.00, // 20%
}

export const monthlyData: MonthlyMetrics[] = [
  {
    month: 'January',
    uniqueVisitors: 148,
    trialSignups: 1,
    trialConversionRate: 0.68,
    paidSubscriptions: 1,
    paidConversionRate: 100.00,
    newMRR: 14,
    currentMRR: 116,
    currentARR: 1392,
  },
  {
    month: 'February',
    uniqueVisitors: 298,
    trialSignups: 4,
    trialConversionRate: 1.34,
    paidSubscriptions: 0,
    paidConversionRate: 0.00,
    newMRR: 0,
    currentMRR: 116,
    currentARR: 1392,
  },
  {
    month: 'March',
    uniqueVisitors: 193,
    trialSignups: 3,
    trialConversionRate: 1.55,
    paidSubscriptions: 0,
    paidConversionRate: 0.00,
    newMRR: 0,
    currentMRR: 116,
    currentARR: 1392,
  },
  {
    month: 'April',
    uniqueVisitors: 335,
    trialSignups: 17,
    trialConversionRate: 5.07,
    paidSubscriptions: 0,
    paidConversionRate: 0.00,
    newMRR: 0,
    currentMRR: 116,
    currentARR: 1392,
  },
  {
    month: 'May',
    uniqueVisitors: 297,
    trialSignups: 19,
    trialConversionRate: 6.40,
    paidSubscriptions: 0,
    paidConversionRate: 0.00,
    newMRR: 0,
    currentMRR: 116,
    currentARR: 1392,
  },
  {
    month: 'June',
    uniqueVisitors: 308,
    trialSignups: 18,
    trialConversionRate: 6.56,
    paidSubscriptions: 0,
    paidConversionRate: 0.00,
    newMRR: 0,
    currentMRR: 191,
    currentARR: 2292,
  },
  {
    month: 'July',
    uniqueVisitors: 385,
    trialSignups: 26,
    trialConversionRate: 6.72,
    paidSubscriptions: 2.1,
    paidConversionRate: 8.00,
    newMRR: 39,
    currentMRR: 230,
    currentARR: 2764,
  },
  {
    month: 'August',
    uniqueVisitors: 481,
    trialSignups: 33,
    trialConversionRate: 6.89,
    paidSubscriptions: 4.0,
    paidConversionRate: 12.00,
    newMRR: 76,
    currentMRR: 306,
    currentARR: 3671,
  },
  {
    month: 'September',
    uniqueVisitors: 602,
    trialSignups: 42,
    trialConversionRate: 7.06,
    paidSubscriptions: 6.8,
    paidConversionRate: 16.00,
    newMRR: 129,
    currentMRR: 435,
    currentARR: 5221,
  },
  {
    month: 'October',
    uniqueVisitors: 752,
    trialSignups: 54,
    trialConversionRate: 7.24,
    paidSubscriptions: 10.3,
    paidConversionRate: 19.00,
    newMRR: 196,
    currentMRR: 632,
    currentARR: 7578,
  },
  {
    month: 'November',
    uniqueVisitors: 940,
    trialSignups: 70,
    trialConversionRate: 7.42,
    paidSubscriptions: 13.9,
    paidConversionRate: 20.00,
    newMRR: 265,
    currentMRR: 897,
    currentARR: 10758,
  },
  {
    month: 'December',
    uniqueVisitors: 1175,
    trialSignups: 89,
    trialConversionRate: 7.60,
    paidSubscriptions: 18.8,
    paidConversionRate: 21.00,
    newMRR: 356,
    currentMRR: 1253,
    currentARR: 15036,
  },
]

// Utility functions for calculations
export const getLatestMetrics = () => {
  return monthlyData[monthlyData.length - 1]
}

export const getPreviousMetrics = () => {
  return monthlyData[monthlyData.length - 2]
}

export const calculateMoMChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0
  return Number(((current - previous) / previous * 100).toFixed(1))
}

export const getTotalForRange = (field: keyof MonthlyMetrics, startMonth?: number, endMonth?: number): number => {
  const start = startMonth || 0
  const end = endMonth || monthlyData.length - 1
  return monthlyData.slice(start, end + 1).reduce((sum, month) => {
    const value = month[field]
    return sum + (typeof value === 'number' ? value : 0)
  }, 0)
}

export const getOverallConversionRate = (): number => {
  const totalVisitors = getTotalForRange('uniqueVisitors')
  const totalPaid = getTotalForRange('paidSubscriptions')
  return Number((totalPaid / totalVisitors * 100).toFixed(2))
}

// Anomaly detection
export const findAnomalies = () => {
  const anomalies: Array<{
    metric: string
    month: string
    value: number
    type: 'spike' | 'drop'
    change: number
  }> = []

  const metrics: Array<{ key: keyof MonthlyMetrics; name: string }> = [
    { key: 'uniqueVisitors', name: 'Unique Visitors' },
    { key: 'trialSignups', name: 'Trial Signups' },
    { key: 'trialConversionRate', name: 'Trial Conversion Rate' },
    { key: 'paidSubscriptions', name: 'Paid Subscriptions' },
    { key: 'paidConversionRate', name: 'Paid Conversion Rate' },
    { key: 'newMRR', name: 'New MRR' },
  ]

  metrics.forEach(({ key, name }) => {
    for (let i = 1; i < monthlyData.length; i++) {
      const current = monthlyData[i][key] as number
      const previous = monthlyData[i - 1][key] as number
      
      if (previous > 0) {
        const change = ((current - previous) / previous) * 100
        
        // Consider significant changes (>50% increase or >25% decrease)
        if (Math.abs(change) > 25) {
          anomalies.push({
            metric: name,
            month: monthlyData[i].month,
            value: current,
            type: change > 0 ? 'spike' : 'drop',
            change: Number(change.toFixed(1))
          })
        }
      }
    }
  })

  // Sort by absolute change and return top anomalies
  return anomalies
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 6) // Top 6 anomalies
}

export const getBestWorstMonths = () => {
  const metrics = ['uniqueVisitors', 'trialSignups', 'paidSubscriptions', 'newMRR'] as const
  
  return metrics.reduce((acc, metric) => {
    const values = monthlyData.map((month, index) => ({
      month: month.month,
      value: month[metric] as number,
      index
    }))
    
    const best = values.reduce((max, current) => current.value > max.value ? current : max)
    const worst = values.reduce((min, current) => current.value < min.value ? current : min)
    
    acc[metric] = { best: best.month, worst: worst.month }
    return acc
  }, {} as Record<typeof metrics[number], { best: string; worst: string }>)
}
