import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  // percorre o array e reduze a uma outra estrutura de dados
  // { income: 0, outcome: 0, total: 0 }
  const summary = useMemo(() => {
    transactions.reduce(
      (acc, transaction) => {
        acc.income += transaction.type === 'income' ? transaction.price : 0
        acc.outcome += transaction.type === 'outcome' ? transaction.price : 0
        acc.total += transaction.type === 'income' ? transaction.price : -transaction.price
  
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}